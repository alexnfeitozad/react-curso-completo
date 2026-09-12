import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Modulo10Testes } from './Modulo10Testes';

describe('Modulo 10 - Testes com Vitest', () => {
  it('deve renderizar o título do módulo corretamente', () => {
    render(<Modulo10Testes />);
    expect(screen.getByText(/Testes com Vitest/i)).toBeDefined();
  });

  it('deve conter o botão para executar a pipeline interativa', () => {
    render(<Modulo10Testes />);
    const button = screen.getByRole('button', { name: /Executar Testes/i });
    expect(button).toBeDefined();
  });
});
