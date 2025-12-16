import React, { useState } from 'react';
import { XMarkIcon, CheckIcon } from './Icons';
import { projectsData } from '../data/projectsData';

interface ProjectGeneratorProps {
  onClose: () => void;
}

export const ProjectGenerator: React.FC<ProjectGeneratorProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    link: ''
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const previewUrl = getMshotsUrl(formData.link);
  const nextId = Math.max(...projectsData.map(p => p.id), 0) + 1;

  // Generate the actual code string
  const generatedCode = `  {
    id: ${nextId},
    title: "${formData.title}",
    category: "${formData.category}",
    imageUrl: "${previewUrl}",
    link: "${formData.link}"
  },`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50 dark:bg-white/5">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-synapse-primary">⚡</span> Generator Projektów
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors text-slate-500">
            <XMarkIcon />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-500/30">
            Ponieważ strona nie posiada bazy danych, ten panel pomoże Ci wygenerować kod. 
            Wypełnij dane, skopiuj wynik i wklej go na koniec listy w pliku <code>data/projectsData.ts</code>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Tytuł Projektu</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="np. Nowa Strona Firmowa"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-300 dark:border-white/10 focus:ring-2 focus:ring-synapse-primary outline-none text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Kategoria</label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="np. Web Design"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-300 dark:border-white/10 focus:ring-2 focus:ring-synapse-primary outline-none text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Link do strony</label>
                <input
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-300 dark:border-white/10 focus:ring-2 focus:ring-synapse-primary outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="bg-slate-100 dark:bg-black/40 rounded-xl border border-slate-200 dark:border-white/5 p-2 flex flex-col items-center justify-center min-h-[200px]">
              {formData.link ? (
                <>
                  <p className="text-xs text-slate-400 mb-2">Podgląd Miniatury (Automatyczny)</p>
                  <img src={previewUrl} alt="Preview" className="rounded-lg shadow-md w-full object-cover aspect-[4/3]" />
                </>
              ) : (
                <p className="text-slate-400 text-sm">Wpisz link, aby zobaczyć podgląd</p>
              )}
            </div>
          </div>

          {/* Code Output */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Wygenerowany Kod</label>
            <pre className="bg-slate-900 text-green-400 p-4 rounded-xl text-sm overflow-x-auto font-mono border border-slate-700">
              {generatedCode}
            </pre>
            <button
              onClick={handleCopy}
              className={`absolute top-8 right-2 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                copied ? 'bg-green-500 text-white' : 'bg-white text-slate-900 hover:bg-slate-200'
              }`}
            >
              {copied ? <CheckIcon /> : 'Kopiuj'}
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 text-right">
             <button onClick={onClose} className="px-4 py-2 text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-white mr-2">Anuluj</button>
             <button onClick={handleCopy} className="px-6 py-2 bg-synapse-primary text-white rounded-lg font-bold hover:bg-synapse-accent transition-colors">
                Kopiuj Kod
             </button>
        </div>
      </div>
    </div>
  );
};