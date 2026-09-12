import React, { useState, useEffect, ElementType, ComponentType } from 'react';

// --- PADRÃO 1: CUSTOM HOOKS (Lógica de Negócio Reutilizável) ---
const useWindowSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

// --- PADRÃO 2: HIGHER ORDER COMPONENTS (HOC) ---
// Uma função que recebe um Componente e devolve UM NOVO COMPONENTE turbinado!
function withClickLogger<P extends object>(WrappedComponent: ComponentType<P>, componentName: string) {
  // Retornamos o novo componente
  return function EnhancedComponent(props: P) {
    const handleClick = () => {
      // Lógica injetada pelo HOC
      alert(`[Analytics] Clique registrado no componente: ${componentName}!`);
    };

    return (
      <div onClick={handleClick} style={{ display: 'inline-block', cursor: 'pointer', outline: '2px dashed #eab308', padding: '0.25rem' }} title="Este componente foi empacotado por um HOC!">
        <WrappedComponent {...props} />
      </div>
    );
  };
}

// Componente Básico e Burro (Presentational)
const SimpleButton = ({ label }: { label: string }) => (
  <button className="btn btn-primary">{label}</button>
);
const SimpleCard = ({ title }: { title: string }) => (
  <div style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '1rem', borderRadius: '4px' }}>{title}</div>
);

// HOC em ação: Gerando novos componentes turbinados
const LoggableButton = withClickLogger(SimpleButton, 'BotaoDeCompra');
const LoggableCard = withClickLogger(SimpleCard, 'CardDeProduto');


// --- PADRÃO 3: POLIMORFISMO (O Padrão 'as') ---
// Permite que o componente mude sua TAG HTML sem perder os estilos globais
interface TextProps {
  as?: ElementType;
  children: React.ReactNode;
  isHighlight?: boolean;
}

const PolymorphicText = ({ as: Component = 'p', children, isHighlight }: TextProps) => {
  return (
    <Component style={{ 
      color: isHighlight ? '#6366f1' : '#334155', 
      fontWeight: Component === 'h1' ? 900 : (isHighlight ? 700 : 400),
      margin: 0
    }}>
      {children}
    </Component>
  );
};


