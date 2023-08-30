import { act } from '@testing-library/react';
import { vi } from 'vitest';
import renderWithRouterAndRedux from './helpers/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testa se o componente FavoriteRecipes funciona corretamente', () => {
  const defaultDoneRecipeMeal = {
    id: '52977',
    type: 'meal',
    nationality: 'Brazil',
    category: 'Dessert',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  };

  const defaultFavoriteRecipeDrink = {
    id: '11007',
    type: 'drink',
    nationality: 'Brazil',
    category: 'Dessert',
    alcoholicOrNot: 'Alcoholic',
    name: 'Margarita',
    image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
  };

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify([defaultDoneRecipeMeal, defaultFavoriteRecipeDrink]));
  });

  it('Testa se a página contém os elementos corretos', () => {
    const screen = renderWithRouterAndRedux(<FavoriteRecipes />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    const mealBtn = screen.getByRole('button', { name: /meals/i });
    const drinkBtn = screen.getByRole('button', { name: /drinks/i });

    expect(allBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();

    const mealImg = screen.getByRole('img', { name: /corba/i });
    const mealName = screen.getByText(/corba/i);
    const mealCategory = screen.getByText(/brazil - dessert/i);

    expect(mealImg).toBeInTheDocument();
    expect(mealName).toBeInTheDocument();
    expect(mealCategory).toBeInTheDocument();

    const drinkImg = screen.getByRole('img', { name: /margarita/i });
    const drinkName = screen.getByText(/margarita/i);
    const drinkCategory = screen.getByText(/dessert/i);

    expect(drinkImg).toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();
    expect(drinkCategory).toBeInTheDocument();
  });

  it('Testa se os botões de filtro funcionam corretamente', async () => {
    const screen = renderWithRouterAndRedux(<FavoriteRecipes />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    const mealBtn = screen.getByRole('button', { name: /meals/i });
    const drinkBtn = screen.getByRole('button', { name: /drinks/i });

    await act(async () => {
      await screen.user.click(mealBtn);
    });
    expect(screen.queryByText(/margarita/i)).not.toBeInTheDocument();

    await act(async () => {
      await screen.user.click(drinkBtn);
    });
    expect(screen.queryByText(/corba/i)).not.toBeInTheDocument();

    await act(async () => {
      await screen.user.click(allBtn);
    });
    expect(screen.getByText(/corba/i)).toBeInTheDocument();
    expect(screen.getByText(/margarita/i)).toBeInTheDocument();
  });

  it('Testa se os botões de compartilhar funcionam corretamente', async () => {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: vi.fn(),
      },
    });

    const screen = renderWithRouterAndRedux(<FavoriteRecipes />);

    const mealShareBtn = screen.getByTestId('0-horizontal-share-btn');

    await act(async () => {
      await screen.user.click(mealShareBtn);
    });
    expect(screen.getAllByText(/link copied!/i)[0]).toBeInTheDocument();
  });

  it('Testa se os botões de desfavoritar funcionam corretamente', async () => {
    const screen = renderWithRouterAndRedux(<FavoriteRecipes />);

    const mealFavBtn = screen.getByTestId('0-horizontal-favorite-btn');
    const drinkFavBtn = screen.getByTestId('1-horizontal-favorite-btn');

    await act(async () => {
      await screen.user.click(mealFavBtn);
    });
    expect(screen.queryByText(/corba/i)).not.toBeInTheDocument();

    await act(async () => {
      await screen.user.click(drinkFavBtn);
    });
    expect(screen.queryByText(/margarita/i)).not.toBeInTheDocument();
  });
});
