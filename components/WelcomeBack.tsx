import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

export const WelcomeBack: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const visits = localStorage.getItem('synapse_visits');
    if (visits) {
      const numVisits = parseInt(visits, 10);
      if (numVisits > 0) {
        setTimeout(() => setShow(true), 3000); // Show after 3 seconds
      }
      localStorage.setItem('synapse_visits', (numVisits + 1).toString());
    } else {
      localStorage.setItem('synapse_visits', '1');
    }
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl rounded-full flex items-center gap-3 w-max max-w-[90vw]"
        >
          <Sparkles className="w-5 h-5 text-synapse-primary" />
          <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
            Witaj ponownie! Fajnie, że do nas wracasz. 👋
          </p>
          <button 
            onClick={() => setShow(false)}
            className="ml-2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
