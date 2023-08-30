import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Para os matchers adicionais, como `toBeInTheDocument()`

import Footer from '../components/Footer';

describe('Footer Component', () => {
  it('should render footer with two icons', () => {
    render(<Footer />);

    // Verificar se os ícones estão sendo renderizados
    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const mealIcon = screen.getByTestId('meals-bottom-btn');

    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });

  it('should navigate to correct routes when icons are clicked', () => {
    render(<Footer />);

    // Mock de navegação (neste caso, apenas verificando o comportamento padrão de um <a>)
    const drinkLink = screen.getByTestId('drinks-bottom-btn').closest('a');
    const mealLink = screen.getByTestId('meals-bottom-btn').closest('a');

    expect(drinkLink).toHaveAttribute('href', '/drinks');
    expect(mealLink).toHaveAttribute('href', '/meals');
  });
});
