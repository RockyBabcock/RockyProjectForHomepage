import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { SurfaceModeProvider, useSurfaceMode } from './context/SurfaceModeContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CuratorialDrawer } from './components/CuratorialDrawer';
import { AtmosphericBackground } from './components/AtmosphericBackground';
import { CommandPalette } from './components/CommandPalette';
import { CataloguePage } from './pages/CataloguePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ArchivePage } from './pages/ArchivePage';
import { ExperimentsPage } from './pages/ExperimentsPage';

function AppContent() {
  const [statementOpen, setStatementOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  // Global keyboard shortcut for Command Palette (Cmd+K, Ctrl+K, or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className={`relative min-h-screen flex flex-col font-sans transition-colors duration-500 selection:bg-[#8B5CF6]/30 selection:text-[#F5F3EF] ${
        isDark ? 'bg-[#030014] text-[#F5F3EF]' : 'bg-[#F5F4ED] text-[#171717]'
      }`}
    >
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
          <AppContent />
        </Router>
      </LanguageProvider>
    </SurfaceModeProvider>
  );
}
