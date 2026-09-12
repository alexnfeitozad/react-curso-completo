import React, { useState } from 'react';

export const Modulo07Routing: React.FC = () => {
  
  // Simulador de Auth Guard
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'aluno' | 'admin'>('aluno');
  const [attemptedRoute, setAttemptedRoute] = useState('/cursos');
  const [navigationResult, setNavigationResult] = useState<{
    status: 'allowed' | 'redirected';
    target: string;
    message: string;
  } | null>(null);

  // Query Params Simulator
  const [queryParams, setQueryParams] = useState({
    categoria: 'frontend',
    ordenacao: 'relevancia',
    pagina: '1'
  });

  const simulateNavigation = (targetPath: string, requiresAuth: boolean, requiredRole?: 'admin') => {
    setAttemptedRoute(targetPath);

    if (requiresAuth && !isAuthenticated) {
      setNavigationResult({
        status: 'redirected',
        target: `/login?redirect=${encodeURIComponent(targetPath)}`,
        message: '⛔ [Guard Bloqueou] Usuário não autenticado. Redirecionando para tela de Login com URL de retorno.'
      });
      return;
    }

    if (requiredRole === 'admin' && userRole !== 'admin') {
      setNavigationResult({
        status: 'redirected',
        target: '/403-acesso-negado',
        message: '🚫 [Role Guard Bloqueou] Apenas administradores podem acessar esta área.'
      });
      return;
    }

    setNavigationResult({
      status: 'allowed',
      target: targetPath,
      message: `✅ [Guard Autorizou] Navegação para "${targetPath}" concedida com sucesso!`
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 2: Ecossistema Reativo</span>
          <span className="badge badge-neutral">Módulo 07</span>
        </div>
        <h1>Roteamento Avançado & Route Guards</h1>
        <p className="subtitle">
          React Router, Rotas Protegidas, Parâmetros Dinâmicos e Manipulação de Query Strings.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Como implementar Protected Routes no React Router
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Em vez de guards imperativos de configuração, o React Router utiliza <strong>componentes de rota wrappers com <code>&lt;Outlet /&gt;</code></strong> e <code>&lt;Navigate /&gt;</code>.
            </p>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Componente de Rota Protegida (ProtectedRoute.tsx)
          </h3>
          <pre>
            <code>{`import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export const ProtectedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redireciona para login lembrando a página original
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Lab 1: Route Guards Simulator */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              🧭 Laboratório 1: Simulador de Route Guards (Proteção de Rotas)
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Configure o estado de autenticação e tente navegar para diferentes rotas do sistema.
            </p>

            <div className="grid-2">
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Estado de Sessão</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      checked={isAuthenticated}
                      onChange={e => setIsAuthenticated(e.target.checked)}
                    />
                    <span style={{ fontWeight: 600 }}>Usuário Conectado (Autenticado)</span>
                  </label>

                  {isAuthenticated && (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Papel:</span>
                      <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <input
                          type="radio"
                          name="guardRole"
                          checked={userRole === 'aluno'}
                          onChange={() => setUserRole('aluno')}
                        />
                        Aluno
                      </label>
                      <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <input
                          type="radio"
                          name="guardRole"
                          checked={userRole === 'admin'}
                          onChange={() => setUserRole('admin')}
                        />
                        Administrador
                      </label>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button
                    onClick={() => simulateNavigation('/cursos', false)}
                    className="btn btn-secondary btn-sm"
                    style={{ justifyContent: 'flex-start' }}
                  >
                    1. Rota Pública (/cursos)
                  </button>
                  <button
                    onClick={() => simulateNavigation('/painel-aluno', true)}
                    className="btn btn-secondary btn-sm"
                    style={{ justifyContent: 'flex-start' }}
                  >
                    2. Rota Protegida (/painel-aluno)
                  </button>
                  <button
                    onClick={() => simulateNavigation('/admin/deploy', true, 'admin')}
                    className="btn btn-secondary btn-sm"
                    style={{ justifyContent: 'flex-start' }}
                  >
                    3. Rota de Admin (/admin/deploy)
                  </button>
                </div>
              </div>

              <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '0.75rem' }}>
                  📡 Decisão do Router Guard
                </h4>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                  Tentativa de rota: <code>{attemptedRoute}</code>
                </div>

                {navigationResult ? (
                  <div
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: navigationResult.status === 'allowed' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      border: `1px solid ${navigationResult.status === 'allowed' ? '#10b981' : '#ef4444'}`,
                      color: navigationResult.status === 'allowed' ? '#34d399' : '#fca5a5',
                      fontSize: '0.85rem',
                      lineHeight: 1.6
                    }}
                  >
                    <div>{navigationResult.message}</div>
                    <div style={{ marginTop: '0.5rem', fontWeight: 700 }}>
                      Destino final no navegador: <code>{navigationResult.target}</code>
                    </div>
                  </div>
                ) : (
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    Selecione uma rota ao lado para simular o Guard.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Lab 2: Query Params */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              🔍 Laboratório 2: Query Parameters Reativos (useSearchParams)
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Parâmetros de busca na URL permitem que filtros de listagens sejam compartilháveis via link.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <select
                className="input"
                style={{ width: 'auto' }}
                value={queryParams.categoria}
                onChange={e => setQueryParams({ ...queryParams, categoria: e.target.value })}
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="devops">DevOps</option>
              </select>

              <select
                className="input"
                style={{ width: 'auto' }}
                value={queryParams.ordenacao}
                onChange={e => setQueryParams({ ...queryParams, ordenacao: e.target.value })}
              >
                <option value="relevancia">Mais Relevantes</option>
                <option value="recentes">Mais Recentes</option>
                <option value="avaliacoes">Melhores Avaliados</option>
              </select>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <button
                  onClick={() => setQueryParams(p => ({ ...p, pagina: String(Math.max(1, Number(p.pagina) - 1)) }))}
                  className="btn btn-secondary btn-sm"
                >
                  ◀ Anterior
                </button>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Página {queryParams.pagina}</span>
                <button
                  onClick={() => setQueryParams(p => ({ ...p, pagina: String(Number(p.pagina) + 1) }))}
                  className="btn btn-secondary btn-sm"
                >
                  Próxima ▶
                </button>
              </div>
            </div>

            <div style={{ padding: '0.75rem 1rem', background: '#f1f5f9', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#0f172a' }}>
              URL Gerada: <strong>/cursos?categoria={queryParams.categoria}&ordenacao={queryParams.ordenacao}&pagina={queryParams.pagina}</strong>
            </div>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-info">
            <div>
              <strong>Scroll Restoration:</strong> Em SPAs, lembre-se de configurar a restauração de scroll (<code>&lt;ScrollRestoration /&gt;</code>) para que ao mudar de página o topo seja focado automaticamente.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
