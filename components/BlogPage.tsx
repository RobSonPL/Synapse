import React from 'react';
import { FadeIn } from './FadeIn';
import { BlogPost } from '../types';
import { useData } from '../contexts/DataContext';

interface BlogPageProps {
  onArticleClick: (article: BlogPost) => void;
  onBack: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onArticleClick, onBack }) => {
  const { blogPosts } = useData();

  return (
    <div className="pt-32 pb-20 bg-slate-50 dark:bg-synapse-dark min-h-screen transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-synapse-primary transition-colors text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Powrót
        </button>

        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
              Synapse <span className="text-transparent bg-clip-text bg-gradient-to-r from-synapse-primary to-synapse-accent">Blog</span>
            </h1>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {blogPosts.map((post, index) => (
            <FadeIn key={post.id} delay={index * 50}>
              <article 
                onClick={() => onArticleClick(post)}
                className="group cursor-pointer h-full bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 hover:shadow-lg transition-all duration-500 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-36 overflow-hidden">
                  <img 
                    src={post.thumbnailUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                </div>
                
                {/* Content */}
                <div className="p-4 flex flex-col flex-grow relative">
                  <div className="text-[9px] font-bold text-synapse-primary mb-1 uppercase tracking-wider">
                    {post.date}
                  </div>
                  
                  <h3 className="text-[14px] font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-synapse-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-white/5">
                    <span className="text-[9px] font-bold text-synapse-primary uppercase tracking-widest">
                      Czytaj
                    </span>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

      </div>
    </div>
  );
};