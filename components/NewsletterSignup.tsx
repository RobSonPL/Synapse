import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      
      // Reset status after a few seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto my-12 bg-white dark:bg-slate-800/50 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-synapse-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-synapse-accent/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />
      
      <div className="relative z-10 text-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Bądź na bieżąco! 🚀</h3>
        <p className="text-sm text-slate-600 dark:text-gray-400">
          Zapisz się, by otrzymać moje najnowsze e-booki, kursy i artykuły. Żadnego spamu.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="relative flex items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Twój najlepszy e-mail..."
            disabled={status === 'loading' || status === 'success'}
            className="w-full pl-5 pr-14 py-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-synapse-primary transition-all text-sm disabled:opacity-50"
            required
          />
          <AnimatePresence mode="wait">
            <motion.button
              key={status}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`absolute right-2 p-2.5 rounded-lg text-white shadow-md transition-all ${
                status === 'success' ? 'bg-green-500' : 'bg-gradient-to-r from-synapse-primary to-synapse-accent hover:shadow-lg disabled:opacity-50'
              }`}
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : status === 'success' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
};
