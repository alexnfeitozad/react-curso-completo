import React, { useState, createContext, useContext, type ReactNode } from 'react';

// --- Context 1: Auth & User Profile ---
interface User {
  id: string;
  name: string;
  role: 'Visitante' | 'Aluno' | 'Instrutor' | 'Arquiteto';
  permissions: string[];
}

interface AuthContextType {
  user: User;
  setRole: (role: User['role']) => void;
  hasPermission: (perm: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ROLE_PERMISSIONS: Record<User['role'], string[]> = {
  Visitante: ['read:courses'],
  Aluno: ['read:courses', 'submit:exercises', 'view:community'],
  Instrutor: ['read:courses', 'submit:exercises', 'view:community', 'edit:classes', 'grade:projects'],
  Arquiteto: ['read:courses', 'submit:exercises', 'view:community', 'edit:classes', 'grade:projects', 'manage:infrastructure', 'deploy:production']
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<User['role']>('Aluno');

  const user: User = {
    id: 'usr_789',
    name: 'Ana Beatriz',
    role,
    permissions: ROLE_PERMISSIONS[role]
  };

  const setRole = (newRole: User['role']) => {
    setRoleState(newRole);
  };

  const hasPermission = (perm: string) => {
    return user.permissions.includes(perm);
  };

  return (
    <AuthContext.Provider value={{ user, setRole, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
};

// --- Modulo 04 Component ---
const ContextDemoConsumer: React.FC = () => {
  const { user, setRole, hasPermission } = useAuth();
  const [selectedAction, setSelectedAction] = useState<string>('');

  const actions = [
    { label: 'Assistir Aulas', perm: 'read:courses', icon: '📺' },
    { label: 'Submeter Exercício', perm: 'submit:exercises', icon: '📝' },
    { label: 'Editar Grade do Curso', perm: 'edit:classes', icon: '✏️' },
    { label: 'Deploy em Produção', perm: 'deploy:production', icon: '🚀' },
  ];

  return (
    <div className="grid-2">
      <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)' }}>
        <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>Alterar Perfil (Simular Contexto)</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
          {(['Visitante', 'Aluno', 'Instrutor', 'Arquiteto'] as const).map(r => (
            <label key={r} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input
                type="radio"
                name="role"
                checked={user.role === r}
                onChange={() => setRole(r)}
              />
              <span style={{ fontWeight: user.role === r ? 700 : 400, color: user.role === r ? '#0284c7' : '#334155' }}>
                {r}
              </span>
            </label>
          ))}
        </div>

        <div style={{ padding: '0.85rem', background: '#ffffff', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-200)' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Usuário Conectado:</div>
          <div style={{ fontWeight: 700, color: '#0f172a' }}>{user.name} ({user.role})</div>
          <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {user.permissions.map(p => (
              <span key={p} className="badge badge-primary">{p}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)' }}>
        <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>Testar Ações Baseadas em Permissão</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {actions.map(act => {
            const allowed = hasPermission(act.perm);
            return (
              <div
                key={act.perm}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: allowed ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${allowed ? '#bbf7d0' : '#fecaca'}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <span>{act.icon}</span>
                  <span style={{ fontWeight: 600, color: allowed ? '#166534' : '#991b1b' }}>{act.label}</span>
                </div>
                <button
                  disabled={!allowed}
                  onClick={() => setSelectedAction(`Sucesso: "${act.label}" executada com perfil ${user.role}!`)}
                  className={`btn btn-sm ${allowed ? 'btn-success' : 'btn-secondary'}`}
                  style={{ opacity: allowed ? 1 : 0.5 }}
                >
                  {allowed ? 'Executar' : 'Bloqueado'}
                </button>
              </div>
            );
          })}
        </div>

        {selectedAction && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#ecfeff', border: '1px solid #a5f3fc', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: '#0891b2' }}>
            {selectedAction}
          </div>
        )}
      </div>
    </div>
  );
};

export const Modulo04ContextApi: React.FC = () => {
  
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 2: Ecossistema Reativo</span>
          <span className="badge badge-neutral">Módulo 04</span>
        </div>
        <h1>Context API & Injeção de Estado</h1>
        <p className="subtitle">
          Compartilhamento de contexto de segurança, autenticação e dados globais sem prop-drilling.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Quando usar Context API vs Zustand / Redux?
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              A Context API nativa é ideal para dados de <strong>baixa frequência de atualização</strong> que muitos componentes precisam:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Informações do usuário autenticado e permissões (RBAC).</li>
              <li>Preferências de tema (Dark/Light) e idioma (i18n).</li>
              <li>Configurações globais de rotas ou feature flags.</li>
            </ul>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Padrão de Provider e Hook Especializado
          </h3>
          <pre>
            <code>{`import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextData {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token, login: setToken, logout: () => setToken(null) }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook de conveniência com validação de segurança
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser chamado dentro de AuthProvider!');
  return context;
};`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            🛡️ Laboratório de Contexto de Autenticação & Permissões (RBAC)
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            O <code>AuthProvider</code> injeta o usuário atual e funções de validação de permissão para qualquer componente filho profundo, sem necessidade de passar props intermediárias.
          </p>

          <AuthProvider>
            <ContextDemoConsumer />
          </AuthProvider>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-warning">
            <div>
              <strong>Cuidado com re-renders gerais:</strong> Quando o valor do <code>value</code> de um Context Provider muda, TODOS os componentes que chamam <code>useContext(MeuContext)</code> re-renderizam. Se você tem estado altamente dinâmico (ex: digitação a cada milissegundo), separe em contextos menores ou use Zustand.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
