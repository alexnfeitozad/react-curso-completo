import React, { useState } from 'react';

interface FormState {
  fullName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
  skills: string[];
}

export const Modulo06Formularios: React.FC = () => {
  
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    role: 'Frontend Engineer',
    password: '',
    confirmPassword: '',
    skills: ['React 19', 'TypeScript', 'Vitest'],
  });

  const [skillInput, setSkillInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validações Reativas em Tempo Real
  const errors = {
    fullName: formData.fullName.trim().length < 3 ? 'O nome deve ter no mínimo 3 caracteres.' : null,
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Insira um e-mail válido.' : null,
    password: formData.password.length < 6 ? 'A senha deve conter ao menos 6 dígitos.' : null,
    confirmPassword:
      formData.password !== formData.confirmPassword ? 'As senhas não coincidem.' : null,
    skills: formData.skills.length === 0 ? 'Adicione pelo menos 1 habilidade técnica.' : null,
  };

  const isValid = !errors.fullName && !errors.email && !errors.password && !errors.confirmPassword && !errors.skills;

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    if (formData.skills.includes(skillInput.trim())) return;

    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, skillInput.trim()]
    }));
    setSkillInput('');
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitted(true);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 2: Ecossistema Reativo</span>
          <span className="badge badge-neutral">Módulo 06</span>
        </div>
        <h1>Formulários Reativos & Validação</h1>
        <p className="subtitle">
          Campos dinâmicos (Array de tags), validação cruzada síncrona e feedback de erros instantâneo.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Controlled vs Uncontrolled Components
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              No React, existem duas abordagens principais para gerenciar formulários:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Controlled:</strong> O estado do input é mantido pelo React via <code>value</code> e <code>onChange</code>. Ideal para validação instantânea caractere a caractere, feedback visual imediato e campos interdependentes.</li>
              <li><strong>Uncontrolled (com useRef / React Hook Form):</strong> O DOM retém o valor nativamente e você lê quando submeter. Excelente para formulários gigantescos com centenas de campos para economizar renders.</li>
            </ul>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Padrão de Validação de Senhas Cruzadas
          </h3>
          <pre>
            <code>{`const validatePasswords = (pass: string, confirm: string) => {
  if (pass.length < 6) return 'A senha deve ter no mínimo 6 caracteres';
  if (pass !== confirm) return 'As senhas não coincidem';
  return null;
};`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div className="grid-2">
          {/* Formulário Interativo */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              📝 Cadastro de Engenheiro Frontend
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Nome Completo:
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Ex: Beatriz Lima"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                />
                {formData.fullName && errors.fullName && (
                  <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{errors.fullName}</span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  E-mail Corporativo:
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder="beatriz@empresa.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
                {formData.email && errors.email && (
                  <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{errors.email}</span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Senha:
                  </label>
                  <input
                    type="password"
                    className="input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                  />
                  {formData.password && errors.password && (
                    <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{errors.password}</span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Confirmar Senha:
                  </label>
                  <input
                    type="password"
                    className="input"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  {formData.confirmPassword && errors.confirmPassword && (
                    <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{errors.confirmPassword}</span>
                  )}
                </div>
              </div>

              {/* Array Dinâmico de Skills */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Especialidades Técnicas (Array Dinâmico):
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    className="input"
                    placeholder="Ex: GraphQL, Docker..."
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddSkill(e)}
                  />
                  <button type="button" onClick={handleAddSkill} className="btn btn-primary btn-sm">
                    + Adicionar
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', minHeight: '32px' }}>
                  {formData.skills.map(s => (
                    <span
                      key={s}
                      className="badge badge-primary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                      onClick={() => handleRemoveSkill(s)}
                      title="Clique para remover"
                    >
                      {s} <strong style={{ color: '#dc2626' }}>×</strong>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary"
                style={{ marginTop: '0.5rem' }}
              >
                {isValid ? '🚀 Cadastrar Engenheiro' : 'Preencha os Campos Corretamente'}
              </button>

              {isSubmitted && (
                <div className="alert alert-success" style={{ marginTop: '0.5rem' }}>
                  <div>🎉 Formulário validado com sucesso e submetido para a API!</div>
                </div>
              )}
            </form>
          </div>

          {/* Inspetor JSON Reativo */}
          <div className="glass-card" style={{ background: '#0f172a', color: '#e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h4 style={{ color: '#38bdf8', fontWeight: 700 }}>🔍 Estado Reativo do Formulário (JSON)</h4>
              <span className={`badge ${isValid ? 'badge-success' : 'badge-warning'}`}>
                {isValid ? 'Formulário Válido' : 'Inválido'}
              </span>
            </div>
            <pre style={{ background: 'transparent', border: 'none', padding: 0 }}>
              <code>{JSON.stringify({ formData, isValid, errors }, null, 2)}</code>
            </pre>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-success">
            <div>
              <strong>Produção com Zod:</strong> Em projetos corporativos, utilize schemas com Zod (ex: <code>z.object(&#123; email: z.string().email() &#125;)</code>). Isso permite reutilizar a mesma validação no Frontend e no Backend Node.js de forma estritamente tipada.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
