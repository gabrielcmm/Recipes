import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Testa a página de Perfil', () => {
  test('Verifica se a página renderiza os botões corretos', () => {
    renderWithRouter(<Profile />);
    const doneRecipesBtn = screen.getByTestId(/profile-done-btn/i);
    const favRecipesBtn = screen.getByTestId(/profile-favorite-btn/i);
    const logoutBtn = screen.getByTestId(/profile-logout-btn/i);
    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favRecipesBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
});

test('Exibe o email do usuário corretamente', () => {
  localStorage.setItem('user', JSON.stringify({ email: 'test@example.com' }));
  renderWithRouter(<Profile />);
  const userEmail = screen.getByTestId(/profile-email/i);
  expect(userEmail.textContent).toBe('test@example.com');
});
