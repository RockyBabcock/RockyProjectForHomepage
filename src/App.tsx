import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { SurfaceModeProvider, useSurfaceMode } from './context/SurfaceModeContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CuratorialDrawer } from './components/CuratorialDrawer';
import { AtmosphericBackground } from './components/AtmosphericBackground';
import { CataloguePage } from './pages/CataloguePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

function AppContent() {
  const [statementOpen, setStatementOpen] = useState(false);
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  return (
    <div
      className={`relative min-h-screen flex flex-col font-sans transition-colors duration-500 selection:bg-[#8B5CF6]/30 selection:text-[#F5F3EF] ${
        isDark ? 'bg-[#030014] text-[#F5F3EF]' : 'bg-[#F5F4ED] text-[#171717]'
      }`}
    >
      {/* 5-Layer Atmospheric Cinematic Background */}
      <AtmosphericBackground />

      {/* Navigation with Studio Switcher & Mode Toggle */}
      <Navigation onOpenStatement={() => setStatementOpen(true)} />

      {/* Main Routed Content */}
      <div className="flex-1 relative z-10">
        <Routes>
          <Route
            path="/"
            element={<CataloguePage onOpenStatement={() => setStatementOpen(true)} />}
          />
          <Route
            path="/projects"
            element={<CataloguePage onOpenStatement={() => setStatementOpen(true)} />}
          />
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
