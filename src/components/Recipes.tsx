import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GenericRecipe, MealRecipe, DrinkRecipe, RootState } from '../types';

function Recipes() {
  const { recipesFromApi } = useSelector((state: RootState) => state.recipes);
  const [recipes, setRecipes] = useState<GenericRecipe[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRecipeClick = (id: string) => {
    if (location.pathname === '/meals') {
      navigate(`/meals/${id}`);
    } else {
      navigate(`/drinks/${id}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };
  const getEndpoint = (pathname: string, category: string | null) => {
    if (pathname === '/meals') {
      return category
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    }
    if (pathname === '/drinks') {
      return category
        ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    }
    return '';
  };

  useEffect(() => {
    setRecipes(recipesFromApi.slice(0, 12));
  }, [recipesFromApi]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const endpoint = getEndpoint(location.pathname, selectedCategory);
      const response = await fetch(endpoint);
      const data = await response.json();
      const fetchedRecipes = data.meals || data.drinks;

      const genericRecipes: GenericRecipe[] = fetchedRecipes
        .map((recipe: MealRecipe | DrinkRecipe) => {
          if ('idMeal' in recipe) {
            return {
              id: recipe.idMeal,
              name: recipe.strMeal,
              image: recipe.strMealThumb,
            };
          }
          if ('idDrink' in recipe) {
            return {
              id: recipe.idDrink,
              name: recipe.strDrink,
              image: recipe.strDrinkThumb,
            };
          }
          return null;
        })
        .filter(Boolean);

      setRecipes(genericRecipes.slice(0, 12));
    };

    fetchRecipes();
  }, [location.pathname, selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      let endpoint = '';
      if (location.pathname === '/meals') {
        endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      } else if (location.pathname === '/drinks') {
        endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      }

      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.meals) {
        setCategories(data.meals.map((cat: { strCategory: string }) => cat.strCategory));
      } else if (data.drinks) {
        setCategories(data.drinks.map((cat: { strCategory: string }) => cat.strCategory));
      }
    };

    fetchCategories();
  }, [location.pathname]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          data-testid="All-category-filter"
          onClick={ () => setSelectedCategory(null) }
          className={ `rounded-full py-1 px-3 border ${
            selectedCategory === null ? 'bg-gray-100' : 'bg-white'
          }` }
        >
          All
        </button>

        {categories.slice(0, 5).map((category) => (
          <button
            key={ category }
            data-testid={ `${category}-category-filter` }
            onClick={ () => handleCategoryClick(category) }
            className={ `rounded-full py-1 px-3 border ${
              selectedCategory === category ? 'bg-gray-100' : 'bg-white'
            }` }
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-2 gap-4">
        {recipes.map((recipe, index) => (
          <li
            key={ recipe.id }
            data-testid={ `${index}-recipe-card` }
            className="relative"
          >
            <button
              onClick={ () => handleRecipeClick(recipe.id) }
              className="w-full
              h-full
              flex flex-col items-center justify-center rounded-lg bg-white p-2 shadow-md"
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-card-img` }
                className="w-20 h-20 object-cover mb-2 rounded-full"
              />
              <p data-testid={ `${index}-card-name` } className="text-center">
                {recipe.name}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recipes;
