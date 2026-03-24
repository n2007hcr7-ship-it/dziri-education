import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, User, ArrowRight, MessageSquare, Shield, Info } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  senderName: string;
  timestamp: number;
}

export function ChatRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'مرحباً بك في شات الأستاذ محمد! كيف يمكنني مساعدتك اليوم؟', sender: 'other', senderName: 'الأستاذ محمد', timestamp: Date.now() - 100000 },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text: inputText,
      sender: 'me',
      senderName: 'أنا',
      timestamp: Date.now(),
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate teacher response
    setTimeout(() => {
      const teacherResponse: Message = {
        id: Math.random().toString(36).substr(2, 9),
        text: 'شكراً لسؤالك! سأقوم بالرد عليك في أقرب وقت ممكن.',
        sender: 'other',
        senderName: 'الأستاذ محمد',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, teacherResponse]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowRight className="w-5 h-5" />
          </Button>
          <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">شات الأستاذ محمد</h2>
            <p className="text-xs text-green-500 font-bold flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              متصل الآن
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-primary-blue/5 text-primary-blue rounded-full text-xs font-bold">
            <Shield className="w-3 h-3" />
            شات موثق
          </div>
          <Button variant="ghost" size="sm">
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6"
      >
        <div className="text-center">
          <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">اليوم</span>
        </div>
        
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === 'me' ? 'justify-start flex-row-reverse' : 'justify-start'} gap-3`}
            >
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                msg.sender === 'me' ? 'bg-primary-purple text-white' : 'bg-primary-blue text-white'
              }`}>
                {msg.senderName[0]}
              </div>
              <div className={`max-w-[70%] space-y-1 ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'me' 
                    ? 'bg-primary-purple text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                }`}>
                  {msg.text}
                </div>
                <p className="text-[10px] text-gray-400 px-2">
                  {new Date(msg.timestamp).toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4 md:p-6">
        <div className="max-w-4xl mx-auto flex gap-4">
          <div className="flex-1 relative">
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="اكتب رسالتك هنا..."
              className="pr-4 h-14 rounded-2xl border-gray-200 focus:ring-primary-blue"
            />
          </div>
          <Button 
            onClick={handleSendMessage}
            className="w-14 h-14 rounded-2xl bg-primary-blue hover:bg-vibrant-blue shadow-lg shadow-primary-blue/20 flex-shrink-0"
          >
            <Send className="w-6 h-6 rotate-180" />
          </Button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-4">
          هذا الشات مدفوع. يرجى الالتزام بقواعد المنصة في التعامل مع الأساتذة.
        </p>
      </div>
    </div>
  );
}
