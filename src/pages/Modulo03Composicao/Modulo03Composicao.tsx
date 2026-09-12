import React, { useState, createContext, useContext, type ReactNode } from 'react';

// --- Custom Hook 1: useToggle ---
function useToggle(initialValue = false): [boolean, () => void, (val: boolean) => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((v) => !v);
  return [value, toggle, setValue];
}

// --- Custom Hook 2: useLocalStorage (Simulado / Reativo) ---
function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, setValue];
}

// --- Compound Components: Accordion Pattern ---
interface AccordionContextType {
  activeId: string | null;
  toggleItem: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

const Accordion: React.FC<{ children: ReactNode; defaultOpenId?: string }> & {
  Item: React.FC<{ id: string; children: ReactNode }>;
  Header: React.FC<{ id: string; children: ReactNode; icon?: string }>;
  Content: React.FC<{ id: string; children: ReactNode }>;
} = ({ children, defaultOpenId = '1' }) => {
  const [activeId, setActiveId] = useState<string | null>(defaultOpenId);

  const toggleItem = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <AccordionContext.Provider value={{ activeId, toggleItem }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{children}</div>
    </AccordionContext.Provider>
  );
};

Accordion.Item = ({ children }) => {
  return (
    <div
      style={{
        border: '1px solid var(--neutral-200)',
        borderRadius: 'var(--radius-md)',
        background: '#ffffff',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {children}
    </div>
  );
};

Accordion.Header = ({ id, children, icon = '📁' }) => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion.Header deve estar dentro de Accordion');

  const isOpen = ctx.activeId === id;

  return (
    <button
      onClick={() => ctx.toggleItem(id)}
      style={{
        width: '100%',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: isOpen ? '#f0f9ff' : '#ffffff',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 700,
        color: isOpen ? '#0284c7' : '#0f172a',
        fontSize: '0.95rem',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span>{icon}</span>
        <span>{children}</span>
      </div>
      <span style={{ fontSize: '1.2rem', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease' }}>
        ›
      </span>
    </button>
  );
};

Accordion.Content = ({ id, children }) => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion.Content deve estar dentro de Accordion');

  if (ctx.activeId !== id) return null;

  return (
    <div
      style={{
        padding: '1rem 1.25rem',
        borderTop: '1px solid #f1f5f9',
        background: '#fafafa',
        fontSize: '0.9rem',
        color: '#475569',
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
};

export const Modulo03Composicao: React.FC = () => {
  
  // Interactive Custom Hook State
  const [panelOpen, togglePanel] = useToggle(true);
  const [themePref, setThemePref] = useLocalStorage<'system' | 'dark' | 'light'>('react_theme_pref', 'system');
  const [userName, setUserName] = useLocalStorage<string>('react_user_name', 'Alexandre');

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 1: Base dos Componentes</span>
          <span className="badge badge-neutral">Módulo 03</span>
        </div>
        <h1>Composição & Custom Hooks</h1>
        <p className="subtitle">
          Compound Components, Projeção flexível via children e Criação de Custom Hooks Reutilizáveis.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              O que são Compound Components?
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Compound Components é o mesmo padrão usado pelos elementos nativos <code>&lt;select&gt;</code> e <code>&lt;option&gt;</code>.
              Eles trabalham juntos compartilhando um estado implícito por meio de Contexto, permitindo ao desenvolvedor compor a interface com flexibilidade total.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Regras dos Custom Hooks
            </h3>
            <ul style={{ marginLeft: '1.5rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>O nome deve <strong>obrigatoriamente</strong> iniciar com o prefixo <code>use</code> (ex: <code>useFetch</code>, <code>useAuth</code>).</li>
              <li>Podem e devem chamar outros hooks do React internamente.</li>
              <li>Não compartilham estado global diretamente: cada chamada de um Custom Hook cria uma instância de estado independente para o componente consumidor.</li>
            </ul>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Implementação de Custom Hook em TypeScript
          </h3>
          <pre>
            <code>{`import { useState, useEffect } from 'react';

// Custom Hook tipado com Generics
export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Lab 1: Compound Components Accordion */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              🧩 Laboratório 1: Padrão Compound Component (Accordion)
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Veja como os componentes <code>Accordion.Item</code>, <code>Accordion.Header</code> e <code>Accordion.Content</code> compartilham estado internamente via Contexto sem poluir quem usa o componente com dezenas de props.
            </p>

            <Accordion defaultOpenId="solid">
              <Accordion.Item id="solid">
                <Accordion.Header id="solid" icon="🏛️">
                  Princípios SOLID no Frontend
                </Accordion.Header>
                <Accordion.Content id="solid">
                  Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation e Dependency Inversion garantem que cada componente ou hook tenha um único motivo para mudar.
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item id="hooks">
                <Accordion.Header id="hooks" icon="🪝">
                  Por que criar Custom Hooks?
                </Accordion.Header>
                <Accordion.Content id="hooks">
                  Custom Hooks permitem extrair lógica de componentes e reutilizá-la em qualquer lugar. Eles podem utilizar outros hooks (useState, useEffect, useMemo) internamente sem acoplar a UI.
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item id="perf">
                <Accordion.Header id="perf" icon="⚡">
                  Arquitetura de Composição vs Herança
                </Accordion.Header>
                <Accordion.Content id="perf">
                  No React, a composição via <code>children</code> e Compound Components elimina a necessidade de hierarquias rígidas de classes, oferecendo máxima flexibilidade e manutenibilidade.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>

          {/* Lab 2: Custom Hooks (useToggle & useLocalStorage) */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              🧰 Laboratório 2: Custom Hooks em Ação (useLocalStorage & useToggle)
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Teste a persistência e reatividade dos hooks customizados abaixo. Os valores são sincronizados com o <code>localStorage</code> do seu navegador!
            </p>

            <div className="grid-2">
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Hook <code>useLocalStorage</code></h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Nome do Aluno:</label>
                    <input
                      type="text"
                      className="input"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Tema Preferido:</label>
                    <select
                      className="input"
                      value={themePref}
                      onChange={(e) => setThemePref(e.target.value as any)}
                    >
                      <option value="system">🖥️ Sistema Operacional</option>
                      <option value="dark">🌙 Dark Glassmorphism</option>
                      <option value="light">☀️ Clean Ice Light</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Hook <code>useToggle</code></h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
                  Estado atual: <strong>{panelOpen ? '🟢 Aberto' : '🔴 Fechado'}</strong>
                </p>
                <button onClick={togglePanel} className="btn btn-primary btn-sm" style={{ marginBottom: '1rem' }}>
                  Alternar Painel ({panelOpen ? 'Ocultar' : 'Exibir'})
                </button>

                {panelOpen && (
                  <div style={{ padding: '0.85rem', background: '#ecfeff', border: '1px solid #a5f3fc', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: '#0e7490' }}>
                    ✨ Olá, <strong>{userName}</strong>! Seu tema preferido salvo no localStorage é <strong>{themePref}</strong>.
                  </div>
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
          <div className="alert alert-info">
            <div>
              <strong>Dica de Arquitetura:</strong> Sempre prefira composição com <code>children</code> antes de criar propriedades de configuração complexas (<em>props explosions</em>) em seus componentes.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
