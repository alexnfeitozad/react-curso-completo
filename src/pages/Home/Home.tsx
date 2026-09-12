import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { COURSE_MODULES } from '../../data/modules';
import './Home.css';

export const Home: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<'all' | 1 | 2 | 3>('all');

  const stats = [
    { label: 'Módulos Práticos', value: '13', detail: 'Do zero à arquitetura corporativa' },
    { label: 'Testes Automatizados', value: '100%', detail: 'Vitest & Testing Library' },
    { label: 'Pilares de Engenharia', value: '3 Fases', detail: 'Base, Ecossistema & Arquiteto' },
    { label: 'React Moderno', value: 'v19+', detail: 'Hooks, Zustand & Clean Arch' },
  ];

  const phases = [
    {
      id: 1,
      num: '01',
      title: 'A Base dos Componentes',
      subtitle: 'Módulos 01 ao 03',
      icon: '⚛️',
      desc: 'Fundamentos essenciais do React 19: Virtual DOM, JSX sem mágica, props, imutabilidade, ciclo de vida com hooks e composição com compound components.',
      highlights: ['Virtual DOM & Reconciliação', 'Ciclo de vida com useEffect & useRef', 'Compound Components & Custom Hooks'],
    },
    {
      id: 2,
      num: '02',
      title: 'O Ecossistema Reativo',
      subtitle: 'Módulos 04 ao 09',
      icon: '⚡',
      desc: 'O domínio do ecossistema moderno: Context API sem prop-drilling, HTTP resiliente com retry, formulários dinâmicos com Zod, React Router e State Management com Zustand.',
      highlights: ['Context API com seletores', 'Formulários dinâmicos com Zod', 'Store reativa com Zustand'],
    },
    {
      id: 3,
      num: '03',
      title: 'O Nível Arquiteto',
      subtitle: 'Módulos 10 ao 13',
      icon: '🏛️',
      desc: 'Engenharia de software de ponta: testes com Vitest & React Testing Library, profiling e otimização com memo/lazy, padrões SOLID e o Projeto Integrador DevLearn Pro.',
      highlights: ['Vitest & Mocking profissional', 'Otimização com React.memo & Lazy', 'DevLearn Pro SPA Completa'],
    },
  ];

  const filteredModules = useMemo(() => {
    if (selectedPhase === 'all') return COURSE_MODULES;
    return COURSE_MODULES.filter((m) => m.phase === selectedPhase);
  }, [selectedPhase]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="hero-glow-secondary"></div>

        <div className="hero-badge">
          <span className="pulse-dot"></span>
          <span>FORMAÇÃO EM ENGENHARIA FRONTEND • REACT 19</span>
        </div>

        <h1 className="hero-title">
          Do Componente ao <span className="gradient-text">Arquiteto</span>
        </h1>

        <p className="hero-lead">
          Pare de ser apenas um digitador de componentes. Domine a engenharia de software frontend
          completa com React 19: do funcionamento do Virtual DOM à arquitetura corporativa escalável.
        </p>

        {/* CTAs */}
        <div className="hero-actions">
          <Link to="/modulo-01-fundamentos-react" className="btn btn-primary btn-lg">
            <span>🚀 Iniciar Formação (Módulo 01)</span>
          </Link>
          <Link to="/modulo-13-projeto-final" className="btn btn-secondary btn-lg">
            <span>🏆 Ver Projeto Integrador (DevLearn Pro)</span>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-detail">{stat.detail}</span>
            </div>
          ))}
        </div>
      </section>

      {/* The 3 Pillars Section */}
      <section className="pillars-section">
        <div className="section-header">
          <span className="section-tag">A JORNADA DA TRANSFORMAÇÃO</span>
          <h2 className="section-title">As Três Fases da Formação</h2>
          <p className="section-subtitle">
            Uma evolução pedagógica pensada para quem deseja atingir a senioridade técnica com fundamentos sólidos.
          </p>
        </div>

        <div className="pillars-grid">
          {phases.map((phase) => (
            <div key={phase.id} className="pillar-card">
              <div className="pillar-header">
                <div className="pillar-icon-box">
                  <span className="pillar-icon">{phase.icon}</span>
                  <span className="pillar-num">FASE {phase.num}</span>
                </div>
                <span className="pillar-modules-tag">{phase.subtitle}</span>
              </div>

              <h3 className="pillar-title">{phase.title}</h3>
              <p className="pillar-desc">{phase.desc}</p>

              <ul className="pillar-highlights">
                {phase.highlights.map((item, i) => (
                  <li key={i}>
                    <span className="check-icon">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Difference / Market Pitch */}
      <section className="comparison-section">
        <div className="section-header">
          <span className="section-tag">DIFERENCIAL DE MERCADO</span>
          <h2 className="section-title">Por Que Esta Formação é Diferente?</h2>
          <p className="section-subtitle">
            A diferença entre quem apenas copia tutoriais e quem é contratado como engenheiro de software.
          </p>
        </div>

        <div className="comparison-grid">
          <div className="compare-card compare-negative">
            <div className="compare-badge negative">❌ Tutoriais Tradicionais</div>
            <h3>O "Básico de Sempre"</h3>
            <ul className="compare-list">
              <li>Focam só em sintaxe rasa e pequenos exemplos de To-Do list</li>
              <li>Ignoram o funcionamento da reconciliação e custo de re-renders</li>
              <li>Utilizam Redux verboso e ultrapassado ou prop drilling caótico</li>
              <li>Não ensinam testes unitários nem estratégias de mock para frontend</li>
              <li>Zero preocupação com resiliência de rede e Clean Architecture</li>
            </ul>
          </div>

          <div className="compare-card compare-positive">
            <div className="compare-badge positive">🏛️ Do Componente ao Arquiteto</div>
            <h3>Engenharia Frontend Real</h3>
            <ul className="compare-list">
              <li>Domínio profundo de Hooks, Virtual DOM e imutabilidade</li>
              <li>Arquitetura moderna com Zustand, Context API modular e Custom Hooks</li>
              <li>Formulários com validação estrita de schemas e arrays dinâmicos</li>
              <li>Suíte de testes automatizados com Vitest e Testing Library</li>
              <li>Projeto corporativo completo com padrões de projeto e Clean Code</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Modules Explorer */}
      <section className="modules-explorer-section">
        <div className="section-header">
          <span className="section-tag">GRADE CURRICULAR COMPLETA</span>
          <h2 className="section-title">Explore os 13 Módulos</h2>
          <p className="section-subtitle">
            Aulas 100% práticas acompanhadas de laboratórios interativos em tempo real.
          </p>
        </div>

        <div className="phase-filters">
          <button
            className={`filter-tab ${selectedPhase === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedPhase('all')}
          >
            <span>Todos os Módulos ({COURSE_MODULES.length})</span>
          </button>
          <button
            className={`filter-tab ${selectedPhase === 1 ? 'active' : ''}`}
            onClick={() => setSelectedPhase(1)}
          >
            <span>⚛️ Fase 1: Base (01-03)</span>
          </button>
          <button
            className={`filter-tab ${selectedPhase === 2 ? 'active' : ''}`}
            onClick={() => setSelectedPhase(2)}
          >
            <span>⚡ Fase 2: Ecossistema (04-09)</span>
          </button>
          <button
            className={`filter-tab ${selectedPhase === 3 ? 'active' : ''}`}
            onClick={() => setSelectedPhase(3)}
          >
            <span>🏛️ Fase 3: Arquiteto (10-13)</span>
          </button>
        </div>

        <div className="modules-grid">
          {filteredModules.map((mod) => (
            <Link key={mod.id} to={`/${mod.id}`} className="module-card">
              <div className="module-card-top">
                <div className="mod-icon-wrapper">
                  <span className="mod-icon">{mod.icon}</span>
                </div>
                <div className="mod-badge-group">
                  <span className="mod-num-badge">MÓDULO {mod.number}</span>
                  <span className="level-chip" data-level={mod.level}>
                    {mod.level}
                  </span>
                </div>
              </div>

              <div className="mod-phase-sub">{mod.phaseName}</div>
              <h4 className="module-card-title">{mod.title}</h4>
              <p className="module-card-desc">{mod.shortDesc}</p>

              <div className="module-tags">
                {mod.tags.map((tag, i) => (
                  <span key={i} className="mod-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="module-card-footer">
                <span className="card-action-btn">
                  <span>Acessar Aula Prática</span>
                  <span className="arrow-icon">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="final-cta">
        <span className="cta-emoji">⚡</span>
        <h2>Pronto para transformar sua carreira frontend?</h2>
        <p>
          Inicie agora pelo Módulo 01 e descubra como pensar como um verdadeiro Engenheiro de Software especializado em React.
        </p>
        <Link to="/modulo-01-fundamentos-react" className="btn btn-primary btn-lg">
          Começar pelo Módulo 01 (Fundamentos) →
        </Link>
      </section>
    
        
        
        
        
      
</div>
  );
};
