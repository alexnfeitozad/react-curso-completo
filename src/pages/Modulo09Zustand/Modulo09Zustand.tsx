import React, { useRef } from 'react';
import { create } from 'zustand';

// --- ZUSTAND STORE (A Mágica acontece aqui!) ---
interface CartState {
  items: string[];
  addItem: (item: string) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
}

// Criando a Loja Global (Store)
// Repare que NÃO precisamos envelopar o App em nenhum <Provider>!
const useCartStore = create<CartState>((set) => ({
  items: [],
  
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
  
  removeItem: (indexToRemove) => set((state) => ({ 
    items: state.items.filter((_, index) => index !== indexToRemove) 
  })),
  
  clearCart: () => set({ items: [] }),
}));


// --- COMPONENTES FILHOS ISOLADOS ---

const FakeNavbar = () => {
  // SELETOR: O componente SÓ re-renderiza se a quantidade de itens mudar!
  // Se o nome do item mudar, ele ignora. Isso é performance extrema.
  const itemCount = useCartStore((state) => state.items.length);

  return (
    <div style={{ padding: '1rem 2rem', background: '#0f172a', color: '#fff', display: 'flex', justifyContent: 'space-between', borderRadius: '8px 8px 0 0' }}>
      <div style={{ fontWeight: 800, letterSpacing: '1px' }}>🛒 ZUSTAND SHOP</div>
      <div style={{ background: '#ef4444', padding: '0.25rem 0.75rem', borderRadius: '24px', fontSize: '0.85rem', fontWeight: 600 }}>
        Carrinho: {itemCount}
      </div>
    </div>
  );
};

