import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { CreativeSpark } from './components/CreativeSpark';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { ContactForm } from './components/ContactForm';
import { ProjectGenerator } from './components/ProjectGenerator';
import { CallToAction } from './components/CallToAction';
import { Blog } from './components/Blog';
import { FreeGifts } from './components/FreeGifts';
import { LanguageProvider } from './contexts/LanguageContext';
import { ServiceItem } from './types';

function App() {
  // Default to false for Light Mode
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState<ServiceItem[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleCartItem = (item: ServiceItem) => {
    setCart(prev => {
        const exists = prev.find(i => i.id === item.id);
        if (exists) {
            return prev.filter(i => i.id !== item.id);
        } else {
            return [...prev, item];
        }
    });
  };

  const removeFromCart = (item: ServiceItem) => {
     setCart(prev => prev.filter(i => i.id !== item.id));
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen transition-colors duration-300 ease-in-out bg-synapse-light dark:bg-synapse-dark selection:bg-synapse-primary selection:text-white">
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <FreeGifts />
          <About />
          <Portfolio />
          <Services cart={cart} toggleCartItem={toggleCartItem} />
          <Testimonials />
          <CallToAction />
          <CreativeSpark />
          <Blog />
          <ContactForm cart={cart} removeFromCart={removeFromCart} />
        </main>
        <Footer onOpenAdmin={() => setShowAdmin(true)} />
        
        {/* Admin Panel Modal */}
        {showAdmin && <ProjectGenerator onClose={() => setShowAdmin(false)} />}
        
        {/* Vercel Web Analytics */}
        <Analytics />
      </div>
    </LanguageProvider>
  );
}

export default App;