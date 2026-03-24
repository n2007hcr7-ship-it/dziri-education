import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  PhoneOff, 
  Users, 
  MessageSquare, 
  Settings, 
  Share2, 
  Heart, 
  Shield, 
  ArrowRight,
  Maximize,
  Volume2
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { motion, AnimatePresence } from 'motion/react';
import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';

export function LiveSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [participants, setParticipants] = useState(124);
  const [messages, setMessages] = useState([
    { id: '1', user: 'أحمد', text: 'أستاذ، هل يمكنك إعادة شرح النقطة الأخيرة؟', time: '10:05' },
    { id: '2', user: 'سارة', text: 'شكراً جزيلاً أستاذ، الشرح واضح جداً!', time: '10:07' },
  ]);
  const [inputText, setInputText] = useState('');

  // Agora refs
  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const localVideoTrackRef = useRef<ICameraVideoTrack | null>(null);
  const localAudioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);
  const localVideoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Agora (Mocked for now to avoid errors without APP_ID)
    const initAgora = async () => {
      try {
        // clientRef.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
        // await clientRef.current.join(APP_ID, CHANNEL, TOKEN, UID);
        // localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
        // localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
        // if (localVideoContainerRef.current) {
        //   localVideoTrackRef.current.play(localVideoContainerRef.current);
        // }
        // await clientRef.current.publish([localAudioTrackRef.current, localVideoTrackRef.current]);
      } catch (error) {
        console.error('Agora Init Error:', error);
      }
    };

    initAgora();

    return () => {
      // Cleanup
      localAudioTrackRef.current?.close();
      localVideoTrackRef.current?.close();
      clientRef.current?.leave();
    };
  }, []);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, { 
      id: Math.random().toString(36).substr(2, 9), 
      user: 'أنا', 
      text: inputText, 
      time: new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' }) 
    }]);
    setInputText('');
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-72px)] bg-[#0F172A] overflow-hidden">
      {/* Main Video Area */}
      <div className="flex-1 relative flex flex-col">
        {/* Top Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 z-10 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={() => navigate('/')}>
              <ArrowRight className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-blue flex items-center justify-center text-white border-2 border-white/20">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-white font-bold text-sm md:text-base">بث مباشر: مراجعة الرياضيات النهائية</h2>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                    مباشر
                  </span>
                  <span className="text-[10px] text-white/60 font-medium flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {participants} مشاهد
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold backdrop-blur-md border border-white/10">
              <Shield className="w-3 h-3 text-primary-blue" />
              أستاذ موثق
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Video Container */}
        <div className="flex-1 bg-black flex items-center justify-center relative group">
          <div ref={localVideoContainerRef} className="w-full h-full object-cover" />
          
          {/* Mock Video UI */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-primary-blue/20 flex items-center justify-center text-primary-blue mx-auto animate-pulse">
                <Video className="w-12 h-12" />
              </div>
              <p className="text-white/60 text-sm font-medium">جاري الاتصال بالبث المباشر...</p>
            </div>
          </div>

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center gap-4">
                <Button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-12 h-12 rounded-2xl transition-all ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/20 backdrop-blur-md'}`}
                >
                  {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </Button>
                <Button 
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`w-12 h-12 rounded-2xl transition-all ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/20 backdrop-blur-md'}`}
                >
                  {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                </Button>
                <div className="h-8 w-px bg-white/20 mx-2" />
                <Button className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md">
                  <Volume2 className="w-6 h-6" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Button className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md">
                  <Maximize className="w-6 h-6" />
                </Button>
                <Button 
                  onClick={() => navigate('/')}
                  className="px-6 h-12 rounded-2xl bg-red-500 hover:bg-red-600 font-bold flex items-center gap-2 shadow-lg shadow-red-500/20"
                >
                  <PhoneOff className="w-5 h-5" />
                  مغادرة
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <div className="w-full lg:w-96 bg-white flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary-blue" />
            الدردشة المباشرة
          </h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-400">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center gap-2 p-3 bg-primary-blue/5 rounded-xl border border-primary-blue/10">
            <Shield className="w-4 h-4 text-primary-blue" />
            <p className="text-[10px] text-primary-blue font-bold">يرجى الالتزام بقواعد الدردشة المباشرة</p>
          </div>

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900">{msg.user}</span>
                  <span className="text-[10px] text-gray-400">{msg.time}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl rounded-tr-none text-sm text-gray-700 border border-gray-100">
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-6 border-t bg-gray-50/50">
          <div className="flex gap-2">
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="اكتب رسالة..."
              className="h-12 rounded-xl border-gray-200 focus:ring-primary-blue bg-white"
            />
            <Button 
              onClick={handleSendMessage}
              className="w-12 h-12 rounded-xl bg-primary-blue hover:bg-vibrant-blue shadow-lg shadow-primary-blue/20 flex-shrink-0"
            >
              <Heart className="w-5 h-5 fill-current" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
