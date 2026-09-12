import React, { useState } from 'react';

// --- TIPAGENS ---
type TaskStatus = 'TODO' | 'DOING' | 'DONE';

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

// --- SUB-COMPONENTES (Design Patterns: Presentational / Compound) ---

// 1. O Cartão de Tarefa (Componente Burro / Presentational)
const TaskCard = ({ task, onMove, onDelete }: { task: Task; onMove: (id: string, newStatus: TaskStatus) => void; onDelete: (id: string) => void }) => {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.4 }}>{task.title}</h4>
        <button onClick={() => onDelete(task.id)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem', fontSize: '1.2rem', lineHeight: 1 }} title="Excluir">
          &times;
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {task.status !== 'TODO' && (
          <button onClick={() => onMove(task.id, task.status === 'DONE' ? 'DOING' : 'TODO')} className="btn btn-secondary btn-sm" style={{ flex: 1, padding: '0.25rem' }}>
            ← Voltar
          </button>
        )}
        {task.status !== 'DONE' && (
          <button onClick={() => onMove(task.id, task.status === 'TODO' ? 'DOING' : 'DONE')} className="btn btn-primary btn-sm" style={{ flex: 1, padding: '0.25rem' }}>
            Avançar →
          </button>
        )}
      </div>
    </div>
  );
};

// 2. A Coluna do Quadro (Composição)
const KanbanColumn = ({ title, color, children }: { title: string; color: string; children: React.ReactNode }) => {
  return (
    <div style={{ flex: 1, background: '#f8fafc', borderRadius: '12px', padding: '1rem', borderTop: `4px solid ${color}`, display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '280px' }}>
      <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#334155', display: 'flex', justifyContent: 'space-between' }}>
        {title}
        <span style={{ background: '#e2e8f0', padding: '0.15rem 0.5rem', borderRadius: '12px', fontSize: '0.8rem', color: '#64748b' }}>
          {React.Children.count(children)}
        </span>
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
        {children}
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL (O Quadro Completo) ---
export const Modulo13ProjetoFinal: React.FC = () => {
  // Estado Centralizado (Poderia estar no Zustand, mas mantemos no useState para simplicidade didática)
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Estudar React Hooks (Módulo 2)', status: 'DONE' },
    { id: '2', title: 'Entender Render Props (Módulo 3)', status: 'DONE' },
    { id: '3', title: 'Integrar Context API (Módulo 4)', status: 'DOING' },
    { id: '4', title: 'Dominar Zustand (Módulo 9)', status: 'TODO' },
    { id: '5', title: 'Fazer o Projeto Final 🚀', status: 'TODO' },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Ações de Negócio
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: 'TODO'
    };
    
    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
  };

  const handleMoveTask = (id: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, status: newStatus } : task));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%)', color: '#fff', borderRadius: '16px', padding: '3rem 2rem', marginBottom: '3rem' }}>
        <div className="badge-container" style={{ marginBottom: '1rem' }}>
          <span className="badge" style={{ background: '#fff', color: '#4f46e5' }}>Fase 4: Maestria</span>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>Módulo 13 (FIM)</span>
        </div>
        <h1 style={{ color: '#fff', margin: 0, fontSize: '2.5rem', fontWeight: 900, textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          Projeto Final: Masterclass
        </h1>
        <p style={{ color: '#e0f2fe', fontSize: '1.2rem', marginTop: '1rem', opacity: 0.9 }}>
          A junção de tudo que aprendemos. Do básico ao avançado, encapsulado em uma aplicação real de Gestão de Tarefas (Mini-Kanban).
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 O Que Estamos Consolidando Aqui?</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                Chegamos ao fim da jornada! Neste simulador final, nós não usamos nenhuma biblioteca de terceiros (sem drag and drop complexo) para provar o poder do React puro.
              </p>
              <ul style={{ color: '#475569', lineHeight: 1.6, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>JSX e Componentização (Mod 1 e 3):</strong> Separamos a <code>KanbanColumn</code> do <code>TaskCard</code>.</li>
                <li><strong>Eventos e Estado (Mod 2):</strong> O array principal de tarefas dita exatamente o que é renderizado.</li>
                <li><strong>Formulários Controlados (Mod 6):</strong> O input de Nova Tarefa é amarrado 100% ao estado.</li>
                <li><strong>Separação de Responsabilidades (Mod 12):</strong> O <code>TaskCard</code> não sabe como atualizar ou apagar a si mesmo. Ele recebe funções (callbacks) do componente Pai!</li>
              </ul>
            </div>
            <div>
              <img 
                src="https://placehold.co/600x400/f8fafc/0f172a?text=%5B+Quadro+Kanban+%5D%5Cn%5CnInput+(Controlled)%5Cn%E2%86%93%5CnState+Array%5Cn%E2%86%93%5CnColunas+(Children)%5Cn%E2%86%93%5CnCart%C3%B5es+(Dumb+Components)" 
                alt="Arquitetura do Kanban" 
                style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* SEÇÃO: 🧪 Prática / Simulador (O Kanban Final) */}
      <section className="module-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <h2 className="section-title" style={{ margin: 0 }}>🚀 O Quadro Kanban (Agile)</h2>
          
          {/* Formulário de Nova Tarefa */}
          <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Ex: Aprender Next.js..."
              className="input"
              style={{ minWidth: '250px' }}
            />
            <button type="submit" className="btn btn-primary" disabled={!newTaskTitle.trim()}>
              + Adicionar
            </button>
          </form>
        </div>
        
        {/* O Board */}
        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          
          <KanbanColumn title="A Fazer (To Do)" color="#94a3b8">
            {tasks.filter(t => t.status === 'TODO').map(task => (
              <TaskCard key={task.id} task={task} onMove={handleMoveTask} onDelete={handleDeleteTask} />
            ))}
          </KanbanColumn>

          <KanbanColumn title="Em Progresso (Doing)" color="#3b82f6">
            {tasks.filter(t => t.status === 'DOING').map(task => (
              <TaskCard key={task.id} task={task} onMove={handleMoveTask} onDelete={handleDeleteTask} />
            ))}
          </KanbanColumn>

          <KanbanColumn title="Concluído (Done)" color="#22c55e">
            {tasks.filter(t => t.status === 'DONE').map(task => (
              <TaskCard key={task.id} task={task} onMove={handleMoveTask} onDelete={handleDeleteTask} />
            ))}
          </KanbanColumn>

        </div>
      </section>

      {/* FOOTER DA MASTERCLASS */}
      <div style={{ marginTop: '4rem', textAlign: 'center', padding: '3rem', background: '#0f172a', color: '#fff', borderRadius: '16px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
        <h2 style={{ margin: '0 0 1rem 0', color: '#38bdf8' }}>Parabéns! Você concluiu a Masterclass de React.</h2>
        <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          De Fundamentos a Zustand, passando por WebSockets, Hooks avançados e Testes Automatizados.
          Você está pronto para encarar qualquer desafio de Front-End no mercado de trabalho global.
        </p>
      </div>

    </div>
  );
};
