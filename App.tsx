
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { ContactForm } from './components/ContactForm';
import { ProjectGenerator } from './components/ProjectGenerator';
import { CallToAction } from './components/CallToAction';
import { Blog } from './components/Blog';
import { FreeGifts } from './components/FreeGifts';
import { BlogPage } from './components/BlogPage';
import { BlogPostView } from './components/BlogPostView';
import { LanguageProvider } from './contexts/LanguageContext';
import { DataProvider } from './contexts/DataContext';
import { ServiceItem, BlogPost } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState<ServiceItem[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  
  const [currentView, setCurrentView] = useState<'home' | 'blog' | 'article'>('home');
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

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

  const handleNavigate = (view: 'home' | 'blog') => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleArticleClick = (article: BlogPost) => {
      setSelectedArticle(article);
      setCurrentView('article');
  };

  return (
    <LanguageProvider>
      <DataProvider>
        <div className="min-h-screen transition-colors duration-300 ease-in-out bg-synapse-light dark:bg-synapse-dark selection:bg-synapse-primary selection:text-white">
          <Navbar 
              darkMode={darkMode} 
              toggleTheme={toggleTheme} 
              onNavigate={handleNavigate}
              currentView={currentView}
          />
          
          <main>
            {currentView === 'home' && (
              <>
                <Hero />
                <FreeGifts />
                <About />
                <Portfolio />
                <Services cart={cart} toggleCartItem={toggleCartItem} />
                <Testimonials />
                <CallToAction />
                <Blog />
                <ContactForm cart={cart} removeFromCart={removeFromCart} />
              </>
            )}

            {currentView === 'blog' && (
               <BlogPage 
                  onArticleClick={handleArticleClick}
                  onBack={() => handleNavigate('home')}
               />
            )}

            {currentView === 'article' && selectedArticle && (
                <BlogPostView 
                  post={selectedArticle}
                  onBack={() => handleNavigate('blog')}
                />
            )}
          </main>

          <Footer onOpenAdmin={() => setShowAdmin(true)} />
          
          {showAdmin && <ProjectGenerator onClose={() => setShowAdmin(false)} />}
        </div>
      </DataProvider>
    </LanguageProvider>
  );
}

export default App;
