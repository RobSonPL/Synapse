
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { CallToAction } from './components/CallToAction';
import { Blog } from './components/Blog';
import { FreeGifts } from './components/FreeGifts';
import { ScrollProgress } from './components/ScrollProgress';
import { FAQ } from './components/FAQ';
import { BeforeAfter } from './components/BeforeAfter';
import { LanguageProvider } from './contexts/LanguageContext';
import { DataProvider } from './contexts/DataContext';
import { ServiceItem, BlogPost } from './types';

// Lazy load heavy interactive widgets & secondary views for ultra-fast initial load
const NeuralPlayground2030 = lazy(() => import('./components/NeuralPlayground2030').then(m => ({ default: m.NeuralPlayground2030 })));
const BusinessQuiz = lazy(() => import('./components/BusinessQuiz').then(m => ({ default: m.BusinessQuiz })));
const ROICalculator = lazy(() => import('./components/ROICalculator').then(m => ({ default: m.ROICalculator })));
const ContactForm = lazy(() => import('./components/ContactForm').then(m => ({ default: m.ContactForm })));
const LiveChat = lazy(() => import('./components/LiveChat').then(m => ({ default: m.LiveChat })));
const RecentActivity = lazy(() => import('./components/RecentActivity').then(m => ({ default: m.RecentActivity })));
const BlogPage = lazy(() => import('./components/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostView = lazy(() => import('./components/BlogPostView').then(m => ({ default: m.BlogPostView })));
const ProjectGenerator = lazy(() => import('./components/ProjectGenerator').then(m => ({ default: m.ProjectGenerator })));

const ComponentLoader = () => (
  <div className="w-full py-12 flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
  </div>
);

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
                  <Suspense fallback={<ComponentLoader />}>
                    <NeuralPlayground2030 />
                  </Suspense>
                  <FreeGifts />
                  <About />
                  <BeforeAfter />
                  <Portfolio />
                  <Services cart={cart} toggleCartItem={toggleCartItem} />
                  <Suspense fallback={<ComponentLoader />}>
                    <BusinessQuiz />
                    <ROICalculator />
                  </Suspense>
                  <FAQ />
                  <Testimonials />
                  <CallToAction />
                  <Blog />
                  <Suspense fallback={<ComponentLoader />}>
                    <ContactForm cart={cart} removeFromCart={removeFromCart} />
                  </Suspense>
                </>
              )}

              {currentView === 'blog' && (
                 <Suspense fallback={<ComponentLoader />}>
                   <Helmet>
                     <title>Blog - Synapse Creative | Najnowsze trendy w AI i marketingu</title>
                     <meta name="description" content="Czytaj nasze najnowsze artykuły na temat sztucznej inteligencji, storytellingu, automatyzacji biznesu i tworzenia nowoczesnych stron internetowych." />
                   </Helmet>
                   <BlogPage 
                      onArticleClick={handleArticleClick}
                      onBack={() => handleNavigate('home')}
                   />
                 </Suspense>
              )}

              {currentView === 'article' && selectedArticle && (
                  <Suspense fallback={<ComponentLoader />}>
                    <Helmet>
                      <title>{selectedArticle.title} | Synapse Creative</title>
                      <meta name="description" content={selectedArticle.excerpt} />
                    </Helmet>
                    <BlogPostView 
                      post={selectedArticle}
                      onBack={() => handleNavigate('blog')}
                    />
                  </Suspense>
              )}
            </main>

            <Footer onOpenAdmin={() => setShowAdmin(true)} />
            <Suspense fallback={null}>
              <RecentActivity />
              <LiveChat />
              {showAdmin && <ProjectGenerator onClose={() => setShowAdmin(false)} />}
            </Suspense>
          </div>
        </DataProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
