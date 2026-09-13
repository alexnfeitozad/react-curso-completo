import React from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';

const codeAppJs = `import "./styles.css";

// 1. Crie o seu primeiro componente!
// Desafio: Faça o componente Profile retornar uma <div> contendo:
// - Um <h1> com o nome recebido via props
// - Uma <img> com a foto (src)
// - Um <p> com a profissão
function Profile(props) {
  return (
    <div className="card">
      {/* Escreva seu JSX aqui embaixo! */}
      <h1>Nome Aqui</h1>
      <p>Profissão Aqui</p>
    </div>
  );
}

// 2. Componente Principal (Já está pronto!)
export default function App() {
  return (
    <div className="container">
      <h2>🚀 Meus Primeiros Componentes</h2>
      
      {/* Renderizando o componente e passando Props */}
      <Profile 
        nome="Ada Lovelace" 
        profissao="Primeira Programadora da História"
        foto="https://i.pravatar.cc/150?img=47"
      />

      <Profile 
        nome="Alan Turing" 
        profissao="Pai da Computação"
        foto="https://i.pravatar.cc/150?img=11"
      />
    </div>
  );
}
`;

const codeStylesCss = `body {
  font-family: sans-serif;
  padding: 20px;
  background: #0f172a;
  color: white;
}
.container {
  max-width: 500px;
  margin: 0 auto;
}
.card {
  background: #1e293b;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #334155;
  text-align: center;
}
.card h1 {
  margin-top: 10px;
  font-size: 1.5rem;
  color: #38bdf8;
}
.card img {
  border-radius: 50%;
  border: 3px solid #38bdf8;
  width: 100px;
  height: 100px;
  margin-top: 10px;
}
.card p {
  color: #94a3b8;
  font-size: 0.9rem;
}
`;


