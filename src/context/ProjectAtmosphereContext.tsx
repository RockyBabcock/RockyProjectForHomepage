import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export type AtmosphereMood = 'network' | 'spatial' | 'circular' | 'default';

interface ProjectAtmosphereContextValue {
  activeSlug: string;
  atmosphereMood: AtmosphereMood;
  setActiveSlug: (slug: string) => void;
}

const ProjectAtmosphereContext = createContext<ProjectAtmosphereContextValue>({
  activeSlug: 'svg-downloader',
  atmosphereMood: 'network',
  setActiveSlug: () => {},
});

export const ProjectAtmosphereProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeSlug, setActiveSlug] = useState<string>('svg-downloader');
  const location = useLocation();

  // Sync with route if on project detail page
  useEffect(() => {
    if (location.pathname.startsWith('/projects/')) {
      const slug = location.pathname.replace('/projects/', '');
      setActiveSlug(slug);
    }
  }, [location.pathname]);

  const atmosphereMood: AtmosphereMood =
    activeSlug.includes('svg') || activeSlug.includes('asset')
      ? 'network'
      : activeSlug.includes('3d') || activeSlug.includes('rockyhomepage')
      ? 'spatial'
      : activeSlug.includes('ai') || activeSlug.includes('melius')
      ? 'circular'
      : 'default';

  return (
    <ProjectAtmosphereContext.Provider value={{ activeSlug, atmosphereMood, setActiveSlug }}>
      {children}
    </ProjectAtmosphereContext.Provider>
  );
};

export const useProjectAtmosphere = (): ProjectAtmosphereContextValue => {
  return useContext(ProjectAtmosphereContext);
};
