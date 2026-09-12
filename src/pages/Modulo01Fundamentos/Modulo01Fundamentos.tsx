import React, { useState } from 'react';

export const Modulo01Fundamentos: React.FC = () => {
  
  // Interactive state for Immutability Lab
  const [userProfile, setUserProfile] = useState({
    name: 'Ana Silva',
    role: 'Engenheira Frontend',
    skills: ['JavaScript', 'TypeScript', 'React'],
    stats: { commits: 42, score: 98 }
  });
  const [newSkill, setNewSkill] = useState('');
  const [historyLog, setHistoryLog] = useState<string[]>(['Estado inicial carregado com sucesso.']);

  // Virtual DOM Visualizer State
  const [counter, setCounter] = useState(0);
  const [items, setItems] = useState([
    { id: '1', label: 'Compreender JSX como React.createElement()' },
    { id: '2', label: 'Garantir imutabilidade ao atualizar estado' },
    { id: '3', label: 'Compreender reconciliação e o algoritmo Fiber' }
  ]);
  const [newItemText, setNewItemText] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;

    // Prática correta de imutabilidade: novo array com spread operator
    setUserProfile(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()]
    }));
    setHistoryLog(prev => [
      `[Imutabilidade OK] Nova skill adicionada: "${newSkill.trim()}" gerando nova referência de memória.`,
      ...prev.slice(0, 7)
    ]);
    setNewSkill('');
  };

  const handleIncrementCommits = () => {
    setUserProfile(prev => ({
      ...prev,
      stats: { ...prev.stats, commits: prev.stats.commits + 1 }
    }));
    setHistoryLog(prev => [
      `[Imutabilidade OK] Commits incrementados para ${userProfile.stats.commits + 1}.`,
      ...prev.slice(0, 7)
    ]);
  };

  const handleAddItem = () => {
    if (!newItemText.trim()) return;
    setItems(prev => [...prev, { id: String(Date.now()), label: newItemText.trim() }]);
    setNewItemText('');
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 1: Base dos Componentes</span>
          <span className="badge badge-neutral">Módulo 01</span>
        </div>
        <h1>Fundamentos do React 19</h1>
        <p className="subtitle">
          Virtual DOM, JSX Desmistificado, Props, Imutabilidade e Árvore de Elementos.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              1. O que é o JSX por baixo dos panos?
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              JSX não é HTML. É uma extensão sintática para JavaScript. Quando você escreve{' '}
              <code>&lt;button className="btn"&gt;Clique&lt;/button&gt;</code>, o compilador (Babel/Vite) transforma isso em uma chamada:
            </p>
            <pre style={{ marginTop: '0.5rem' }}>
              <code>{`// Transformação do JSX:
React.createElement('button', { className: 'btn' }, 'Clique');

// No React 19 com jsx-runtime:
import { jsx as _jsx } from 'react/jsx-runtime';
_jsx('button', { className: 'btn', children: 'Clique' });`}</code>
            </pre>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              2. O Ciclo de Reconciliação (Fiber Architecture)
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              A atualização no React ocorre em duas fases fundamentais:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Fase de Render (Diffing):</strong> O React chama seus componentes, constrói a nova árvore de elementos e calcula as diferenças em relação à árvore anterior. Esta fase é assíncrona e pura.</li>
              <li><strong>Fase de Commit:</strong> O React aplica apenas as mutações estritamente necessárias no DOM real do navegador de forma síncrona.</li>
            </ul>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Padrão de Imutabilidade Estrita em TypeScript
          </h3>
          <pre>
            <code>{`import React, { useState } from 'react';

interface UserProfile {
  name: string;
  skills: string[];
  stats: { score: number };
}

export const ProfileEditor: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    name: 'Carlos Dev',
    skills: ['React', 'TypeScript'],
    stats: { score: 100 }
  });

  // ✅ FORMA CORRETA: Criar novas referências para objetos aninhados
  const addSkill = (skill: string) => {
    setUser(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
  };

  // ❌ FORMA INCORRETA (Mutação direta):
  // user.skills.push(skill);
  // setUser(user); // React NÃO detectará mudança pois user === prev!

  return (
    <div>
      <h3>{user.name}</h3>
      <p>Score: {user.stats.score}</p>
    </div>
  );
};`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Lab 1: Imutabilidade */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              🔬 Laboratório 1: Imutabilidade e Referências de Memória
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              No React, o estado NUNCA deve ser modificado diretamente (ex: <code>profile.skills.push()</code>).
              Criar novos objetos com <code>...spread</code> garante que a reconciliação detecte a mudança por igualdade referencial (<code>O(1)</code>).
            </p>

            <div className="grid-2">
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>Perfil do Usuário (Estado Atual)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
                  <div><strong>Nome:</strong> {userProfile.name}</div>
                  <div><strong>Cargo:</strong> {userProfile.role}</div>
                  <div><strong>Commits:</strong> {userProfile.stats.commits}</div>
                  <div><strong>Score:</strong> {userProfile.stats.score}%</div>
                  <div>
                    <strong>Skills:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
                      {userProfile.skills.map((s, idx) => (
                        <span key={idx} className="badge badge-primary">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Nova habilidade..."
                      value={newSkill}
                      onChange={e => setNewSkill(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary btn-sm">Adicionar</button>
                  </form>
                  <button onClick={handleIncrementCommits} className="btn btn-secondary btn-sm">
                    Incrementar Commits (+1)
                  </button>
                </div>
              </div>

              <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                  📡 Log de Mudança Referencial (Histórico)
                </h4>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  {historyLog.map((log, idx) => (
                    <div key={idx} style={{ color: idx === 0 ? '#4ade80' : '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.35rem' }}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lab 2: Virtual DOM & Reconciliação */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              ⚡ Laboratório 2: Reconciliação & Keys no Virtual DOM
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              O React compara o Virtual DOM anterior com o novo (Diffing Algorithm). Observe como o contador re-renderiza isoladamente sem recriar os outros nós da lista.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '0.85rem 1.25rem', background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.9rem', color: '#0369a1', fontWeight: 600 }}>Contador Isolado: </span>
                <strong style={{ fontSize: '1.4rem', color: '#0284c7' }}>{counter}</strong>
              </div>
              <button onClick={() => setCounter(c => c + 1)} className="btn btn-primary">
                + Incrementar Contador
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                className="input"
                placeholder="Adicionar conceito à lista..."
                value={newItemText}
                onChange={e => setNewItemText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddItem()}
              />
              <button onClick={handleAddItem} className="btn btn-primary">
                Inserir
              </button>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {items.map(item => (
                <li
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    background: '#f8fafc',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--neutral-200)'
                  }}
                >
                  <span style={{ fontSize: '0.9rem', color: '#1e293b' }}>
                    🔑 <code>key="{item.id}"</code> — {item.label}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-warning">
            <div>
              <strong>Armadilha Comum:</strong> Usar o índice do array como <code>key</code> em listas dinâmicas (<code>key=&#123;index&#125;</code>). Isso causa bugs graves de estado preservado ao reordenar ou remover itens. Sempre use IDs estáveis e únicos.
            </div>
          </div>

          <div className="alert alert-success">
            <div>
              <strong>Padrão de Produção:</strong> Mantenha os componentes puros. Um componente React deve ser idempotente: dada a mesma entrada de <code>props</code> e <code>state</code>, ele deve produzir exatamente a mesma saída de JSX sem efeitos colaterais na fase de render.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
