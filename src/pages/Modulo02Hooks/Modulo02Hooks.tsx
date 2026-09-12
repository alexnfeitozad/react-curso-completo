import React, { useState, useEffect, useRef } from 'react';

// --- SUB-COMPONENTES PARA O LABORATÓRIO PRÁTICO ---
interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
}

export const Modulo02Hooks: React.FC = () => {
  // Estado para o Simulador de Fila de Atualizações e Renderização
  const [score, setScore] = useState(0);
  
  // Estado para o Chat (Demonstrando State as a Snapshot e Effects)
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Refs
  const renderCountRef = useRef(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Monitor de re-renderização puro
  renderCountRef.current += 1;

  // Efeito 1: Auto-scroll do chat sempre que messages mudar
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Efeito 2: Simulação de "typing" do bot (Cleanup example)
  useEffect(() => {
    if (isTyping) {
      const timerId = setTimeout(() => {
        setMessages(prev => [...prev, { id: String(Date.now()), text: 'React é incrível! ⚛️', isUser: false }]);
        setIsTyping(false);
      }, 1500);
      
      // Cleanup: cancela o timeout se o componente desmontar ou se isTyping mudar antes de terminar
      return () => clearTimeout(timerId);
    }
  }, [isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentText.trim()) return;

    setMessages(prev => [...prev, { id: String(Date.now()), text: currentText, isUser: true }]);
    setCurrentText('');
    setIsTyping(true); // Engatilha o bot
  };

  const handleTripleScoreBad = () => {
    // ❌ FORMA INCORRETA: State as a Snapshot
    // O React agrupa as atualizações. 'score' aqui é o mesmo valor do snapshot do render atual nas 3 chamadas.
    setScore(score + 1);
    setScore(score + 1);
    setScore(score + 1);
  };

  const handleTripleScoreGood = () => {
    // ✅ FORMA CORRETA: Updater function
    // O React processa a fila usando o valor mais atualizado pendente.
    setScore(prev => prev + 1);
    setScore(prev => prev + 1);
    setScore(prev => prev + 1);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 1: Base dos Componentes</span>
          <span className="badge badge-neutral">Módulo 02</span>
        </div>
        <h1>Hooks Essenciais: Interatividade e Estado</h1>
        <p className="subtitle">
          Respondendo a eventos, Memória (State), Snapshot, Fila de Atualizações, Efeitos Colaterais (useEffect) e Referências (useRef).
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa (React.dev)</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              1. Respondendo a Eventos
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              Você pode adicionar interatividade passando funções prop como <code>onClick</code> ou <code>onSubmit</code>. 
              <strong>Atenção:</strong> Você deve passar a função, e não <em>chamar</em> a função. 
              Use <code>onClick=&#123;handleClick&#125;</code> ao invés de <code>onClick=&#123;handleClick()&#125;</code>.
            </p>
          </div>

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              2. State: A Memória do Componente
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              Variáveis locais não sobrevivem a re-renderizações e mudanças nelas não avisam o React para atualizar a tela. O hook <code>useState</code> resolve isso dando duas coisas: uma variável de estado que persiste, e uma função <em>setter</em> que atualiza a variável e engatilha um novo render.
            </p>
          </div>

          {/* Tópico 3 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              3. Render and Commit (O Ciclo Vital)
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Qualquer alteração visual no React passa por 3 etapas:
              <br/>1. <strong>Trigger:</strong> Algo exige renderização (ex: set state).
              <br/>2. <strong>Render:</strong> React chama o seu componente para descobrir como a UI deve ficar.
              <br/>3. <strong>Commit:</strong> React modifica os nós reais do DOM (apenas o que mudou).
            </p>
          </div>

          {/* Tópico 4 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              4. State as a Snapshot (Estado como "Fotografia")
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              Definir um estado não muda a variável de estado que você já tem na execução atual, mas pede uma <strong>nova renderização</strong>. O React tira um "snapshot" (foto) da UI baseado no estado daquele milissegundo. O valor de estado dentro de manipuladores de eventos é "congelado" baseado no render onde o evento foi criado.
            </p>
          </div>

          {/* Tópico 5 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              5. Filas de Atualização (Updater Functions)
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Como o estado é um snapshot, chamar <code>setScore(score + 1)</code> 3 vezes no mesmo evento resulta em apenas +1, porque `score` é o mesmo. Para enfileirar cálculos sobre o valor mais recente antes do próximo render, passe uma <strong>função atualizadora</strong>: <code>setScore(prev =&#62; prev + 1)</code>.
            </p>
          </div>

          {/* Tópico 6 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              6. useEffect: O Escape Hatch para Sistemas Externos
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Eventos cuidam de ações do usuário. <strong>Efeitos</strong> cuidam de ações causadas pela própria renderização (sincronizar com chat, timers, localStorage, buscar dados API).
              Sempre que usar <code>useEffect</code>, certifique-se de fornecer um Array de Dependências correto e uma <strong>função de Cleanup</strong> no `return` (para matar timers, listeners e desconectar sockets).
            </p>
          </div>

          {/* Tópico 7 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              7. useRef: Referenciando Valores
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Diferente do <code>useState</code>, alterar um <code>useRef</code> <strong>NÃO</strong> re-renderiza o componente. É a ferramenta perfeita para guardar IDs de timers, contar renders em background, ou guardar a referência direta de um elemento real do DOM (ex: <code>&lt;div ref=&#123;meuRef&#125;&gt;</code>) para invocar focos e scrolls imperativos.
            </p>
          </div>

        </div>
      </section>

      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            O Padrão Ouro de Efeito com Cleanup
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Se você esquecer o <code>return</code> dentro do efeito, você terá <em>Memory Leaks</em> catastróficos.
          </p>
          <pre>
            <code>{`useEffect(() => {
  // Configuração (Setup)
  const timer = setInterval(() => console.log('Ping'), 1000);
  
  // Limpeza (Cleanup) - Roda antes de re-executar o efeito ou desmontar
  return () => {
    clearInterval(timer);
  };
}, []); // Array Vazio: Setup na montagem, Cleanup na desmontagem`}</code>
          </pre>
        </div>
      </section>

      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: Laboratório de Interatividade</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Lab 1: Fila de Renderização */}
          <div className="glass-card" style={{ border: '1px solid #bae6fd' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              🔬 1. State Snapshot vs Updater Functions
            </h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Tente somar +3 de uma vez! Veja a diferença quando usamos <code>setScore(score + 1)</code> três vezes vs <code>setScore(prev =&#62; prev + 1)</code>.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#0284c7' }}>{score}</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button onClick={handleTripleScoreBad} className="btn btn-secondary">
                  ❌ Somar +3 (Com Bug de Snapshot)
                </button>
                <button onClick={handleTripleScoreGood} className="btn btn-primary">
                  ✅ Somar +3 (Com Função Atualizadora)
                </button>
                <button onClick={() => setScore(0)} className="btn btn-danger" style={{ marginTop: '0.5rem' }}>
                  Zerar
                </button>
              </div>
            </div>
          </div>

          {/* Lab 2: Chat Effect e Refs */}
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  💬 2. Sincronização e DOM Refs (ChatBot)
                </h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '600px' }}>
                  O <code>useRef</code> garante que o chat role (scroll) para o final a cada nova mensagem. O <code>useEffect</code> engatilha uma resposta assíncrona ("isTyping") e garante a limpeza do timer interno para evitar memory leaks caso o componente desmonte.
                </p>
              </div>
              <div style={{ background: '#f8fafc', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Renderizações Atuais:</span>
                <strong style={{ fontSize: '1.2rem', color: '#0f172a', marginLeft: '0.5rem' }}>{renderCountRef.current}</strong>
              </div>
            </div>

            <div style={{ background: '#f1f5f9', borderRadius: 'var(--radius-lg)', padding: '1rem', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', height: '400px', maxWidth: '500px', margin: '0 auto' }}>
              
              {/* Área de Mensagens */}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
                {messages.length === 0 && (
                  <p style={{ textAlign: 'center', color: '#94a3b8', margin: 'auto' }}>Nenhuma mensagem. Mande um "Oi!"</p>
                )}
                
                {messages.map(msg => (
                  <div key={msg.id} style={{ alignSelf: msg.isUser ? 'flex-end' : 'flex-start', background: msg.isUser ? '#0284c7' : '#fff', color: msg.isUser ? '#fff' : '#0f172a', padding: '0.75rem 1rem', borderRadius: '12px', border: msg.isUser ? 'none' : '1px solid #e2e8f0', maxWidth: '80%', boxShadow: 'var(--shadow-sm)' }}>
                    {msg.text}
                  </div>
                ))}

                {isTyping && (
                  <div style={{ alignSelf: 'flex-start', color: '#64748b', fontSize: '0.85rem', padding: '0.5rem' }}>
                    Digitando...
                  </div>
                )}
                
                {/* Referência imperativa para o fim da lista */}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <input 
                  type="text"
                  className="input"
                  style={{ flex: 1 }}
                  placeholder="Escreva algo..."
                  value={currentText}
                  onChange={e => setCurrentText(e.target.value)}
                  disabled={isTyping}
                />
                <button type="submit" className="btn btn-primary" disabled={isTyping || !currentText.trim()}>
                  Enviar
                </button>
              </form>

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
              <strong>Regra Inviolável dos Hooks:</strong> Nunca chame <code>useState</code> ou <code>useEffect</code> dentro de <code>if</code>, <code>for</code> ou funções soltas. O React confia na <strong>ordem exata</strong> em que os hooks são chamados para casar o estado com o componente. Eles devem sempre estar no topo da função do componente!
            </div>
          </div>

          <div className="alert alert-warning">
            <div>
              <strong>Não Minta sobre Dependências:</strong> Se o seu <code>useEffect</code> lê uma variável de estado (ex: <code>score</code>), você é OBRIGADO a colocar <code>score</code> no array de dependências <code>[score]</code>. Mentir pro array gera o temido <em>Stale Closure</em> (o efeito roda preso num snapshot antigo do tempo).
            </div>
          </div>
          
          <div className="alert alert-success">
            <div>
              <strong>Derive Estado Quando Possível:</strong> Se você precisa calcular o Nome Completo a partir de <code>firstName</code> e <code>lastName</code>, <strong>NÃO</strong> crie um estado para <code>fullName</code> nem um efeito para atualizá-lo! Apenas faça <code>const fullName = firstName + ' ' + lastName</code> direto no corpo do componente. Ele re-renderizará e recalculará automaticamente.
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
