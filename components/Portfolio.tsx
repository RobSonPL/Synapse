import React from 'react';
import { FadeIn } from './FadeIn';
import { useData } from '../contexts/DataContext';

export const Portfolio: React.FC = () => {
  const { projects } = useData();
  // Sort projects by ID descending to show newest first
  const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

  return (
    <section id="portfolio" className="py-24 bg-white dark:bg-slate-900 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
              Wybrane Projekty
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-synapse-primary to-synapse-accent mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Realizacje, które łączą technologię z emocjami. Kliknij, aby zobaczyć projekt na żywo.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sortedProjects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 50}>
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative overflow-hidden rounded-xl shadow-md cursor-pointer aspect-[4/3] border border-slate-100 dark:border-white/5 bg-slate-100 dark:bg-white/5"
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100 object-top"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <span className="text-synapse-primary text-[8px] font-bold uppercase tracking-wider mb-0.5">
                    {project.category}
                  </span>
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-bold text-xs truncate mr-2">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};