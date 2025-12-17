import React from 'react';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';
import { blogPostsData } from '../data/blogData';

// This is the Home Page "preview" section for the blog
export const Blog: React.FC = () => {
  const { t } = useLanguage();

  // We need to trigger the global navigation to switch to blog view
  // Since this component is deep in the tree and App controls state,
  // we will use a simple href that Navbar intercepts, OR we rely on the button
  // finding the nav context. For simplicity in this architecture, we link to the anchor
  // but clicking "Read" should ideally open the full blog. 
  
  // NOTE: In a real app with React Router, this would be a Link.
  // Here, we'll direct users to the Navbar's "Blog" button essentially by visual cue.

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
          {blogPostsData.slice(0, 3).map((post, index) => (
            <FadeIn key={post.id} delay={index * 100}>
              <div className="group h-full bg-slate-50 dark:bg-white/5 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="relative h-56 overflow-hidden w-full">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-blue-500 shadow-md">
                      ARTYKUŁ
                    </span>
                  </div>
                  <img 
                    src={post.thumbnailUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-sm text-slate-400 mb-2 font-medium">{post.date}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-synapse-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Since we don't have access to onNavigate here easily without prop drilling through App -> Home -> Blog,
                      we will direct user to scroll top or click the main Blog Nav item for now, OR simulate a click on the navbar blog item via ID if desperate.
                      Better approach: Make the button trigger the Navbar 'Blog' click logic via DOM (hacky) or leave as visual preview. 
                      
                      Let's change the button to simply say "See in Blog" and scroll up to Nav? 
                      No, let's use a global event or just accept that clicking this might not open the reader view directly in this architecture without Context.
                      
                      Actually, let's make the button trigger a custom event that App.tsx listens to? No, too complex.
                      
                      Simplest fix: We assume the user clicks "Blog" in the menu to see full articles, 
                      BUT to make this button work, we can make it an anchor that goes to top, and the user navigates.
                      
                      BETTER: I will leave the button to simply act as a visual cue, but users should use the top nav "Blog" to enter the blog mode.
                   */}
                   <button 
                    className="mt-auto inline-flex items-center justify-center w-full px-4 py-3 rounded-xl border-2 border-synapse-primary/20 hover:border-synapse-primary text-synapse-primary hover:bg-synapse-primary hover:text-white transition-all duration-300 font-bold text-sm"
                    onClick={() => {
                        // Find the blog nav item and click it
                        // This is a bit of a hack but avoids massive refactoring
                        const blogNav = Array.from(document.querySelectorAll('nav a')).find(el => el.textContent === 'Blog');
                        if (blogNav) (blogNav as HTMLElement).click();
                    }}
                   >
                     Czytaj na Blogu
                   </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};