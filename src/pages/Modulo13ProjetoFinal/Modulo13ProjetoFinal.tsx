import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';

export interface CursoItem {
  id: number;
  titulo: string;
  categoria: 'Frontend' | 'Backend' | 'DevOps' | 'Mobile';
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado';
  horas: number;
  avaliacao: number;
  alunosInscritos: number;
  inscrito: boolean;
  concluido: boolean;
}

const INITIAL_COURSES: CursoItem[] = [
  {
    id: 1,
    titulo: 'React 19: Arquitetura Enterprise, Hooks & Zustand',
    categoria: 'Frontend',
    nivel: 'Avançado',
    horas: 50,
    avaliacao: 4.9,
    alunosInscritos: 1480,
    inscrito: true,
    concluido: false
  },
  {
    id: 2,
    titulo: 'TypeScript Avançado, Generics e Padrões GoF',
    categoria: 'Frontend',
    nivel: 'Intermediário',
    horas: 30,
    avaliacao: 4.8,
    alunosInscritos: 950,
    inscrito: true,
    concluido: true
  },
  {
    id: 3,
    titulo: 'Node.js, Express, Clean Arch e Microservices',
    categoria: 'Backend',
    nivel: 'Avançado',
    horas: 60,
    avaliacao: 4.9,
    alunosInscritos: 720,
    inscrito: false,
    concluido: false
  },
  {
    id: 4,
    titulo: 'CI/CD com GitHub Actions, Docker e Kubernetes',
    categoria: 'DevOps',
    nivel: 'Iniciante',
    horas: 25,
    avaliacao: 4.7,
    alunosInscritos: 1150,
    inscrito: false,
    concluido: false
  },
  {
    id: 5,
    titulo: 'React Native & Expo: Apps Mobile Corporativos',
    categoria: 'Mobile',
    nivel: 'Intermediário',
    horas: 42,
    avaliacao: 4.8,
    alunosInscritos: 810,
    inscrito: false,
    concluido: false
  }
];

