import React, { useState } from 'react';

// --- Strategy Pattern Interfaces & Implementations ---
interface PaymentStrategy {
  name: string;
  icon: string;
  calculateFee: (amount: number) => number;
  processPayment: (amount: number) => { success: boolean; transactionId: string; details: string };
}

class CreditCardStrategy implements PaymentStrategy {
  name = 'Cartão de Crédito';
  icon = '💳';

  calculateFee(amount: number) {
    return amount * 0.035; // 3.5% taxa de gateway
  }

  processPayment(amount: number) {
    const fee = this.calculateFee(amount);
    return {
      success: true,
      transactionId: `CC-${Math.floor(Math.random() * 899999 + 100000)}`,
      details: `Aprovado via adquirente Cielo/Stripe. Total R$ ${(amount + fee).toFixed(2)} (Taxa: R$ ${fee.toFixed(2)}).`
    };
  }
}

class PixStrategy implements PaymentStrategy {
  name = 'Pix Instantâneo';
  icon = '⚡';

  calculateFee(amount: number) {
    return -amount * 0.05; // 5% de desconto promocional
  }

  processPayment(amount: number) {
    const discount = Math.abs(this.calculateFee(amount));
    return {
      success: true,
      transactionId: `PIX-${Math.floor(Math.random() * 899999 + 100000)}`,
      details: `Chave copia-e-cola gerada. Desconto de R$ ${discount.toFixed(2)} aplicado. Total a pagar: R$ ${(amount - discount).toFixed(2)}.`
    };
  }
}

class BoletoStrategy implements PaymentStrategy {
  name = 'Boleto Bancário';
  icon = '📄';

  calculateFee(_amount: number) {
    return 2.50; // Taxa fixa de emissão de boleto
  }

  processPayment(amount: number) {
    const fee = this.calculateFee(amount);
    return {
      success: true,
      transactionId: `BOL-${Math.floor(Math.random() * 899999 + 100000)}`,
      details: `Código de barras gerado. Vencimento em 3 dias úteis. Total R$ ${(amount + fee).toFixed(2)}.`
    };
  }
}

const STRATEGIES: Record<string, PaymentStrategy> = {
  pix: new PixStrategy(),
  card: new CreditCardStrategy(),
  boleto: new BoletoStrategy(),
};