// --- COMPONENTE PRINCIPAL (PÁGINA) ---
export const Modulo12Patterns: React.FC = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 3: Avançado</span>
          <span className="badge badge-neutral">Módulo 12</span>
        </div>
        <h1>Design Patterns no React</h1>
        <p className="subtitle">
          Padrões de Arquitetura: HOCs, Custom Hooks, Componentes Polimórficos e a Separação de Responsabilidades (Container vs Presentational).
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🎣 1. Custom Hooks (A Magia da Extração)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Componentes React servem para desenhar UI. Se o seu componente tem 200 linhas de <code>useState</code> e lógica de validação de formulário, ele está fazendo o papel errado.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Criar um <strong>Custom Hook</strong> significa arrancar toda a lógica de negócio do componente e colocá-la em uma função separada que começa com `use`. Assim, qualquer tela do seu sistema pode reutilizar essa mesma lógica sem copiar e colar código.
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/e0f2fe/0369a1?text=Componente+%3D+UI+%2B+L%C3%B3gica%5Cn%E2%86%93%5CnuseForm()+%3D+S%C3%B3+L%C3%B3gica%5Cn%E2%86%93%5CnLimpeza+e+Reutiliza%C3%A7%C3%A3o%21" 
                  alt="Esquema Custom Hooks" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📦 2. Higher Order Components (HOC)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  É um padrão clássico e muito usado por bibliotecas (como o <code>connect()</code> do Redux antigo ou o <code>withRouter()</code>).
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Um HOC <strong>não é um componente</strong>. É uma função que recebe um componente "burro" e devolve um novo componente "inteligente", envelopado com funcionalidades extras, como sistema de permissões ou injeção de dados.
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/fef2f2/991b1b?text=HOC(Bot%C3%A3o)%5Cn%E2%86%93%5CnRetorna%3A%5Cn%3CWrapper+Analytics%3E%5Cn++%3CBot%C3%A3o+Original+%2F%3E%5Cn%3C%2FWrapper%3E" 
                  alt="Esquema HOC" 
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />
          
          {/* Tópico 3 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🎭 3. Componentes Polimórficos (Polymorphism)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Design Systems (como Radix, ChakraUI, Tailwind UI) amam esse padrão. A ideia é criar um componente visual incrível (ex: um <code>&lt;Button&gt;</code>) mas permitir que o desenvolvedor decida qual TAG HTML ele deve ser renderizado usando a prop <strong><code>as</code></strong>.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Assim, você pode ter um Botão perfeito que, pro SEO e Acessibilidade, na verdade é uma tag <code>&lt;a href="..."&gt;</code> (Link).
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/f0fdf4/166534?text=%3CBox+as%3D%22section%22%3E%5Cn...%5Cn%3CBox+as%3D%22nav%22%3E%5Cn%5CnMesmo+Design%2C%5CnTags+HTML+diferentes%21" 
                  alt="Esquema Polimorfismo" 
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
            A Mágica do Polimorfismo no TypeScript
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Usamos o tipo genérico <code>ElementType</code> do React para receber qual tag ou qual componente externo queremos renderizar. Letra maiúscula na desestruturação é obrigatória!
          </p>
          <pre>
            <code>{`interface FlexProps {
  as?: React.ElementType; // Pode ser 'div', 'section', 'ul' ou até o <Link> do Router!
  children: React.ReactNode;
}

const FlexBox = ({ as: Component = 'div', children }: FlexProps) => {
  return (
    <Component style={{ display: 'flex', gap: '1rem' }}>
      {children}
    </Component>
  );
};

// Como usar:
// <FlexBox as="ul"> ... </FlexBox>`}</code>
          </pre>
        </div>
      </section>

      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: Laboratório de Padrões</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="grid-2">
            
            {/* Lab 1: HOC e Custom Hooks */}
            <div className="glass-card" style={{ border: '1px solid #bae6fd', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0369a1', margin: 0 }}>
                📦 Lab 1: HOC e Custom Hooks
              </h3>
              
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>1. Custom Hook em ação (useWindowSize)</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
                  Dimensione a janela do seu navegador e veja os números abaixo mudarem! A lógica de adicionar EventListeners foi abstraída do nosso componente.
                </p>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#3b82f6', marginTop: '1rem' }}>
                  {width}px x {height}px
                </div>
              </div>

              <div style={{ background: '#fffbeb', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #eab308' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#854d0e' }}>2. Higher Order Component (Analytics)</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#a16207', marginBottom: '1rem' }}>
                  Os dois componentes abaixo são originais "burros", mas foram empacotados pela função <code>withClickLogger</code>. Clique neles para ver o alerta de Analytics injetado magicamente!
                </p>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <LoggableButton label="Comprar Agora" />
                  <LoggableCard title="Monitor Gamer" />
                </div>
              </div>
            </div>

            {/* Lab 2: Componentes Polimórficos */}
            <div className="glass-card" style={{ border: '1px solid #c7d2fe', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4f46e5', margin: 0 }}>
                  🎭 Lab 2: Polimorfismo
                </h3>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0 }}>
                Abaixo estamos usando o MESMO componente <code>&lt;PolymorphicText&gt;</code>, porém instruindo o React a renderizá-lo com tags HTML completamente diferentes por baixo dos panos (Inspecione no F12!).
              </p>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                <div style={{ borderLeft: '3px solid #cbd5e1', paddingLeft: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>as="h1"</span>
                  <PolymorphicText as="h1" isHighlight>
                    Sou um Título de Página (H1)
                  </PolymorphicText>
                </div>
                
                <div style={{ borderLeft: '3px solid #cbd5e1', paddingLeft: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>as="h2"</span>
                  <PolymorphicText as="h2">
                    Sou um Subtítulo (H2)
                  </PolymorphicText>
                </div>

                <div style={{ borderLeft: '3px solid #cbd5e1', paddingLeft: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>as="p"</span>
                  <PolymorphicText as="p">
                    Sou apenas um parágrafo longo de texto corrido. Repare que o componente mantém as regras de Design (como cor e formatação condicional) mesmo mudando a tag base HTML para fins de SEO.
                  </PolymorphicText>
                </div>
                
                <div style={{ borderLeft: '3px solid #cbd5e1', paddingLeft: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>as="a" (Link)</span>
                  <PolymorphicText as="a" isHighlight>
                    Eu sou uma Tag de Link Clicável! (a)
                  </PolymorphicText>
                </div>

              </div>

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
              <strong>HOC vs Hooks:</strong> Embora o HOC tenha sido febre em 2018, em aplicações modernas a comunidade prefere esmagadoramente os <strong>Custom Hooks</strong>. HOCs criam as famosas "Wrapper Hells" (montanhas de componentes inúteis na árvore do React DevTools). Use HOCs apenas para injetar propriedades visuais, e Hooks para lógica!
            </div>
          </div>

          <div className="alert alert-success">
            <div>
              <strong>O Padrão Container/Presentational:</strong> Criado por Dan Abramov (criador do Redux). A regra é: Separe seus arquivos em Componentes "Container" (que falam com API, Redux, Zustand) e "Presentational" (que não sabem de onde a água vem, só recebem <code>props</code> e renderizam HTML bonitão). Seu código ficará infinitamente mais fácil de testar.
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
