import React from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';

// --- COMPONENTES VISUAIS PEDAGÓGICOS ---
const ConceptHeader = ({ title, docLink, docText }: { title: string, docLink: string, docText: string }) => (
  <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--neutral-200)', paddingBottom: '1rem', marginTop: '3rem' }}>
    <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-600)', marginBottom: '0.5rem' }}>
      {title}
    </h3>
    <a href={docLink} target="_blank" rel="noreferrer" style={{ fontSize: '0.95rem', color: 'var(--neutral-500)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
      <span>📚 Documentação Oficial:</span> <span style={{ color: 'var(--primary-500)', fontWeight: 600 }}>{docText}</span>
    </a>
  </div>
);

const SectionBlock = ({ title, icon, children, bg = 'white' }: { title: string, icon: string, children: React.ReactNode, bg?: string }) => (
  <div style={{ background: bg, padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)', marginBottom: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--neutral-700)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span>{icon}</span> {title}
    </h4>
    <div style={{ color: 'var(--neutral-600)', lineHeight: '1.7' }}>
      {children}
    </div>
  </div>
);

const Diagram = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ background: '#0f172a', color: '#38bdf8', padding: '1.5rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', lineHeight: '1.5', overflowX: 'auto', fontWeight: 600, border: '1px solid #1e293b', marginBottom: '1.25rem' }}>
    {children}
  </pre>
);

const CodeSnippet = ({ code }: { code: string }) => (
  <pre style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0', overflowX: 'auto', fontSize: '0.9rem', marginBottom: '1rem', color: '#334155' }}>
    <code>{code}</code>
  </pre>
);

const EShopIntegration = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderLeft: '4px solid #3b82f6', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#1d4ed8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span>🛒</span> Aplicação no eShop-React
    </h4>
    <div style={{ color: '#1e3a8a', lineHeight: '1.7' }}>
      {children}
    </div>
  </div>
);

