import { RecipeList } from '../../types';

export const FETCH_RECIPES = 'FETCH_RECIPES';

export const fetchRecipes = (payload: RecipeList) => ({
  type: FETCH_RECIPES,
  payload,
});
