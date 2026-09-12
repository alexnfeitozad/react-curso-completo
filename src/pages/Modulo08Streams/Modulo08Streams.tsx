import React, { useState, useEffect } from 'react';

export const Modulo08Streams: React.FC = () => {
  
  // Interactive Debounce / Throttle state
  const [rawText, setRawText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [rawKeystrokes, setRawKeystrokes] = useState(0);
  const [debouncedCalls, setDebouncedCalls] = useState(0);

  // Marble timeline events
  const [marbleEvents, setMarbleEvents] = useState<{ id: number; char: string; time: string }[]>([]);

  // Debounce Effect
  useEffect(() => {
    if (!rawText) {
      setDebouncedText('');
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedText(rawText);
      setDebouncedCalls(c => c + 1);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [rawText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const char = val.slice(-1) || '⌫';
    setRawText(val);
    setRawKeystrokes(k => k + 1);

    const now = new Date();
    const timeStr = `${now.getSeconds()}.${String(now.getMilliseconds()).padStart(3, '0')}s`;

    setMarbleEvents(prev => [
      { id: Date.now(), char, time: timeStr },
      ...prev.slice(0, 11)
    ]);
  };

  const handleClear = () => {
    setRawText('');
    setDebouncedText('');
    setRawKeystrokes(0);
    setDebouncedCalls(0);
    setMarbleEvents([]);
  };

  const savingsPercent = rawKeystrokes > 0
    ? Math.round(((rawKeystrokes - debouncedCalls) / rawKeystrokes) * 100)
    : 0;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 2: Ecossistema Reativo</span>
          <span className="badge badge-neutral">Módulo 08</span>
        </div>
        <h1>Programação Reativa & Event Streams</h1>
        <p className="subtitle">
          Fluxos de dados assíncronos, Debounce, Throttle e Monitoramento de Eventos em Tempo Real.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Diferença Conceitual: Debounce vs Throttle
            </h3>
            <div className="table-responsive" style={{ marginTop: '0.75rem' }}>
              <table>
                <thead>
                  <tr>
                    <th>Técnica</th>
                    <th>Comportamento</th>
                    <th>Exemplo Prático</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Debounce</strong></td>
                    <td>Atrasa a execução até que o usuário pare de emitir eventos por X ms.</td>
                    <td>Caixa de busca (Autocomplete), validação de e-mail único.</td>
                  </tr>
                  <tr>
                    <td><strong>Throttle</strong></td>
                    <td>Limita a execução para no máximo uma vez a cada X ms.</td>
                    <td>Scroll da página, redimensionamento de janela, jogos.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Custom Hook `useDebounce` em TypeScript
          </h3>
          <pre>
            <code>{`import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Métricas de Economia */}
          <div className="grid-2">
            <div className="stat-card" style={{ background: '#ffffff' }}>
              <span className="stat-value" style={{ color: '#ef4444' }}>{rawKeystrokes}</span>
              <span className="stat-label">Disparos de Tecla (Raw Input)</span>
              <span className="stat-detail">Cada letra causaria uma requisição sem debounce</span>
            </div>

            <div className="stat-card" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
              <span className="stat-value" style={{ color: '#16a34a' }}>{debouncedCalls}</span>
              <span className="stat-label">Requisições Reais à API (Debounce 400ms)</span>
              <span className="stat-detail">Economia de {savingsPercent}% de tráfego de rede!</span>
            </div>
          </div>

          {/* Simulador Interativo */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              ⚡ Laboratório de Busca Reativa com Debounce
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Digite rapidamente no campo abaixo e observe a diferença entre o valor bruto e a busca final estabilizada.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <input
                type="text"
                className="input"
                placeholder="Digite para pesquisar (ex: 'arquitetura frontend')..."
                value={rawText}
                onChange={handleInputChange}
                style={{ fontSize: '1.05rem', padding: '0.85rem 1.25rem' }}
              />
              <button onClick={handleClear} className="btn btn-secondary">
                Limpar
              </button>
            </div>

            <div className="grid-2">
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Valor Bruto do Input (Instantâneo):
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginTop: '0.3rem', minHeight: '30px' }}>
                  {rawText || <span style={{ color: '#94a3b8' }}>(vazio)</span>}
                </div>
              </div>

              <div style={{ background: '#f0f9ff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #bae6fd' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase' }}>
                  Termo Estabilizado Enviado à API (Debounce):
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0369a1', marginTop: '0.3rem', minHeight: '30px' }}>
                  {debouncedText || <span style={{ color: '#94a3b8' }}>(aguardando digitação...)</span>}
                </div>
              </div>
            </div>

            {/* Marble Stream Visualizer */}
            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
                Timeline de Emissão de Eventos (Marble Stream)
              </h4>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  overflowX: 'auto',
                  padding: '1rem',
                  background: '#0f172a',
                  borderRadius: 'var(--radius-md)',
                  minHeight: '72px'
                }}
              >
                {marbleEvents.length === 0 ? (
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Digite algo acima para ver o fluxo de emissões...</span>
                ) : (
                  marbleEvents.map(evt => (
                    <div
                      key={evt.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.2rem',
                        flexShrink: 0
                      }}
                    >
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.9rem',
                          boxShadow: '0 2px 8px rgba(6, 182, 212, 0.4)'
                        }}
                      >
                        {evt.char}
                      </div>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                        {evt.time}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-success">
            <div>
              <strong>Impacto em Produção:</strong> Sem debounce, digitar uma palavra de 10 letras dispara 10 requisições simultâneas ao backend, sobrecarregando o banco de dados e gerando condições de corrida (<em>race conditions</em>) onde respostas antigas chegam depois de respostas novas.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
