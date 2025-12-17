import React from 'react';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';
import { BlogPost } from '../types';

// Mock data - in real app could come from a CMS or JSON file
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Rewolucja 2026: Jak AI Zmienia Self-Publishing w Złoto?',
    date: '2025-12-17',
    excerpt: 'Rok 2026 to najlepszy moment w historii, by zostać niezależnym autorem. AI staje się Twoim ghostwriterem, redaktorem i marketingowcem. Zobacz mapę drogową do sukcesu.',
    type: 'article',
    fileUrl: '#', // TODO: Add link to full article/PDF
    thumbnailUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Google Deep Research: Koniec ery nudnych PDF-ów!',
    date: '2025-02-22',
    excerpt: 'Twoje narzędzie do walki z chaosem informacyjnym. Wyobraź sobie analityka, który czyta tysiące stron w sekundę i podaje Ci na tacy tylko to, co ważne.',
    type: 'article',
    fileUrl: '#', // TODO: Add link to full article/PDF
    thumbnailUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'AI: Twój Cyfrowy Ratownik czy Emocjonalna Pułapka?',
    date: '2025-02-20',
    excerpt: 'Psychologia relacji z chatbotami. Czy to rewolucja w dbaniu o zdrowie psychiczne, czy niebezpieczny substytut bliskości? Analiza efektu Elizy 2.0.',
    type: 'article',
    fileUrl: '#', // TODO: Add link to full article/PDF
    thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export const Blog: React.FC = () => {
  const { t } = useLanguage();

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
          {blogPosts.map((post, index) => (
            <FadeIn key={post.id} delay={index * 100}>
              <div className="group h-full bg-slate-50 dark:bg-white/5 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                      post.type === 'pdf' ? 'bg-red-500' : post.type === 'presentation' ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {post.type.toUpperCase()}
                    </span>
                  </div>
                  <img 
                    src={post.thumbnailUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
                </div>
                
                <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                  <div className="text-sm text-slate-400 mb-2">{post.date}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <a 
                    href={post.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg border border-synapse-primary text-synapse-primary hover:bg-synapse-primary hover:text-white transition-colors duration-300 font-medium"
                  >
                    {post.type === 'pdf' ? (
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                    {t.blog.read}
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};