import React, { useState } from 'react';

// --- SUB-COMPONENTES PARA O LABORATÓRIO (PADRÃO COMPOUND E RENDER PROPS) ---

// 1. Compound Component Pattern (Card)
interface CardProps {
  children: React.ReactNode;
}
const Card = ({ children }: CardProps) => (
  <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
    {children}
  </div>
);

const CardHeader = ({ title, icon }: { title: string, icon?: string }) => (
  <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    {icon && <span style={{ fontSize: '1.25rem' }}>{icon}</span>}
    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>{title}</h3>
  </div>
);

const CardBody = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: '1.5rem', color: '#475569', fontSize: '0.95rem' }}>
    {children}
  </div>
);

const CardFooter = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
    {children}
  </div>
);

// Atribuindo sub-componentes ao objeto principal para sintaxe <Card.Header>
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

// 2. Render Props Pattern (Mouse Tracker)
interface MouseTrackerProps {
  render: (position: { x: number, y: number }) => React.ReactNode;
}
const MouseTracker: React.FC<MouseTrackerProps> = ({ render }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculando a posição relativa dentro da div, não na tela inteira
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    setPosition({
      x: Math.floor(e.clientX - rect.left),
      y: Math.floor(e.clientY - rect.top)
    });
  };

  return (
    <div 
      onMouseMove={handleMouseMove} 
      style={{ 
        height: '300px', 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
        borderRadius: '12px', 
        position: 'relative',
        overflow: 'hidden',
        cursor: 'crosshair',
        border: '1px solid #334155'
      }}
    >
      <div style={{ padding: '1rem', color: '#cbd5e1', fontSize: '0.85rem' }}>
        Passe o mouse por aqui...
      </div>
      {render(position)}
    </div>
  );
};


