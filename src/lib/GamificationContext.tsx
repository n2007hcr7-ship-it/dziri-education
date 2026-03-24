import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { REWARDS } from '../constants';

interface ActiveReward {
  id: string;
  type: string;
  expiresAt: number | null; // timestamp
}

interface GamificationContextType {
  points: number;
  activeRewards: ActiveReward[];
  addPoint: () => void;
  redeemReward: (rewardId: string) => boolean;
  isRewardActive: (rewardType: string) => boolean;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('dziri_points');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [activeRewards, setActiveRewards] = useState<ActiveReward[]>(() => {
    const saved = localStorage.getItem('dziri_rewards');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    // Filter out expired rewards
    return parsed.filter((r: ActiveReward) => !r.expiresAt || r.expiresAt > Date.now());
  });

  useEffect(() => {
    localStorage.setItem('dziri_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('dziri_rewards', JSON.stringify(activeRewards));
  }, [activeRewards]);

  const addPoint = () => {
    setPoints(prev => prev + 1);
    
    // Celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3B82F6', '#8B5CF6', '#FFFFFF']
    });

    // Sound effect (using a standard browser beep or a short audio)
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
    audio.play().catch(() => {}); // Ignore if browser blocks autoplay
  };

  const redeemReward = (rewardKey: string) => {
    const reward = (REWARDS as any)[rewardKey];
    if (!reward || points < reward.cost) return false;

    setPoints(prev => prev - reward.cost);
    
    const newReward: ActiveReward = {
      id: Math.random().toString(36).substr(2, 9),
      type: reward.id,
      expiresAt: reward.duration > 0 ? Date.now() + reward.duration * 24 * 60 * 60 * 1000 : null
    };

    setActiveRewards(prev => [...prev, newReward]);
    return true;
  };

  const isRewardActive = (rewardId: string) => {
    return activeRewards.some(r => r.type === rewardId && (!r.expiresAt || r.expiresAt > Date.now()));
  };

  return (
    <GamificationContext.Provider value={{ points, activeRewards, addPoint, redeemReward, isRewardActive }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}
