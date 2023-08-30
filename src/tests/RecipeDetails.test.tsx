import { vi } from 'vitest';
import { waitFor } from '@testing-library/dom';
import RecipeDetails from '../components/RecipeDetails';
import { drinks, mealWithIngredients, meals } from './mocks';
import renderWithRouterAndRedux from './helpers/renderWithRouter';

const FAVORITE_BTN_ID = 'favorite-btn';
const START_RECIPE_BTN_ID = 'start-recipe-btn';
const DEFAULT_MEAL_ID = '52977';

vi.mock('react-router-dom', async () => {
  const mod: object = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useParams: () => ({
      id: '52977',
    }),
  };
});

describe('Testa se a tela de detalhes da receita está funcionando corretamente', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('Testa se os elementos estão em tela com o valor correto para bebida', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => drinks,
    });

    const defaultDrink = drinks.drinks[0];

    const screen = renderWithRouterAndRedux(<RecipeDetails />, '/drinks/11007');

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

    const screen = renderWithRouterAndRedux(<RecipeDetails />, '/drinks/11007');

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

    const screen = renderWithRouterAndRedux(<RecipeDetails />, `/meals/${DEFAULT_MEAL_ID}`);

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

    const screen = renderWithRouterAndRedux(<RecipeDetails />, '/meals/52874');

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

  it('testa se o texto do botão "Start Recipe" muda para "Continue Recipe" para comida e se direciona para próxima rota', async () => {
    const defaultMeal = meals.meals.find((meal) => meal.idMeal === DEFAULT_MEAL_ID);
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ meals: [defaultMeal] }),
    });

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        52977: ['ingredient 5', 'ingredient 3'],
      },
      drinks: {},
    }));

    const screen = renderWithRouterAndRedux(<RecipeDetails />, `/meals/${DEFAULT_MEAL_ID}`);

    const startRecipeBtn = screen.getByTestId(START_RECIPE_BTN_ID);
    expect(startRecipeBtn).toBeInTheDocument();
    expect(startRecipeBtn).toHaveTextContent('Continue Recipe');
  });

  it('testa se o texto do botão "Start Recipe" muda para "Continue Recipe" para bebida', async () => {
    const defaultDrink = drinks.drinks.find((drink) => drink.idDrink === '52977');

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ drinks: [defaultDrink] }),
    });

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {},
      drinks: {
        52977: ['ingredient 1', 'ingredient 2'],
      },
    }));

    const screen = renderWithRouterAndRedux(<RecipeDetails />, '/drinks/52977');

    const startRecipeBtn = screen.getByTestId(START_RECIPE_BTN_ID);
    expect(startRecipeBtn).toBeInTheDocument();
    expect(startRecipeBtn).toHaveTextContent('Continue Recipe');
  });

  it('Testa se o botão não aparece caso a receita já tenha sido feita', async () => {
    const defaultMeal = meals.meals.find((meal) => meal.idMeal === DEFAULT_MEAL_ID);
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ meals: [defaultMeal] }),
    });

    localStorage.setItem('doneRecipes', JSON.stringify([
      {
        id: DEFAULT_MEAL_ID,
        type: 'meal',
        nationality: '',
        category: 'Test category Corba',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        doneDate: '2023-08-23',
        tags: [],
      },
    ]));

    const screen = renderWithRouterAndRedux(<RecipeDetails />, `/meals/${DEFAULT_MEAL_ID}`);

    expect(screen.queryByTestId(START_RECIPE_BTN_ID)).not.toBeInTheDocument();
  });

  it('Testa se os ingredientes aparecem', async () => {
    const defaultMeal = mealWithIngredients.meals[0];
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ meals: [defaultMeal] }),
    });
    const screen = renderWithRouterAndRedux(<RecipeDetails />, `/meals/${defaultMeal.idMeal}`);

    await waitFor(() => {
      expect(screen.getByText(`${defaultMeal.strIngredient1} - ${defaultMeal.strMeasure1}`)).toBeInTheDocument();
      expect(screen.getByText(`${defaultMeal.strIngredient2} - ${defaultMeal.strMeasure2}`)).toBeInTheDocument();
      expect(screen.getByText(`${defaultMeal.strIngredient3} - ${defaultMeal.strMeasure3}`)).toBeInTheDocument();
      expect(screen.getByText(`${defaultMeal.strIngredient4} - ${defaultMeal.strMeasure4}`)).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('Testa se redireciona de rota', async () => {
    const defaultMeal = meals.meals.find((meal) => meal.idMeal === DEFAULT_MEAL_ID);
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ meals: [defaultMeal] }),
    });

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        52977: ['ingredient 1', 'ingredient 2'],
      },
      drinks: {},
    }));

    const screen = renderWithRouterAndRedux(<RecipeDetails />, `/meals/${DEFAULT_MEAL_ID}`);

    const startRecipeBtn = screen.getByTestId(START_RECIPE_BTN_ID);
    await screen.user.click(startRecipeBtn);
    expect(window.location.pathname).toBe(`/meals/${DEFAULT_MEAL_ID}/in-progress`);
  });
});
