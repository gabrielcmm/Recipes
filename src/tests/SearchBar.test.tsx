import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { act } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import renderWithRouterAndRedux from './helpers/renderWithRouter';
import * as mocks from './mocks';

const INGREDIENT_URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const NAME_URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
// const FIRST_LETTER_URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

const INGREDIENT_URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const NAME_URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
// const FIRST_LETTER_URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Testa o componente SearchBar', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  window.alert = () => {};

  it('Testa se o input de busca está funcionando corretamente', async () => {
    renderWithRouterAndRedux(<SearchBar />, '/meals');
    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const searchRadioEls = screen.getAllByRole('radio');

    await act(async () => {
      await userEvent.type(searchInputEl, 'test');
    });

    expect(searchInputEl).toHaveValue('test');
    expect(searchRadioEls).toHaveLength(3);
  });

  it('Testa o endpoint da API, meals/ingredients e no caso do resultado ser apenas um, se redireciona para ID', async () => {
    renderWithRouterAndRedux(<SearchBar />, '/meals');

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mocks.oneMealResponse,
    });
    expect(global.fetch).toHaveBeenCalledTimes(0);

    const inputValue = 'test';

    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const radioEl = screen.getByTestId('ingredient-search-radio');
    const searchBtnEl = screen.getByTestId(EXEC_SEARCH_BTN);

    await act(async () => {
      await userEvent.type(searchInputEl, inputValue);
      await userEvent.click(radioEl);
      await userEvent.click(searchBtnEl);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${INGREDIENT_URL_MEALS}${inputValue}`);

    // verifica se redirecionou para a página de detalhes
    expect(window.location.pathname).toBe(`/meals/${mocks.oneMealResponse.meals[0].idMeal}`);
  });

  it('Testa o endpoint da API, meals/name e verifica se valor for null dispara alert', async () => {
    renderWithRouterAndRedux(<SearchBar />, '/meals');

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mocks.emptyMealResponse,
    });
    expect(global.fetch).toHaveBeenCalledTimes(0);
    const spy = vi.spyOn(window, 'alert');

    const inputValue = 'test';

    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const radioEl = screen.getByTestId('name-search-radio');
    const searchBtnEl = screen.getByTestId(EXEC_SEARCH_BTN);

    await act(async () => {
      await userEvent.type(searchInputEl, inputValue);
      await userEvent.click(radioEl);
      await userEvent.click(searchBtnEl);
    });

    expect(spy).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${NAME_URL_MEALS}${inputValue}`);
  });

  test('Testa disparo do alert caso first-letter seja selecionado e input.length esteja > 1 e não dispara fetch', async () => {
    renderWithRouterAndRedux(<SearchBar />, '/meals');

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mocks.oneMealResponse,
    });

    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const radioEl = screen.getByTestId('first-letter-search-radio');
    const searchBtnEl = screen.getByTestId(EXEC_SEARCH_BTN);

    const spy = vi.spyOn(window, 'alert');

    await act(async () => {
      await userEvent.type(searchInputEl, 'length > 1');
      await userEvent.click(radioEl);
      await userEvent.click(searchBtnEl);
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledTimes(0);
  });

  test('Testa endpoint da API, drinks/ingredients e no caso do resultado ser apenas um, se redireciona para ID', async () => {
    renderWithRouterAndRedux(<SearchBar />, '/drinks');

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mocks.oneDrinkResponse,
    });
    expect(global.fetch).toHaveBeenCalledTimes(0);

    const inputValue = 'test';

    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const radioEl = screen.getByTestId('ingredient-search-radio');
    const searchBtnEl = screen.getByTestId(EXEC_SEARCH_BTN);

    await act(async () => {
      await userEvent.type(searchInputEl, inputValue);
      await userEvent.click(radioEl);
      await userEvent.click(searchBtnEl);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${INGREDIENT_URL_DRINKS}${inputValue}`);

    // verifica se redirecionou para a página de detalhes
    expect(window.location.pathname).toBe(`/drinks/${mocks.oneDrinkResponse.drinks[0].idDrink}`);
  });

  test('Testa endpoint da API, drinks/name e verifica se valor for null dispara alert', async () => {
    renderWithRouterAndRedux(<SearchBar />, '/drinks');

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mocks.emptyDrinkResponse,
    });
    expect(global.fetch).toHaveBeenCalledTimes(0);
    const spy = vi.spyOn(window, 'alert');

    const inputValue = 'test';

    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const radioEl = screen.getByTestId('name-search-radio');
    const searchBtnEl = screen.getByTestId(EXEC_SEARCH_BTN);

    await act(async () => {
      await userEvent.type(searchInputEl, inputValue);
      await userEvent.click(radioEl);
      await userEvent.click(searchBtnEl);
    });

    expect(spy).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${NAME_URL_DRINKS}${inputValue}`);
  });
});
