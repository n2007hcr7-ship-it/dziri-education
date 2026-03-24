import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Maximize } from 'lucide-react';
import { useGamification } from '../lib/GamificationContext';
import { COMPLETION_THRESHOLD } from '../constants';

interface VideoPlayerProps {
  src: string;
  lessonId: string;
}

export function VideoPlayer({ src, lessonId }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addPoint } = useGamification();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Track actual watch time to prevent skipping
  const [watchedTime, setWatchedTime] = useState(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      
      if (duration > 0) {
        const currentProgress = currentTime / duration;
        setProgress(currentProgress * 100);

        // Detect skipping: if current time jumped more than 2 seconds from last recorded time
        const diff = currentTime - lastTimeRef.current;
        if (diff > 0 && diff < 2) {
          setWatchedTime(prev => prev + diff);
        }
        lastTimeRef.current = currentTime;

        // Check completion threshold (70% of actual watch time)
        if (!isCompleted && watchedTime / duration >= COMPLETION_THRESHOLD) {
          setIsCompleted(true);
          addPoint();
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [isCompleted, watchedTime, addPoint]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative group rounded-3xl overflow-hidden bg-black shadow-2xl aspect-video">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer">
            <div 
              className="h-full bg-primary-blue transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-6">
              <button onClick={togglePlay} className="hover:text-primary-blue transition-colors">
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
              </button>
              <button className="hover:text-primary-blue transition-colors">
                <RotateCcw className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                <div className="w-20 h-1 bg-white/20 rounded-full">
                  <div className="w-1/2 h-full bg-white rounded-full" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {isCompleted && (
                <span className="text-xs font-bold bg-primary-blue/20 text-primary-blue px-3 py-1 rounded-full border border-primary-blue/30">
                  تم الحصول على نقطة ✨
                </span>
              )}
              <button className="hover:text-primary-blue transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Play Overlay */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
          onClick={togglePlay}
        >
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-100 hover:scale-110 transition-transform">
            <Play className="w-10 h-10 fill-current ml-1" />
          </div>
        </div>
      )}
    </div>
  );
}
