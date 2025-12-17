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
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {blogPosts.slice(0, 5).map((post, index) => (
            <FadeIn key={post.id} delay={index * 50}>
              <div 
                onClick={handleNavigateToBlog}
                className="group relative h-[260px] overflow-hidden rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 bg-slate-100 dark:bg-white/5 cursor-pointer transition-all duration-500 hover:shadow-lg hover:shadow-synapse-primary/20"
              >
                {/* Background Image */}
                <img 
                  src={post.thumbnailUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Immersive Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="inline-block text-[8px] font-black uppercase tracking-[0.2em] text-synapse-primary mb-1">
                      {post.date}
                    </span>
                    <h3 className="text-[15px] font-black text-white mb-2 leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-synapse-primary font-black text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Czytaj</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Badge top-right */}
                <div className="absolute top-3 right-3">
                   <div className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-[8px] font-black text-white uppercase tracking-widest">
                      {post.readTime}
                   </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <div className="mt-12 text-center">
            <button 
              onClick={handleNavigateToBlog}
              className="inline-flex items-center gap-3 px-8 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black uppercase tracking-widest text-[10px] hover:border-synapse-primary hover:text-synapse-primary transition-all duration-300"
            >
              <span>Zobacz wszystkie artykuły</span>
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};