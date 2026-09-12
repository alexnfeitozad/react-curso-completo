import React, { useState, useEffect, useCallback } from 'react';

// --- SERVIÇO FAKE API (Para controle do Laboratório) ---
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const mockUsers: User[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@computer.com', role: 'Engineer' },
  { id: 2, name: 'Alan Turing', email: 'alan@enigma.com', role: 'Cryptographer' },
  { id: 3, name: 'Grace Hopper', email: 'grace@navy.mil', role: 'Compiler Creator' },
];

const fetchUsersFakeApi = async (shouldFail: boolean, delay: number, signal?: AbortSignal): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      if (shouldFail) {
        reject(new Error('500 Internal Server Error: O banco de dados caiu!'));
      } else {
        resolve(mockUsers);
      }
    }, delay);

    // Tratando o aborto da requisição (Cleanup)
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        reject(new DOMException('Aborted', 'AbortError'));
      });
    }
  });
};


// --- COMPONENTE PRINCIPAL ---
export const Modulo05Http: React.FC = () => {
  // Estados do Laboratório
  const [data, setData] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Configurações do simulador
  const [forceError, setForceError] = useState(false);
  const [delay, setDelay] = useState(1500);

  // Função isolada de Fetch usando useCallback para não quebrar referências
  const loadData = useCallback(async (abortController: AbortController) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      // Simula uma chamada API Real (fetch / axios)
      const result = await fetchUsersFakeApi(forceError, delay, abortController.signal);
      setData(result);
    } catch (err: any) {
      // Ignoramos erros do tipo 'AbortError' pois significam apenas que o usuário saiu da tela
      if (err.name === 'AbortError') {
        console.log('Requisição cancelada (Cleanup executado).');
      } else {
        setError(err.message || 'Erro desconhecido');
      }
    } finally {
      setIsLoading(false);
    }
  }, [forceError, delay]);

  // Disparo Automático (Mounting)
  useEffect(() => {
    const controller = new AbortController();
    loadData(controller);

    // CLEANUP: Se o componente desmontar antes do fetch terminar, abortamos!
    return () => {
      controller.abort();
    };
  }, [loadData]);


  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 2: Intermediário</span>
          <span className="badge badge-neutral">Módulo 05</span>
        </div>
        <h1>Comunicação HTTP & Assincronismo</h1>
        <p className="subtitle">
          Buscando dados com Fetch/Axios, Estados de Carregamento (Loading/Error), e o temido problema de <em>Race Conditions</em> (Condição de Corrida).
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📡 1. O Padrão: <code>useEffect</code> para Buscas Iniciais
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  No React, componentes puros não podem realizar chamadas assíncronas de rede diretamente durante o processo de <em>Render</em>.
                  A busca de dados (Fetch) é considerada um <strong>Efeito Colateral (Side Effect)</strong>, portanto deve ocorrer dentro de um <code>useEffect</code>.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Geralmente usamos um <em>Array de Dependências vazio</em> <code>[]</code> para garantir que a busca à API aconteça apenas 1 vez (quando a tela abrir).
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/e0f2fe/0369a1?text=Componente+Montou%5Cn%E2%86%93%5CnuseEffect(()+=%3E+%7B+fetch()+%7D,+%5B%5D)%5Cn%E2%86%93%5CnsetState(dados)%5Cn%E2%86%93%5CnRe-renderiza+com+Dados" 
                  alt="Esquema do Ciclo de Fetching" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⏳ 2. Os 3 Estados Sagrados da UI
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Qualquer requisição HTTP leva tempo e tem grande risco de falhar. Um <em>Super Desenvolvedor</em> NUNCA ignora os estados intermediários. Você SEMPRE precisará de no mínimo 3 variáveis de estado (ou 1 objeto robusto):
                </p>
                <ul style={{ color: '#475569', lineHeight: 1.6, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li><strong><code>isLoading: boolean</code></strong> (Geralmente começa como `true`).</li>
                  <li><strong><code>error: string | null</code></strong> (Armazena a mensagem se a API cair).</li>
                  <li><strong><code>data: T | null</code></strong> (Os dados reais da API).</li>
                </ul>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/fef2f2/991b1b?text=Renderiza%C3%A7%C3%A3o+Condicional%5Cn%5Cnif+(loading)+return+%3CSpinner/%3E%5Cnif+(error)+return+%3CAlert/%3E%5Cn%5Cnreturn+%3CTabela+data=.../%3E" 
                  alt="Esquema de Loading e Erro" 
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 3 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🏎️ 3. O Inimigo Silencioso: Race Conditions (Condição de Corrida)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  <strong>Cenário:</strong> O usuário entra na tela "Usuário A" (Fetch API A leva 3s). Rapidamente, ele clica na tela "Usuário B" (Fetch API B leva 1s). O <em>Request B</em> chega primeiro e mostra os dados na tela. Mas... 2s depois, o <em>Request A</em> finalmente chega e sobrescreve a tela com os dados antigos!
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  <strong>A Solução:</strong> Usar o <code>AbortController</code> na função de Cleanup do <code>useEffect</code>. Quando o componente é desmontado (ou a dependência muda), nós <em>abortamos</em> a requisição antiga.
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/f0fdf4/166534?text=Cleanup+em+A%C3%A7%C3%A3o%5Cn%5Cnreturn+()+%3D%3E+%7B%5Cn++controller.abort()%5Cn%7D%5Cn%5CnImpede+dados+zumbis!" 
                  alt="Esquema AbortController" 
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
            O Fetch Robusto (A Prova de Balas)
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Usamos o <code>AbortController</code> nativo dos navegadores para cancelar requisições Axios ou Fetch!
          </p>
          <pre>
            <code>{`useEffect(() => {
  const controller = new AbortController();

  async function loadData() {
    try {
      // Passamos o signal pro fetch saber que pode ser cancelado
      const res = await fetch('/api/users', { signal: controller.signal });
      const data = await res.json();
      setData(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError('Falha na API');
      }
    }
  }

  loadData();

  // Se o componente for fechado antes do fetch terminar, abortamos!
  return () => controller.abort();
}, []);`}</code>
          </pre>
        </div>
      </section>

      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: O Laboratório de APIs</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-card" style={{ border: '1px solid #bae6fd', padding: 0, overflow: 'hidden' }}>
            {/* PAINEL DE CONTROLE DA API */}
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
                  Latência de Rede (Simulando 3G)
                </label>
                <select 
                  className="input" 
                  value={delay} 
                  onChange={e => setDelay(Number(e.target.value))}
                  style={{ width: '150px' }}
                >
                  <option value={200}>Rápido (200ms)</option>
                  <option value={1500}>Normal (1.5s)</option>
                  <option value={4000}>Lento (4s)</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: '42px' }}>
                <input 
                  type="checkbox" 
                  id="forceError"
                  checked={forceError}
                  onChange={e => setForceError(e.target.checked)}
                />
                <label htmlFor="forceError" style={{ fontSize: '0.9rem', color: '#ef4444', fontWeight: 600, cursor: 'pointer' }}>
                  🔥 Derrubar Servidor (Simular Erro 500)
                </label>
              </div>

              <button 
                onClick={() => {
                  const controller = new AbortController();
                  loadData(controller);
                }} 
                className="btn btn-primary"
                style={{ marginLeft: 'auto' }}
                disabled={isLoading}
              >
                🔄 Disparar Fetch Manual
              </button>

            </div>

            {/* A TELA RENDERIZADA */}
            <div style={{ padding: '2.5rem', background: '#fff', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              
              {/* Condição 1: Carregando */}
              {isLoading && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #f1f5f9', borderTop: '4px solid #0284c7', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                  <p style={{ color: '#64748b', fontWeight: 600, letterSpacing: '1px' }}>BAIXANDO DADOS...</p>
                  <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
              )}

              {/* Condição 2: Erro */}
              {!isLoading && error && (
                <div style={{ background: '#fef2f2', border: '1px solid #f87171', color: '#991b1b', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', maxWidth: '400px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💥</div>
                  <h4 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Falha Crítica na API</h4>
                  <p style={{ fontSize: '0.9rem' }}>{error}</p>
                </div>
              )}

              {/* Condição 3: Sucesso */}
              {!isLoading && !error && data && (
                <div style={{ width: '100%', maxWidth: '600px' }}>
                  <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>Usuários do Sistema</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {data.map(user => (
                      <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                        <div>
                          <strong style={{ display: 'block', color: '#0f172a' }}>{user.name}</strong>
                          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{user.email}</span>
                        </div>
                        <span className="badge badge-primary">{user.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="alert alert-danger">
            <div>
              <strong>Componentes Desmontados (Memory Leaks):</strong> Se você disparar um Fetch e o usuário clicar no botão de "Voltar" (fechando a tela), a resposta da API vai tentar atualizar um <code>setState</code> de uma tela que não existe mais. Isso causa vazamento de memória. Use <code>AbortController</code> SEMPRE.
            </div>
          </div>

          <div className="alert alert-success">
            <div>
              <strong>A Morte do useEffect para Dados:</strong> Em 2024/2026, desenvolvedores seniores raramente fazem fetch com <code>useEffect</code> puro. É extremamente recomendado pelo time do React usar bibliotecas especializadas como <strong>SWR</strong> ou <strong>React Query (TanStack Query)</strong>, que cuidam de Cache, Loading, Error, Retentativas Automáticas e Abortos sem você escrever uma linha sequer. No Módulo de Ferramentas Modernas falaremos disso!
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
