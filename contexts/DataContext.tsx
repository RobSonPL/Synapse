import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, BlogPost } from '../types';
import { projectsData as initialProjects } from '../data/projectsData';
import { blogPostsData as initialPosts } from '../data/blogData';

interface DataContextType {
  projects: Project[];
  blogPosts: BlogPost[];
  addProject: (project: Omit<Project, 'id'>) => void;
  addBlogPost: (post: BlogPost) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialPosts);

  // Load from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('synapse_projects');
    const savedPosts = localStorage.getItem('synapse_posts');

    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        // Merge initial with saved, avoiding duplicates by ID
        const merged = [...initialProjects];
        parsed.forEach((p: Project) => {
          if (!merged.find(m => m.id === p.id)) merged.push(p);
        });
        setProjects(merged);
      } catch (e) { console.error("Error parsing projects", e); }
    }

    if (savedPosts) {
      try {
        const parsed = JSON.parse(savedPosts);
        const merged = [...initialPosts];
        parsed.forEach((p: BlogPost) => {
          if (!merged.find(m => m.id === p.id)) merged.push(p);
        });
        setBlogPosts(merged);
      } catch (e) { console.error("Error parsing posts", e); }
    }
  }, []);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newId = Math.max(...projects.map(p => p.id), 0) + 1;
    const fullProject = { ...project, id: newId };
    const updated = [fullProject, ...projects];
    setProjects(updated);
    
    // Save only the delta/new items to local storage to avoid bloat, 
    // but for simplicity here we save all non-initial ones
    const customOnes = updated.filter(p => !initialProjects.find(ip => ip.id === p.id));
    localStorage.setItem('synapse_projects', JSON.stringify(customOnes));
  };

  const addBlogPost = (post: BlogPost) => {
    const updated = [post, ...blogPosts];
    setBlogPosts(updated);
    const customOnes = updated.filter(p => !initialPosts.find(ip => ip.id === p.id));
    localStorage.setItem('synapse_posts', JSON.stringify(customOnes));
  };

  return (
    <DataContext.Provider value={{ projects, blogPosts, addProject, addBlogPost }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};