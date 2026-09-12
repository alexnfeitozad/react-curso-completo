import React, { useState, useRef } from 'react';

// --- COMPONENTE PRINCIPAL ---
export const Modulo06Formularios: React.FC = () => {
  // 1. Controlled Component State (Um objeto para todos os campos)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // 2. Uncontrolled Component Ref
  const newsletterEmailRef = useRef<HTMLInputElement>(null);

  // Manipulador Genérico para Múltiplos Inputs (Controlled)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validação em Tempo Real (Opcional, mas melhora a UX)
    if (name === 'password' && value.length > 0 && value.length < 6) {
      setErrors(prev => ({ ...prev, password: 'A senha deve ter pelo menos 6 caracteres.' }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleControlledSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o reload da página
    
    // Validação Final
    const newErrors: { [key: string]: string } = {};
    if (!formData.username) newErrors.username = 'O nome é obrigatório.';
    if (!formData.email.includes('@')) newErrors.email = 'E-mail inválido.';
    if (formData.password.length < 6) newErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Sucesso Simulado
    setSubmitStatus('loading');
    setTimeout(() => {
      setSubmitStatus('success');
      // Reset após 3 segundos
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  const handleUncontrolledSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = newsletterEmailRef.current?.value;
    if (email) {
      alert(`Inscrito na Newsletter com o email: ${email} (Lido diretamente do DOM!)`);
      if (newsletterEmailRef.current) newsletterEmailRef.current.value = '';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 2: Intermediário</span>
          <span className="badge badge-neutral">Módulo 06</span>
        </div>
        <h1>Formulários no React</h1>
        <p className="subtitle">
          Dominando Entradas de Usuário: Componentes Controlados, Não-Controlados e Estratégias de Validação (State vs Refs).
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🎮 1. Componentes Controlados (Controlled Components)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  No HTML padrão, um <code>&lt;input&gt;</code> ou <code>&lt;select&gt;</code> mantém seu próprio estado interno. Mas no React, nós queremos que o nosso componente seja a <strong>Única Fonte da Verdade (Single Source of Truth)</strong>.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Ao atrelar a propriedade <code>value</code> a um estado do React e usar o <code>onChange</code> para atualizar esse estado, nós "controlamos" o input. O React dita o que aparece na tela a cada tecla digitada.
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/e0f2fe/0369a1?text=State+===+Input%5Cn%5Cn1.+Usu%C3%A1rio+Digita%5Cn%E2%86%93%5Cn2.+onChange(e)+dispara%5Cn%E2%86%93%5Cn3.+setState(e.target.value)%5Cn%E2%86%93%5Cn4.+React+Re-renderiza+Input" 
                  alt="Fluxo do Componente Controlado" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              👻 2. Componentes Não-Controlados (Uncontrolled Components)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Às vezes, criar um estado inteiro para um input simples (como uma barra de pesquisa ou campo de newsletter isolado) é um exagero que causa re-renders desnecessários.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  A alternativa é deixar o HTML gerenciar seu estado normalmente e usar o <code>useRef()</code> para acessar a tag do DOM diretamente apenas no exato momento de submeter o formulário (<code>ref.current.value</code>).
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/fef2f2/991b1b?text=useRef()+(DOM+Direto)%5Cn%5CnN%C3%A3o+causa+re-renders!%5CnO+React+n%C3%A3o+sabe+o+que%5Cnest%C3%A1+sendo+digitado...%5CnS%C3%B3+lemos+no+Submit!" 
                  alt="Esquema Uncontrolled Component" 
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 3 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🛡️ 3. Lidando com Múltiplos Inputs (O Truque do <code>[name]</code>)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Se você tiver um formulário com 10 campos, não crie 10 <code>useState</code> diferentes! 
                  Crie um <strong>estado único em formato de objeto</strong>.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Dê um atributo <code>name</code> para cada input idêntico à chave do objeto. No <code>onChange</code>, você usa <em>Propriedades Computadas do JS</em>: <code>&#123; ...prev, [e.target.name]: e.target.value &#125;</code>.
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/f0fdf4/166534?text=O+Truque+M%C3%A1gico%5Cn%5Cn%3Cinput+name=%22email%22+/%3E%5Cn%E2%86%93%5Cn%7B+...state,+%5Bname%5D:+value+%7D%5Cn%E2%86%93%5Cn1+Functiom+para+100+Inputs!" 
                  alt="Manipulador de Múltiplos Inputs" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: O Simulador de Cadastros</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="grid-2">
            
            {/* Lab 1: Formulário Controlado (Registro) */}
            <div className="glass-card" style={{ border: '1px solid #bae6fd' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0369a1' }}>
                🎮 Controlled Form (Validação Real-Time)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Este formulário usa 1 único objeto de estado. Cada tecla digitada atualiza o React e roda as regras de validação instantaneamente.
              </p>

              <form onSubmit={handleControlledSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>Username</label>
                  <input 
                    type="text"
                    name="username" // Nome MÁGICO igual a chave do estado
                    value={formData.username}
                    onChange={handleInputChange}
                    className="input"
                    style={{ borderColor: errors.username ? '#ef4444' : '' }}
                    placeholder="devninja"
                  />
                  {errors.username && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.username}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>E-mail</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input"
                    style={{ borderColor: errors.email ? '#ef4444' : '' }}
                    placeholder="email@empresa.com"
                  />
                  {errors.email && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.email}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>Senha Forte (Mínimo 6)</label>
                  <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input"
                    style={{ borderColor: errors.password ? '#ef4444' : '' }}
                    placeholder="••••••••"
                  />
                  {errors.password && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.password}</span>}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={submitStatus === 'loading'}
                  style={{ marginTop: '0.5rem' }}
                >
                  {submitStatus === 'loading' ? 'Enviando...' : submitStatus === 'success' ? '✅ Cadastrado!' : 'Criar Conta'}
                </button>
              </form>
            </div>

            {/* Painel Lateral: State JSON Preview & Uncontrolled Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div className="glass-card" style={{ flex: 1, background: '#0f172a', color: '#38bdf8' }}>
                <h4 style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                  Estado React em Tempo Real
                </h4>
                <pre style={{ margin: 0, padding: 0, background: 'transparent', color: '#38bdf8', fontSize: '0.85rem' }}>
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>

              {/* Lab 2: Formulário Não-Controlado (Ref) */}
              <div className="glass-card" style={{ border: '1px solid #fca5a5' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#b91c1c' }}>
                  👻 Uncontrolled Form (Ref DOM)
                </h3>
                <p style={{ color: '#475569', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  Não há <code>useState</code> rastreando esse campo. Nós lemos o valor direto do DOM usando <code>useRef</code> só quando clicamos no botão.
                </p>
                <form onSubmit={handleUncontrolledSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="email"
                    ref={newsletterEmailRef} // Ligando a Ref!
                    className="input"
                    placeholder="Email da newsletter..."
                    required
                  />
                  <button type="submit" className="btn btn-primary" style={{ background: '#b91c1c' }}>
                    Assinar
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="alert alert-warning">
            <div>
              <strong>O Famoso Erro de 'undefined' a 'string':</strong> Se você esquecer de inicializar a chave do objeto no <code>useState</code> (ex: passar apenas 'username' mas deixar 'email' de fora), o React vai reclamar que um componente mudou de *Uncontrolled* para *Controlled* no meio da execução. Sempre inicie todos os campos com aspas vazias <code>''</code>!
            </div>
          </div>

          <div className="alert alert-success">
            <div>
              <strong>Mercado de Trabalho (Bibliotecas Essenciais):</strong> Ninguém em grandes empresas escreve validações manuais gigantescas ou gerencia 50 campos com 'useState' puro. O padrão absoluto do mercado (e que falaremos depois) é usar o <strong>React Hook Form</strong> (que baseia-se internamente em Uncontrolled Refs para máxima performance) junto com o <strong>Zod</strong> para validação de Schemas!
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
