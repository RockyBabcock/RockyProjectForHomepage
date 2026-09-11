import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { SurfaceModeProvider, useSurfaceMode } from './context/SurfaceModeContext';
import { ProjectAtmosphereProvider } from './context/ProjectAtmosphereContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CuratorialDrawer } from './components/CuratorialDrawer';
import { AtmosphericBackground } from './components/AtmosphericBackground';
import { CommandPalette } from './components/CommandPalette';
import { CustomCursor } from './components/CustomCursor';
import { CinematicPreloader } from './components/CinematicPreloader';
import { ProjectSequenceNavigator } from './components/ProjectSequenceNavigator';
import { GridOverlay } from './components/TechnicalGraphics';
import { CataloguePage } from './pages/CataloguePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ArchivePage } from './pages/ArchivePage';
import { ExperimentsPage } from './pages/ExperimentsPage';

function AppContent() {
  const [statementOpen, setStatementOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [preloaderActive, setPreloaderActive] = useState(() => {
    // Only show preloader on first session visit
    try {
      return !sessionStorage.getItem('hasSeenIntro_v2');
    } catch {
      return true;
    }
  });

  const { mode, toggleMode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const handlePreloaderComplete = () => {
    setPreloaderActive(false);
    try {
      sessionStorage.setItem('hasSeenIntro_v2', 'true');
    } catch {
      // ignore
    }
  };

  // Global keyboard shortcuts (Cmd+K, /, G, T)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName);
      if (isInput) return;

      // Cmd+K or Ctrl+K or / -> Command Palette
      if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') || e.key === '/') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      // G -> Toggle Architect Grid
      else if (e.key.toLowerCase() === 'g') {
        e.preventDefault();
        setGridVisible((prev) => !prev);
      }
      // T -> Toggle Theme
      else if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggleMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleMode]);

  return (
    <div
      className={`relative min-h-screen flex flex-col font-sans transition-colors duration-500 selection:bg-[#8B5CF6]/30 selection:text-[#F5F3EF] ${
        isDark ? 'bg-[#030014] text-[#F5F3EF]' : 'bg-[#F5F4ED] text-[#171717]'
      }`}
    >
      {/* Cinematic Intro Sequence (First load) */}
      {preloaderActive && (
        <CinematicPreloader onComplete={handlePreloaderComplete} />
      )}

      {/* High-Precision Contextual Desktop Cursor */}
      <CustomCursor />

      {/* Architectural 12-Column Design Grid (Toggleable via G key) */}
      <GridOverlay isVisible={gridVisible} onClose={() => setGridVisible(false)} />

      {/* 5-Layer Atmospheric Cinematic Background */}
      <AtmosphericBackground />

      {/* Navigation with Studio Switcher & Mode Toggle */}
      <Navigation
        onOpenStatement={() => setStatementOpen(true)}
        onOpenCommand={() => setCommandPaletteOpen(true)}
      />

      {/* Main Routed Content */}
      <div className="flex-1 relative z-10">
        <Routes>
          <Route
            path="/"
            element={<CataloguePage onOpenStatement={() => setStatementOpen(true)} />}
          />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/projects" element={<ArchivePage />} />
          <Route path="/experiments" element={<ExperimentsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Persistent Floating Project Sequence Navigator */}
      <ProjectSequenceNavigator
        onToggleGrid={() => setGridVisible((prev) => !prev)}
        onOpenCommand={() => setCommandPaletteOpen(true)}
      />

      {/* Studio Ecosystem Footer */}
      <Footer />

      {/* About Rocky & Studio Notes Drawer */}
      <CuratorialDrawer
        isOpen={statementOpen}
        onClose={() => setStatementOpen(false)}
      />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <SurfaceModeProvider>
      <LanguageProvider>
        <Router>
          <ProjectAtmosphereProvider>
            <AppContent />
          </ProjectAtmosphereProvider>
        </Router>
      </LanguageProvider>
    </SurfaceModeProvider>
  );
}
