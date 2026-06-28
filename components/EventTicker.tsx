import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const EventTicker: React.FC = () => {
  const [targetDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    date.setHours(18, 0, 0, 0);
    return date;
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mt-12 inline-flex flex-col sm:flex-row items-center gap-6 bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-4 sm:p-2 sm:pr-6 rounded-3xl shadow-xl"
    >
      <div className="flex items-center gap-3 bg-gradient-to-r from-synapse-primary to-synapse-accent px-4 py-2 rounded-2xl text-white">
        <Calendar className="w-5 h-5" />
        <span className="font-bold text-sm tracking-wide">Darmowy Webinar AI</span>
      </div>
      
      <div className="flex items-center gap-4 text-slate-800 dark:text-white">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-synapse-primary" />
          <span className="text-xs uppercase tracking-widest opacity-80 font-semibold">Start za:</span>
        </div>
        
        <div className="flex gap-3 font-mono font-bold text-lg">
          <div className="flex flex-col items-center">
            <span>{timeLeft.days.toString().padStart(2, '0')}</span>
            <span className="text-[10px] uppercase opacity-50 font-sans">Dni</span>
          </div>
          <span className="opacity-50">:</span>
          <div className="flex flex-col items-center">
            <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="text-[10px] uppercase opacity-50 font-sans">Godz</span>
          </div>
          <span className="opacity-50">:</span>
          <div className="flex flex-col items-center text-synapse-primary">
            <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="text-[10px] uppercase opacity-50 font-sans text-slate-800 dark:text-white">Min</span>
          </div>
          <span className="opacity-50">:</span>
          <div className="flex flex-col items-center text-synapse-primary">
            <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="text-[10px] uppercase opacity-50 font-sans text-slate-800 dark:text-white">Sek</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
