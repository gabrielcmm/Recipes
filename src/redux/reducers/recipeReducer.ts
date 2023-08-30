import { AnyAction } from 'redux';
import { GenericRecipe, RecipeList, RecipesState } from '../../types';
import { FETCH_RECIPES } from '../actions';

const INITIAL_STATE: RecipesState = {
  recipesFromApi: [] as GenericRecipe[],
};

export const recipeReducer = (
  state:RecipesState = INITIAL_STATE,
  action: AnyAction,
) => {
  switch (action.type) {
    case FETCH_RECIPES:
      action.payload as RecipeList;
      return {
        ...state,
        recipesFromApi: action.payload,
      };
    default:
      return state;
  }
};
