import React, { useState, useMemo, useCallback, memo } from 'react';

// --- SUB-COMPONENTES PARA LABORATÓRIO 1: React.memo & useCallback ---

interface ExpensiveChildProps {
  onAction: () => void;
  title: string;
}

// O memo() impede que este componente re-renderize SE as props forem iguais!
const ExpensiveChild = memo(({ onAction, title }: ExpensiveChildProps) => {
  // Simulando que renderizar esse cara custa caro visualmente piscando a cor
  const renderTime = new Date().toLocaleTimeString();
  
  return (
    <div style={{ padding: '1rem', border: '2px solid #3b82f6', borderRadius: '8px', background: '#eff6ff', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <h4 style={{ margin: 0, color: '#1e3a8a' }}>{title}</h4>
      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Último Render: <strong>{renderTime}</strong></p>
      <button onClick={onAction} className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start', background: '#3b82f6', color: '#fff', border: 'none' }}>
        Ação do Filho
      </button>
    </div>
  );
});
ExpensiveChild.displayName = 'ExpensiveChild';


// --- LABORATÓRIO 2: useMemo (Cálculos Pesados) ---

const generateHugeList = () => {
  const list = [];
  for (let i = 0; i < 5000; i++) {
    list.push({ id: i, value: Math.floor(Math.random() * 10000) });
  }
  return list;
};

const defaultList = generateHugeList();


// --- COMPONENTE PRINCIPAL (PÁGINA) ---
export const Modulo11Performance: React.FC = () => {
  // --- Estados Lab 1 ---
  const [parentCounter, setParentCounter] = useState(0);
  
  // SEM useCallback: Esta função é recriada na memória a cada clique no Parent!
  const badHandleAction = () => {
    console.log('Action disparada no modo BAD');
  };

  // COM useCallback: Esta função é guardada no cofre do React e reutilizada.
  const goodHandleAction = useCallback(() => {
    console.log('Action disparada no modo GOOD');
  }, []);

  // --- Estados Lab 2 ---
  const [filterText, setFilterText] = useState('');
  const [forceUpdate, setForceUpdate] = useState(0);
  const [useMemoActive, setUseMemoActive] = useState(true);

  // Filtro "Pesado" (5000 itens)
  // Sem useMemo, digitar no input vai travar o React rodando 5000 iterações a cada letra!
  const filteredList = useMemoActive 
    ? useMemo(() => {
        // Simulando lentidão extra para fins didáticos
        const start = performance.now();
        while (performance.now() - start < 50) { /* trava por 50ms */ }
        return defaultList.filter(item => item.value.toString().includes(filterText));
      }, [filterText]) 
    : (() => {
        const start = performance.now();
        while (performance.now() - start < 50) { /* trava por 50ms */ }
        return defaultList.filter(item => item.value.toString().includes(filterText));
      })();

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 3: Avançado</span>
          <span className="badge badge-neutral">Módulo 11</span>
        </div>
        <h1>Performance Máxima (useMemo, useCallback & memo)</h1>
        <p className="subtitle">
          Entendendo o motor do React e prevenindo Re-Renders caros. Como escalar aplicações sem destruir a memória do navegador.
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🧨 1. O Efeito Dominó do React
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  A regra de ouro do React é: <strong>"Se o Componente Pai renderizar, TODOS os Componentes Filhos renderizam por tabela"</strong>. Mesmo que as props do Filho não tenham mudado!
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Isso geralmente não é problema, pois o Virtual DOM é muito rápido. Mas quando o componente filho é uma Tabela com 2.000 gráficos, esse "re-render grátis" trava a tela.
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/fee2e2/991b1b?text=setState(Pai)%5Cn%E2%86%93%5CnRenderiza+Pai%5Cn%E2%86%93%5CnRenderiza+Filho+A+(%21)%5CnRenderiza+Filho+B+(%21)" 
                  alt="Esquema Efeito Dominó" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🛡️ 2. React.memo() & useCallback
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Para parar o dominó, usamos o <code>React.memo(Componente)</code>. Ele avisa o React: "Só me renderize se minhas <strong>props</strong> mudarem!".
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Mas há uma pegadinha! Se você passar uma função como prop (<code>onClick=&#123;handleClick&#125;</code>), o React cria uma nova referência de função a cada render do Pai. O <code>memo()</code> acha que a prop mudou e quebra! É por isso que usamos o <strong><code>useCallback</code></strong>, para congelar a função na memória.
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/f0fdf4/166534?text=memo()+===+Escudo%5Cn%5CnuseCallback()+===+Cofre%5Cn(Guarda+a+Fun%C3%A7%C3%A3o)" 
                  alt="Esquema Memo e Callback" 
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />
          
          {/* Tópico 3 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🧠 3. useMemo (A Calculadora com Memória)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Se você tem um código pesado (filtrar um Array de 10.000 itens) e uma variável não relacionada for alterada na tela (ex: abrir um Modal), o React vai refazer o filtro todo do zero!
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  O <strong><code>useMemo</code></strong> guarda o <em>Resultado</em> de uma função. Ele diz: "Eu só vou calcular esses 10.000 itens de novo se a palavra buscada mudar. Caso contrário, devolva o array que já está na memória instantaneamente".
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/fffbeb/b45309?text=C%C3%A1lculo+Pesado%5Cn%E2%86%93%5CnuseMemo(()+%3E+...+%7B...%7D,+%5Bfiltro%5D)%5Cn%E2%86%93%5CnDevolve+R%C3%A1pido+se+N%C3%A3o+Mudou!" 
                  alt="Esquema useMemo" 
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
            A Trindade da Performance
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Use os três juntos com sabedoria, mas evite usar em componentes bobos (pois o custo de memorizar é maior que o de renderizar um <code>&lt;p&gt;</code> simples).
          </p>
          <pre>
            <code>{`// 1. O Filho é blindado (Memo)
const BotaoPesado = React.memo(({ onClick }) => <button onClick={onClick}>...</button>);

function Parent() {
  const [text, setText] = useState('');

  // 2. A Função é blindada (Callback)
  const handleClick = useCallback(() => console.log('Clicou!'), []);
  
  // 3. O Dado é blindado (Memo)
  const dadosFormatados = useMemo(() => formatarPlanilhaGigante(), []);

  // Agora, digitar no \`text\` NÃO vai renderizar o BotaoPesado de novo!
  return <BotaoPesado onClick={handleClick} data={dadosFormatados} />;
}`}</code>
          </pre>
        </div>
      </section>

      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: O Teste de Stress</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="grid-2">
            
            {/* Lab 1: Memo & Callback */}
            <div className="glass-card" style={{ border: '1px solid #bae6fd', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0369a1', margin: 0 }}>
                🛡️ Lab 1: Efeito Dominó
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0 }}>
                O Botão "Aumentar Pai" altera o Estado do Pai. Veja o relógio nos filhos para descobrir quem re-renderiza!
              </p>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                <h4 style={{ margin: '0 0 1rem 0' }}>Componente PAI (Contador: {parentCounter})</h4>
                <button 
                  onClick={() => setParentCounter(c => c + 1)} 
                  className="btn btn-primary"
                >
                  ↑ Aumentar Pai
                </button>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 600 }}>Quebra o memo() sem useCallback</p>
                    {/* Aqui passamos uma função recriada a cada render (badHandleAction) */}
                    <ExpensiveChild title="Filho Furado 💥" onAction={badHandleAction} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 600 }}>Salvo pelo useCallback!</p>
                    {/* Aqui passamos a função blindada */}
                    <ExpensiveChild title="Filho Blindado 🛡️" onAction={goodHandleAction} />
                  </div>
                </div>
              </div>
            </div>

            {/* Lab 2: useMemo */}
            <div className="glass-card" style={{ border: '1px solid #fca5a5', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#b91c1c', margin: 0 }}>
                  🧠 Lab 2: O Filtro de 50ms
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>useMemo:</span>
                  <button 
                    onClick={() => setUseMemoActive(!useMemoActive)}
                    className={`btn btn-sm ${useMemoActive ? 'btn-primary' : 'btn-danger'}`}
                    style={{ padding: '0.25rem 0.5rem' }}
                  >
                    {useMemoActive ? 'LIGADO' : 'DESLIGADO'}
                  </button>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0 }}>
                Esta lista tem um gargalo forçado de 50ms no cálculo de filtro. Se o useMemo estiver ligado, digitar outro estado bobo na tela não vai travar sua página. Se estiver desligado, o teclado vai "engasgar"!
              </p>

              {/* Ação não relacionada (Forçar re-render bobo) */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', background: '#fff0f2', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#991b1b', marginBottom: '0.5rem' }}>
                    Estado Bobo (Não afeta a lista)
                  </label>
                  <input 
                    type="text" 
                    placeholder="Digite rápido aqui..."
                    value={forceUpdate === 0 ? '' : `Renderizações soltas: ${forceUpdate}`}
                    onChange={() => setForceUpdate(f => f + 1)}
                    className="input"
                  />
                </div>
              </div>

              {/* Filtro Real (O que aciona a lista) */}
              <div style={{ marginTop: '0.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
                  Filtro Real (Afeta a lista)
                </label>
                <input 
                  type="number" 
                  value={filterText}
                  onChange={e => setFilterText(e.target.value)}
                  placeholder="Buscar valor exato..."
                  className="input"
                />
                <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
                  Resultados encontrados: {filteredList.length} de 5000
                </span>
              </div>

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
              <strong>Não abuse do useMemo:</strong> A documentação oficial do React avisa severamente: Envolver tudo com <code>useMemo</code> piora a performance. Criar a memória custa dinheiro do processador. O React é otimizado para jogar lixo fora (Garbage Collector). Use apenas para loops imensos ou quando for enviar como prop para um <code>React.memo</code>.
            </div>
          </div>

          <div className="alert alert-success">
            <div>
              <strong>O Futuro (React Compiler):</strong> A comunidade está eufórica porque o "React 19 / React Compiler" promete injetar o <code>useMemo</code> e <code>useCallback</code> automaticamente no seu código durante a build (o projeto se chamava React Forget). Num futuro próximo, você não precisará escrever mais nenhum deles!
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
