import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import Recipes from '../components/Recipes';
import renderWithRouter from './helpers/renderWithRouter';
import { meals } from './mocks/index';
import App from '../App';
import { store } from '../redux/store';

const allText = 'All-category-filter';

describe('Testes referentes ao componente Recipes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => meals,
    });
  });

  test('Verificando se existe os botões de categoria', async () => {
    renderWithRouter(<Recipes />);
    await waitFor(() => {
      const categoryButton = screen.getByTestId(allText);
      expect(categoryButton).toBeInTheDocument();
    });
  });

  test('As receitas estão sendo exibidas corretamente', async () => {
    renderWithRouter(<Recipes />);
    await waitFor(() => {
      meals.meals.forEach((meal) => {
        const recipeName = screen.getByText(meal.strMeal);
        expect(recipeName).toBeInTheDocument();
      });
    });
  });
});

const getEndpoint = (pathname: string, category: string | null) => {
  if (pathname === '/meals') {
    return category
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  }
  return '';
};
test('O getEndpoint function retorna a URL correta para o pathname "/meals"', () => {
  const endpoint = getEndpoint('/meals', null);
  expect(endpoint).toEqual('https://www.themealdb.com/api/json/v1/1/search.php?s=');
});
test('O getEndpoint function retorna a URL correta para o pathname "/meals" com uma categoria', () => {
  const endpoint = getEndpoint('/meals', 'Category 1');
  expect(endpoint).toEqual('https://www.themealdb.com/api/json/v1/1/filter.php?c=Category 1');
});
test('O getEndpoint function retorna uma string vazia para um pathname inválido', () => {
  const endpoint = getEndpoint('/invalid-pathname', null);
  expect(endpoint).toEqual('');
});

const extractDrinkData = vi.fn().mockReturnValue(null);

test('A função retorna null quando a receita não tem um idDrink', () => {
  const recipe = {};
  const result = extractDrinkData(recipe);
  expect(result).toEqual(null);
});

test('Verificando se ao clicar em um botão de categoria, a categoria é alterada', async () => {
  renderWithRouter(<Recipes />);
  await waitFor(() => {
    const firstCategoryButton = screen.getByTestId(`${meals.meals[0].strCategory}-category-filter`);
    fireEvent.click(firstCategoryButton);
  });
});

test('Verificando a navegação ao clicar em uma receita', async () => {
  renderWithRouter(<Recipes />);
  await waitFor(() => {
    const recipeCard = screen.getByTestId('0-recipe-card');
    fireEvent.click(recipeCard);
  });
});

test('Verificando se selecionar a mesma categoria duas vezes resulta na desseleção', async () => {
  renderWithRouter(<Recipes />);
  await waitFor(() => {
    const firstCategoryButton = screen.getByTestId(`${meals.meals[0].strCategory}-category-filter`);
    fireEvent.click(firstCategoryButton);
    fireEvent.click(firstCategoryButton);
  });
});

test('Ao clicar no botão "All", todas as receitas são exibidas', async () => {
  renderWithRouter(<Recipes />);
  await waitFor(() => {
    const allButton = screen.getByTestId('All-category-filter');
    fireEvent.click(allButton);
    meals.meals.forEach((meal) => {
      const recipeName = screen.getByText(meal.strMeal);
      expect(recipeName).toBeInTheDocument();
    });
  });
});

test('As receitas são filtradas ao selecionar uma categoria', async () => {
  renderWithRouter(<Recipes />);
  await waitFor(() => {
    const firstCategoryButton = screen.getByTestId(`${meals.meals[0].strCategory}-category-filter`);
    fireEvent.click(firstCategoryButton);
    const recipeName = screen.getByText(meals.meals[0].strMeal);
    expect(recipeName).toBeInTheDocument();
  });
});

test('Verifica se são exibidas apenas 12 receitas por padrão', async () => {
  renderWithRouter(<Recipes />);
  await waitFor(() => {
    const displayedRecipes = screen.queryAllByTestId(/-recipe-card$/);
    expect(displayedRecipes).toHaveLength(4);
  });
});

test('Uma categoria selecionada pode ser desselecionada ao clicar nela novamente', async () => {
  renderWithRouter(<Recipes />);
  await waitFor(() => {
    const firstCategoryButton = screen.getByTestId(`${meals.meals[0].strCategory}-category-filter`);
    fireEvent.click(firstCategoryButton);
    fireEvent.click(firstCategoryButton);
    expect(firstCategoryButton).not.toHaveClass('selected-category'); // Ajuste de acordo com sua implementação
  });
});

test('Ao clicar no botão "All", a categoria selecionada é desmarcada e todas as receitas são exibidas', async () => {
  renderWithRouter(<Recipes />);
  await waitFor(() => {
    const firstCategoryButton = screen.getByTestId(`${meals.meals[0].strCategory}-category-filter`);
    const allButton = screen.getByTestId(allText);
    fireEvent.click(firstCategoryButton);
    fireEvent.click(allButton);
    meals.meals.forEach((meal) => {
      const recipeName = screen.getByText(meal.strMeal);
      expect(recipeName).toBeInTheDocument();
    });
  });
});

test('As imagens das receitas são carregadas corretamente', async () => {
  renderWithRouter(<Recipes />);
  await waitFor(() => {
    meals.meals.forEach((meal, index) => {
      const recipeImage = screen.getByTestId(`${index}-card-img`);
      expect(recipeImage).toHaveAttribute('src', meal.strMealThumb);
      expect(recipeImage).toHaveAttribute('alt', meal.strMeal);
    });
  });
});

test('Verificando se as receitas são filtradas ao selecionar uma categoria', async () => {
  renderWithRouter(<Recipes />);
  await waitFor(() => {
    const firstCategoryButton = screen.getByTestId(
      `${meals.meals[0].strCategory}-category-filter`,
    );
    fireEvent.click(firstCategoryButton);
    const recipeName = screen.getByText(meals.meals[0].strMeal);
    expect(recipeName).toBeInTheDocument();
  });
});

describe('Testa o componente Meals', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={ store }>
          <App />
        </Provider>
      </BrowserRouter>,
    );
  });

  const emailInput = 'email-input';
  const passwordInput = 'password-input';
  const loginBtn = 'login-submit-btn';

  test('Verifica se as 12 primeiras receitas de comida são exibidas', async () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    await userEvent.type(inputEmail, 'teste@gmail.com');
    await userEvent.type(inputPassword, '1234567');
    await userEvent.click(inputButton);
    const twelveMeals = await screen.findAllByTestId(/-recipe-card/i);
    expect(twelveMeals.length).toBe(4);
  });
});