export const Modulo01Fundamentos: React.FC = () => {

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 1: Base dos Componentes</span>
          <span className="badge badge-neutral">Módulo 01</span>
        </div>
        <h1>Fundamentos: Descrevendo a UI</h1>
        <p className="subtitle">
          De Componentes e JSX até Props, Renderização Condicional e Listas. A Masterclass baseada na documentação oficial.
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria (Masterclass React.dev) */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa (React.dev)</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              1. Seu Primeiro Componente
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              Aplicações React são construídas a partir de peças isoladas de UI chamadas <strong>componentes</strong>. Um componente React é apenas uma função JavaScript pura que retorna marcação (markup).
            </p>
            <pre>
              <code>{`export function Profile() {
  return <img src="https://i.pravatar.cc/150" alt="Super Dev" />;
}`}</code>
            </pre>
          </div>

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              2. Escrevendo Marcação com JSX
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              JSX é uma extensão de sintaxe que permite escrever HTML dentro do JavaScript. Ele possui 3 regras rígidas:
            </p>
            <ul style={{ marginLeft: '1.5rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li><strong>Retorne um único elemento raiz:</strong> Envolva múltiplas tags com uma <code>&lt;div&gt;</code> ou fragmento <code>&lt;&gt;...&lt;/&gt;</code>.</li>
              <li><strong>Feche todas as tags:</strong> Tags como <code>&lt;img&gt;</code> precisam virar <code>&lt;img /&gt;</code>.</li>
              <li><strong>Use camelCase para maioria das coisas:</strong> Em vez de <code>class</code>, use <code>className</code>. Em vez de <code>onclick</code>, use <code>onClick</code>.</li>
            </ul>
          </div>

          {/* Tópico 3 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              3. JavaScript in JSX (As Chaves <code>{'{ }'}</code>)
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Para colocar variáveis, cálculos ou funções dentro do HTML (JSX), você deve usar as chaves <code>{'{ }'}</code>. É como abrir uma "janela" de volta para o JavaScript.
              Se quiser passar um objeto CSS inline, você precisará de duas chaves: <code>style={'{'}{'{'} backgroundColor: 'red' {'}'}{'}'}</code>.
            </p>
          </div>

          {/* Tópico 4 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              4. Passando Props para Componentes
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              Componentes se comunicam passando dados de pai para filho através de <strong>Props</strong> (propriedades). Pense nelas como argumentos de função.
            </p>
            <pre>
              <code>{`// Pai
<Avatar person={{ name: 'Ana', imageId: '1bX5QH6' }} size={100} />

// Filho
function Avatar({ person, size }) {
  // Acesso desestruturado às props
}`}</code>
            </pre>
          </div>

          {/* Tópico 5 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              5. Renderização Condicional
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Não existe uma sintaxe especial de "if" no JSX. Você usa JavaScript puro!
            </p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li>Se for retorno total: <code>if (isPacked) return null;</code></li>
              <li>Operador Ternário: <code>isPacked ? &lt;Check/&gt; : &lt;Cross/&gt;</code></li>
              <li>Operador Lógico AND: <code>isPacked && &lt;Check/&gt;</code></li>
            </ul>
          </div>

          {/* Tópico 6 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              6. Renderizando Listas e as "Keys"
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Para renderizar coleções de dados, usamos o método <code>.map()</code> do JavaScript.
              <br/>
              <strong>Regra de Ouro:</strong> Cada item retornado pelo map DEVE ter uma propriedade <code>key</code> única (como um ID do banco de dados). Isso é vital para a engine do React (Reconciliação) saber exatamente qual item foi deletado, movido ou adicionado, sem destruir a árvore inteira.
            </p>
          </div>

          {/* Tópico 7 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              7. Componentes Puros (Manter Componentes Puros)
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Um componente React <strong>deve ser uma Função Pura</strong>. Isso significa:
              <br/>- Ele cuida da sua própria vida (não muda objetos que existiam antes dele ser chamado).
              <br/>- Dada a mesma entrada (mesmas props e state), ele DEVE retornar sempre o mesmo JSX.
              <br/>- Mutações (como alterar uma variável externa) durante a renderização causarão bugs severos.
            </p>
          </div>

        </div>
      </section>

      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos do Dia a Dia</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Lista Dinâmica Completa com Tipagem
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Veja como juntamos JSX, Props, Chaves (<code>{'{ }'}</code>), Renderização Condicional e <code>.map()</code> em um cenário real.
          </p>
          <pre>
            <code>{`interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <ul>
      {todos.map(todo => (
        // KEY é obrigatória!
        <li key={todo.id} className={todo.isCompleted ? 'strike' : ''}>
          {todo.title} 
          {/* Renderização Condicional */}
          {todo.isCompleted && ' ✅'}
        </li>
      ))}
    </ul>
  );
};`}</code>
          </pre>
        </div>
      </section>



      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="alert alert-danger">
            <div>
              <strong>Erro Clássico com Arrays de JSX:</strong> Nunca use o índice (<code>index</code>) do <code>map</code> como <code>key</code> se a sua lista puder ser ordenada, filtrada ou tiver itens inseridos/removidos. O React usa a <code>key</code> para casar o elemento da renderização anterior com a nova. Usar índices bagunçará o estado interno dos componentes.
            </div>
          </div>

          <div className="alert alert-warning">
            <div>
              <strong>Cuidado com &&:</strong> Não coloque números à esquerda do operador <code>&&</code>. Por exemplo, <code>messages.length && &lt;p&gt;Novas mensagens&lt;/p&gt;</code>. Se <code>messages.length</code> for <code>0</code>, o React renderizará o número <code>0</code> na tela! O correto é forçar um booleano: <code>messages.length &gt; 0 && ...</code>.
            </div>
          </div>
          
          <div className="alert alert-success">
            <div>
              <strong>Princípio DRY (Don't Repeat Yourself):</strong> Extraia a UI em componentes menores e puros. Como vimos no exemplo, o <code>Avatar</code> e a <code>SkillTag</code> são componentes isolados, o que deixa o arquivo principal super limpo e fácil de manter.
            </div>
          </div>

        </div>
      </section>

      {/* SEÇÃO: 🚀 Sandbox (VSCode na Nuvem) */}
      <section className="module-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>🚀 Laboratório: Vamos fazer juntos!</h2>
          <span className="badge badge-success">Live Code</span>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
          A teoria está legal, mas a prática é melhor! O código abaixo é um mini-VSCode rodando direto no seu navegador.
          Seu primeiro <strong>Desafio</strong> é preencher o componente <code>Profile</code>. Use as variáveis recebidas via <code>props</code> para criar um cartão de apresentação usando JSX (com as chaves <code>{'{ }'}</code>)!
        </p>

        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          <Sandpack
            template="react"
            theme="dark"
            files={{
              "/App.js": codeAppJs,
              "/styles.css": codeStylesCss,
            }}
            options={{
              showNavigator: true,
              showTabs: true,
              editorHeight: 600,
            }}
          />
        </div>
      </section>

    </div>
  );
};
