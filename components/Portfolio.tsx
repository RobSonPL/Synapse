import React from 'react';
import { FadeIn } from './FadeIn';

interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Soul Craft Academy",
    category: "Edukacja & Rozwój",
    imageUrl: "https://picsum.photos/seed/soulcraft/800/600",
    link: "https://soul-craft-academy.lovable.app"
  },
  {
    id: 2,
    title: "Food Cost Manager",
    category: "Gastro & Biznes",
    imageUrl: "https://picsum.photos/seed/foodcost/800/600",
    link: "https://foodcost.lovable.app"
  },
  {
    id: 3,
    title: "Mapa Know-How",
    category: "Zarządzanie Wiedzą",
    imageUrl: "https://picsum.photos/seed/mapa/800/600",
    link: "https://mapa-do-knowhow.lovable.app"
  },
  {
    id: 4,
    title: "Habit Reset Guide",
    category: "Rozwój Osobisty",
    imageUrl: "https://picsum.photos/seed/habit/800/600",
    link: "https://habit-reset-guide.lovable.app"
  },
  {
    id: 5,
    title: "Smart Food Cost",
    category: "Analityka Gastro",
    imageUrl: "https://picsum.photos/seed/smartfood/800/600",
    link: "https://smart-food-cost-e595dd84.base44.app"
  },
  {
    id: 6,
    title: "Powrót Króla",
    category: "Storytelling & Web",
    imageUrl: "https://picsum.photos/seed/king/800/600",
    link: "https://powrot-krola-d4f3e9b4.base44.app"
  },
  {
    id: 7,
    title: "Nowy Start",
    category: "Landing Page",
    imageUrl: "https://picsum.photos/seed/startnew/800/600",
    link: "https://nowy-start-a43a3a55.base44.app"
  }
];

export const Portfolio: React.FC = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 100}>
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative overflow-hidden rounded-2xl shadow-lg cursor-pointer aspect-[4/3] border border-slate-100 dark:border-white/5"
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-synapse-primary text-xs font-bold uppercase tracking-wider mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {project.category}
                  </span>
                  <div className="flex items-center justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-lg">
                      {project.title}
                    </h3>
                    <span className="text-white/80 group-hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
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
