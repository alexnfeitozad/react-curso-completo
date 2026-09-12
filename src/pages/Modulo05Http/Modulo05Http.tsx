import React, { useState } from 'react';

interface Post {
  id: number;
  title: string;
  category: string;
  status: 'published' | 'draft';
}

const MOCK_POSTS: Post[] = [
  { id: 1, title: 'Dominando o Virtual DOM no React 19', category: 'Engenharia', status: 'published' },
  { id: 2, title: 'Por que parar de usar useEffect para dados derivados', category: 'Performance', status: 'published' },
  { id: 3, title: 'Arquitetura Limpa e Padrão Strategy no Frontend', category: 'Arquitetura', status: 'draft' }
];

export const Modulo05Http: React.FC = () => {
  
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [simulateError, setSimulateError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [networkLogs, setNetworkLogs] = useState<string[]>([]);

  const fetchWithRetry = async (shouldFail: boolean) => {
    setIsLoading(true);
    setRetryCount(0);
    const maxRetries = 3;

    setNetworkLogs(prev => [`[HTTP] Iniciando GET /api/posts...`, ...prev]);

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      setRetryCount(attempt);
      setNetworkLogs(prev => [`[HTTP] Tentativa ${attempt} de ${maxRetries}...`, ...prev]);

      // Delay de rede simulado
      await new Promise(r => setTimeout(r, 600));

      if (shouldFail) {
        setNetworkLogs(prev => [
          `[HTTP Erro 503] Falha na tentativa ${attempt}: Servidor indisponível.`,
          ...prev
        ]);
        if (attempt === maxRetries) {
          setNetworkLogs(prev => [
            `⚠️ [Fallback Ativado] Retries esgotados. Carregando dados do Cache Mock local.`,
            ...prev
          ]);
          setPosts(MOCK_POSTS);
          setIsLoading(false);
          return;
        }
        // Espera com backoff
        await new Promise(r => setTimeout(r, 400 * attempt));
      } else {
        setNetworkLogs(prev => [
          `✅ [HTTP 200 OK] Resposta recebida com sucesso! ${MOCK_POSTS.length} itens sincronizados.`,
          ...prev
        ]);
        setPosts(MOCK_POSTS);
        setIsLoading(false);
        return;
      }
    }
  };

  const handleAddNewPost = () => {
    const newPost: Post = {
      id: Date.now(),
      title: `Artigo Técnico #${posts.length + 1} criado via POST`,
      category: 'Inovação',
      status: 'published'
    };
    setPosts(prev => [newPost, ...prev]);
    setNetworkLogs(prev => [`[HTTP 201 Created] Novo post registrado via POST /api/posts.`, ...prev]);
  };

  const handleDelete = (id: number) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    setNetworkLogs(prev => [`[HTTP 204 No Content] Post #${id} deletado via DELETE.`, ...prev]);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 2: Ecossistema Reativo</span>
          <span className="badge badge-neutral">Módulo 05</span>
        </div>
        <h1>HTTP, Data Fetching & Resiliência</h1>
        <p className="subtitle">
          Operações CRUD, lógica de Retry com Backoff, tratamento de erros e Mock Fallback.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              O Padrão Circuit Breaker & Retry Exponencial
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Aplicações corporativas não devem quebrar quando a conexão cai por um segundo. A estratégia ideal implementa:
            </p>
            <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>Tentativa inicial:</strong> requisição rápida ao servidor.</li>
              <li><strong>Retry com Backoff Exponencial:</strong> esperar 1s, depois 2s, depois 4s para não sobrecarregar o backend em recuperação.</li>
              <li><strong>Graceful Degradation / Mock Fallback:</strong> exibir dados cacheados ou amigáveis avisando o usuário sobre a instabilidade.</li>
            </ol>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Função Resiliente de Fetch com AbortController
          </h3>
          <pre>
            <code>{`export async function fetchWithTimeout(url: string, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) throw new Error(\`Erro HTTP \${response.status}\`);
    return await response.json();
  } catch (err: any) {
    clearTimeout(id);
    if (err.name === 'AbortError') {
      throw new Error('Tempo limite da requisição esgotado (Timeout)');
    }
    throw err;
  }
}`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              🌐 Laboratório de Resiliência HTTP & Retry Automático
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Simule conexões instáveis de internet. Em caso de queda ou erro 500, o cliente tenta 3 vezes com backoff antes de alternar automaticamente para o fallback local seguro.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={simulateError}
                  onChange={e => setSimulateError(e.target.checked)}
                />
                <span style={{ fontWeight: 600, color: simulateError ? '#dc2626' : '#475569' }}>
                  Simular Falha de Conexão (503 Service Unavailable)
                </span>
              </label>

              <button
                onClick={() => fetchWithRetry(simulateError)}
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? `Buscando (Tentativa ${retryCount}/3)...` : 'Executar GET /api/posts'}
              </button>

              <button onClick={handleAddNewPost} className="btn btn-secondary">
                + Novo Post (POST)
              </button>
            </div>

            <div className="grid-2">
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Artigos Carregados ({posts.length})</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {posts.map(p => (
                    <div
                      key={p.id}
                      style={{
                        padding: '0.75rem 1rem',
                        background: '#ffffff',
                        border: '1px solid var(--neutral-200)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>{p.title}</div>
                        <span className="badge badge-primary" style={{ fontSize: '0.68rem', marginTop: '0.2rem' }}>{p.category}</span>
                      </div>
                      <button onClick={() => handleDelete(p.id)} className="btn btn-danger btn-sm">Excluir</button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                  📡 Terminal de Tráfego de Rede (Logs)
                </h4>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  {networkLogs.length === 0 ? (
                    <span style={{ color: '#64748b' }}>Clique em "Executar GET" para iniciar...</span>
                  ) : (
                    networkLogs.map((log, i) => (
                      <span key={i} style={{ color: log.includes('✅') ? '#4ade80' : log.includes('⚠️') ? '#fbbf24' : log.includes('Erro') ? '#f87171' : '#cbd5e1' }}>
                        {log}
                      </span>
                    ))
                  )}
                </div>
              </div>
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
              <strong>Cancelamento com AbortController:</strong> Se o usuário sai da página antes da requisição terminar, aborte o fetch no cleanup do <code>useEffect</code> para economizar recursos e evitar tentar atualizar componentes desmontados.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
