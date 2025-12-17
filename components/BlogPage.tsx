import React from 'react';
import { FadeIn } from './FadeIn';
import { BlogPost } from '../types';
import { blogPostsData } from '../data/blogData';

interface BlogPageProps {
  onArticleClick: (article: BlogPost) => void;
  onBack: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onArticleClick, onBack }) => {
  return (
    <div className="pt-32 pb-20 bg-slate-50 dark:bg-synapse-dark min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-synapse-primary transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Powrót do strony głównej
        </button>

        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6">
              Synapse <span className="text-transparent bg-clip-text bg-gradient-to-r from-synapse-primary to-synapse-accent">Blog</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-gray-400">
              Wiedza, inspiracja i technologia. Przeczytaj o przyszłości, która dzieje się na naszych oczach.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPostsData.map((post, index) => (
            <FadeIn key={post.id} delay={index * 100}>
              <article 
                onClick={() => onArticleClick(post)}
                className="group cursor-pointer h-full bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                     <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-black/50 backdrop-blur-md">
                        {post.readTime}
                     </span>
                  </div>
                  <img 
                    src={post.thumbnailUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                </div>
                
                {/* Content */}
                <div className="p-8 flex flex-col flex-grow relative">
                  <div className="text-xs font-bold text-synapse-primary mb-3 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-synapse-primary"></span>
                    {post.date}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-synapse-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-white/5">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Autor: {post.author}
                    </span>
                    <span className="text-synapse-primary font-bold text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Czytaj dalej 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
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