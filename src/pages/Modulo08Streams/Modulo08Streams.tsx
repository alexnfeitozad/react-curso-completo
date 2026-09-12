import React, { useState, useEffect, Suspense, lazy } from 'react';

// --- SIMULADORES PARA O LABORATÓRIO ---

// 1. Fake WebSocket Service (Preços de Ações)
const useFakeWebSocket = (symbol: string) => {
  const [price, setPrice] = useState(100.00);
  const [isConnected, setIsConnected] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    // Simula a conexão
    setIsConnected(true);
    
    // Simula mensagens chegando do servidor a cada 1.5s
    const interval = setInterval(() => {
      setPrice(prev => {
        // Flutuação aleatória entre -2.00 e +2.00
        const change = (Math.random() * 4) - 2;
        const newPrice = Number((prev + change).toFixed(2));
        
        setHistory(h => {
          const newH = [...h, newPrice];
          if (newH.length > 10) newH.shift(); // Mantém apenas os últimos 10 valores
          return newH;
        });
        
        return newPrice;
      });
    }, 1500);

    // Cleanup: Desconecta o Socket ao fechar
    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, [symbol]);

  return { price, isConnected, history };
};


// 2. Fake Componente Pesado (Para testar o Suspense)
// Normalmente você usaria o lazy() do React: const HeavyWidget = lazy(() => import('./HeavyWidget'));
// Mas aqui simularemos a promessa para rodar no mesmo arquivo de forma didática.
const HeavyWidgetContent = () => {
  return (
    <div style={{ padding: '1.5rem', background: '#f0fdf4', border: '1px solid #22c55e', borderRadius: '8px' }}>
      <h4 style={{ color: '#166534', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>✅</span> Componente Pesado Carregado (Chunking)
      </h4>
      <p style={{ color: '#15803d', fontSize: '0.9rem', marginTop: '0.5rem' }}>
        Este bloco chegou do servidor "atrasado", mas o resto da tela não precisou esperar por ele para renderizar!
      </p>
    </div>
  );
};

// Simulador de Lazy Loading manual
let fakeHeavyPromise: Promise<any> | null = null;
const suspenseCache = new Map();

const SuspenseSimulator = ({ id }: { id: string }) => {
  if (!suspenseCache.has(id)) {
    suspenseCache.set(id, new Promise((resolve) => {
      setTimeout(() => {
        suspenseCache.set(id, 'LOADED');
        resolve(true);
      }, 3000); // 3 Segundos de atraso
    }));
  }

  const status = suspenseCache.get(id);
  if (status !== 'LOADED') {
    throw status; // Essa exceção (que é uma Promessa) é capturada pelo <Suspense> do React!
  }

  return <HeavyWidgetContent />;
};



// --- COMPONENTE PRINCIPAL ---
export const Modulo08Streams: React.FC = () => {
  // Controle para resetar o simulador de Suspense
  const [suspenseKey, setSuspenseKey] = useState(0);

  // Consumindo nosso Fake WebSocket
  const { price, isConnected, history } = useFakeWebSocket('PETR4');
  const isPriceUp = history.length >= 2 && price >= history[history.length - 2];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 3: Avançado</span>
          <span className="badge badge-neutral">Módulo 08</span>
        </div>
        <h1>Streams, WebSockets e Suspense</h1>
        <p className="subtitle">
          Abandonando a era de "esperar tudo carregar". Dados em Tempo Real e Interfaces de Usuário fragmentadas (Streaming UI).
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🔄 1. WebSockets vs Polling (Tempo Real de Verdade)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  No Fetch tradicional (HTTP), o cliente sempre tem que <em>perguntar</em>: "Tem mensagem nova?". Se quisermos um Chat ao vivo, teríamos que fazer um Fetch a cada segundo (isso se chama <strong>Polling</strong>, e destrói o servidor).
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Com <strong>WebSockets</strong> ou <strong>Server-Sent Events (SSE)</strong>, abrimos um "tubo direto". O Servidor avisa o React ativamente: "Toma aqui o dado novo", disparando re-renders instantâneos.
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/e0f2fe/0369a1?text=HTTP+Polling:%5CnC:+Tem+dado?+S:+N%C3%A3o%5CnC:+Tem+dado?+S:+N%C3%A3o%5Cn%5CnWebSocket:%5CnS:+Toma+um+dado!%5CnS:+Toma+outro!" 
                  alt="WebSockets vs HTTP Polling" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🧩 2. React Suspense (Streaming de UI)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  A partir do React 18, não precisamos mostrar uma "Tela Branca" ou um "Super Spinner" que bloqueia a página toda enquanto um componente pesado ou dados de API carregam.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Envelopamos áreas críticas com <code>&lt;Suspense fallback=&#123;&lt;Loading/&gt;&#125;&gt;</code>. O React renderiza 90% da página instantaneamente, exibe um "esqueleto" apenas na área pendente, e a substitui pelo componente final quando ele estiver pronto (como mágica!).
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/fef2f2/991b1b?text=Sem+Suspense:%5Cn(Tela+Branca+Total)%5Cn%5CnCom+Suspense:%5CnHeader+(Pronto)%5CnSidebar+(Pronto)%5CnTabela+(Skeleton+Loading...)" 
                  alt="Esquema do React Suspense" 
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
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
            Protegendo Blocos com Suspense
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Você pode ter múltiplos blocos independentes carregando em paralelo. Se um falhar ou demorar, o outro não é afetado.
          </p>
          <pre>
            <code>{`import { Suspense, lazy } from 'react';

// O código deste componente só será baixado se o usuário acessar essa tela!
const GraficoGigante = lazy(() => import('./components/GraficoGigante'));

export function Dashboard() {
  return (
    <div>
      <Navbar /> {/* Renderiza na hora */}
      
      <Suspense fallback={<div className="spinner">Carregando o Gráfico...</div>}>
        <GraficoGigante /> {/* Mostra o Spinner e tenta renderizar quando a promessa terminar */}
      </Suspense>
      
      <Footer /> {/* Renderiza na hora */}
    </div>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: O Laboratório de Tempo Real</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="grid-2">
            
            {/* Lab 1: WebSockets */}
            <div className="glass-card" style={{ border: '1px solid #cbd5e1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                  📈 Stream de Ações (WebSocket)
                </h3>
                <span className="badge" style={{ background: isConnected ? '#10b981' : '#ef4444', color: '#fff' }}>
                  {isConnected ? '🟢 SOCKET OPEN' : '🔴 CLOSED'}
                </span>
              </div>
              
              <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>TICKER: PETR4</p>
                <div style={{ 
                  fontSize: '3.5rem', 
                  fontWeight: 900, 
                  color: isPriceUp ? '#10b981' : '#ef4444',
                  transition: 'color 0.3s ease'
                }}>
                  R$ {price.toFixed(2)}
                </div>
                <p style={{ color: isPriceUp ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                  {isPriceUp ? '▲ Em alta' : '▼ Em baixa'}
                </p>
              </div>

              {/* Histórico Visual */}
              <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'flex-end', height: '60px', background: '#f8fafc', padding: '0.5rem', borderRadius: '4px' }}>
                {history.map((val, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      flex: 1, 
                      background: val >= (history[i-1] || val) ? '#34d399' : '#f87171',
                      height: `${(val / 110) * 100}%`,
                      minHeight: '4px',
                      borderRadius: '2px'
                    }}
                    title={`R$ ${val}`}
                  />
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', marginTop: '0.5rem' }}>
                O Servidor está empurrando dados para o React a cada 1.5s sem que façamos nenhum fetch manual.
              </p>
            </div>

            {/* Lab 2: Suspense */}
            <div className="glass-card" style={{ border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                  🧩 Suspense Boundary
                </h3>
                <button 
                  onClick={() => {
                    suspenseCache.delete(`widget-${suspenseKey + 1}`);
                    setSuspenseKey(k => k + 1);
                  }} 
                  className="btn btn-secondary btn-sm"
                >
                  Forçar Reload do Widget
                </button>
              </div>

              <div style={{ flex: 1, border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ color: '#475569', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                  Abaixo existe um componente envolvido em um <code>&lt;Suspense&gt;</code> que foi programado para demorar exatamente 3 segundos no servidor.
                </p>

                {/* BOUNDARY MÁGICO DO REACT */}
                <Suspense 
                  fallback={
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '8px' }}>
                      <div className="spinner" style={{ width: '30px', height: '30px', border: '3px solid #e2e8f0', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                      <p style={{ color: '#6366f1', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1px', margin: 0 }}>
                        STREAMING DO SERVIDOR...
                      </p>
                      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                  }
                >
                  <SuspenseSimulator id={`widget-${suspenseKey}`} />
                </Suspense>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="alert alert-danger">
            <div>
              <strong>Vazamento de Sockets:</strong> Toda vez que você abre um WebSocket num <code>useEffect</code>, você DEVE fechá-lo na função de <em>cleanup</em> (<code>return () =&gt; socket.close()</code>). Se não fizer isso e o usuário trocar de página 10 vezes, seu app abrirá 10 conexões concorrentes rodando em background consumindo toda a memória da máquina (e destruindo a fatura do servidor).
            </div>
          </div>

          <div className="alert alert-success">
            <div>
              <strong>O Futuro é Streaming:</strong> Com React 18 e Next.js App Router, componentes do Servidor (RSCs) podem fazer a busca do banco de dados no Backend e devolver o HTML parcial em "pedaços" pela rede. O <code>&lt;Suspense&gt;</code> captura esses pedaços, melhorando absurdamente as métricas de SEO e o <em>First Contentful Paint (FCP)</em>.
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
