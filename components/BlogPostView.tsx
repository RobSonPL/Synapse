import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { FadeIn } from './FadeIn';
import { ShareIcon, CheckIcon, FacebookIcon, XIcon, LinkedinIcon } from './Icons';

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({ post, onBack }) => {
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', author: 'Kamil', text: 'Niesamowity artykuł! Czekałem na takie podsumowanie o AI w wydawnictwie.', date: '2025-02-23' },
    { id: '2', author: 'Marta', text: 'Czy planujesz warsztaty z obsługi Google Deep Research?', date: '2025-02-24' }
  ]);
  const [newComment, setNewComment] = useState({ author: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to top when opening article
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  const handleShareUniversal = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocial = (platform: 'fb' | 'x' | 'in') => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    
    let shareUrl = '';
    if (platform === 'fb') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (platform === 'x') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    if (platform === 'in') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author || !newComment.text) return;

    setIsSubmitting(true);
    
    // Simulate API lag
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        author: newComment.author,
        text: newComment.text,
        date: new Date().toISOString().split('T')[0]
      };
      
      setComments([comment, ...comments]);
      setNewComment({ author: '', text: '' });
      setIsSubmitting(false);
    }, 600);
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
                    className="mb-6 flex items-center gap-2 text-slate-700 dark:text-white/80 hover:text-synapse-primary bg-white/50 dark:bg-black/50 backdrop-blur-md px-4 py-2 rounded-full transition-all group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
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
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                        {post.title}
                    </h1>
                </FadeIn>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeIn delay={200}>
            {/* Author Info */}
            <div className="flex items-center gap-4 mb-12 border-b border-slate-100 dark:border-white/10 pb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-synapse-primary to-synapse-accent flex items-center justify-center text-white font-bold shadow-lg">
                    {post.author.charAt(0)}
                </div>
                <div>
                    <p className="font-bold text-slate-900 dark:text-white">{post.author}</p>
                    <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-widest font-bold">Synapse Expert</p>
                </div>
            </div>

            {/* Typography Styles for Content */}
            <div 
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-synapse-primary hover:prose-a:text-synapse-accent prose-img:rounded-3xl prose-strong:text-slate-900 dark:prose-strong:text-white mb-20"
                dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            {/* Social Share Bar */}
            <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-3xl border border-slate-200 dark:border-white/10 mb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Podziel się wiedzą</h3>
                        <p className="text-sm text-slate-500">Pomóż innym odkryć przyszłość technologii.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                         <button 
                            onClick={() => shareOnSocial('fb')}
                            className="p-3 bg-white dark:bg-white/10 rounded-2xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                            title="Facebook"
                         >
                            <FacebookIcon />
                         </button>
                         <button 
                            onClick={() => shareOnSocial('x')}
                            className="p-3 bg-white dark:bg-white/10 rounded-2xl text-slate-900 dark:text-white hover:bg-black hover:text-white transition-all shadow-sm"
                            title="X (Twitter)"
                         >
                            <XIcon />
                         </button>
                         <button 
                            onClick={() => shareOnSocial('in')}
                            className="p-3 bg-white dark:bg-white/10 rounded-2xl text-blue-700 hover:bg-blue-700 hover:text-white transition-all shadow-sm"
                            title="LinkedIn"
                         >
                            <LinkedinIcon />
                         </button>
                         <button 
                            onClick={handleShareUniversal}
                            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all shadow-md ${
                                copied ? 'bg-green-500 text-white' : 'bg-synapse-primary text-white hover:bg-synapse-accent'
                            }`}
                         >
                            {copied ? <CheckIcon /> : <ShareIcon />}
                            {copied ? 'Skopiowano!' : 'Kopiuj link'}
                         </button>
                    </div>
                </div>
            </div>

            {/* Interactive Comment Section */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Komentarze ({comments.length})</h3>
                
                {/* Comment Form */}
                <form onSubmit={handleAddComment} className="mb-12 bg-white dark:bg-white/5 p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Twoje Imię</label>
                        <input 
                            type="text" 
                            required
                            value={newComment.author}
                            onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                            placeholder="Jan Kowalski"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-synapse-primary outline-none text-slate-900 dark:text-white transition-all"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Treść komentarza</label>
                        <textarea 
                            required
                            rows={3}
                            value={newComment.text}
                            onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                            placeholder="Napisz co myślisz..."
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-synapse-primary outline-none text-slate-900 dark:text-white transition-all"
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-gradient-to-r from-synapse-primary to-synapse-accent text-white font-bold rounded-xl shadow-lg hover:shadow-synapse-primary/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : 'Opublikuj komentarz'}
                    </button>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                    {comments.map((comment, index) => (
                        <FadeIn key={comment.id} delay={index * 50}>
                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-gray-400 font-bold shrink-0">
                                    {comment.author.charAt(0)}
                                </div>
                                <div className="flex-1 bg-slate-50 dark:bg-white/5 p-5 rounded-2xl rounded-tl-none border border-slate-100 dark:border-white/5">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-bold text-slate-900 dark:text-white">{comment.author}</h4>
                                        <span className="text-xs text-slate-400">{comment.date}</span>
                                    </div>
                                    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {comment.text}
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                    
                    {comments.length === 0 && (
                        <p className="text-center text-slate-500 italic py-10">Bądź pierwszy, który skomentuje!</p>
                    )}
                </div>
            </div>
        </FadeIn>
      </div>
    </div>
  );
};