const Checklist = ({ items }: { items: string[] }) => (
  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
    <h5 style={{ fontWeight: 700, color: '#166534', marginBottom: '1rem', fontSize: '1.05rem' }}>☑️ Checklist do Conceito</h5>
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#15803d', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
          <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span> <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// --- CÓDIGO DO SANDPACK (E-SHOP LAB) ---
const labAppJs = `import "./styles.css";

// 1. Crie o seu Componente de Produto (ProductCard)
// Desafio: Faça o ProductCard renderizar as props (imagem, nome, preco)
function ProductCard(props) {
  return (
    <div className="product-card">
      {/* Insira a Imagem aqui */}
      
      {/* Insira o Nome aqui */}
      
      {/* Renderização Condicional: Se isAvailable for falso, mostre "Esgotado!" */}
      
    </div>
  );
}

export default function App() {
  const products = [
    { id: 1, name: "Teclado Mecânico RGB", price: 350.00, image: "⌨️", isAvailable: true },
    { id: 2, name: "Mouse Gamer", price: 120.00, image: "🖱️", isAvailable: true },
    { id: 3, name: "Monitor Ultrawide", price: 1500.00, image: "🖥️", isAvailable: false }
  ];

  return (
    <div className="container">
      <header className="header">
        <h1>🛒 eShop-React</h1>
      </header>
      
      <h2>Catálogo de Produtos</h2>
      <div className="product-list">
        {/* 2. Use o .map() para renderizar a lista de products usando o ProductCard! */}
        {/* Lembre-se da prop 'key' */}
        
      </div>
    </div>
  );
}
`;

const labStylesCss = `body {
  font-family: system-ui, sans-serif;
  padding: 0;
  margin: 0;
  background: #f1f5f9;
  color: #0f172a;
}
.header {
  background: #3b82f6;
  color: white;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
}
.header h1 { margin: 0; font-size: 1.5rem; }
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}
.product-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  border: 1px solid #e2e8f0;
}
.product-card img, .product-card .emoji {
  font-size: 4rem;
  margin-bottom: 1rem;
  display: block;
}
.product-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}
.price {
  color: #10b981;
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
.sold-out {
  color: #ef4444;
  font-weight: bold;
  background: #fee2e2;
  padding: 4px 8px;
  border-radius: 4px;
}
`;

// --- PÁGINA PRINCIPAL ---
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
          Bem-vindo ao início da sua jornada! Aqui, você aprenderá React exatamente como os engenheiros da Meta recomendam. 
          E não vamos apenas ler teoria: a cada novo conceito, construiremos juntos um pedaço do nosso <strong>eShop-React</strong>, um e-commerce real que crescerá junto com o seu conhecimento.
        </p>
      </div>

      {/* ============================================================== */}
      {/* CONCEITO 1 */}
      {/* ============================================================== */}
      <section className="module-section">
        <ConceptHeader 
          title="1. Seu Primeiro Componente" 
          docLink="https://react.dev/learn/your-first-component" 
          docText="Your First Component" 
        />
        
        <SectionBlock title="O que estamos aprendendo?" icon="🎯">
          <p>Aplicações React são construídas a partir de peças isoladas de UI chamadas <strong>componentes</strong>. Vamos aprender o que é um componente e como criá-lo.</p>
        </SectionBlock>

        <SectionBlock title="Entendendo o conceito" icon="🧠">
          <p>
            No desenvolvimento web tradicional, você separa HTML (estrutura) e JavaScript (lógica). 
            O React revolucionou isso ao permitir que você junte lógica e marcação no mesmo lugar: o componente. 
            No React, um componente é simplesmente uma <strong>função JavaScript pura que retorna marcação (markup)</strong>.
          </p>
        </SectionBlock>

        <SectionBlock title="Visualização" icon="👀">
          <Diagram>{`
FUNÇÃO JAVASCRIPT
┌─────────────────────────┐
│ function Button() {     │
│   // Lógica aqui        │
│                         │
│   return (              │  ◄── RETORNO DE MARCAÇÃO
│     <button>Click</button> 
│   );                    │
│ }                       │
└─────────────────────────┘
          `}</Diagram>
        </SectionBlock>

        <SectionBlock title="Código mínimo & Anatomia" icon="💻">
          <CodeSnippet code={`export function Profile() {
  return <img src="https://i.pravatar.cc/150" alt="Super Dev" />;
}`} />
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li><code>export</code>: Permite que este componente seja importado e usado em outros arquivos.</li>
            <li><code>function Profile()</code>: <strong>Nomes de componentes React DEVEM começar com letra maiúscula</strong>. Se for minúscula, o React achará que é uma tag HTML normal (como <code>&lt;div&gt;</code>).</li>
            <li><code>return &lt;img ... /&gt;</code>: O componente retorna a estrutura visual que ele representa.</li>
          </ul>
        </SectionBlock>

        <SectionBlock title="Exemplo do mundo real" icon="🌍">
          <p>Imagine que você quer compor uma tela a partir de peças menores:</p>
          <CodeSnippet code={`export function App() {
  return (
    <section>
      <h1>Nossa Equipe</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}`} />
          <p>Você escreve o <code>Profile</code> uma vez e o reutiliza quantas vezes quiser, como se fosse uma tag HTML customizada!</p>
        </SectionBlock>

        <SectionBlock title="Exercício Guiado & Desafio" icon="✍️">
          <p><strong>Exercício:</strong> Crie um componente chamado <code>Header</code> que retorne um <code>&lt;header&gt;</code> contendo um <code>&lt;h1&gt;</code> com o texto "Meu Site".</p>
          <p><strong>Desafio:</strong> Adicione o seu <code>Header</code> dentro do componente <code>App</code>.</p>
        </SectionBlock>

        <EShopIntegration>
          <p><strong>Por que estamos fazendo isso?</strong> No nosso e-commerce, não queremos escrever a mesma estrutura de produto repetidas vezes. Vamos criar o componente <code>Header</code> para o topo da loja e um componente <code>ProductCard</code> para representar um produto individual.</p>
          <CodeSnippet code={`// Em src/components/Header.tsx
export function Header() {
  return (
    <header>
      <h1>🛒 eShop-React</h1>
    </header>
  );
}`} />
        </EShopIntegration>

        <SectionBlock title="O que acabou de acontecer?" icon="🔄">
          <Diagram>{`
CRIAMOS O COMPONENTE  ──►  IMPORTAMOS NO APP  ──►  REACT RENDERIZA A TELA
<Header />                 <App>                    <h1>🛒 eShop-React</h1>
                             <Header />
                           </App>
          `}</Diagram>
        </SectionBlock>

        <Checklist items={[
          "Consigo criar um componente React (Função JS com letra maiúscula).",
          "Entendo que um componente deve retornar uma marcação de UI.",
          "Sei como utilizar o componente dentro de outro componente (ex: <Header />)."
        ]} />
      </section>

      {/* ============================================================== */}
      {/* CONCEITO 2 */}
      {/* ============================================================== */}
      <section className="module-section">
        <ConceptHeader 
          title="2. Escrevendo Marcação com JSX" 
          docLink="https://react.dev/learn/writing-markup-with-jsx" 
          docText="Writing Markup with JSX" 
        />
        
        <SectionBlock title="O que estamos aprendendo?" icon="🎯">
          <p>Aprenderemos <strong>JSX</strong>, a sintaxe que parece HTML mas vive dentro do JavaScript, e suas 3 regras rigorosas.</p>
        </SectionBlock>

        <SectionBlock title="Entendendo o conceito" icon="🧠">
          <p>JSX é uma extensão de sintaxe para JavaScript. Ele permite que você escreva estruturas parecidas com HTML no mesmo arquivo onde escreve a lógica JavaScript. No entanto, JSX é mais estrito que o HTML comum.</p>
        </SectionBlock>

        <SectionBlock title="As 3 Regras de Ouro do JSX" icon="📏">
          <ol style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Retorne um único elemento raiz:</strong> O JSX precisa estar envelopado. Se você quer retornar um <code>h1</code> e um <code>p</code>, precisa colocá-los dentro de uma <code>&lt;div&gt;</code> ou usar um Fragmento <code>&lt;&gt; ... &lt;/&gt;</code>.
              <CodeSnippet code={`// ❌ ERRO: Retornando dois elementos soltos
return (
  <h1>Título</h1>
  <p>Descrição</p>
);

// ✅ CORRETO: Usando Fragmento
return (
  <>
    <h1>Título</h1>
    <p>Descrição</p>
  </>
);`} />
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Feche TODAS as tags:</strong> Tags de auto-fechamento no HTML (como <code>img</code> ou <code>input</code>) DEVEM ser fechadas no JSX: <code>&lt;img /&gt;</code> e <code>&lt;input /&gt;</code>.
            </li>
            <li>
              <strong>Use camelCase para a maioria das coisas:</strong> JSX vira JavaScript nos bastidores. Como atributos como <code>class</code> são palavras reservadas do JS, no JSX usamos <code>className</code>. O mesmo vale para eventos (<code>onclick</code> vira <code>onClick</code>).
            </li>
          </ol>
        </SectionBlock>

        <EShopIntegration>
          <p>Ao estruturarmos nosso <code>ProductCard</code> no eShop, precisaremos usar essas regras. A imagem do produto terá que ser fechada adequadamente, e a estilização do cartão usará a propriedade <code>className</code>.</p>
          <CodeSnippet code={`export function ProductCard() {
  return (
    <div className="product-card">
      <img src="/mouse.jpg" alt="Mouse" />
      <h2>Mouse Gamer</h2>
    </div>
  );
}`} />
        </EShopIntegration>

        <Checklist items={[
          "Consigo envelopar múltiplos elementos em um <>Fragmento</>.",
          "Entendo que <input> vira <input /> e class vira className.",
          "Sei evitar erros de sintaxe JSX que o compilador aponta."
        ]} />
      </section>

      {/* ============================================================== */}
      {/* CONCEITO 3 */}
      {/* ============================================================== */}
      <section className="module-section">
        <ConceptHeader 
          title="3. JavaScript dentro do JSX" 
          docLink="https://react.dev/learn/javascript-in-jsx-with-curly-braces" 
          docText="JavaScript in JSX with Curly Braces" 
        />
        
        <SectionBlock title="O que estamos aprendendo?" icon="🎯">
          <p>Como abrir "janelas" dentro do JSX para injetar variáveis e expressões JavaScript usando as <strong>chaves <code>{'{ }'}</code></strong>.</p>
        </SectionBlock>

        <SectionBlock title="Visualização" icon="👀">
          <Diagram>{`
    VARIÁVEL JS                      JSX
  const name = "Ana";    ─────►   <h1>Olá, {name}!</h1> 
  const math = 2 + 2;    ─────►   <p>A soma é {math}</p>
          `}</Diagram>
        </SectionBlock>

        <SectionBlock title="Entendendo o conceito" icon="🧠">
          <p>Quando você quer exibir texto dinâmico ou calcular algo na hora de renderizar, basta colocar expressões JavaScript entre chaves. Tudo que estiver entre <code>{'{ }'}</code> será avaliado pelo React.</p>
          <CodeSnippet code={`const user = "Super Dev";
const image = "avatar.png";

// Usando nas tags HTML e nos atributos!
return (
  <div className="card">
    <h1>Bem-vindo, {user}!</h1>
    <img src={image} alt={"Foto de " + user} />
  </div>
);`} />
        </SectionBlock>

        <SectionBlock title="Objetos CSS Inline" icon="🎨">
          <p>Se você for injetar estilos CSS diretamente via propriedade style, precisará de <strong>duas chaves</strong>: <code>style={'{'}{'{'} backgroundColor: 'red' {'}'}{'}'}</code>. A primeira chave abre a janela do JS. A segunda chave é literalmente a criação de um Objeto JavaScript.</p>
        </SectionBlock>

        <EShopIntegration>
          <p>No eShop, o preço do produto e o nome nem sempre serão estáticos. Precisaremos formatá-los dinamicamente.</p>
          <CodeSnippet code={`export function ProductCard() {
  const productName = "Teclado Mecânico";
  const price = 299.90;

  return (
    <div className="product-card">
      <h2>{productName}</h2>
      <p style={{ color: 'green', fontWeight: 'bold' }}>
        R$ {price.toFixed(2)}
      </p>
    </div>
  );
}`} />
        </EShopIntegration>

        <Checklist items={[
          "Sei como imprimir variáveis de texto e números no meio do HTML.",
          "Entendo como usar as chaves para injetar atributos dinâmicos (como src={variavel}).",
          "Sei por que usamos {{ }} para passar estilos inline (Objeto JS)."
        ]} />
      </section>

      {/* ============================================================== */}
      {/* CONCEITO 4 */}
      {/* ============================================================== */}
      <section className="module-section">
        <ConceptHeader 
          title="4. Passando Props" 
          docLink="https://react.dev/learn/passing-props-to-a-component" 
          docText="Passing Props to a Component" 
        />
        
        <SectionBlock title="O que estamos aprendendo?" icon="🎯">
          <p>Como os componentes React se comunicam passando dados de um componente <strong>Pai</strong> para um componente <strong>Filho</strong> através das <strong>Props</strong>.</p>
        </SectionBlock>

        <SectionBlock title="Entendendo o conceito" icon="🧠">
          <p>Props (abreviação de propriedades) são a maneira como passamos dados. Pense nelas como <strong>argumentos de função</strong>. Assim como funções JavaScript normais aceitam argumentos, componentes React aceitam props. Sem as props, nossos componentes seriam fixos e exibiriam sempre a mesma coisa em todos os lugares.</p>
        </SectionBlock>

        <SectionBlock title="Visualização" icon="👀">
          <Diagram>{`
COMPONENTE PAI (App)
       │
       │ name="Teclado" price={299}   ◄── (Props enviadas)
       ▼
COMPONENTE FILHO (ProductCard)
       │
       │ Recebe {name, price} e renderiza JSX dinâmico!
          `}</Diagram>
        </SectionBlock>

        <SectionBlock title="Anatomia do Código" icon="💻">
          <CodeSnippet code={`// PAI
export function App() {
  return (
    <ProductCard name="Mouse" price={99} />
  );
}

// FILHO (Usando Desestruturação de Objeto do JavaScript)
function ProductCard({ name, price }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>R$ {price}</p>
    </div>
  );
}`} />
          <p>Note como o filho "pega" <code>name</code> e <code>price</code> de dentro das chaves (desestruturação). O React junta todas as props que você passa e envia como um único objeto JavaScript para a função do componente.</p>
        </SectionBlock>

        <EShopIntegration>
          <p>O <code>ProductCard</code> no eShop será inútil se ele tiver dados hardcoded. Vamos transformá-lo para receber as informações reais de qualquer produto via props!</p>
          <CodeSnippet code={`// Agora o ProductCard é 100% dinâmico e reutilizável!
export function ProductCard({ image, name, price }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p className="price">R$ {price.toFixed(2)}</p>
    </div>
  );
}`} />
        </EShopIntegration>
        
        <SectionBlock title="O que acabou de acontecer?" icon="🔄">
          <Diagram>{`
Dados do BD/API  ──►  App (Pai)  ──►  Props  ──►  ProductCard (Filho)  ──►  Interface Renderizada
          `}</Diagram>
        </SectionBlock>

        <Checklist items={[
          "Entendo que Props descem do Pai para o Filho (nunca o contrário).",
          "Consigo usar destructuring ({ nome }) para acessar as props rapidamente.",
          "Sei como criar componentes reutilizáveis mudando apenas as props passadas."
        ]} />
      </section>

      {/* ============================================================== */}
      {/* CONCEITO 5 */}
      {/* ============================================================== */}
      <section className="module-section">
        <ConceptHeader 
          title="5. Renderização Condicional" 
          docLink="https://react.dev/learn/conditional-rendering" 
          docText="Conditional Rendering" 
        />
        
        <SectionBlock title="O que estamos aprendendo?" icon="🎯">
          <p>Como exibir, ocultar ou alterar a UI com base em condições, usando sintaxe de JavaScript puro (If, Ternários e o Operador AND).</p>
        </SectionBlock>

        <SectionBlock title="Entendendo o conceito" icon="🧠">
          <p>O React não tem sintaxe especial de template como <code>v-if</code> ou <code>*ngIf</code>. Você controla o fluxo de renderização usando código JavaScript normal.</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong>IF:</strong> Se você quer retornar um componente completamente diferente (ou <code>null</code> para não renderizar nada naquele componente).</li>
            <li><strong>Operador Ternário (<code>? :</code>):</strong> Perfeito para trocar uma pequena parte da UI no meio do JSX.</li>
            <li><strong>Operador Lógico AND (<code>&&</code>):</strong> Usado quando você quer mostrar algo SE a condição for verdadeira, ou não mostrar NADA se for falsa.</li>
          </ul>
        </SectionBlock>

        <SectionBlock title="Código mínimo & Cuidado Crítico!" icon="⚠️">
          <CodeSnippet code={`// 1. Ternário (Se isPacked for true, renderiza Check, senão Cross)
return (
  <li>{isPacked ? "✅ Embalado" : "❌ Falta embalar"}</li>
);

// 2. Operador Lógico AND (Se isNew for true, renderiza o badge)
return (
  <div>
    {isNew && <span className="badge">NOVO!</span>}
  </div>
);`} />
          <div className="alert alert-danger" style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem', marginTop: '1rem' }}>
            <strong style={{ color: '#b91c1c' }}>O Erro do Zero (0):</strong> Nunca coloque um número à esquerda do operador <code>&&</code> (Ex: <code>messages.length && &lt;p&gt;...&lt;/p&gt;</code>). Se o valor for <code>0</code>, o React não sabe o que fazer com ele e vai renderizar o número "0" visível na tela! O certo é forçar um booleano: <code>messages.length &gt; 0 && ...</code>.
          </div>
        </SectionBlock>

        <EShopIntegration>
          <p>No eShop, precisaremos exibir uma tarja de "Esgotado" nos produtos que não têm estoque (<code>isAvailable === false</code>).</p>
          <CodeSnippet code={`export function ProductCard({ image, name, price, isAvailable }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      
      {/* Renderização Condicional: Se está disponível, mostra preço. Senão, 'Esgotado' */}
      {isAvailable ? (
        <p className="price">R$ {price.toFixed(2)}</p>
      ) : (
        <span className="sold-out">Esgotado!</span>
      )}
    </div>
  );
}`} />
        </EShopIntegration>

        <Checklist items={[
          "Sei como retornar null para esconder completamente um componente.",
          "Consigo usar ternários (condição ? true : false) dentro do JSX.",
          "Entendo o perigo do operador && com números inteiros (como 0)."
        ]} />
      </section>

      {/* ============================================================== */}
      {/* CONCEITO 6 */}
      {/* ============================================================== */}
      <section className="module-section">
        <ConceptHeader 
          title="6. Renderizando Listas (e Keys)" 
          docLink="https://react.dev/learn/rendering-lists" 
          docText="Rendering Lists" 
        />
        
        <SectionBlock title="O que estamos aprendendo?" icon="🎯">
          <p>Como pegar arrays de dados recebidos e transformá-los em arrays de componentes JSX usando o método <code>.map()</code> do JS, e por que precisamos fornecer a prop especial <code>key</code>.</p>
        </SectionBlock>

        <SectionBlock title="Visualização" icon="👀">
          <Diagram>{`
  ARRAY DE DADOS           .MAP()            ARRAY DE JSX
[ {nome: "Mouse"} ]    ─── mapeia ──►    [ <ProductCard name="Mouse" /> ]
[ {nome: "Cabo"}  ]    ─── mapeia ──►    [ <ProductCard name="Cabo" />  ]
          `}</Diagram>
        </SectionBlock>

        <SectionBlock title="Entendendo o conceito" icon="🧠">
          <p>Na vida real, você não escreve um Card por um. Você recebe uma lista (Array) de dados de uma API. Para renderizar isso de forma dinâmica, iteramos o array original usando a função nativa <code>.map()</code> do JavaScript dentro do nosso JSX.</p>
          <p><strong>A regra de ouro (As Keys):</strong> Sempre que você retorna um elemento JSX de dentro de um <code>.map()</code>, você DEVE passar uma propriedade especial chamada <code>key</code>. Ela deve ser um identificador único, como um ID do banco de dados.</p>
          <p>O React usa a <code>key</code> para "casar" os itens antigos com os novos após alguma atualização. Sem as keys, o React não sabe se um item foi apenas movido para cima, inserido no meio ou deletado, e pode precisar destruir e recriar toda a lista na tela, prejudicando severamente a performance.</p>
        </SectionBlock>

        <SectionBlock title="Código mínimo" icon="💻">
          <CodeSnippet code={`const frutas = [
  { id: 1, nome: "Maçã" },
  { id: 2, nome: "Banana" }
];

return (
  <ul>
    {frutas.map(fruta => (
      // A key vai SEMPRE no elemento mais externo retornado pelo map
      <li key={fruta.id}>{fruta.nome}</li>
    ))}
  </ul>
);`} />
          <div className="alert alert-warning" style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '1rem', marginTop: '1rem' }}>
            <strong style={{ color: '#b45309' }}>Nunca use o <code>index</code> do Array como key:</strong> <code>map((item, index) =&gt; ...)</code> parece uma solução rápida para se livrar do alerta de "Missing key". Porém, se sua lista puder ser ordenada (Z-A), filtrada, ou se itens puderem ser adicionados no topo, os índices numéricos serão completamente trocados, destruindo a relação que o React mantém internamente com os elementos da tela.
          </div>
        </SectionBlock>

        <EShopIntegration>
          <p>No eShop, nós criaremos finalmente a nossa <code>ProductList</code>. Ela vai iterar sobre a matriz de dados de produtos para renderizar um <code>ProductCard</code> na interface para cada registro disponível!</p>
          <CodeSnippet code={`// Lista de dados mockada (simulando API)
const DUMMY_PRODUCTS = [
  { id: 'p1', name: 'Mouse Gamer', price: 120, image: 'mouse.jpg', isAvailable: true },
  { id: 'p2', name: 'Teclado RGB', price: 350, image: 'teclado.jpg', isAvailable: false }
];

export function ProductList() {
  return (
    <div className="product-list">
      {DUMMY_PRODUCTS.map(product => (
        // Renderizamos o componente filho usando as props, e a KEY é fundamental aqui!
        <ProductCard 
          key={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          isAvailable={product.isAvailable}
        />
      ))}
    </div>
  );
}`} />
        </EShopIntegration>

        <SectionBlock title="O que acabou de acontecer?" icon="🔄">
          <Diagram>{`
DUMMY_PRODUCTS (Array)  ──►  .map() iterando itens  ──►  React gera 2 ProductCards na DOM
          `}</Diagram>
        </SectionBlock>

        <Checklist items={[
          "Sei como usar arr.map() dentro do JSX para renderizar coleções dinâmicas.",
          "Entendo que a prop 'key' é essencial e exigida pelo motor do React para rastrear itens mutáveis.",
          "Sei por que NÃO devo usar o índice numérico (index) do map como key."
        ]} />
      </section>

      {/* ============================================================== */}
      {/* CONCEITO 7 */}
      {/* ============================================================== */}
      <section className="module-section">
        <ConceptHeader 
          title="7. Mantendo Componentes Puros" 
          docLink="https://react.dev/learn/keeping-components-pure" 
          docText="Keeping Components Pure" 
        />
        
        <SectionBlock title="O que estamos aprendendo?" icon="🎯">
          <p>Um conceito matemático fundamental trazido para a arquitetura do React: Funções Puras. Nossos componentes devem ser previsíveis, recebendo entradas e devolvendo o mesmo JSX sem causar "efeitos colaterais" (side-effects).</p>
        </SectionBlock>

        <SectionBlock title="Entendendo o conceito" icon="🧠">
          <p>Uma função pura tem duas características imutáveis:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li><strong>Ela cuida dos próprios negócios:</strong> Ela não altera variáveis externas que existiam antes dela ser chamada.</li>
            <li><strong>Mesma entrada, Mesma saída:</strong> Se você passar as mesmas Props, ela DEVE sempre retornar a mesma interface.</li>
          </ul>
          <p>Se você alterar uma variável global (ou alterar a DOM nativamente) <strong>durante a fase de renderização de um componente</strong>, você criará um Componente Impuro. Mutações assim causarão bugs bizarros onde partes da tela renderizam a coisa errada aleatoriamente.</p>
        </SectionBlock>

        <SectionBlock title="Visualização" icon="👀">
          <Diagram>{`
[Componente Puro] ✅ Previsível
Props(Dados A) ──►  (Sem tocar no mundo externo) ──►  Sempre Retorna Interface(A)

[Componente Impuro] ❌ Causa Bugs Severos
Props(Dados A) ──►  Modifica let global += 1 ──►  Retorna Interface Diferente a cada vez
          `}</Diagram>
        </SectionBlock>
        
        <EShopIntegration>
          <p>Imagine que toda vez que nosso <code>ProductCard</code> fosse desenhado na tela, ele mudasse uma variável externa de carrinho. Isso quebraria a aplicação instantaneamente. Nosso <code>ProductCard</code> será puro: ele recebe a foto e o preço, e simplesmente desenha na tela. Ele não muda o preço de ninguém nos bastidores!</p>
        </EShopIntegration>

        <Checklist items={[
          "Entendo que a renderização do React deve ser uma etapa pura e imutável.",
          "Compreendo o conceito de 'Mesma Entrada resulta em Mesma Saída'.",
          "Sei que se precisar causar um efeito externo (como fazer um log ou chamar API), precisarei usar ferramentas específicas depois da renderização (como useEffect), e nunca mutar dados globais diretamente no corpo do componente."
        ]} />
      </section>

      {/* ============================================================== */}
      {/* LABORATÓRIO (SANDPACK) */}
      {/* ============================================================== */}
      <section className="module-section" style={{ marginTop: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', background: '#0f172a', padding: '1.5rem', borderRadius: 'var(--radius-md)', color: 'white' }}>
          <div>
            <h2 className="section-title" style={{ marginBottom: '0.5rem', color: '#38bdf8' }}>🧪 Laboratório: Construindo o Catálogo do eShop-React</h2>
            <p style={{ margin: 0, color: '#94a3b8' }}>Aperte os cintos. É hora de aplicar TODOS os conceitos que você acabou de aprender construindo o catálogo da eShop do zero!</p>
          </div>
          <span className="badge" style={{ background: '#38bdf8', color: '#0f172a', fontWeight: 'bold' }}>Live Code</span>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
          <strong>O Desafio:</strong> O editor abaixo é o seu projeto. <br/>
          <strong>Passo 1:</strong> Preencha o componente <code>ProductCard</code>. Use as chaves JSX para renderizar as propriedades <code>image</code> e <code>name</code> que ele recebe via props. Se a prop <code>isAvailable</code> for falsa, use renderização condicional para renderizar o texto "Esgotado!" (temos até uma classe css pronta: <code>sold-out</code> para você usar). <br/>
          <strong>Passo 2:</strong> Desça até o componente <code>App</code>. Ache a div <code>product-list</code> e chame o método <code>.map()</code> no array de <code>products</code>. Para cada produto, retorne o seu componente <code>&lt;ProductCard /&gt;</code>, passando as props necessárias (incluindo a famosa <code>key</code>!).
        </p>

        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          <Sandpack
            template="react"
            theme="dark"
            files={{
              "/App.js": labAppJs,
              "/styles.css": labStylesCss,
            }}
            options={{
              showNavigator: true,
              showTabs: true,
              editorHeight: 650,
            }}
          />
        </div>
      </section>

      {/* ============================================================== */}
      {/* CONCLUSÃO E PONTE PARA MÓDULO 2 */}
      {/* ============================================================== */}
      <section className="module-section" style={{ marginTop: '4rem' }}>
        <h2 className="section-title">🎓 O que construímos no eShop-React</h2>
        <Diagram>{`
ANTES (Vazio)                    DEPOIS (Nossa primeira arquitetura de UI!)
App                              App
└── (Vazio)                      ├── Header
                                 └── ProductList
                                     ├── ProductCard (Teclado - R$ 350)
                                     ├── ProductCard (Mouse - R$ 120)
                                     └── ProductCard (Monitor - Esgotado!)
        `}</Diagram>

        <h2 className="section-title" style={{ marginTop: '3rem' }}>🧠 Modelo Mental Final</h2>
        <div style={{ background: '#fafafa', padding: '1.5rem', borderLeft: '4px solid #10b981', borderRadius: '4px', marginBottom: '2rem', fontStyle: 'italic', color: '#475569', lineHeight: '1.8' }}>
          "O React constrói interfaces usando peças independentes chamadas <strong>componentes</strong>. 
          Eles são funções JS puras que retornam <strong>JSX</strong>. O JSX nos permite injetar lógica JavaScript através das chaves <code>{'{ }'}</code>. 
          Os componentes recebem dados dinâmicos do componente pai através de <strong>props</strong>. 
          A interface pode esconder ou mostrar pedaços de tela condicionalmente usando lógica booleana, 
          e arrays de dados são transformados em múltiplos componentes na tela usando a função <code>.map()</code> e identificadores estáveis (<strong>keys</strong>). 
          Toda essa cascata de renderização (render) deve permanecer pura, sem side-effects indesejados."
        </div>

        <div style={{ background: '#4f46e5', color: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>🚀 O que vem a seguir?</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            O catálogo do nosso eShop agora está construído, componetizado e renderizando produtos... mas ele é <strong>completamente estático</strong>. 
            Se o usuário clicar no botão "Comprar", literalmente nada vai acontecer! <br/><br/>
            No próximo módulo (<strong>Interatividade e Estado</strong>), vamos descobrir como dar vida à interface ensinando o React a responder ao clique do usuário e a "lembrar" das informações de tela usando os Hooks (como <code>useState</code>). 
            Nós vamos construir o carrinho de compras do eShop!
          </p>
        </div>
      </section>

    </div>
  );
};
