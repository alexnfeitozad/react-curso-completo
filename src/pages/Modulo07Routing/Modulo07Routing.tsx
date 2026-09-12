import React, { useState } from 'react';

// --- SUB-COMPONENTES DO MINI-ROTEADOR (Simulador) ---

// Telas Fake
const FakeHome = () => (
  <div style={{ padding: '1rem', textAlign: 'center' }}>
    <h3 style={{ fontSize: '1.25rem', color: '#0f172a' }}>🏠 Home Page</h3>
    <p style={{ color: '#475569' }}>Bem-vindo à loja! Explore nossos produtos.</p>
  </div>
);

const FakeProducts = ({ onNavigate }: { onNavigate: (path: string) => void }) => (
  <div style={{ padding: '1rem' }}>
    <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '1rem' }}>🛍️ Produtos</h3>
    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {['101', '102', '103'].map(id => (
        <li key={id}>
          <button onClick={() => onNavigate(`/produtos/${id}`)} className="btn btn-secondary btn-sm">
            Ver Produto {id}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const FakeProductDetail = ({ url }: { url: string }) => {
  // Simulando o comportamento do useParams()
  const id = url.split('/').pop();
  return (
    <div style={{ padding: '1rem', textAlign: 'center', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
      <h3 style={{ fontSize: '1.25rem', color: '#0284c7' }}>📦 Detalhes do Produto</h3>
      <p style={{ color: '#475569', fontSize: '0.9rem' }}>
        Lendo o parâmetro dinâmico da URL (<code>useParams</code>):
      </p>
      <div style={{ fontSize: '3rem', fontWeight: 900, margin: '1rem 0' }}>#{id}</div>
    </div>
  );
};

const FakeDashboard = () => (
  <div style={{ padding: '1rem', textAlign: 'center', background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '8px' }}>
    <h3 style={{ fontSize: '1.25rem', color: '#064e3b' }}>🔐 Dashboard Secreto</h3>
    <p style={{ color: '#047857' }}>Você está autenticado! Bem-vindo à área VIP.</p>
  </div>
);


// --- COMPONENTE PRINCIPAL ---
export const Modulo07Routing: React.FC = () => {
  
  // Estado do Simulador de Navegador
  const [currentUrl, setCurrentUrl] = useState('/');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [history, setHistory] = useState<string[]>(['/']);

  // Mini-motor de Roteamento Imperativo
  const navigate = (path: string) => {
    // Simulando Protected Route (Guarda de Rota)
    if (path === '/dashboard' && !isAuthenticated) {
      alert('Acesso Negado! Redirecionando para Home...');
      navigate('/');
      return;
    }
    
    setCurrentUrl(path);
    setHistory(prev => [...prev, path]);
  };

  // Renderizador baseado na URL
  const renderRoute = () => {
    if (currentUrl === '/') return <FakeHome />;
    if (currentUrl === '/produtos') return <FakeProducts onNavigate={navigate} />;
    if (currentUrl.startsWith('/produtos/')) return <FakeProductDetail url={currentUrl} />;
    if (currentUrl === '/dashboard') return <FakeDashboard />;
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>❌ Erro 404: Página não encontrada</div>;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 2: Intermediário</span>
          <span className="badge badge-neutral">Módulo 07</span>
        </div>
        <h1>Roteamento e SPAs (React Router)</h1>
        <p className="subtitle">
          Construindo Single Page Applications reais: Rotas Dinâmicas, Navegação Imperativa e Proteção de Rotas contra acessos indevidos.
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🚀 1. A Mágica da SPA (Single Page Application)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  No passado (MPA), clicar em um link forçava o navegador a baixar um novo arquivo HTML, causando a clássica "tela branca" de recarregamento.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  No React, construímos <strong>SPAs</strong>. Apenas um HTML é baixado. Quando a URL muda, o React apenas <em>destrói</em> o componente atual e <em>renderiza</em> o novo componente no mesmo lugar, de forma instantânea.
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/e0f2fe/0369a1?text=MPA:+Reload+Total%5Cn%E2%9D%8C%5Cn%5CnSPA+(React):+Troca+de+Componente%5Cn%E2%9C%85%5CnInstant%C3%A2neo!" 
                  alt="Esquema SPA vs MPA" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🔗 2. O Maior Erro: Usar <code>&lt;a href="..."&gt;</code>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Se você usar a tag <code>&lt;a href="/sobre"&gt;</code> padrão do HTML, o navegador fará um <em>Hard Reload</em>, destruindo todo o estado do React (seus fluxos do Redux/Context vão desaparecer!).
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  A regra de ouro é: <strong>Sempre use o componente <code>&lt;Link to="/sobre"&gt;</code> do React Router</strong>. Ele intercepta o clique, impede o reload e apenas muda a URL silenciosamente.
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/fef2f2/991b1b?text=%3Ca+href%3E+Destr%C3%B3i+o+State!%5Cn%5Cn%3CLink+to%3E+Preserva+o+State!" 
                  alt="Aviso sobre Anchor Tags" 
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 3 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🧩 3. Lendo a URL (useParams e useNavigate)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  A biblioteca fornece Hooks vitais. Se sua rota for <code>/produtos/:id</code>, a URL <code>/produtos/42</code> injeta <code>id = 42</code> no componente através do <strong><code>useParams()</code></strong>.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Já o <strong><code>useNavigate()</code></strong> permite mudar de tela via código (Navegação Imperativa), perfeito para redirecionar o usuário após um login de sucesso ou envio de formulário.
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/f0fdf4/166534?text=URL:+/user/99%5Cn%5Cnconst+%7B+id+%7D+=+useParams()%5C%2F%2F+id+===+%2299%22%5Cn%5Cnnavigate('/home')" 
                  alt="Esquema Hooks de Rota" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Como fazer no Código?</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Protegendo uma Rota (Auth Guard)
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Na vida real, não permitimos que usuários visitem URLs exclusivas sem estarem logados. Criamos um "Wrapper" que verifica a sessão e redireciona (Navigate) o impostor!
          </p>
          <pre>
            <code>{`import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isLogged }: { isLogged: boolean }) => {
  // Se não estiver logado, redireciona brutalmente para a tela de Login!
  // O "replace" apaga o histórico, impedindo que o usuário clique em 'Voltar'.
  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, renderiza a rota secreta filha solicitada
  return <Outlet />;
};

// No Roteador:
// <Route element={<ProtectedRoute isLogged={true} />}>
//    <Route path="/admin" element={<PainelAdmin />} />
// </Route>`}</code>
          </pre>
        </div>
      </section>

      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: O Mini-Browser Interno</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-card" style={{ border: '1px solid #bae6fd', padding: 0, overflow: 'hidden' }}>
            
            {/* BARRA DO NAVEGADOR E LOGIN */}
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', background: '#e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              
              {/* Fake URL Bar */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#fff', padding: '0.5rem 1rem', borderRadius: '24px', border: '1px solid #cbd5e1', color: '#64748b', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                <span style={{ marginRight: '0.5rem' }}>🔒 localhost:3000</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>{currentUrl}</span>
              </div>

              {/* Botão de Login Global */}
              <button 
                onClick={() => setIsAuthenticated(!isAuthenticated)}
                className={`btn ${isAuthenticated ? 'btn-danger' : 'btn-primary'}`}
                style={{ padding: '0.5rem 1rem' }}
              >
                {isAuthenticated ? 'Sair (Logout)' : 'Fazer Login (Admin)'}
              </button>
            </div>

            {/* LINKS (Navegação Declarativa) */}
            <div style={{ padding: '1rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '1rem' }}>
              <button onClick={() => navigate('/')} className="btn btn-secondary btn-sm" style={{ border: 'none', background: currentUrl === '/' ? '#e0f2fe' : 'transparent', color: currentUrl === '/' ? '#0369a1' : '#64748b' }}>
                Home
              </button>
              <button onClick={() => navigate('/produtos')} className="btn btn-secondary btn-sm" style={{ border: 'none', background: currentUrl.startsWith('/produtos') ? '#e0f2fe' : 'transparent', color: currentUrl.startsWith('/produtos') ? '#0369a1' : '#64748b' }}>
                Produtos
              </button>
              <button onClick={() => navigate('/dashboard')} className="btn btn-secondary btn-sm" style={{ border: 'none', background: currentUrl === '/dashboard' ? '#ecfdf5' : 'transparent', color: currentUrl === '/dashboard' ? '#047857' : '#64748b' }}>
                Dashboard (Protegido)
              </button>
            </div>

            {/* ÁREA DE RENDERIZAÇÃO DA ROTA */}
            <div style={{ padding: '2.5rem', background: '#fff', minHeight: '250px' }}>
              {renderRoute()}
            </div>

          </div>

          <div className="glass-card" style={{ background: '#0f172a', color: '#38bdf8' }}>
            <h4 style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
              Histórico do React Router (Pilha de Navegação)
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {history.slice(-6).map((path, index) => (
                <span key={index} style={{ padding: '0.25rem 0.5rem', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '4px', fontSize: '0.8rem', opacity: index === history.slice(-6).length - 1 ? 1 : 0.5 }}>
                  {path}
                </span>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '1rem' }}>
              * Mostrando os últimos 6 cliques. No React Router real, o 'Navigate()' empilha URLs no histórico nativo do navegador para o botão 'Voltar' funcionar.
            </p>
          </div>

        </div>
      </section>

      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="alert alert-success">
            <div>
              <strong>O Fim do <code>&lt;Switch&gt;</code>:</strong> Na versão atual do React Router (v6+), nós usamos o componente <code>&lt;Routes&gt;</code>. A engine nova é inteligente o suficiente para aplicar um score e descobrir exatamente qual rota tem a melhor correspondência matemática, sem precisar colocar o atributo `exact` em tudo (como era antigamente).
            </div>
          </div>
          
          <div className="alert alert-warning">
            <div>
              <strong>Layouts com Outlet:</strong> Não copie e cole sua Sidebar e Header em 50 páginas diferentes. Crie uma rota pai chamada <code>&lt;MainLayout&gt;</code> que contém o Header, e no local onde o conteúdo deve aparecer, coloque o componente <code>&lt;Outlet /&gt;</code> do React Router. O Router injetará o componente filho exato na fenda do Outlet!
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
