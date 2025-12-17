import React, { useState } from 'react';
import { XMarkIcon, CheckIcon } from './Icons';
import { useData } from '../contexts/DataContext';
import { BlogPost } from '../types';

interface ProjectGeneratorProps {
  onClose: () => void;
}

type GeneratorMode = 'project' | 'blog';

export const ProjectGenerator: React.FC<ProjectGeneratorProps> = ({ onClose }) => {
  const { projects, addProject, addBlogPost } = useData();
  const [mode, setMode] = useState<GeneratorMode>('project');
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Project State
  const [projectData, setProjectData] = useState({
    title: '',
    category: '',
    link: ''
  });

  // Blog State
  const [blogData, setBlogData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    readTime: '5 min czytania',
    author: 'R | H',
    thumbnailUrl: '',
    pdfContent: '' // For pasting PDF text
  });

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleBlogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const getMshotsUrl = (url: string) => {
    if (!url) return '';
    try {
        const encoded = encodeURIComponent(url);
        return `https://s.wordpress.com/mshots/v1/${encoded}?w=800&h=600`;
    } catch (e) {
        return '';
    }
  };

  const insertImageTag = () => {
    const imgTag = `\n\n<img src="https://placehold.co/800x400" alt="Opis zdjęcia" class="w-full rounded-2xl my-8 shadow-lg" />\n\n`;
    setBlogData(prev => ({
        ...prev,
        pdfContent: prev.pdfContent + imgTag
    }));
  };

  // Generate Project Data for UI
  const projectPreviewUrl = getMshotsUrl(projectData.link);
  const nextProjectId = Math.max(...projects.map(p => p.id), 0) + 1;

  const generatedProjectCode = `  {
    id: ${nextProjectId},
    title: "${projectData.title}",
    category: "${projectData.category}",
    imageUrl: "${projectPreviewUrl}",
    link: "${projectData.link}"
  },`;

  const formatContent = (text: string) => {
      if (!text) return '';
      return text.split('\n\n').map(block => {
          const trimmed = block.trim();
          if (!trimmed) return '';
          if (trimmed.startsWith('<')) return trimmed;
          return `<p>${trimmed}</p>`;
      }).join('\n      ');
  };

  const formattedBody = formatContent(blogData.pdfContent);

  const generatedBlogCode = `  {
    id: '${Date.now()}',
    title: "${blogData.title}",
    date: "${blogData.date}",
    readTime: "${blogData.readTime}",
    excerpt: "${blogData.excerpt}",
    type: "article",
    thumbnailUrl: "${blogData.thumbnailUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}",
    author: "${blogData.author}",
    content: \`
      ${formattedBody}
    \`
  },`;

  const codeToCopy = mode === 'project' ? generatedProjectCode : generatedBlogCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToApp = () => {
    if (mode === 'project') {
      if (!projectData.title || !projectData.link) return;
      addProject({
        title: projectData.title,
        category: projectData.category || 'Portfolio',
        imageUrl: projectPreviewUrl,
        link: projectData.link
      });
    } else {
      if (!blogData.title || !blogData.pdfContent) return;
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        title: blogData.title,
        date: blogData.date,
        readTime: blogData.readTime,
        excerpt: blogData.excerpt,
        type: 'article',
        thumbnailUrl: blogData.thumbnailUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        author: blogData.author,
        content: formattedBody
      };
      addBlogPost(newPost);
    }

    setIsSaved(true);
    handleCopy(); // Also copy code to clipboard as requested
    
    // Auto close after brief success message
    setTimeout(() => {
        onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50 dark:bg-white/5">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-synapse-primary">⚡</span> Panel Administratora
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors text-slate-500">
            <XMarkIcon />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-white/10">
            <button 
                className={`flex-1 py-3 font-semibold text-sm transition-colors ${mode === 'project' ? 'bg-synapse-primary/10 text-synapse-primary border-b-2 border-synapse-primary' : 'text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white'}`}
                onClick={() => setMode('project')}
            >
                Nowy Projekt
            </button>
            <button 
                className={`flex-1 py-3 font-semibold text-sm transition-colors ${mode === 'blog' ? 'bg-synapse-primary/10 text-synapse-primary border-b-2 border-synapse-primary' : 'text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white'}`}
                onClick={() => setMode('blog')}
            >
                Nowy Post
            </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-500/30">
            {mode === 'project' 
                ? "Wypełnij dane i kliknij 'Zapisz Projekt'. Nowa realizacja pojawi się natychmiast w galerii i zostanie zapisana w pamięci przeglądarki."
                : "Wklej tekst posta. Kliknij 'Zapisz Post', aby dodać go do bloga. Użyj przycisku 'Wstaw Obrazek', aby dodać grafikę."
            }
          </p>

          {mode === 'project' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Tytuł Projektu</label>
                    <input
                      name="title"
                      value={projectData.title}
                      onChange={handleProjectChange}
                      placeholder="np. Nowa Strona Firmowa"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-300 dark:border-white/10 focus:ring-2 focus:ring-synapse-primary outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Kategoria</label>
                    <input
                      name="category"
                      value={projectData.category}
                      onChange={handleProjectChange}
                      placeholder="np. Web Design"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-300 dark:border-white/10 focus:ring-2 focus:ring-synapse-primary outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Link do strony</label>
                    <input
                      name="link"
                      value={projectData.link}
                      onChange={handleProjectChange}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-300 dark:border-white/10 focus:ring-2 focus:ring-synapse-primary outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="bg-slate-100 dark:bg-black/40 rounded-xl border border-slate-200 dark:border-white/5 p-2 flex flex-col items-center justify-center min-h-[200px]">
                  {projectData.link ? (
                    <>
                      <p className="text-xs text-slate-400 mb-2">Podgląd Miniatury (Automatyczny)</p>
                      <img src={projectPreviewUrl} alt="Preview" className="rounded-lg shadow-md w-full object-cover aspect-[4/3]" />
                    </>
                  ) : (
                    <p className="text-slate-400 text-sm">Wpisz link, aby zobaczyć podgląd</p>
                  )}
                </div>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Tytuł Posta</label>
                        <input
                            name="title"
                            value={blogData.title}
                            onChange={handleBlogChange}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-300 dark:border-white/10 focus:ring-2 focus:ring-synapse-primary outline-none text-slate-900 dark:text-white"
                        />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Data</label>
                            <input
                                type="date"
                                name="date"
                                value={blogData.date}
                                onChange={handleBlogChange}
                                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-300 dark:border-white/10 focus:ring-2 focus:ring-synapse-primary outline-none text-slate-900 dark:text-white"
                            />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Czas czytania</label>
                             <input
                                name="readTime"
                                value={blogData.readTime}
                                onChange={handleBlogChange}
                                placeholder="5 min"
                                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-300 dark:border-white/10 focus:ring-2 focus:ring-synapse-primary outline-none text-slate-900 dark:text-white"
                            />
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Link do miniatury</label>
                        <input
                            name="thumbnailUrl"
                            value={blogData.thumbnailUrl}
                            onChange={handleBlogChange}
                            placeholder="https://images.unsplash.com..."
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-300 dark:border-white/10 focus:ring-2 focus:ring-synapse-primary outline-none text-slate-900 dark:text-white"
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Krótki opis (Lead)</label>
                        <textarea
                            name="excerpt"
                            value={blogData.excerpt}
                            onChange={handleBlogChange}
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-300 dark:border-white/10 focus:ring-2 focus:ring-synapse-primary outline-none text-slate-900 dark:text-white"
                        ></textarea>
                     </div>
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1 flex justify-between items-center">
                        <span>Treść Artykułu (Wklej tekst)</span>
                        <button 
                            onClick={insertImageTag}
                            className="text-xs bg-synapse-primary/10 hover:bg-synapse-primary text-synapse-primary hover:text-white px-2 py-1 rounded transition-colors"
                        >
                            + Wstaw Obrazek (HTML)
                        </button>
                    </label>
                    <textarea
                        name="pdfContent"
                        value={blogData.pdfContent}
                        onChange={handleBlogChange}
                        placeholder="Wklej tutaj tekst..."
                        className="w-full h-[400px] px-3 py-2 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-300 dark:border-white/10 focus:ring-2 focus:ring-synapse-primary outline-none text-slate-900 dark:text-white font-mono text-xs"
                    ></textarea>
                </div>
              </div>
          )}

          <div className="relative border-t border-slate-200 dark:border-white/10 pt-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Kod do zapisu stałego (opcjonalnie)</label>
            <pre className="bg-slate-900 text-green-400 p-4 rounded-xl text-sm overflow-x-auto font-mono border border-slate-700 max-h-32">
              {codeToCopy}
            </pre>
            <button
              onClick={handleCopy}
              className={`absolute top-12 right-2 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                copied ? 'bg-green-500 text-white' : 'bg-white text-slate-900 hover:bg-slate-200'
              }`}
            >
              {copied ? <CheckIcon /> : 'Kopiuj Kod'}
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 text-right flex justify-end items-center gap-2">
             <button onClick={onClose} className="px-4 py-2 text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-white">Anuluj</button>
             
             <button 
                onClick={handleSaveToApp} 
                disabled={isSaved}
                className={`px-6 py-2 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all flex items-center gap-2 ${
                    isSaved ? 'bg-green-600 text-white' : 'bg-gradient-to-r from-synapse-primary to-synapse-accent text-white hover:shadow-synapse-primary/30'
                }`}
             >
                {isSaved ? <CheckIcon /> : <span className="text-xl">💾</span>}
                {isSaved ? "Dodano!" : mode === 'project' ? "Zapisz Projekt" : "Zapisz Post"}
             </button>
        </div>
      </div>
    </div>
  );
};