export const Modulo13ProjetoFinal: React.FC = () => {
  const [cursos, setCursos] = useState<CursoItem[]>(INITIAL_COURSES);

  // Filtros
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [apenasInscritos, setApenasInscritos] = useState(false);

  // Toast e Modal
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  // Formulário do Modal
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaCategoria, setNovaCategoria] = useState<'Frontend' | 'Backend' | 'DevOps' | 'Mobile'>('Frontend');
  const [novoNivel, setNovoNivel] = useState<'Iniciante' | 'Intermediário' | 'Avançado'>('Intermediário');
  const [novasHoras, setNovasHoras] = useState(30);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // KPIs Derivados (Computed)
  const kpis = useMemo(() => {
    const total = cursos.length;
    const inscritos = cursos.filter(c => c.inscrito).length;
    const concluidos = cursos.filter(c => c.concluido).length;
    const horasEstudo = cursos.filter(c => c.inscrito).reduce((acc, c) => acc + c.horas, 0);
    const progresso = inscritos > 0 ? Math.round((concluidos / inscritos) * 100) : 0;

    return { total, inscritos, concluidos, horasEstudo, progresso };
  }, [cursos]);

  // Cursos Filtrados
  const cursosFiltrados = useMemo(() => {
    return cursos.filter(curso => {
      const matchBusca = curso.titulo.toLowerCase().includes(termoBusca.toLowerCase().trim());
      const matchCategoria = categoriaFiltro === 'Todas' || curso.categoria === categoriaFiltro;
      const matchInscrito = !apenasInscritos || curso.inscrito;
      return matchBusca && matchCategoria && matchInscrito;
    });
  }, [cursos, termoBusca, categoriaFiltro, apenasInscritos]);

  const toggleInscricao = (id: number) => {
    setCursos(prev =>
      prev.map(c => {
        if (c.id === id) {
          const novoStatus = !c.inscrito;
          if (novoStatus) {
            confetti({ particleCount: 60, spread: 60 });
            showToast(`🎉 Matrícula confirmada no curso: "${c.titulo}"`);
          } else {
            showToast(`Inscrição cancelada no curso: "${c.titulo}"`);
          }
          return {
            ...c,
            inscrito: novoStatus,
            alunosInscritos: novoStatus ? c.alunosInscritos + 1 : c.alunosInscritos - 1,
            concluido: novoStatus ? c.concluido : false
          };
        }
        return c;
      })
    );
  };

  const toggleConclusao = (id: number) => {
    setCursos(prev =>
      prev.map(c => {
        if (c.id === id) {
          const novoStatus = !c.concluido;
          if (novoStatus) {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
            showToast(`🏆 Parabéns! Você concluiu o curso "${c.titulo}"!`);
          }
          return { ...c, concluido: novoStatus };
        }
        return c;
      })
    );
  };

  const handleCriarCurso = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoTitulo.trim()) return;

    const novoCurso: CursoItem = {
      id: Date.now(),
      titulo: novoTitulo.trim(),
      categoria: novaCategoria,
      nivel: novoNivel,
      horas: novasHoras,
      avaliacao: 5.0,
      alunosInscritos: 1,
      inscrito: true,
      concluido: false
    };

    setCursos(prev => [novoCurso, ...prev]);
    setModalAberto(false);
    setNovoTitulo('');
    confetti({ particleCount: 50, spread: 50 });
    showToast(`✨ Novo curso "${novoCurso.titulo}" publicado com sucesso!`);
  };

  return (
    <div className="page-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 9999,
            background: '#0f172a',
            color: '#ffffff',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.9rem',
            fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {toastMessage}
        </div>
      )}

      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 3: Nível Arquiteto</span>
          <span className="badge badge-warning">Módulo 13 • Projeto Integrador</span>
        </div>
        <h1>DevLearn Pro | Portal Integrador Enterprise</h1>
        <p className="subtitle">
          Aplicação SPA completa em React 19 unindo Hooks, Reatividade, Formulários, KPIs, Modais e Toasts.
        </p>
      </div>

      {/* KPI Dashboard */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <span className="stat-value">{kpis.total}</span>
          <span className="stat-label">Cursos Disponíveis</span>
          <span className="stat-detail">Catálogo corporativo</span>
        </div>
        <div className="stat-card">
          <span className="stat-value" style={{ color: '#0284c7' }}>{kpis.inscritos}</span>
          <span className="stat-label">Minhas Matrículas</span>
          <span className="stat-detail">Cursos em andamento</span>
        </div>
        <div className="stat-card">
          <span className="stat-value" style={{ color: '#16a34a' }}>{kpis.concluidos}</span>
          <span className="stat-label">Cursos Concluídos</span>
          <span className="stat-detail">Certificados emitidos</span>
        </div>
        <div className="stat-card">
          <span className="stat-value" style={{ color: '#8b5cf6' }}>{kpis.progresso}%</span>
          <span className="stat-label">Taxa de Conclusão</span>
          <span className="stat-detail">{kpis.horasEstudo} horas de carga horária</span>
        </div>
      </div>

      {/* Barra de Filtros & Ações */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '260px' }}>
            <input
              type="text"
              className="input"
              placeholder="Buscar curso por título ou tecnologia..."
              value={termoBusca}
              onChange={e => setTermoBusca(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <select
              className="input"
              style={{ width: 'auto' }}
              value={categoriaFiltro}
              onChange={e => setCategoriaFiltro(e.target.value)}
            >
              <option value="Todas">Todas as Categorias</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="DevOps">DevOps</option>
              <option value="Mobile">Mobile</option>
            </select>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', cursor: 'pointer', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={apenasInscritos}
                onChange={e => setApenasInscritos(e.target.checked)}
              />
              Apenas Meus Cursos
            </label>

            <button onClick={() => setModalAberto(true)} className="btn btn-primary">
              + Cadastrar Curso
            </button>
          </div>
        </div>
      </div>

      {/* Grid de Cursos */}
      <div className="modules-grid">
        {cursosFiltrados.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#64748b' }}>
            Nenhum curso encontrado com os filtros selecionados.
          </div>
        ) : (
          cursosFiltrados.map(curso => (
            <div key={curso.id} className="module-card" style={{ cursor: 'default' }}>
              <div className="module-card-top">
                <span className="badge badge-primary">{curso.categoria}</span>
                <span className="level-chip" data-level={curso.nivel}>{curso.nivel}</span>
              </div>

              <h4 className="module-card-title">{curso.titulo}</h4>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
                <span>⏱️ {curso.horas}h</span>
                <span>⭐ {curso.avaliacao}</span>
                <span>👥 {curso.alunosInscritos.toLocaleString()} alunos</span>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => toggleInscricao(curso.id)}
                    className={`btn btn-sm ${curso.inscrito ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ flex: 1 }}
                  >
                    {curso.inscrito ? 'Cancelar Matrícula' : 'Matricular-se'}
                  </button>

                  {curso.inscrito && (
                    <button
                      onClick={() => toggleConclusao(curso.id)}
                      className={`btn btn-sm ${curso.concluido ? 'btn-success' : 'btn-secondary'}`}
                    >
                      {curso.concluido ? '✓ Concluído' : 'Marcar Concluído'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Cadastro */}
      {modalAberto && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '1rem'
          }}
          onClick={() => setModalAberto(false)}
        >
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '520px', background: '#ffffff' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                Cadastrar Novo Curso no DevLearn Pro
              </h3>
              <button
                onClick={() => setModalAberto(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#94a3b8' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCriarCurso} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Título do Curso:
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Ex: GraphQL com Apollo e React 19"
                  value={novoTitulo}
                  onChange={e => setNovoTitulo(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Categoria:
                  </label>
                  <select
                    className="input"
                    value={novaCategoria}
                    onChange={e => setNovaCategoria(e.target.value as any)}
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Nível:
                  </label>
                  <select
                    className="input"
                    value={novoNivel}
                    onChange={e => setNovoNivel(e.target.value as any)}
                  >
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Carga Horária (Horas):
                </label>
                <input
                  type="number"
                  className="input"
                  value={novasHoras}
                  onChange={e => setNovasHoras(Number(e.target.value))}
                  min="5"
                  max="200"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setModalAberto(false)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Publicar Curso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    
        
        
        
        
      
</div>
  );
};
