import { vi } from 'vitest';
import { waitFor } from '@testing-library/dom';
import RecipeInProgress from '../pages/RecipeInProgress';
import { drinks, mealWithIngredients, meals } from './mocks';
import renderWithRouterAndRedux from './helpers/renderWithRouter';

const FAVORITE_BTN_ID = 'favorite-btn';
const DEFAULT_MEAL_ID = '52977';
const FINISH_RECIPE_BTN_ID = 'finish-recipe-btn';
const DEFAULT_DATE = '2023-08-28T17:53:24.318Z';

vi.mock('react-router-dom', async () => {
  const mod: object = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useParams: () => ({
      id: '52977',
    }),
  };
});

describe('Testa se a tela de receita em progresso está funcionando corretamente', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('Testa se os elementos estão em tela com o valor correto para bebida', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => drinks,
    });

    const defaultDrink = drinks.drinks[0];

    const screen = renderWithRouterAndRedux(<RecipeInProgress />, '/drinks/11007/in-progress');

    await waitFor(() => {
      const recipeTitle = screen.getByTestId('recipe-title');
      expect(recipeTitle).toHaveTextContent(defaultDrink.strDrink);
    }, { timeout: 5000 });

    const recipeCategory = screen.getByTestId('recipe-category');
    const recipeImage = screen.getByTestId('recipe-photo');
    const recipeInstructions = screen.getByTestId('instructions');

    expect(recipeCategory).toHaveTextContent(defaultDrink.strAlcoholic);
    expect(recipeImage).toHaveAttribute('src', defaultDrink.strDrinkThumb);
    expect(recipeInstructions).toHaveTextContent(defaultDrink.strInstructions);
  });

  it('testa se o botão de favoritar funciona corretamente para bebida', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => drinks,
    });

    const screen = renderWithRouterAndRedux(<RecipeInProgress />, '/drinks/11007/in-progress');

    await waitFor(() => {
      const favoriteBtn = screen.getByTestId(FAVORITE_BTN_ID);
      expect(favoriteBtn).toBeInTheDocument();
    }, { timeout: 5000 });

    const favoriteBtn = screen.getByTestId(FAVORITE_BTN_ID);
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');

    await screen.user.click(favoriteBtn);

    expect(favoriteBtn).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
  });

  it('Testa se os elementos estão em tela com o valor correto para comida', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => meals,
    });

    const defaultMeal = meals.meals[0];

    const screen = renderWithRouterAndRedux(<RecipeInProgress />, `/meals/${DEFAULT_MEAL_ID}/in-progress`);

    await waitFor(() => {
      const recipeTitle = screen.getByTestId('recipe-title');
      expect(recipeTitle).toHaveTextContent(defaultMeal.strMeal);
    }, { timeout: 5000 });

    const recipeCategory = screen.getByTestId('recipe-category');
    const recipeImage = screen.getByTestId('recipe-photo');
    const recipeInstructions = screen.getByTestId('instructions');
    const video = screen.getByTestId('video');

    expect(recipeCategory).toHaveTextContent(defaultMeal.strCategory);
    expect(recipeImage).toHaveAttribute('src', defaultMeal.strMealThumb);
    expect(recipeInstructions).toHaveTextContent(defaultMeal.strInstructions);
    expect(video).toHaveAttribute('src', defaultMeal.strYoutube.replace('watch?v=', 'embed/'));
  });

  it('testa se o botão de favoritar funciona corretamente para comida', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => meals,
    });

    const screen = renderWithRouterAndRedux(<RecipeInProgress />, '/meals/52874/in-progress');

    await waitFor(() => {
      const favoriteBtn = screen.getByTestId(FAVORITE_BTN_ID);
      expect(favoriteBtn).toBeInTheDocument();
    }, { timeout: 5000 });

    const favoriteBtn = screen.getByTestId(FAVORITE_BTN_ID);
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');

    await screen.user.click(favoriteBtn);

    expect(favoriteBtn).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
  });

  it('testa se o botão Finish Recipe fica habilitado após marcar todos os ingredientes em Meals', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ meals: [mealWithIngredients.meals[0]] }),
    });

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {},
      drinks: {
        52977: ['ingredient 2', 'ingredient 8'],
      },
    }));

    const screen = renderWithRouterAndRedux(<RecipeInProgress />, `/meals/${mealWithIngredients.meals[0].idMeal}/in-progress`);
    const finishRecipeBtnEl = await screen.getByTestId(FINISH_RECIPE_BTN_ID);
    const ingredientCheckboxEls = await screen.findAllByRole('checkbox');

    expect(ingredientCheckboxEls).toHaveLength(4);
    expect(finishRecipeBtnEl).toBeInTheDocument();
    expect(finishRecipeBtnEl).toBeDisabled();

    await screen.user.click(ingredientCheckboxEls[0]);
    await screen.user.click(ingredientCheckboxEls[1]);
    await screen.user.click(ingredientCheckboxEls[2]);
    await screen.user.click(ingredientCheckboxEls[3]);

    expect(ingredientCheckboxEls[0]).toBeChecked();
    expect(ingredientCheckboxEls[1]).toBeChecked();
    expect(ingredientCheckboxEls[2]).toBeChecked();
    expect(ingredientCheckboxEls[3]).toBeChecked();

    expect(finishRecipeBtnEl).not.toBeDisabled();

    // expect(screen.getByTestId('finish-recipe-btn')).not.toBeDisabled();
  });

  it('testa se o botão Finish Recipe fica habilitado após marcar todos os ingredientes em Drinks', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ drinks: [mealWithIngredients.meals[0]] }),
    });

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        52977: ['ingredient 5', 'ingredient 3'],
      },
      drinks: {},
    }));

    const screen = renderWithRouterAndRedux(<RecipeInProgress />, `/drinks/${mealWithIngredients.meals[0].idMeal}/in-progress`);

    const finishRecipeBtnEl = await screen.getByTestId(FINISH_RECIPE_BTN_ID);
    const ingredientCheckboxEls = await screen.findAllByRole('checkbox');

    expect(ingredientCheckboxEls).toHaveLength(4);
    expect(finishRecipeBtnEl).toBeInTheDocument();
    expect(finishRecipeBtnEl).toBeDisabled();
    screen.debug();

    await screen.user.click(ingredientCheckboxEls[0]);
    await screen.user.click(ingredientCheckboxEls[1]);
    await screen.user.click(ingredientCheckboxEls[2]);
    await screen.user.click(ingredientCheckboxEls[3]);

    expect(ingredientCheckboxEls[0]).toBeChecked();
    expect(ingredientCheckboxEls[1]).toBeChecked();
    expect(ingredientCheckboxEls[2]).toBeChecked();
    expect(ingredientCheckboxEls[3]).toBeChecked();

    expect(finishRecipeBtnEl).not.toBeDisabled();
  });

  it('Testa se o objeto é adicionado em DoneRecipes (ls)', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ drinks: [mealWithIngredients.meals[0]] }),
    });

    vi.setSystemTime(new Date(DEFAULT_DATE));

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        52977: ['ingredient 5', 'ingredient 3'],
      },
      drinks: {},
    }));

    const expectedDoneRecipes = [{
      type: 'drink',
      category: 'Test category Corba',
      nationality: '',
      alcoholicOrNot: '',
      doneDate: DEFAULT_DATE,
      tags: [],
    }];

    const screen = renderWithRouterAndRedux(<RecipeInProgress />, `/drinks/${mealWithIngredients.meals[0].idMeal}/in-progress`);

    const finishRecipeBtnEl = await screen.getByTestId(FINISH_RECIPE_BTN_ID);
    const ingredientCheckboxEls = await screen.findAllByRole('checkbox');

    expect(ingredientCheckboxEls).toHaveLength(4);
    expect(finishRecipeBtnEl).toBeInTheDocument();
    expect(finishRecipeBtnEl).toBeDisabled();
    screen.debug();

    await screen.user.click(ingredientCheckboxEls[0]);
    await screen.user.click(ingredientCheckboxEls[1]);
    await screen.user.click(ingredientCheckboxEls[2]);
    await screen.user.click(ingredientCheckboxEls[3]);

    expect(ingredientCheckboxEls[0]).toBeChecked();
    expect(ingredientCheckboxEls[1]).toBeChecked();
    expect(ingredientCheckboxEls[2]).toBeChecked();
    expect(ingredientCheckboxEls[3]).toBeChecked();

    expect(finishRecipeBtnEl).not.toBeDisabled();
    await screen.user.click(finishRecipeBtnEl);

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') ?? '[]');

    expect(doneRecipes).toMatchObject(expectedDoneRecipes);
    expect(window.location.pathname).toBe('/done-recipes');
  });
  it('Testa se o localstorage é incializado corretamente caso o valor inicial seja null', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ drinks: [mealWithIngredients.meals[0]] }),
    });

    vi.setSystemTime(new Date(DEFAULT_DATE));

    // const e = () => {
    //   throw new Error('prevLocalInProgress is null or undefined');
    // };

    localStorage.clear();
    const screen = renderWithRouterAndRedux(<RecipeInProgress />, `/drinks/${mealWithIngredients.meals[0].idMeal}/in-progress`);
    // expect(e).toThrowError();
    // screen.debug();
    // const error = await error('prevLocalInProgress is null or undefined', screen);
    await screen.findAllByRole('checkbox');
    expect(screen.getByTestId(FINISH_RECIPE_BTN_ID)).toBeDisabled();
  });
});
