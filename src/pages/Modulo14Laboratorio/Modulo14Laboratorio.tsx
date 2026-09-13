import { Sandpack } from '@codesandbox/sandpack-react';

const codeAppJs = `import { useState } from "react";
import "./styles.css";

export default function App() {
  // Estado para armazenar a lista de tarefas (Nosso "Banco de Dados" temporário)
  const [tasks, setTasks] = useState([
    { id: 1, text: "Aprender os Fundamentos do React", completed: true },
    { id: 2, text: "Construir um CRUD do zero", completed: false }
  ]);
  
  // Estado para o campo de texto do formulário
  const [newTask, setNewTask] = useState("");

  // CREATE: Adicionar uma nova tarefa
  const addTask = (e) => {
    e.preventDefault(); // Evita recarregar a página
    if (!newTask.trim()) return;
    
    const task = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, task]); // Cria um NOVO array com a nova tarefa
    setNewTask(""); // Limpa o input
  };

  // UPDATE: Marcar como concluída/pendente
  const toggleTask = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // DELETE: Remover a tarefa
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="app-container">
      <h1>🚀 Meu Primeiro CRUD</h1>
      
      {/* Formulário de Criação (CREATE) */}
      <form onSubmit={addTask} className="task-form">
        <input 
          value={newTask} 
          onChange={e => setNewTask(e.target.value)} 
          placeholder="O que vamos construir hoje?" 
        />
        <button type="submit">Add</button>
      </form>

      {/* Lista (READ) */}
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleTask(task.id)} className="task-text">
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">🗑️</button>
          </li>
        ))}
        {tasks.length === 0 && <p className="empty">Nenhuma tarefa. Você está livre! 🎉</p>}
      </ul>
    </div>
  );
}
`;

const codeStylesCss = `body {
  font-family: 'Inter', system-ui, sans-serif;
  background: #0f172a;
  color: #f8fafc;
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  margin: 0;
}

.app-container {
  background: #1e293b;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  border: 1px solid #334155;
}

h1 {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #38bdf8;
}

.task-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

input {
  flex: 1;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #475569;
  background: #0f172a;
  color: white;
  outline: none;
}
input:focus { border-color: #38bdf8; }

button[type="submit"] {
  background: #0ea5e9;
  color: white;
  border: none;
  padding: 0 1rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
button[type="submit"]:hover { background: #0284c7; }

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #334155;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  transition: all 0.2s;
}

li.completed .task-text {
  text-decoration: line-through;
  color: #94a3b8;
}

.task-text {
  cursor: pointer;
  flex: 1;
}

.delete-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0.6;
  font-size: 1.1rem;
  transition: opacity 0.2s;
}
.delete-btn:hover { opacity: 1; }

.empty {
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
}
`;

export const Modulo14Laboratorio = () => {
  return (
    <div className="page-container">
      <header className="module-header">
        <h1 className="module-title">Módulo 14: Laboratório Interativo (Seu Primeiro CRUD)</h1>
        <p className="module-description">
          Chegou a hora de colocar a mão na massa! Aprenda como iniciar um projeto real na sua máquina e teste o código em tempo real no nosso VSCode na nuvem.
        </p>
      </header>

      <section className="module-section">
        <h2 className="section-title">💻 Como criar o projeto na sua máquina (Setup Oficial)</h2>
        <div className="glass-card">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.6' }}>
            A documentação oficial do React hoje recomenda fortemente o uso de frameworks ou bundlers modernos, sendo o <strong>Vite</strong> a escolha mais popular para projetos Single Page Application (SPA). Siga estes passos no seu terminal:
          </p>
          
          <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#38bdf8', marginBottom: '1rem', fontSize: '1.1rem' }}>1. Instale o Node.js</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Acesse <strong>nodejs.org</strong> e baixe a versão LTS. Isso instalará o <code>npm</code> na sua máquina.</p>

            <h4 style={{ color: '#38bdf8', marginBottom: '1rem', fontSize: '1.1rem' }}>2. Crie o Projeto via Terminal</h4>
            <pre style={{ background: '#1e293b', padding: '1rem', borderRadius: '4px', overflowX: 'auto', border: '1px solid #334155' }}>
              <code style={{ color: '#e2e8f0', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                npm create vite@latest meu-primeiro-crud -- --template react<br/>
                cd meu-primeiro-crud<br/>
                npm install<br/>
                npm run dev
              </code>
            </pre>
          </div>
          
          <div className="alert alert-info">
            <strong>Dica Pro:</strong> Após rodar <code>npm run dev</code>, você acessa o projeto em <code>http://localhost:5173</code> e abre a pasta no VSCode para começar a editar o <code>src/App.jsx</code>.
          </div>
        </div>
      </section>

      <section className="module-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>⚛️ O Laboratório: Crie um CRUD</h2>
          <span className="badge badge-success">Ao Vivo</span>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
          O código abaixo está <strong>rodando de verdade</strong>. O painel esquerdo é o seu arquivo <code>App.js</code> e o direito é o seu Navegador. Mude qualquer texto no código, salve ou aguarde, e veja a mágica acontecer instantaneamente. Tente quebrar o código para ver o erro e depois conserte!
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
