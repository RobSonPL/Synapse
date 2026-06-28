import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, Calendar, Sparkles } from 'lucide-react';

const activities = [
  { icon: ShoppingBag, text: 'Anna z Warszawy kupiła e-book "Sekrety wydawania..."', time: '2 minuty temu' },
  { icon: Calendar, text: 'Piotr właśnie umówił darmową konsultację AI', time: '5 minut temu' },
  { icon: Eye, text: 'Osoba z Krakowa przegląda ofertę automatyzacji', time: 'Właśnie teraz' },
  { icon: Sparkles, text: 'Kasia z Poznania wygenerowała projekt wyceny', time: '12 minut temu' },
  { icon: ShoppingBag, text: 'Jan z Gdańska dodał kurs "Automatyzacja firmy" do koszyka', time: '1 godzinę temu' },
];

export const RecentActivity: React.FC = () => {
  const [currentActivity, setCurrentActivity] = useState<number | null>(null);

  useEffect(() => {
    const showNotification = () => {
      // Pick a random activity
      const randomIndex = Math.floor(Math.random() * activities.length);
      setCurrentActivity(randomIndex);

      // Hide after 5 seconds
      setTimeout(() => {
        setCurrentActivity(null);
      }, 5000);
    };

    // Initial delay before first notification
    const initialDelay = setTimeout(() => {
      showNotification();
      
      // Then show one every 20 to 45 seconds
      const interval = setInterval(() => {
        showNotification();
      }, Math.floor(Math.random() * 25000) + 20000);

      return () => clearInterval(interval);
    }, 10000);

    return () => clearTimeout(initialDelay);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none">
      <AnimatePresence>
        {currentActivity !== null && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl rounded-2xl p-4 flex items-center gap-4 max-w-sm pointer-events-auto"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-synapse-primary to-synapse-accent flex items-center justify-center shrink-0">
              {React.createElement(activities[currentActivity].icon, { className: "w-5 h-5 text-white" })}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-gray-200 leading-tight">
                {activities[currentActivity].text}
              </p>
              <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                {activities[currentActivity].time}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
