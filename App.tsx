
import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
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
import { NeuralPlayground2030 } from './components/NeuralPlayground2030';
import { BlogPage } from './components/BlogPage';
import { BlogPostView } from './components/BlogPostView';
import { ScrollProgress } from './components/ScrollProgress';
import { ROICalculator } from './components/ROICalculator';
import { FAQ } from './components/FAQ';
import { BusinessQuiz } from './components/BusinessQuiz';
import { BeforeAfter } from './components/BeforeAfter';
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
    <HelmetProvider>
      <LanguageProvider>
        <DataProvider>
          <div className="min-h-screen transition-colors duration-300 ease-in-out bg-synapse-light dark:bg-synapse-dark selection:bg-synapse-primary selection:text-white">
            <ScrollProgress />
            <Navbar 
                darkMode={darkMode} 
                toggleTheme={toggleTheme} 
                onNavigate={handleNavigate}
                currentView={currentView}
            />
            
            <main>
              {currentView === 'home' && (
                <>
                  <Helmet>
                    <title>Synapse Creative | Agencja AI & Wydawnictwo Cyfrowe</title>
                    <meta name="description" content="Nowoczesna agencja wdrażająca automatyzacje AI i tworząca profesjonalne strony WWW z zaawansowanym storytellingiem dla Twojej firmy." />
                  </Helmet>
                  <Hero />
                  <NeuralPlayground2030 />
                  <FreeGifts />
                  <About />
                  <BeforeAfter />
                  <Portfolio />
                  <Services cart={cart} toggleCartItem={toggleCartItem} />
                  <BusinessQuiz />
                  <ROICalculator />
                  <FAQ />
                  <Testimonials />
                  <CallToAction />
                  <Blog />
                  <ContactForm cart={cart} removeFromCart={removeFromCart} />
                </>
              )}

              {currentView === 'blog' && (
                 <>
                   <Helmet>
                     <title>Blog - Synapse Creative | Najnowsze trendy w AI i marketingu</title>
                     <meta name="description" content="Czytaj nasze najnowsze artykuły na temat sztucznej inteligencji, storytellingu, automatyzacji biznesu i tworzenia nowoczesnych stron internetowych." />
                   </Helmet>
                   <BlogPage 
                      onArticleClick={handleArticleClick}
                      onBack={() => handleNavigate('home')}
                   />
                 </>
              )}

              {currentView === 'article' && selectedArticle && (
                  <>
                    <Helmet>
                      <title>{selectedArticle.title} | Synapse Creative</title>
                      <meta name="description" content={selectedArticle.excerpt} />
                    </Helmet>
                    <BlogPostView 
                      post={selectedArticle}
                      onBack={() => handleNavigate('blog')}
                    />
                  </>
              )}
            </main>

            <Footer onOpenAdmin={() => setShowAdmin(true)} />
            
            {showAdmin && <ProjectGenerator onClose={() => setShowAdmin(false)} />}
          </div>
        </DataProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
