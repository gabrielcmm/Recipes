import { act } from '@testing-library/react';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWithRouter';

describe('Testa se a tela de login está funcionando corretamente', () => {
  const passwordDataTestId = 'password-input';

  it('Testa se os elementos estão em tela', () => {
    const screen = renderWithRouterAndRedux(<Login />);
    const emailInputEl = screen.getByRole('textbox', { name: /email input/i });
    const passwordInputEl = screen.getByTestId(passwordDataTestId);
    const btnSubmitEl = screen.getByRole('button', { name: /login submit button/i });

    expect(emailInputEl).toBeInTheDocument();
    expect(passwordInputEl).toBeInTheDocument();
    expect(btnSubmitEl).toBeInTheDocument();
  });

  it('testa se o botão está desabilitado quando o email e senha são inválidos', async () => {
    const screen = renderWithRouterAndRedux(<Login />);
    const emailInputEl = screen.getByRole('textbox', { name: /email input/i });
    const passwordInputEl = screen.getByTestId(passwordDataTestId);
    const btnSubmitEl = screen.getByRole('button', { name: /login submit button/i });

    expect(btnSubmitEl).toBeDisabled();

    await act(async () => {
      await screen.user.type(emailInputEl, 'email');
      await screen.user.type(passwordInputEl, '123456');
    });

    expect(btnSubmitEl).toBeDisabled();
  });

  it('testa se o botão está habilitado quando o email e senha são válidos', async () => {
    const screen = renderWithRouterAndRedux(<Login />);
    const emailInputEl = screen.getByRole('textbox', { name: /email input/i });
    const passwordInputEl = screen.getByTestId(passwordDataTestId);
    const btnSubmitEl = screen.getByRole('button', { name: /login submit button/i });

    expect(btnSubmitEl).toBeDisabled();

    await act(async () => {
      await screen.user.type(emailInputEl, 'email@test.com');
      await screen.user.type(passwordInputEl, '1234567');
    });

    expect(btnSubmitEl).toBeEnabled();
  });
});
