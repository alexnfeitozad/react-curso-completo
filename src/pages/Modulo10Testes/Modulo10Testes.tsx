import React, { useState } from 'react';

// --- COMPONENTE ALVO DO TESTE (SUT - System Under Test) ---
const CounterWidget = () => {
  const [count, setCount] = useState(0);

  return (
    <div 
      className="sut-container" 
      style={{ padding: '2rem', background: '#fff', borderRadius: '8px', border: '2px dashed #cbd5e1', textAlign: 'center' }}
      data-testid="counter-widget"
    >
      <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>Meu Contador</h3>
      <div 
        data-testid="count-value" 
        style={{ fontSize: '3rem', fontWeight: 900, color: '#3b82f6', marginBottom: '1.5rem' }}
      >
        {count}
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button 
          onClick={() => setCount(c => c - 1)} 
          className="btn btn-secondary"
          name="Diminuir"
        >
          - Diminuir
        </button>
        <button 
          onClick={() => setCount(c => c + 1)} 
          className="btn btn-primary"
          name="Aumentar"
        >
          + Aumentar
        </button>
      </div>
    </div>
  );
};


// --- SIMULADOR DE TESTES (Vitest / RTL Fake Runner) ---
const TestSimulator = () => {
  const [testState, setTestState] = useState<'idle' | 'running' | 'success'>('idle');
  const [activeStep, setActiveStep] = useState(0);

  const runTests = () => {
    setTestState('running');
    setActiveStep(1);

    setTimeout(() => setActiveStep(2), 1000);
    setTimeout(() => setActiveStep(3), 2000);
    setTimeout(() => {
      setActiveStep(4);
      setTestState('success');
    }, 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#0f172a', color: '#f8fafc', padding: '1.5rem', borderRadius: '8px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontFamily: 'monospace', color: '#94a3b8', marginLeft: '0.5rem' }}>vitest run --ui</span>
        </div>
        <button 
          onClick={runTests} 
          disabled={testState === 'running'}
          className="btn btn-primary btn-sm"
          style={{ background: '#22c55e', border: 'none' }}
        >
          {testState === 'running' ? 'Executando...' : '▶ Rodar Testes'}
        </button>
      </div>

      <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Teste 1 */}
        <div style={{ opacity: activeStep >= 1 ? 1 : 0.4 }}>
          <span style={{ color: activeStep > 1 ? '#22c55e' : (activeStep === 1 ? '#eab308' : '#94a3b8') }}>
            {activeStep > 1 ? '✓' : (activeStep === 1 ? '↻' : '○')} 
          </span>
          <span style={{ marginLeft: '0.75rem', fontWeight: 600 }}>Deve renderizar o contador em 0</span>
          {activeStep >= 1 && (
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginLeft: '1.5rem', marginTop: '0.25rem' }}>
              &gt; render(&lt;CounterWidget /&gt;)<br/>
              &gt; expect(screen.getByTestId('count-value')).toHaveTextContent('0')
            </div>
          )}
        </div>

        {/* Teste 2 */}
        <div style={{ opacity: activeStep >= 2 ? 1 : 0.4 }}>
          <span style={{ color: activeStep > 2 ? '#22c55e' : (activeStep === 2 ? '#eab308' : '#94a3b8') }}>
            {activeStep > 2 ? '✓' : (activeStep === 2 ? '↻' : '○')} 
          </span>
          <span style={{ marginLeft: '0.75rem', fontWeight: 600 }}>Deve aumentar o valor ao clicar no botão</span>
          {activeStep >= 2 && (
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginLeft: '1.5rem', marginTop: '0.25rem' }}>
              &gt; fireEvent.click(screen.getByRole('button', &#123; name: /aumentar/i &#125;))<br/>
              &gt; expect(screen.getByTestId('count-value')).toHaveTextContent('1')
            </div>
          )}
        </div>

        {/* Teste 3 */}
        <div style={{ opacity: activeStep >= 3 ? 1 : 0.4 }}>
          <span style={{ color: activeStep > 3 ? '#22c55e' : (activeStep === 3 ? '#eab308' : '#94a3b8') }}>
            {activeStep > 3 ? '✓' : (activeStep === 3 ? '↻' : '○')} 
          </span>
          <span style={{ marginLeft: '0.75rem', fontWeight: 600 }}>Deve diminuir o valor permitindo números negativos</span>
          {activeStep >= 3 && (
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginLeft: '1.5rem', marginTop: '0.25rem' }}>
              &gt; userEvent.click(screen.getByRole('button', &#123; name: /diminuir/i &#125;))<br/>
              &gt; expect(screen.getByTestId('count-value')).toHaveTextContent('-1')
            </div>
          )}
        </div>

      </div>

      {testState === 'success' && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', borderRadius: '4px', color: '#4ade80', textAlign: 'center', fontWeight: 800 }}>
          Test Suites: 1 passed, 1 total<br/>
          Tests: 3 passed, 3 total<br/>
          Time: 3.01s
        </div>
      )}

    </div>
  );
};


