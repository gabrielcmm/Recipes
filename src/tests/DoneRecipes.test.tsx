import { act } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouterAndRedux from './helpers/renderWithRouter';

describe('Testa se o componente DoneRecipes funciona corretamente', () => {
  const defaultDoneRecipeMeal = {
    id: '52977',
    type: 'meal',
    nationality: 'Brazil',
    category: 'Dessert',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: new Date(),
    tags: ['meal tag1', 'meal tag2', 'meal tag3'],
  };

  const defaultDoneRecipeDrink = {
    id: '11007',
    type: 'drink',
    nationality: 'Brazil',
    category: 'Dessert',
    alcoholicOrNot: 'Alcoholic',
    name: 'Margarita',
    image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
    doneDate: new Date(),
    tags: ['drink tag1', 'drink tag2', 'drink tag3'],
  };

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('doneRecipes', JSON.stringify([defaultDoneRecipeMeal, defaultDoneRecipeDrink]));
  });

  it('Testa se a página contém os elementos corretos', () => {
    const screen = renderWithRouterAndRedux(<DoneRecipes />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    const mealBtn = screen.getByRole('button', { name: /meals/i });
    const drinkBtn = screen.getByRole('button', { name: /drinks/i });

    expect(allBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();

    const mealImg = screen.getByRole('img', { name: /corba/i });
    const mealName = screen.getByText(/corba/i);
    const mealCategory = screen.getByText(/brazil - dessert/i);
    const mealTag1 = screen.getByText(/meal tag1/i);
    const mealTag2 = screen.getByText(/meal tag2/i);

    expect(mealImg).toBeInTheDocument();
    expect(mealName).toBeInTheDocument();
    expect(mealCategory).toBeInTheDocument();
    expect(mealTag1).toBeInTheDocument();
    expect(mealTag2).toBeInTheDocument();

    const drinkImg = screen.getByRole('img', { name: /margarita/i });
    const drinkName = screen.getByText(/margarita/i);
    const drinkCategory = screen.getByText(/dessert/i);
    const drinkTag1 = screen.getByText(/drink tag1/i);
    const drinkTag2 = screen.getByText(/drink tag2/i);

    expect(drinkImg).toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();
    expect(drinkCategory).toBeInTheDocument();
    expect(drinkTag1).toBeInTheDocument();
    expect(drinkTag2).toBeInTheDocument();
  });

  it('Testa se os botões de filtro funcionam corretamente', async () => {
    const screen = renderWithRouterAndRedux(<DoneRecipes />);

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
});
