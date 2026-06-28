import React, { useState, useEffect } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50 pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-synapse-primary to-synapse-accent origin-left"
        style={{ transform: `scaleX(${scrollProgress || 0})`, transition: 'transform 0.1s ease-out' }}
      />
    </div>
  );
};
