import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SurfaceMode = 'light' | 'dark';

interface SurfaceModeContextValue {
  mode: SurfaceMode;
  toggleMode: () => void;
  setMode: (mode: SurfaceMode) => void;
}

const STORAGE_KEY = 'rocky_surface_mode';

const SurfaceModeContext = createContext<SurfaceModeContextValue | undefined>(undefined);

export const SurfaceModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<SurfaceMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SurfaceMode;
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      // ignore
    }
    // Default to light mode (warm editorial paper) as primary Projects presentation
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
      document.body.style.backgroundColor = '#030014';
      document.body.style.color = '#F5F3EF';
    } else {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
      document.body.style.backgroundColor = '#F5F4ED';
      document.body.style.color = '#171717';
    }

    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore
    }
  }, [mode]);

  const toggleMode = () => {
    setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setMode = (newMode: SurfaceMode) => {
    setModeState(newMode);
  };

  return (
    <SurfaceModeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </SurfaceModeContext.Provider>
  );
};

export const useSurfaceMode = (): SurfaceModeContextValue => {
  const context = useContext(SurfaceModeContext);
  if (!context) {
    throw new Error('useSurfaceMode must be used within a SurfaceModeProvider');
  }
  return context;
};