// --- COMPONENTE PRINCIPAL (PÁGINA) ---
export const Modulo10Testes: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 3: Avançado</span>
          <span className="badge badge-neutral">Módulo 10</span>
        </div>
        <h1>Testes Automatizados (Vitest + RTL)</h1>
        <p className="subtitle">
          Garantindo a resiliência do código: Testes Unitários, de Integração e o padrão "Render, Act, Assert" com React Testing Library.
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🧪 1. A Pirâmide de Testes
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Escrever testes manuais (clicar pela tela toda vez que fazemos um build) é lento e falho. Em aplicações profissionais, nós escrevemos robôs que testam o nosso código em milissegundos.
                </p>
                <ul style={{ color: '#475569', lineHeight: 1.6, paddingLeft: '1.5rem' }}>
                  <li><strong>E2E (Cypress/Playwright):</strong> Testa o site inteiro abrindo um navegador real. (Lentos, porém fiéis).</li>
                  <li><strong>Integração (RTL):</strong> Testa como os componentes interagem. É o foco principal no React.</li>
                  <li><strong>Unitários (Vitest/Jest):</strong> Testa funções isoladas puras do JS (Ex: formatação de datas).</li>
                </ul>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/e0f2fe/0369a1?text=%5B+++E2E+++%5D%5Cn%5B++Integra%C3%A7%C3%A3o++%5D%5Cn%5B+++++Unit%C3%A1rios+++++%5D%5Cn%5CnPir%C3%A2mide+do+Mercado!" 
                  alt="A Pirâmide de Testes" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🎯 2. React Testing Library (RTL) vs O Passado (Enzyme)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Antigamente (com o Enzyme), testávamos "como" o React funcionava por dentro: Líamos o <code>useState</code> diretamente para ver se a variável mudou de 0 para 1.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  A React Testing Library mudou tudo com uma filosofia matadora: <strong>"Teste seu software da mesma forma que os usuários o utilizam"</strong>. O usuário não vê o `useState`, ele vê o <strong>DOM</strong> (texto e botões). O RTL foca em ler a tela renderizada!
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/fef2f2/991b1b?text=Errado:+expect(state).toBe(1)%5Cn%5CnCerto:+expect(screen.getByText('1')).%5CntoBeVisible()" 
                  alt="Filosofia do RTL" 
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />
          
          {/* Tópico 3 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📏 3. O Padrão AAA (Arrange, Act, Assert)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Todo bom teste de componente segue estritamente 3 passos lógicos:
                </p>
                <ul style={{ color: '#475569', lineHeight: 1.6, paddingLeft: '1.5rem' }}>
                  <li><strong>Arrange (Preparar):</strong> Você invoca o <code>render(&lt;App/&gt;)</code> para jogar o componente no DOM virtual de testes.</li>
                  <li><strong>Act (Agir):</strong> Você simula a ação do usuário com o <code>fireEvent.click(...)</code>.</li>
                  <li><strong>Assert (Afirmar):</strong> Você verifica se o resultado esperado está na tela com o <code>expect(...)</code>.</li>
                </ul>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/f0fdf4/166534?text=1.+ARRANGE+(render)%5Cn%E2%86%93%5Cn2.+ACT+(click)%5Cn%E2%86%93%5Cn3.+ASSERT+(expect)" 
                  alt="Padrão AAA" 
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
            A Anatomia de um Teste Perfeito
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Arquivos de teste ficam junto com o componente (ex: <code>Button.test.tsx</code>). Usamos as queries semânticas como <code>getByRole</code> (acessibilidade) sempre que possível!
          </p>
          <pre>
            <code>{`import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CounterWidget from './CounterWidget';

describe('CounterWidget Component', () => {
  it('should increment the count when the plus button is clicked', () => {
    // 1. Arrange
    render(<CounterWidget />);
    
    // 2. Act
    const button = screen.getByRole('button', { name: /aumentar/i });
    fireEvent.click(button);
    
    // 3. Assert
    const countDisplay = screen.getByTestId('count-value');
    expect(countDisplay).toHaveTextContent('1');
  });
});`}</code>
          </pre>
        </div>
      </section>

      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: O Terminal de Testes</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="grid-2">
            
            {/* O Componente SUT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>🧩 O Componente Real</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                  Você pode clicar e interagir manualmente (Teste Humano).
                </p>
              </div>
              <CounterWidget />
            </div>

            {/* O Terminal de Teste */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>🤖 O Executor (Vitest)</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                  Aperte "Rodar Testes" para ver como o robô analisa o componente da esquerda em modo "headless" (sem navegador visível).
                </p>
              </div>
              <TestSimulator />
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="alert alert-warning">
            <div>
              <strong>Cuidado com o <code>getByTestId</code>:</strong> A regra oficial do RTL é buscar elementos pela Acessibilidade (<code>getByRole</code>, <code>getByLabelText</code>). Se você usar <code>data-testid</code> para tudo, seus testes não garantirão que leitores de tela ou pessoas cegas conseguirão usar sua aplicação. Deixe o test-id apenas para textos dinâmicos!
            </div>
          </div>

          <div className="alert alert-success">
            <div>
              <strong>userEvent vs fireEvent:</strong> A documentação recomenda usar a biblioteca <code>@testing-library/user-event</code> no lugar do <code>fireEvent</code> puro. O motivo? O `userEvent.type()` não apenas muda o valor do input, mas ele simula fidedignamente o hover, o click, o foco e a digitação letra por letra, disparando todos os eventos nativos na ordem correta!
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
