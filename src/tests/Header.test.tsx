import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';
import Header from '../components/Header';
import renderWithRouterAndRedux from './helpers/renderWithRouter';

const PAGE_TITLE_DTID = 'page-title';
const PROFILE_BTN_DTID = 'profile-top-btn';
const SEARCH_BTN_DTID = 'search-top-btn';
const SEARCH_INPUT_DTID = 'search-input';

describe('Testa se o header está funcionando corretamente', () => {
  it('Testa se o endpoint /meals está mostrando os elementos corretos', () => {
    renderWithRouterAndRedux(<Header />, '/meals');
    const pageTitleEl = screen.getByTestId(PAGE_TITLE_DTID);
    const profileBtnEl = screen.getByTestId(PROFILE_BTN_DTID);
    const searchBtnEl = screen.getByTestId(SEARCH_BTN_DTID);

    expect(pageTitleEl).toHaveTextContent('Meals');
    expect(profileBtnEl).toBeInTheDocument();
    expect(searchBtnEl).toBeInTheDocument();
  });

  it('Testa se o endpoint /drinks está mostrando os elementos corretos', () => {
    renderWithRouterAndRedux(<Header />, '/drinks');
    const pageTitleEl = screen.getByTestId(PAGE_TITLE_DTID);
    const profileBtnEl = screen.getByTestId(PROFILE_BTN_DTID);
    const searchBtnEl = screen.getByTestId(SEARCH_BTN_DTID);

    expect(pageTitleEl).toHaveTextContent('Drinks');
    expect(profileBtnEl).toBeInTheDocument();
    expect(searchBtnEl).toBeInTheDocument();
  });

  it('Testa se o endpoint /profile está mostrando os elementos corretos', () => {
    renderWithRouterAndRedux(<Header />, '/profile');
    const pageTitleEl = screen.getByTestId(PAGE_TITLE_DTID);
    const profileBtnEl = screen.getByTestId(PROFILE_BTN_DTID);

    // queryByTestId retorna null se não encontrar o elemento ao invés de error
    const searchBtnEl = screen.queryByTestId(SEARCH_BTN_DTID);

    expect(pageTitleEl).toHaveTextContent('Profile');
    expect(profileBtnEl).toBeInTheDocument();

    expect(searchBtnEl).not.toBeInTheDocument();
    expect(searchBtnEl).toBeNull();
  });

  it('Testa se o botão de perfil redireciona para a página correta', () => {
    renderWithRouterAndRedux(<Header />, '/meals');
    const profileBtnEl = screen.getByTestId(PROFILE_BTN_DTID);

    expect(window.location.pathname).toBe('/meals');

    act(() => {
      profileBtnEl.click();
    });
    expect(window.location.pathname).toBe('/profile');
  });

  it('Testa se o botão de busca altera a visibilidade do input', async () => {
    renderWithRouterAndRedux(<Header />, '/meals');
    const searchBtnEl = screen.getByTestId(SEARCH_BTN_DTID);

    expect(screen.queryByTestId(SEARCH_INPUT_DTID)).not.toBeInTheDocument();
    expect(screen.queryByTestId(SEARCH_INPUT_DTID)).toBeNull();

    await act(async () => {
      await userEvent.click(searchBtnEl);
    });
    expect(screen.queryByTestId(SEARCH_INPUT_DTID)).toBeInTheDocument();
  });
});
