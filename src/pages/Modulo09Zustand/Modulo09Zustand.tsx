import React, { useState } from 'react';
import { create } from 'zustand';
import confetti from 'canvas-confetti';

// --- Zustand Store Interface ---
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  coupon: string | null;
  discountPercent: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  applyCoupon: (code: string) => boolean;
  clearCart: () => void;
}

const AVAILABLE_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Formação React 19 Pro', price: 297, category: 'Curso' },
  { id: 'p2', name: 'Livro Arquitetura Frontend', price: 89, category: 'E-book' },
  { id: 'p3', name: 'Mentoria Privada 1:1', price: 550, category: 'Mentoria' },
  { id: 'p4', name: 'Acesso Vitalício Comunidade', price: 149, category: 'Acesso' }
];

export const useCartStore = create<CartStore>((set, get) => ({
  items: [
    { id: 'p1', name: 'Formação React 19 Pro', price: 297, category: 'Curso', quantity: 1 }
  ],
  coupon: null,
  discountPercent: 0,

  addItem: (product) => {
    const existing = get().items.find(i => i.id === product.id);
    if (existing) {
      set({
        items: get().items.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      });
    } else {
      set({ items: [...get().items, { ...product, quantity: 1 }] });
    }
  },

  removeItem: (id) => {
    set({ items: get().items.filter(i => i.id !== id) });
  },

  updateQuantity: (id, delta) => {
    set({
      items: get().items
        .map(i => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    });
  },

  applyCoupon: (code) => {
    if (code.trim().toUpperCase() === 'ARQUITETO15') {
      set({ coupon: 'ARQUITETO15', discountPercent: 15 });
      return true;
    }
    return false;
  },

  clearCart: () => {
    set({ items: [], coupon: null, discountPercent: 0 });
  }
}));

export const Modulo09Zustand: React.FC = () => {
    const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const { items, discountPercent, addItem, removeItem, updateQuantity, applyCoupon, clearCart } =
    useCartStore();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponMsg({ text: '🎉 Cupom ARQUITETO15 aplicado com 15% de desconto!', ok: true });
      confetti({ particleCount: 50, spread: 60 });
    } else {
      setCouponMsg({ text: '❌ Cupom inválido. Tente usar "ARQUITETO15"', ok: false });
    }
    setCouponInput('');
  };

  const handleCheckout = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    alert(`Compra de R$ ${total.toFixed(2)} confirmada com sucesso!`);
    clearCart();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 2: Ecossistema Reativo</span>
          <span className="badge badge-neutral">Módulo 09</span>
        </div>
        <h1>State Management com Zustand</h1>
        <p className="subtitle">
          Gerenciamento de estado global reativo, atômico, sem boilerplate e de altíssima performance.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Por que o Zustand substituiu o Redux antigo no mercado moderno?
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Zustand baseia-se no princípio de <strong>imutabilidade e seletores atômicos</strong>. Seus diferenciais incluem:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Zero Boilerplate:</strong> Não precisa de <code>&lt;Provider&gt;</code> cercando toda a árvore da aplicação.</li>
              <li><strong>Seletores Granulares:</strong> O componente só re-renderiza quando a propriedade selecionada mudar (<code>useCartStore(s =&gt; s.total)</code>).</li>
              <li><strong>Acesso Fora do React:</strong> Você pode ler ou alterar a store dentro de funções JavaScript puras (ex: interceptors de API).</li>
            </ul>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Store Zustand em TypeScript
          </h3>
          <pre>
            <code>{`import { create } from 'zustand';

interface StoreState {
  count: number;
  increment: () => void;
}

export const useStore = create<StoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Métricas do Carrinho */}
          <div className="grid-2">
            <div className="stat-card" style={{ background: '#ffffff' }}>
              <span className="stat-value">{totalItems}</span>
              <span className="stat-label">Itens no Carrinho</span>
              <span className="stat-detail">Sincronizados globalmente via Zustand</span>
            </div>

            <div className="stat-card" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
              <span className="stat-value" style={{ color: '#16a34a' }}>R$ {total.toFixed(2)}</span>
              <span className="stat-label">Total com Descontos</span>
              <span className="stat-detail">{discountPercent > 0 ? `Desconto de ${discountPercent}% aplicado` : 'Sem cupom ativo'}</span>
            </div>
          </div>

          <div className="grid-2">
            {/* Catálogo de Produtos */}
            <div className="glass-card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
                🛍️ Catálogo Disponível
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {AVAILABLE_PRODUCTS.map(prod => (
                  <div
                    key={prod.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      background: '#f8fafc',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--neutral-200)',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{prod.name}</div>
                      <span style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 600 }}>R$ {prod.price.toFixed(2)}</span>
                    </div>
                    <button onClick={() => addItem(prod)} className="btn btn-primary btn-sm">
                      + Adicionar
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Carrinho de Compras Interativo */}
            <div className="glass-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>🛒 Carrinho Global ({items.length})</h3>
                {items.length > 0 && (
                  <button onClick={clearCart} className="btn btn-sm" style={{ color: '#ef4444' }}>
                    Esvaziar
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
                  Seu carrinho está vazio. Adicione itens do catálogo ao lado!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {items.map(item => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        background: '#ffffff',
                        border: '1px solid var(--neutral-200)',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          R$ {item.price.toFixed(2)} cada
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button onClick={() => updateQuantity(item.id, -1)} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.6rem' }}>
                          -
                        </button>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.6rem' }}>
                          +
                        </button>
                        <button onClick={() => removeItem(item.id)} className="btn btn-danger btn-sm" style={{ padding: '0.2rem 0.5rem' }}>
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Cupom Form */}
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Cupom (ex: ARQUITETO15)"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                    />
                    <button type="submit" className="btn btn-secondary btn-sm">Aplicar</button>
                  </form>

                  {couponMsg && (
                    <div style={{ fontSize: '0.8rem', color: couponMsg.ok ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
                      {couponMsg.text}
                    </div>
                  )}

                  {/* Resumo */}
                  <div style={{ borderTop: '1px solid var(--neutral-200)', paddingTop: '0.75rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                      <span>Subtotal:</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a', fontWeight: 600 }}>
                        <span>Desconto ({discountPercent}%):</span>
                        <span>- R$ {discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>
                      <span>Total:</span>
                      <span style={{ color: '#0284c7' }}>R$ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button onClick={handleCheckout} className="btn btn-success" style={{ marginTop: '0.5rem' }}>
                    💳 Finalizar Compra
                  </button>
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
              <strong>Uso de Seletores:</strong> Sempre extraia dados com seletores específicos (ex: <code>const total = useCartStore(s =&gt; s.total)</code>) em vez de puxar toda a store (<code>const store = useCartStore()</code>). Isso previne re-renders desnecessários.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