const ProductCatalog = () => {
  // Aqui nós pegamos APENAS a ação de adicionar. 
  // Alterações no array de items NÃO causarão re-render aqui!
  const addItem = useCartStore((state) => state.addItem);
  
  const products = ['Monitor 144hz', 'Teclado Mecânico', 'Mouse Gamer', 'Cadeira Ergônomica'];

  return (
    <div style={{ padding: '2rem', background: '#f8fafc', borderRight: '1px solid #e2e8f0', flex: 2 }}>
      <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '1.5rem' }}>Catálogo de Produtos</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {products.map((prod) => (
          <div key={prod} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#334155', fontSize: '0.95rem' }}>{prod}</h4>
            <button 
              onClick={() => addItem(prod)}
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
            >
              + Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const CartSidebar = () => {
  // Pegamos os itens, a função de remover e a de limpar
  const { items, removeItem, clearCart } = useCartStore();

  return (
    <div style={{ padding: '2rem', background: '#fff', flex: 1, minWidth: '300px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0 }}>Seu Carrinho</h3>
        {items.length > 0 && (
          <button onClick={clearCart} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>
            Esvaziar
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', marginTop: '3rem' }}>O carrinho está vazio.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map((item, index) => (
            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f1f5f9', padding: '0.75rem 1rem', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 500 }}>{item}</span>
              <button 
                onClick={() => removeItem(index)}
                style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


// --- COMPONENTE PRINCIPAL (PÁGINA) ---
export const Modulo09Zustand: React.FC = () => {
  
  // Ref para capturar o momento exato em que a página renderiza (Para provar o conceito de evitar re-renders)
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 3: Avançado</span>
          <span className="badge badge-neutral">Módulo 09</span>
        </div>
        <h1>Zustand (Gerenciamento Global de Estado)</h1>
        <p className="subtitle">
          O Padrão Ouro do mercado atual: Menos boilerplate que o Redux, mais rápido que o Context API, sem a necessidade de Providers.
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🐻 1. O Problema do Redux (O Urso Veio Resolver)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Durante anos, o <strong>Redux</strong> foi rei. Mas para alterar 1 variável, você precisava criar 1 Action, 1 Reducer, 1 Type, e envelopar seu app inteiro com um <code>&lt;Provider&gt;</code>.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  O <strong>Zustand</strong> (Urso, em alemão) mudou isso. Ele usa <em>Hooks</em> do React por debaixo dos panos. Você cria uma Store em 5 linhas de código, importa o Hook onde quiser e já sai usando, ignorando totalmente a árvore de componentes.
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/fee2e2/991b1b?text=Redux:+10+Arquivos%5CnContextAPI:+Provider+Hell%5Cn%5CnZustand:+create()+%3E+useStore()%5Cn(Paz+e+Tranquilidade)" 
                  alt="Esquema Zustand vs Redux" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🎯 2. Performance Absurda (Seletores)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  A grande falha do Context API é: se o estado global mudar, TODOS os componentes que usam o Context re-renderizam.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  O Zustand obriga você a ser específico. Ao fazer <code>useStore(state =&gt; state.nome)</code>, o componente <strong>avisa ao Zustand:</strong> "Só me re-renderize se o <em>NOME</em> mudar!". Se a Idade ou o Carrinho mudarem, o componente fica intacto.
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/f0fdf4/166534?text=O+Poder+do+Seletor%5Cn%5Cn%5BAvatar%5D+l%C3%AA:+state.foto%5Cn%5BCarrinho%5D+l%C3%AA:+state.total%5Cn%5CnMuda+Carrinho?%5CnAvatar+N%C3%83O+Renderiza!" 
                  alt="Esquema de Seletores Zustand" 
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
            A Sintaxe Mínima do Zustand
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            É tão simples que você pode criar e usar no mesmo arquivo! A função <code>set</code> faz o "merge" do estado novo com o antigo automaticamente (ao contrário do useState).
          </p>
          <pre>
            <code>{`import { create } from 'zustand';

// 1. Crie a Store
const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

// 2. Use onde quiser! (Fora de Providers)
function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>
}`}</code>
          </pre>
        </div>
      </section>

      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: O E-commerce Isolado</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-card" style={{ border: '1px solid #bae6fd', padding: 0, overflow: 'hidden' }}>
            
            {/* COMPONENTES ZUSTAND EM AÇÃO */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FakeNavbar />
              
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <ProductCatalog />
                <CartSidebar />
              </div>
            </div>
            
          </div>
          
          <div className="glass-card" style={{ background: '#0f172a', color: '#38bdf8', border: '1px solid #38bdf8' }}>
            <h4 style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
              Monitor de Re-renders (Pai Módulo 09)
            </h4>
            <p style={{ color: '#fff', margin: 0, fontSize: '0.9rem' }}>
              Renderizações deste componente pai: <strong style={{ color: '#ef4444', fontSize: '1.2rem' }}>{renderCount.current}</strong>
            </p>
            <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.5rem' }}>
              * Repare que você pode adicionar e remover 500 itens no carrinho acima, e <strong>este número não vai aumentar!</strong> O Zustand altera SOMENTE o componente <code>FakeNavbar</code> e o <code>CartSidebar</code> lá dentro, bypassando a árvore inteira. Isso é otimização de verdade.
            </p>
          </div>

        </div>
      </section>

      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="alert alert-warning">
            <div>
              <strong>Regra de Ouro (Seletores Granulares):</strong> Nunca faça <code>const state = useStore()</code>. Se você fizer isso, seu componente vai se inscrever em TUDO da Store. Se qualquer variável mudar, seu componente re-renderiza. Sempre faça <code>const nome = useStore(state =&gt; state.nome)</code>!
            </div>
          </div>

          <div className="alert alert-success">
            <div>
              <strong>Middlewares Integrados:</strong> O Zustand vem com middlewares poderosos de fábrica. Você pode embrulhar sua Store com o middleware <code>persist</code> e todo o seu carrinho de compras será salvo no <strong>localStorage</strong> instantaneamente, sem precisar escrever 1 linha de `JSON.stringify`!
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
