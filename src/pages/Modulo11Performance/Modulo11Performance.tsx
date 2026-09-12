import React, { useState, useMemo, useCallback, useRef } from 'react';

// Função pura deliberadamente pesada para demonstrar useMemo
function heavyFibonacci(n: number): number {
  if (n <= 1) return n;
  return heavyFibonacci(n - 1) + heavyFibonacci(n - 2);
}

// Componente Filho memoizado
const MemoizedChild = React.memo<{ onClick: () => void; label: string }>(({ onClick, label }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: 'var(--radius-sm)',
        background: '#ffffff',
        border: '1px solid var(--neutral-200)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{label}</div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Re-renders deste componente filho: <strong style={{ color: '#0284c7' }}>{renderCount.current}</strong>
          </span>
        </div>
        <button onClick={onClick} className="btn btn-secondary btn-sm">
          Disparar Ação
        </button>
      </div>
    </div>
  );
});

export const Modulo11Performance: React.FC = () => {
  
  // Estado do cálculo pesado
  const [fibNumber, setFibNumber] = useState(30);
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);
  const [unrelatedCounter, setUnrelatedCounter] = useState(0);

  // useMemo para cálculo
  const fibResult = useMemo(() => {
    return heavyFibonacci(fibNumber);
  }, [fibNumber]);

  // Sem useMemo (calculado inline se desmarcado)
  const directFibResult = !useMemoEnabled ? heavyFibonacci(fibNumber) : fibResult;

  // useCallback demo
  const [useCallbackActive, setUseCallbackActive] = useState(true);

  // Callback com useCallback (referência estável)
  const stableCallback = useCallback(() => {
    alert('Callback estável disparado!');
  }, []);

  // Callback sem useCallback (nova função a cada render)
  const unstableCallback = () => {
    alert('Callback instável disparado!');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 3: Nível Arquiteto</span>
          <span className="badge badge-neutral">Módulo 11</span>
        </div>
        <h1>Performance & Otimização</h1>
        <p className="subtitle">
          React.memo, useMemo, useCallback, Lazy Loading e o equivalente React ao @defer do Angular.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              O Equivalente React ao @defer do Angular
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              No Angular 17+, temos blocos <code>@defer (on interaction; prefetch on hover)</code>.
              No React, o equivalente idiomático é a combinação de <strong><code>React.lazy()</code> + <code>&lt;Suspense fallback=&#123;...&#125;&gt;</code></strong>:
            </p>
            <pre style={{ marginTop: '0.75rem' }}>
              <code>{`// Carregamento sob demanda (Code Splitting):
const HeavyChart = React.lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <HeavyChart />
    </Suspense>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Padrão de useMemo e useCallback
          </h3>
          <pre>
            <code>{`const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Lab 1: useMemo */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              ⚡ Laboratório 1: Otimização de Cálculos Pesados com `useMemo`
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              O cálculo da sequência de Fibonacci recursiva é computacionalmente pesado (O(2^n)).
              Com <code>useMemo</code>, o React faz cache do resultado e não recalcula quando você clica em "Incrementar Contador Não-Relacionado".
            </p>

            <div className="grid-2">
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Configuração do Teste</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                      Entrada N do Fibonacci: <strong>{fibNumber}</strong>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="35"
                      value={fibNumber}
                      onChange={e => setFibNumber(Number(e.target.value))}
                      style={{ width: '100%', marginTop: '0.3rem' }}
                    />
                  </div>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={useMemoEnabled}
                      onChange={e => setUseMemoEnabled(e.target.checked)}
                    />
                    <span style={{ fontWeight: 600, color: useMemoEnabled ? '#0284c7' : '#dc2626' }}>
                      Ativar Cache com <code>useMemo</code> ({useMemoEnabled ? 'Ligado' : 'Desligado'})
                    </span>
                  </label>

                  <div style={{ borderTop: '1px solid var(--neutral-200)', paddingTop: '0.75rem' }}>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.4rem' }}>
                      Contador independente (re-renderiza o componente pai):
                    </div>
                    <button onClick={() => setUnrelatedCounter(c => c + 1)} className="btn btn-primary btn-sm">
                      + Re-renderizar Pai (Cliques: {unrelatedCounter})
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
                  Resultado do Cálculo Fibonacci({fibNumber}):
                </span>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#4ade80', margin: '0.5rem 0' }}>
                  {directFibResult.toLocaleString()}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {useMemoEnabled
                    ? '✅ useMemo ativo: Nenhuma CPU gasta ao clicar no contador não-relacionado.'
                    : '⚠️ useMemo desligado: Toda a árvore recalcula o Fibonacci a cada clique!'}
                </span>
              </div>
            </div>
          </div>

          {/* Lab 2: useCallback e React.memo */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              🛡️ Laboratório 2: Estabilidade Referencial com `useCallback` & `React.memo`
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Mesmo que um componente filho use <code>React.memo</code>, se o pai passar uma função recriada a cada render (sem <code>useCallback</code>), o filho será forçado a re-renderizar porque a referência da função mudou.
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={useCallbackActive}
                  onChange={e => setUseCallbackActive(e.target.checked)}
                />
                <span style={{ fontWeight: 600, color: useCallbackActive ? '#16a34a' : '#dc2626' }}>
                  Usar <code>useCallback</code> para estabilizar a prop da função ({useCallbackActive ? 'Ativo' : 'Inativo'})
                </span>
              </label>
            </div>

            <MemoizedChild
              onClick={useCallbackActive ? stableCallback : unstableCallback}
              label={useCallbackActive ? 'Componente Filho (Protegido por useCallback)' : 'Componente Filho (Sem useCallback - Re-renderizando à toa)'}
            />
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-warning">
            <div>
              <strong>Não otimize prematuramente:</strong> <code>useMemo</code> e <code>useCallback</code> têm um custo próprio de criação de dependências e closure. Só use quando houver cálculos comprovadamente pesados ou quando passar funções para componentes filhos envolvidos em <code>React.memo</code>.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
