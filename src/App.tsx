import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { MobileHeader } from './components/MobileHeader';
import { Home } from './pages/Home/Home';

// Lazy or direct import of all 14 modules
import { Modulo01Fundamentos } from './pages/Modulo01Fundamentos/Modulo01Fundamentos';
import { Modulo02Hooks } from './pages/Modulo02Hooks/Modulo02Hooks';
import { Modulo03Composicao } from './pages/Modulo03Composicao/Modulo03Composicao';
import { Modulo04ContextApi } from './pages/Modulo04ContextApi/Modulo04ContextApi';
import { Modulo05Http } from './pages/Modulo05Http/Modulo05Http';
import { Modulo06Formularios } from './pages/Modulo06Formularios/Modulo06Formularios';
import { Modulo07Routing } from './pages/Modulo07Routing/Modulo07Routing';
import { Modulo08Streams } from './pages/Modulo08Streams/Modulo08Streams';
import { Modulo09Zustand } from './pages/Modulo09Zustand/Modulo09Zustand';
import { Modulo10Testes } from './pages/Modulo10Testes/Modulo10Testes';
import { Modulo11Performance } from './pages/Modulo11Performance/Modulo11Performance';
import { Modulo12Patterns } from './pages/Modulo12Patterns/Modulo12Patterns';
import { Modulo13ProjetoFinal } from './pages/Modulo13ProjetoFinal/Modulo13ProjetoFinal';
import { Modulo14Laboratorio } from './pages/Modulo14Laboratorio/Modulo14Laboratorio';

import './App.css';

export const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Mobile Topbar */}
      <MobileHeader
        onToggle={() => setMobileMenuOpen((v) => !v)}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Navigation Sidebar */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Viewport */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modulo-01-fundamentos-react" element={<Modulo01Fundamentos />} />
          <Route path="/modulo-02-hooks-essenciais" element={<Modulo02Hooks />} />
          <Route path="/modulo-03-composicao-hooks" element={<Modulo03Composicao />} />
          <Route path="/modulo-04-context-api" element={<Modulo04ContextApi />} />
          <Route path="/modulo-05-http-fetching" element={<Modulo05Http />} />
          <Route path="/modulo-06-formularios-zod" element={<Modulo06Formularios />} />
          <Route path="/modulo-07-routing-guards" element={<Modulo07Routing />} />
          <Route path="/modulo-08-reatividade-streams" element={<Modulo08Streams />} />
          <Route path="/modulo-09-state-zustand" element={<Modulo09Zustand />} />
          <Route path="/modulo-10-testes-vitest" element={<Modulo10Testes />} />
          <Route path="/modulo-11-performance" element={<Modulo11Performance />} />
          <Route path="/modulo-12-patterns-solid" element={<Modulo12Patterns />} />
          <Route path="/modulo-13-projeto-final" element={<Modulo13ProjetoFinal />} />
          <Route path="/modulo-14-laboratorio" element={<Modulo14Laboratorio />} />
          {/* Catch-all */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
