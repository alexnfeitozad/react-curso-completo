import React, { createContext, useContext, useReducer, useState } from 'react';

// --- CONTEXTOS E REDUCERS (LABORATÓRIO) ---

// 1. Tipagem e Estado Inicial
interface ThemeState {
  isDarkMode: boolean;
  primaryColor: string;
}
type ThemeAction = 
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_COLOR'; payload: string };

const initialThemeState: ThemeState = {
  isDarkMode: false,
  primaryColor: '#38bdf8', // Tailwind light blue
};

// 2. O Reducer (Lógica Pura de Transição de Estado)
function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, isDarkMode: !state.isDarkMode };
    case 'SET_COLOR':
      return { ...state, primaryColor: action.payload };
    default:
      return state;
  }
}

// 3. Criando os Contextos (Um para Dados, Um para Dispatch para evitar re-renders desnecessários)
const ThemeStateContext = createContext<ThemeState | undefined>(undefined);
const ThemeDispatchContext = createContext<React.Dispatch<ThemeAction> | undefined>(undefined);

// 4. O Provider Wrapper
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(themeReducer, initialThemeState);
  return (
    <ThemeStateContext.Provider value={state}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
};

// 5. Custom Hooks para consumir o contexto de forma segura
const useThemeState = () => {
  const context = useContext(ThemeStateContext);
  if (context === undefined) throw new Error('useThemeState must be used within a ThemeProvider');
  return context;
};
const useThemeDispatch = () => {
  const context = useContext(ThemeDispatchContext);
  if (context === undefined) throw new Error('useThemeDispatch must be used within a ThemeProvider');
  return context;
};


// --- COMPONENTES FILHOS (Consumidores do Contexto) ---