// --- COMPONENTE PRINCIPAL ---
export const Modulo03Composicao: React.FC = () => {

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 2: Intermediário</span>
          <span className="badge badge-neutral">Módulo 03</span>
        </div>
        <h1>Composição de Componentes</h1>
        <p className="subtitle">
          Padrões avançados: <code>children</code>, Render Props, Slots e Compound Components para criar UIs flexíveis sem prop drilling.
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🧩 1. A Prop Mágica: <code>children</code>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  No React, você pode passar componentes inteiros dentro de outros componentes, da mesma forma que coloca uma tag <code>&lt;p&gt;</code> dentro de uma <code>&lt;div&gt;</code>.
                  Tudo que você envelopa nas tags de abertura e fechamento do seu componente é injetado automaticamente em uma prop especial chamada <code>children</code>.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Isso evita que você crie componentes monolíticos cheios de `if/else` e dezenas de propriedades de configuração. O Pai atua apenas como um contêiner (wrapper visual).
                </p>
              </div>
              <div>
                {/* Imagem Explicativa Genérica gerada via placeholder ilustrativo */}
                <img 
                  src="https://placehold.co/600x400/e0f2fe/0369a1?text=Componente+Pai+%5Cnpadding,+border,+flex%5Cn%5Cn%7B+children+%7D%5Cn%5CnComponente+Filho" 
                  alt="Esquema da propriedade children" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📦 2. Padrão "Compound Components"
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Sabe quando você precisa criar um Menu, um Modal ou um Card que possui Header, Body e Footer? 
                  Em vez de passar todas as strings via props (ex: <code>&lt;Card headerText="..." bodyText="..." /&gt;</code>), nós expomos sub-componentes.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Isso permite usar a notação de ponto (<code>Card.Header</code>) e dá liberdade total para o desenvolvedor que for consumir o seu componente montar a estrutura como quiser, injetando botões ou ícones sem precisar alterar o código fonte original do Card.
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/f8fafc/0f172a?text=%3CCard%3E%5Cn++%3CCard.Header%3E...%3C/Card.Header%3E%5Cn++%3CCard.Body%3E...%3C/Card.Body%3E%5Cn%3C/Card%3E" 
                  alt="Esquema Compound Component" 
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 3 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📡 3. Render Props (Inversão de Controle)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  E se você tiver um comportamento genérico complexo (ex: calcular a posição exata do mouse na tela) e quiser usar isso para mover uma bolinha, ou para criar uma lupa de zoom de imagem?
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Em vez do componente "rastreador" renderizar a bolinha diretamente (o que o deixaria amarrado), ele aceita uma prop chamada <code>render</code> (ou a própria <code>children</code>) que é uma <strong>função</strong>. O componente calcula a lógica e injeta os dados de volta para você decidir a cara visual!
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/0f172a/38bdf8?text=render=&#123;(dados)+=%3E+%3CUI+dados=&#123;dados&#125;+/%3E&#125;" 
                  alt="Render Props Dinâmico" 
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
            Tipando "children" com TypeScript
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            A forma oficial e mais segura de dizer ao TypeScript que o seu componente aceita elementos aninhados é importar <code>React.ReactNode</code>. 
          </p>
          <pre>
            <code>{`import React from 'react';

// A tipagem de children suporta strings, números, null, JSX, arrays, etc.
interface LayoutProps {
  children: React.ReactNode; 
  title: string;
}

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <main className="layout">
      <h1>{title}</h1>
      <div className="content">
        {/* Renderiza tudo o que foi passado dentro das tags <Layout> */}
        {children}
      </div>
    </main>
  );
};`}</code>
          </pre>
        </div>
      </section>

      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: Laboratório de Composição</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Lab 1: Compound Components */}
          <div className="glass-card" style={{ border: '1px solid #bae6fd' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              🔬 1. Testando o Compound Component (<code>&lt;Card&gt;</code>)
            </h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Abaixo vemos dois Cards completamente diferentes renderizados usando a MESMA casca (o mesmo componente base). A liberdade ocorre porque quem consome o componente decide como encaixar os blocos.
            </p>

            <div className="grid-2">
              {/* Card 1 */}
              <Card>
                <Card.Header title="Card Simples" icon="📄" />
                <Card.Body>
                  Esse card usa apenas texto no corpo. Ele não tem botões complexos.
                </Card.Body>
                <Card.Footer>
                  <button className="btn btn-secondary btn-sm">Fechar</button>
                </Card.Footer>
              </Card>

              {/* Card 2 */}
              <Card>
                <Card.Header title="Card de Ação Alerta!" icon="⚠️" />
                <Card.Body>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <p style={{ margin: 0, fontWeight: 600, color: '#ef4444' }}>Você tem faturas pendentes.</p>
                    <div style={{ width: '100%', background: '#fee2e2', padding: '0.5rem', borderRadius: '4px', textAlign: 'center' }}>
                      R$ 450,00 Vencidos
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <button className="btn btn-secondary btn-sm" style={{ background: 'transparent', color: '#64748b', border: 'none' }}>Ignorar</button>
                  <button className="btn btn-primary btn-sm" style={{ background: '#ef4444' }}>Pagar Agora</button>
                </Card.Footer>
              </Card>
            </div>
          </div>

          {/* Lab 2: Render Props */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              📡 2. Testando o Render Props (Mouse Tracker)
            </h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '800px' }}>
              O componente escuro abaixo cuida exclusivamente de <strong>calcular as coordenadas (X, Y)</strong>. A responsabilidade de "desenhar a bolinha" é nossa! Nós passamos uma função na prop <code>render</code> que pega as coordenadas injetadas por ele e retorna a marcação da mira do radar.
            </p>

            {/* Invocando o Render Props */}
            <MouseTracker 
              render={(position) => (
                <>
                  <div style={{
                    position: 'absolute',
                    top: position.y,
                    left: position.x,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(56,189,248,0.8) 0%, rgba(56,189,248,0) 70%)',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: position.y - 40,
                    left: position.x + 20,
                    background: '#0f172a',
                    color: '#38bdf8',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                    pointerEvents: 'none',
                    border: '1px solid #1e293b'
                  }}>
                    X:{position.x} Y:{position.y}
                  </div>
                </>
              )}
            />
          </div>
          
        </div>
      </section>

      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="alert alert-danger">
            <div>
              <strong>Prop Drilling (Perigo!):</strong> Quando você passa uma prop do Componente A para o Componente B, para o C, para o D... apenas para chegar no E, você tem um problema de Prop Drilling. <strong>A solução imediata não é o Redux!</strong> A solução primária sugerida pelo React é a <strong>Composição</strong> (Passar JSX como <code>children</code>), pois permite que o Componente A injete o D diretamente no C.
            </div>
          </div>

          <div className="alert alert-success">
            <div>
              <strong>Render Props vs Custom Hooks:</strong> Antigamente, Render Props eram a única forma de compartilhar lógica complexa (como o Mouse Tracker). Hoje, 90% das vezes, nós usamos <strong>Custom Hooks</strong> (<code>const position = useMouseTracker()</code>). No entanto, o padrão Render Props ainda brilha quando você tem componentes de Listagem, Grids ou Bibliotecas genéricas que injetam dados visuais complexos!
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