export const Modulo12Patterns: React.FC = () => {
  
  // Strategy Lab State
  const [selectedStrategyKey, setSelectedStrategyKey] = useState<'pix' | 'card' | 'boleto'>('pix');
  const [baseAmount, setBaseAmount] = useState(300);
  const [paymentReceipt, setPaymentReceipt] = useState<{
    success: boolean;
    transactionId: string;
    details: string;
  } | null>(null);

  const currentStrategy = STRATEGIES[selectedStrategyKey];
  const feeOrDiscount = currentStrategy.calculateFee(baseAmount);
  const finalAmount = baseAmount + feeOrDiscount;

  const handlePay = () => {
    const receipt = currentStrategy.processPayment(baseAmount);
    setPaymentReceipt(receipt);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 3: Nível Arquiteto</span>
          <span className="badge badge-neutral">Módulo 12</span>
        </div>
        <h1>Design Patterns & Princípios SOLID</h1>
        <p className="subtitle">
          Padrão Comportamental Strategy, Desacoplamento e os 5 Princípios SOLID no Frontend.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Os 5 Princípios SOLID no Frontend
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-200)' }}>
                <strong>S — Single Responsibility Principle (SRP):</strong> Um componente deve ser responsável apenas pela visualização ou apenas pela lógica de negócios (através de um Custom Hook).
              </div>
              <div style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-200)' }}>
                <strong>O — Open/Closed Principle (OCP):</strong> Componentes devem estar abertos para extensão (via children, compound components e props de renderização), mas fechados para modificação direta em seu núcleo.
              </div>
              <div style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-200)' }}>
                <strong>L — Liskov Substitution Principle (LSP):</strong> Um subtipo ou componente especializado deve poder substituir o componente base sem quebrar o comportamento da aplicação (ex: <code>&lt;PrimaryButton /&gt;</code> deve aceitar todas as propriedades HTML de um <code>&lt;button /&gt;</code>).
              </div>
              <div style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-200)' }}>
                <strong>I — Interface Segregation Principle (ISP):</strong> Não force um componente a depender de uma interface gigante contendo 30 propriedades se ele só precisa de <code>id</code> e <code>title</code>.
              </div>
              <div style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-200)' }}>
                <strong>D — Dependency Inversion Principle (DIP):</strong> Componentes devem depender de abstrações (interfaces/hooks de serviço), e não de instâncias concretas acopladas diretamente (ex: invocar <code>apiClient</code> abstrato em vez de <code>axios.post</code> estático).
              </div>
            </div>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Interface e Injeção da Strategy Pattern
          </h3>
          <pre>
            <code>{`export interface PaymentStrategy {
  name: string;
  calculateFee: (amount: number) => number;
  processPayment: (amount: number) => Promise<PaymentResult>;
}

export const PaymentCheckout = ({ strategy }: { strategy: PaymentStrategy }) => {
  const handlePay = () => {
    strategy.processPayment(100);
  };
  return <button onClick={handlePay}>Pagar via {strategy.name}</button>;
};`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              💳 Laboratório de Design Pattern: Strategy de Pagamento
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              O padrão <strong>Strategy</strong> permite alternar o algoritmo de checkout em tempo de execução sem encher seu componente de <code>if/else</code> gigantescos. Novos métodos (ex: Crypto, PayPal) podem ser adicionados sem alterar o código existente (Princípio Open/Closed).
            </p>

            <div className="grid-2">
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>1. Selecione o Gateway (Strategy)</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  {Object.entries(STRATEGIES).map(([key, strat]) => (
                    <label
                      key={key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: selectedStrategyKey === key ? '#f0f9ff' : '#ffffff',
                        border: `1.5px solid ${selectedStrategyKey === key ? '#0284c7' : 'var(--neutral-200)'}`,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <input
                          type="radio"
                          name="paymentStrat"
                          checked={selectedStrategyKey === key}
                          onChange={() => {
                            setSelectedStrategyKey(key as any);
                            setPaymentReceipt(null);
                          }}
                        />
                        <span style={{ fontSize: '1.2rem' }}>{strat.icon}</span>
                        <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{strat.name}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: key === 'pix' ? '#16a34a' : '#64748b' }}>
                        {key === 'pix' ? '5% OFF' : key === 'card' ? '+3.5% taxa' : '+R$ 2.50'}
                      </span>
                    </label>
                  ))}
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Valor Base:</label>
                  <input
                    type="number"
                    className="input"
                    value={baseAmount}
                    onChange={e => {
                      setBaseAmount(Number(e.target.value));
                      setPaymentReceipt(null);
                    }}
                    min="10"
                    step="10"
                  />
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>2. Execução da Strategy</h4>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                    <span>Valor Original:</span>
                    <span>R$ {baseAmount.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: feeOrDiscount < 0 ? '#16a34a' : '#d97706', fontWeight: 600 }}>
                    <span>Ajuste da Strategy:</span>
                    <span>{feeOrDiscount < 0 ? `- R$ ${Math.abs(feeOrDiscount).toFixed(2)}` : `+ R$ ${feeOrDiscount.toFixed(2)}`}</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--neutral-200)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>
                    <span>Total Final:</span>
                    <span style={{ color: '#0284c7' }}>R$ {finalAmount.toFixed(2)}</span>
                  </div>

                  <button onClick={handlePay} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Confirmar Pagamento com {currentStrategy.name}
                  </button>

                  {paymentReceipt && (
                    <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                      <div style={{ fontWeight: 800, color: '#166534', marginBottom: '0.3rem' }}>
                        ✅ Transação Aprovada ({paymentReceipt.transactionId})
                      </div>
                      <div style={{ color: '#15803d' }}>{paymentReceipt.details}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-success">
            <div>
              <strong>Engenharia de Elite:</strong> Ao adotar SOLID e Strategy, você desacopla seu código de tal forma que refatorações tornam-se triviais e testes unitários ficam rápidos de escrever.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