const HeaderNested = () => {
  const { isDarkMode, primaryColor } = useThemeState();
  return (
    <div style={{ padding: '1rem', background: isDarkMode ? '#1e293b' : '#f8fafc', color: isDarkMode ? '#f8fafc' : '#0f172a', borderBottom: \`3px solid \${primaryColor}\`, transition: 'all 0.3s' }}>
      <h3 style={{ margin: 0 }}>App Config (Camada 3)</h3>
    </div>
  );
};

const ColorPickerNested = () => {
  const dispatch = useThemeDispatch();
  const colors = ['#38bdf8', '#fbbf24', '#f87171', '#34d399'];
  return (
    <div style={{ padding: '1.5rem', display: 'flex', gap: '0.5rem' }}>
      <span style={{ marginRight: '1rem', fontWeight: 600 }}>Mudar Tema: </span>
      {colors.map(color => (
        <button
          key={color}
          onClick={() => dispatch({ type: 'SET_COLOR', payload: color })}
          style={{ width: '30px', height: '30px', borderRadius: '50%', background: color, border: 'none', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        />
      ))}
      <button 
        onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
        style={{ marginLeft: 'auto', padding: '0.25rem 0.75rem', borderRadius: '4px', border: '1px solid #94a3b8', background: 'transparent', cursor: 'pointer' }}
      >
        Alternar Dark/Light
      </button>
    </div>
  );
};

const DashboardNested = () => {
  const { isDarkMode, primaryColor } = useThemeState();
  return (
    <div style={{ padding: '2rem', background: isDarkMode ? '#0f172a' : '#ffffff', color: isDarkMode ? '#cbd5e1' : '#334155', minHeight: '150px', transition: 'all 0.3s' }}>
      <p>Este painel está lendo dados globais profundos sem receber NENHUMA <code>prop</code> diretamente.</p>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1, height: '80px', borderRadius: '8px', background: isDarkMode ? '#1e293b' : '#f1f5f9', borderLeft: \`4px solid \${primaryColor}\` }}></div>
        <div style={{ flex: 1, height: '80px', borderRadius: '8px', background: isDarkMode ? '#1e293b' : '#f1f5f9', borderLeft: \`4px solid \${primaryColor}\` }}></div>
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL (Página Módulo 4) ---
export const Modulo04ContextApi: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 2: Intermediário</span>
          <span className="badge badge-neutral">Módulo 04</span>
        </div>
        <h1>Context API & Reducers</h1>
        <p className="subtitle">
          Gerenciamento de Estado Avançado: Derrotando o Prop Drilling e escalando a complexidade com useReducer + useContext.
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🕳️ 1. O Problema: Prop Drilling
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  A forma padrão de passar dados no React é via <strong>props</strong>. Mas quando sua árvore de componentes cresce, passar uma variável do "Avô" para o "Neto" exige passar pelo "Filho", mesmo que o Filho não use aquela informação. 
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Esse processo de encadear propriedades por várias camadas é chamado de <strong>Prop Drilling</strong> (Perfuração de Props). Ele polui o código, acopla componentes e causa re-renders desnecessários no meio do caminho.
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/fee2e2/991b1b?text=Prop+Drilling%5Cn%5CnApp+(tem+o+User)%5Cn%E2%86%93%5CnDashboard+(n%C3%A3o+usa,+s%C3%B3+repassa)%5Cn%E2%86%93%5CnNavBar+(n%C3%A3o+usa,+s%C3%B3+repassa)%5Cn%E2%86%93%5CnAvatar+(FINALMENTE+USA)" 
                  alt="Esquema de Prop Drilling" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🌍 2. A Solução: Context API
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  O Context API permite que um componente "Pai" declare uma variável global (um contexto) e qualquer componente "descendente", não importa quão fundo na árvore, possa pedir acesso direto a esse contexto usando o hook <code>useContext()</code>.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Isso cria uma espécie de "teletransporte" de dados, pulando completamente os componentes intermediários.
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/ecfdf5/065f46?text=Context+API%5Cn%5CnProvider+(Nuvem+de+Dados)%5Cn%E2%AC%87%EF%B8%8F%5Cn%5CnAvatar+usa+useContext()%5Cn%5BTeletransporte+Direto%5D" 
                  alt="Esquema da Context API" 
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 3 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🧠 3. Escalando com useReducer
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  A documentação oficial recomenda: quando o <code>useState</code> começa a ficar complexo (muitos objetos, lógicas entrelaçadas), mude para o <strong>useReducer</strong>.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Um Reducer é uma função pura externa ao componente que recebe o <code>Estado Atual</code> e uma <code>Ação</code>, e retorna o <code>Novo Estado</code>. Ao juntar <code>useReducer</code> com <code>Context API</code>, nós criamos um mini-Redux nativo do React!
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/eff6ff/1d4ed8?text=(State,+Action)+=%3E+New+State%5Cn%5Cndispatch(%7B+type:+'SET_COLOR'+%7D)" 
                  alt="Esquema useReducer" 
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
            Consumindo o Contexto de Forma Segura
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            A melhor prática para consumir contextos é criar um <em>Custom Hook</em>. Se alguém tentar usar o hook fora do <code>Provider</code>, o sistema lança um erro, evitando bugs silenciosos.
          </p>
          <pre>
            <code>{`// Em vez de exportar ThemeContext e usar useContext() em cada arquivo...

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};

// Uso limpo:
// const theme = useTheme();`}</code>
          </pre>
        </div>
      </section>

      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: Laboratório Global (Context + Reducer)</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-card" style={{ border: '1px solid #bae6fd', padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                🔬 Simulador de Configurações Globais
              </h3>
              <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0 }}>
                Neste laboratório, nós envelopamos os componentes com o <code>ThemeProvider</code>. 
                Os três componentes abaixo estão aninhados de forma isolada, mas respondem instantaneamente aos comandos porque leem da mesma <strong>Nuvem de Dados (Contexto)</strong> usando <strong>Dispatch Actions (Reducer)</strong>.
              </p>
            </div>

            {/* AQUI COMEÇA O ESCOPO DO CONTEXTO */}
            <ThemeProvider>
              <div style={{ padding: '2rem', background: '#f1f5f9' }}>
                <div style={{ border: '2px dashed #94a3b8', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                  <HeaderNested />
                  <ColorPickerNested />
                  <DashboardNested />
                </div>
              </div>
            </ThemeProvider>
            
          </div>
        </div>
      </section>

      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="alert alert-danger">
            <div>
              <strong>O Context API Causa Re-Renders!</strong> Sempre que o valor passado para o <code>Provider</code> mudar (mesmo que seja uma nova referência de array ou objeto), TODOS os componentes que chamam <code>useContext</code> naquele provider irão re-renderizar obrigatoriamente.
            </div>
          </div>

          <div className="alert alert-success">
            <div>
              <strong>Divida para Conquistar:</strong> Para problemas de performance, separe seu estado em múltiplos Contextos. Como fizemos neste módulo: um <code>ThemeStateContext</code> (para quem precisa ler cores) e um <code>ThemeDispatchContext</code> separado (para quem só precisa do botão, mas não quer renderizar toda vez que a cor muda).
            </div>
          </div>
          
          <div className="alert alert-warning">
            <div>
              <strong>Cuidado Extremo:</strong> O Context API <strong>não substitui totalmente</strong> libs como Zustand ou Redux. Ele serve para "Injeção de Dependência" ou dados de baixa volatilidade (tema escuro, usuário logado). Para dados que atualizam 60 vezes por segundo (como um player de vídeo ou gráficos de bolsa de valores), Contexts matarão sua performance.
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
