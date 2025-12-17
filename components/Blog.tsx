import React from 'react';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';

export const Blog: React.FC = () => {
  const { t } = useLanguage();
  const { blogPosts } = useData();

  const handleNavigateToBlog = () => {
    const blogNav = Array.from(document.querySelectorAll('nav a')).find(el => el.textContent?.includes('Blog'));
    if (blogNav) (blogNav as HTMLElement).click();
  };

  return (
    <section id="blog" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
              {t.blog.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-synapse-primary to-synapse-accent mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              {t.blog.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post, index) => (
            <FadeIn key={post.id} delay={index * 100}>
              <div 
                onClick={handleNavigateToBlog}
                className="group relative h-[450px] overflow-hidden rounded-3xl shadow-lg border border-slate-100 dark:border-white/5 bg-slate-100 dark:bg-white/5 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-synapse-primary/20"
              >
                {/* Background Image */}
                <img 
                  src={post.thumbnailUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Immersive Overlay - Portfolio Style */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-synapse-primary bg-synapse-primary/10 border border-synapse-primary/20 mb-4">
                      {post.date}
                    </span>
                    <h3 className="text-2xl font-black text-white mb-3 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-synapse-primary font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                      <span>Czytaj dalej</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Badge top-right */}
                <div className="absolute top-6 right-6">
                   <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black text-white uppercase tracking-widest shadow-xl">
                      {post.readTime}
                   </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <div className="mt-16 text-center">
            <button 
              onClick={handleNavigateToBlog}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs hover:border-synapse-primary hover:text-synapse-primary hover:bg-synapse-primary/5 transition-all duration-300 active:scale-95"
            >
              <span>Zobacz wszystkie artykuły</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};