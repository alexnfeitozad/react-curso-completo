import React, { useState } from 'react';

interface TestCase {
  id: string;
  name: string;
  suite: string;
  durationMs: number;
  status: 'idle' | 'running' | 'passed' | 'failed';
  assertion: string;
}

const INITIAL_TESTS: TestCase[] = [
  {
    id: 't1',
    name: 'deve renderizar o título do componente corretamente',
    suite: 'Button.spec.tsx',
    durationMs: 8,
    status: 'idle',
    assertion: 'expect(screen.getByText("Enviar")).toBeInTheDocument()'
  },
  {
    id: 't2',
    name: 'deve disparar evento onClick quando clicado pelo usuário',
    suite: 'Button.spec.tsx',
    durationMs: 14,
    status: 'idle',
    assertion: 'expect(mockFn).toHaveBeenCalledTimes(1)'
  },
  {
    id: 't3',
    name: 'deve exibir mensagem de erro se e-mail for inválido',
    suite: 'LoginForm.spec.tsx',
    durationMs: 22,
    status: 'idle',
    assertion: 'expect(screen.getByRole("alert")).toHaveTextContent("E-mail inválido")'
  },
  {
    id: 't4',
    name: 'deve atualizar estado da store Zustand sem mutação direta',
    suite: 'CartStore.spec.ts',
    durationMs: 11,
    status: 'idle',
    assertion: 'expect(useCartStore.getState().items).toHaveLength(1)'
  },
  {
    id: 't5',
    name: 'deve realizar fallback em caso de erro 500 no Fetch',
    suite: 'HttpClient.spec.ts',
    durationMs: 34,
    status: 'idle',
    assertion: 'expect(response.source).toBe("cache-mock")'
  }
];

export const Modulo10Testes: React.FC = () => {
  
  const [tests, setTests] = useState<TestCase[]>(INITIAL_TESTS);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [executedCount, setExecutedCount] = useState(0);

  const runAllTests = async () => {
    setIsRunningAll(true);
    setExecutedCount(0);

    // Reset status
    setTests(prev => prev.map(t => ({ ...t, status: 'idle' })));

    for (let i = 0; i < tests.length; i++) {
      setTests(prev =>
        prev.map((t, idx) => (idx === i ? { ...t, status: 'running' } : t))
      );

      await new Promise(r => setTimeout(r, 250));

      setTests(prev =>
        prev.map((t, idx) => (idx === i ? { ...t, status: 'passed' } : t))
      );
      setExecutedCount(c => c + 1);
    }

    setIsRunningAll(false);
  };

  const passedCount = tests.filter(t => t.status === 'passed').length;
  const totalDuration = tests.reduce((acc, t) => acc + t.durationMs, 0);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 3: Nível Arquiteto</span>
          <span className="badge badge-neutral">Módulo 10</span>
        </div>
        <h1>Testes com Vitest & Testing Library</h1>
        <p className="subtitle">
          Testes unitários e de integração de componentes, hooks, stores e simulação de mocks.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              A Filosofia da React Testing Library
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              <em>"The more your tests resemble the way your software is used, the more confidence they can give you."</em> — Kent C. Dodds.
            </p>
            <p style={{ color: '#475569', lineHeight: 1.6, marginTop: '0.5rem' }}>
              Nunca teste detalhes de implementação internos (como o nome de uma variável de estado). Teste o que o usuário enxerga e como ele interage:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Prefira <code>screen.getByRole('button', &#123; name: /enviar/i &#125;)</code> em vez de seletores CSS.</li>
              <li>Use <code>userEvent</code> para simular cliques e digitação real do usuário.</li>
            </ul>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Exemplo de Teste Unitário com Vitest + RTL
          </h3>
          <pre>
            <code>{`import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('deve chamar a callback quando clicado', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Enviar</Button>);

    const button = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Dashboard de Testes */}
          <div className="grid-2">
            <div className="stat-card" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
              <span className="stat-value" style={{ color: '#16a34a' }}>
                {passedCount} / {tests.length}
              </span>
              <span className="stat-label">Testes Passando (100% Pass)</span>
              <span className="stat-detail">Suíte de testes automatizados com Vitest v5</span>
            </div>

            <div className="stat-card" style={{ background: '#ffffff' }}>
              <span className="stat-value" style={{ color: '#0284c7' }}>
                {totalDuration} ms
              </span>
              <span className="stat-label">Tempo Total de Execução</span>
              <span className="stat-detail">Vitest alimentado pelo Vite e ESM nativo</span>
            </div>
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  🚀 Test Runner Interativo
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  Clique no botão para executar a pipeline de testes em tempo real.
                </p>
              </div>

              <button
                onClick={runAllTests}
                disabled={isRunningAll}
                className="btn btn-primary"
              >
                {isRunningAll ? `Executando (${executedCount}/${tests.length})...` : '▶ Executar Testes no Vitest'}
              </button>
            </div>

            {/* Terminal de Testes */}
            <div style={{ background: '#0f172a', borderRadius: 'var(--radius-md)', padding: '1.25rem', color: '#e2e8f0', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '0.5rem' }}>
                  terminal: vitest run --reporter=verbose
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {tests.map(test => (
                  <div
                    key={test.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.85rem',
                      padding: '0.4rem 0',
                      borderBottom: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span>
                        {test.status === 'passed' && '✅'}
                        {test.status === 'running' && '⏳'}
                        {test.status === 'idle' && '⚪'}
                      </span>
                      <span style={{ color: '#38bdf8', fontWeight: 600 }}>{test.suite}</span>
                      <span style={{ color: '#cbd5e1' }}>› {test.name}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{test.durationMs}ms</span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                          background: test.status === 'passed' ? '#166534' : 'rgba(255,255,255,0.1)',
                          color: test.status === 'passed' ? '#86efac' : '#94a3b8'
                        }}
                      >
                        {test.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {passedCount === tests.length && (
                <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#4ade80', fontSize: '0.9rem', fontWeight: 700 }}>
                  ✓ 5 tests passed in {totalDuration}ms (Vitest v5)
                </div>
              )}
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
              <strong>Mocking de APIs:</strong> Nunca faça chamadas HTTP reais em testes unitários automatizados. Utilize <code>vi.spyOn(global, 'fetch')</code> ou Mock Service Worker (MSW) para simular respostas previsíveis e testes que rodam em milissegundos.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
