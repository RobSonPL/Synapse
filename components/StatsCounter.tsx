import React, { useState, useEffect, useRef } from 'react';

interface StatProps {
  end: number;
  label: string;
  suffix?: string;
  duration?: number;
}

const StatItem: React.FC<StatProps> = ({ end, label, suffix = "+", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeOutExpo = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(end * easeOutExpo));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-synapse-primary to-synapse-accent mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm font-semibold text-slate-600 dark:text-gray-400 uppercase tracking-wider text-center">
        {label}
      </div>
    </div>
  );
};

export const StatsCounter: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16 px-4">
      <StatItem end={45} label="Zakończonych Projektów" />
      <StatItem end={30} label="Zadowolonych Klientów" />
      <StatItem end={15} label="Stworzonych Kursów & E-booków" />
    </div>
  );
};
