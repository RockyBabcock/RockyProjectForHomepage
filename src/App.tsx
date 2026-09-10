import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CuratorialDrawer } from './components/CuratorialDrawer';
import { CataloguePage } from './pages/CataloguePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

export default function App() {
  const [statementOpen, setStatementOpen] = useState(false);

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-[#F5F4ED] text-[#171717] flex flex-col font-sans paper-grain selection:bg-[#BC9A64]/20 selection:text-[#171717]">
          {/* Navigation */}
          <Navigation onOpenStatement={() => setStatementOpen(true)} />

          {/* Routes */}
          <div className="flex-1">
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

          {/* Footer */}
          <Footer />

          {/* Curatorial Statement Drawer */}
          <CuratorialDrawer
            isOpen={statementOpen}
            onClose={() => setStatementOpen(false)}
          />
        </div>
      </Router>
    </LanguageProvider>
  );
}
