import { DrinkRecipe, FilterOptions, MealRecipe } from '../types';

export const fetchMeals = async (filterOption: FilterOptions, query = '') => {
  let URL = 'https://www.themealdb.com/api/json/v1/1/';

  switch (filterOption) {
    case 'ingredient':
      URL += `filter.php?i=${query}`;
      break;
    case 'name':
      URL += `search.php?s=${query}`;
      break;
    case 'firstLetter':
      URL += `search.php?f=${query}`;
      break;
    case 'id':
      URL += `lookup.php?i=${query}`;
      break;
    default:
      return null;
  }
  const response = await fetch(URL);
  const data = await response.json();

  if (!data.meals) return [];

  const genericReturn = data.meals.map((meal: MealRecipe) => ({
    fullObject: meal,
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
  }));

  return genericReturn;
};

export const fetchDrinks = async (filterOption: FilterOptions, query = '') => {
  let URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

  switch (filterOption) {
    case 'ingredient':
      URL += `filter.php?i=${query}`;
      break;
    case 'name':
      URL += `search.php?s=${query}`;
      break;
    case 'firstLetter':
      URL += `search.php?f=${query}`;
      break;
    case 'id':
      URL += `lookup.php?i=${query}`;
      break;
    default:
      return null;
  }
  const response = await fetch(URL);
  const data = await response.json();

  if (!data.drinks) return [];

  const genericReturn = data.drinks.map((drink: DrinkRecipe) => ({
    fullObject: drink,
    id: drink.idDrink,
    name: drink.strDrink,
    image: drink.strDrinkThumb,
    category: drink.strCategory,
  }));

  return genericReturn;
};
