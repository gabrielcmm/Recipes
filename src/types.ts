import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type RootState = {
  recipes: RecipesState;
};

export type UserLocalStorage = {
  email: string;
};

export type RecipesState = {
  recipesFromApi: GenericRecipe[];
};

export type RecipeList = MealRecipe[] | DrinkRecipe[];

export type GenericRecipe = {
  id: string;
  name: string;
  image: string;
  category: string;
};

export type DrinkRecipe = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strInstructions: string;
  strAlcoholic: string;
  strArea: string;
};

export type MealRecipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strInstructions: string;
  strArea: string;
};

export type DoneRecipeType = {
  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate: string;
  tags: string[];
};

export type InProgressRecipeType = {
  drinks: { [key: string]: string[] };
  meals: { [key: string]: string[] };
};

export type FavoriteRecipeType = {
  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
};

export type RecipeType = 'meals' | 'drinks';

export type FilterOptions = 'ingredient' | 'name' | 'firstLetter' | 'id';

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
