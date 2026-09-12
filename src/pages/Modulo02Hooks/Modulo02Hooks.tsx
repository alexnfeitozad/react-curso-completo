import React, { useState, useEffect, useRef } from 'react';

export const Modulo02Hooks: React.FC = () => {
  
  // Monitor de re-renderizações usando ref estável
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  // Estado do Cronômetro
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Efeito com Cleanup e event listener
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [eventLogs, setEventLogs] = useState<string[]>([]);

  // Referência de input para DOM imperativo controlado
  const inputSearchRef = useRef<HTMLInputElement>(null);

  // Timer Effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  // Window Resize Listener with Cleanup
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setEventLogs((prev) => [
        `[Resize Event] Nova largura: ${window.innerWidth}px`,
        ...prev.slice(0, 5),
      ]);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const handleFocusInput = () => {
    inputSearchRef.current?.focus();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 1: Base dos Componentes</span>
          <span className="badge badge-neutral">Módulo 02</span>
        </div>
        <h1>Hooks Essenciais & Lifecycle</h1>
        <p className="subtitle">
          useState, useEffect com Cleanup, useRef para valores mutáveis e acesso ao DOM.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              O Modelo Mental do useEffect
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              No React moderno, não pensamos em <code>componentDidMount</code> ou <code>componentDidUpdate</code>.
              O <code>useEffect</code> serve para <strong>sincronizar seu componente com sistemas externos</strong> (APIs, timers, WebSockets, DOM do navegador).
            </p>
          </div>

          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Array de Dependências</th>
                  <th>Quando o Efeito Executa?</th>
                  <th>Caso de Uso Recomendado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Sem array</code></td>
                  <td>Em TODA renderização</td>
                  <td>Raro; logs e sincronizações globais contínuas.</td>
                </tr>
                <tr>
                  <td><code>[] (Vazio)</code></td>
                  <td>Apenas uma vez na montagem inicial</td>
                  <td>Inicialização de listeners, timers únicos.</td>
                </tr>
                <tr>
                  <td><code>[propA, stateB]</code></td>
                  <td>Na montagem e quando propA ou stateB mudarem</td>
                  <td>Busca de dados baseada em ID, sincronização reativa.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Padrão de Timer com Cleanup em TypeScript
          </h3>
          <pre>
            <code>{`import React, { useState, useEffect, useRef } from 'react';

export const AutoTimer: React.FC = () => {
  const [count, setCount] = useState(0);
  const timerId = useRef<number | null>(null);

  useEffect(() => {
    timerId.current = window.setInterval(() => {
      // ✅ Atualizador funcional: não precisa colocar 'count' nas dependências!
      setCount(prev => prev + 1);
    }, 1000);

    // ✅ Função de limpeza essencial contra memory leak
    return () => {
      if (timerId.current) clearInterval(timerId.current);
    };
  }, []); // Array vazio: roda apenas na montagem

  return <div>Segundos: {count}</div>;
};`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Monitor de Render */}
          <div className="glass-card" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', border: '1px solid #bae6fd' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase' }}>
                  Monitor de Renderizações do Componente
                </span>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0c4a6e', marginTop: '0.2rem' }}>
                  Este componente já re-renderizou: <span style={{ color: '#0284c7' }}>{renderCountRef.current} vezes</span>
                </h4>
              </div>
              <span className="badge badge-primary">useRef preservado entre renders</span>
            </div>
          </div>

          {/* Lab 1: useRef vs useState Timer */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              ⏱️ Laboratório 1: Cronômetro & Limpeza de Efeitos (Cleanup)
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              O ID do intervalo é armazenado em um <code>useRef</code> (evita re-renders adicionais ao guardar o timer ID).
              A função de retorno do <code>useEffect</code> garante que o timer seja limpo para evitar memory leaks.
            </p>

            <div className="grid-2">
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#0284c7', marginBottom: '1rem' }}>
                  {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`btn ${isRunning ? 'btn-danger' : 'btn-primary'}`}
                  >
                    {isRunning ? '⏸️ Pausar' : '▶️ Iniciar'}
                  </button>
                  <button onClick={handleResetTimer} className="btn btn-secondary">
                    🔄 Reiniciar
                  </button>
                </div>
              </div>

              <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                  📡 Efeito de Window Resize & Cleanup
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                  Largura atual da janela: <strong>{windowWidth}px</strong> (Redimensione a janela para ver)
                </p>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  {eventLogs.length === 0 ? (
                    <span style={{ color: '#64748b' }}>Aguardando redimensionamento...</span>
                  ) : (
                    eventLogs.map((log, i) => (
                      <span key={i} style={{ color: i === 0 ? '#4ade80' : '#cbd5e1' }}>{log}</span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Lab 2: useRef para DOM Focus */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              🎯 Laboratório 2: Acesso Direto ao DOM com useRef
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Para operações imperativas necessárias (ex: focar campos, medir nós, integrar bibliotecas terceiras), usamos referências ao elemento DOM com <code>useRef&lt;HTMLInputElement&gt;(null)</code>.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '600px' }}>
              <input
                ref={inputSearchRef}
                type="text"
                className="input"
                placeholder="Clique no botão para receber foco..."
              />
              <button onClick={handleFocusInput} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                Focar Input
              </button>
            </div>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-danger">
            <div>
              <strong>Armadilha Comum:</strong> Omitir dependências do <code>useEffect</code> (efeito com estado desatualizado / <em>stale closure</em>). Sempre que usar uma variável dentro do efeito, declare-a no array de dependências ou use a forma funcional do <code>setState(prev =&gt; ...)</code>.
            </div>
          </div>
          <div className="alert alert-success">
            <div>
              <strong>Regra de Ouro do useRef:</strong> O <code>useRef</code> é como uma "caixa" que guarda qualquer valor mutável durante toda a vida do componente sem provocar re-renderizações ao ser alterado.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
