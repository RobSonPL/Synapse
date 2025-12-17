import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { FadeIn } from './FadeIn';
import { ShareIcon, CheckIcon } from './Icons';
import { config } from '../data/config';

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({ post, onBack }) => {
  const [copied, setCopied] = useState(false);

  // Scroll to top when opening article
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  const handleComment = () => {
    // Open email client with pre-filled subject
    const subject = encodeURIComponent(`Komentarz do artykułu: ${post.title}`);
    window.open(`mailto:${config.contactEmail}?subject=${subject}`, '_blank');
  };

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: `Przeczytaj ten artykuł: ${post.title}`,
      url: window.location.href // Note: In a real routing app, this would be specific article URL
    };

    // Use Web Share API if available (Mobile/Supported Browsers)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-synapse-dark min-h-screen transition-colors duration-300">
      
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <img 
          src={post.thumbnailUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-synapse-dark to-transparent opacity-90"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
                <button 
                    onClick={onBack}
                    className="mb-6 flex items-center gap-2 text-slate-700 dark:text-white/80 hover:text-synapse-primary bg-white/50 dark:bg-black/50 backdrop-blur-md px-4 py-2 rounded-full transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Wróć do bloga
                </button>
                <FadeIn>
                    <div className="flex gap-4 text-sm font-semibold text-synapse-primary mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight shadow-sm">
                        {post.title}
                    </h1>
                </FadeIn>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeIn delay={200}>
            {/* Author Info */}
            <div className="flex items-center gap-4 mb-12 border-b border-slate-100 dark:border-white/10 pb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-synapse-primary to-synapse-accent flex items-center justify-center text-white font-bold">
                    {post.author.charAt(0)}
                </div>
                <div>
                    <p className="font-bold text-slate-900 dark:text-white">{post.author}</p>
                    <p className="text-xs text-slate-500 dark:text-gray-400">Autor Synapse Creative</p>
                </div>
            </div>

            {/* Typography Styles for Content */}
            <div 
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-synapse-primary hover:prose-a:text-synapse-accent prose-img:rounded-2xl prose-strong:text-slate-900 dark:prose-strong:text-white"
                dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            {/* Engagement / Footer of Article */}
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Podobało się?</h3>
                <p className="text-slate-600 dark:text-gray-400 mb-6">
                    Jeśli ten artykuł był dla Ciebie wartościowy, udostępnij go lub napisz do mnie, co o nim myślisz!
                </p>
                <div className="flex flex-wrap gap-4">
                     <button 
                        onClick={handleComment}
                        className="px-6 py-3 bg-slate-100 dark:bg-white/10 rounded-xl font-bold text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                     >
                        Skomentuj (Email)
                     </button>
                     <button 
                        onClick={handleShare}
                        className="px-6 py-3 bg-synapse-primary text-white rounded-xl font-bold hover:bg-synapse-accent transition-colors shadow-lg shadow-synapse-primary/30 flex items-center gap-2"
                     >
                        {copied ? <CheckIcon /> : <ShareIcon />}
                        {copied ? 'Link Skopiowany!' : 'Udostępnij'}
                     </button>
                </div>
            </div>
        </FadeIn>
      </div>
    </div>
  );
};