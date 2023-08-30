import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchDrinks, fetchMeals } from '../services/api';
import RecipeCard from './RecipeDetailsPattern/index';
import {
  DoneRecipeType,
  DrinkRecipe,
  GenericRecipe,
  InProgressRecipeType,
  MealRecipe,
} from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from './Button';

const INITIAL_RECIPE = {
  genericInfos: {} as GenericRecipe,
  fullObject: {} as MealRecipe | DrinkRecipe,
  recommendations: [] as GenericRecipe[],
};

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: doneRecipes } = useLocalStorage<DoneRecipeType[]>('doneRecipes', null);
  const {
    data: inProgressRecipes,
  } = useLocalStorage<InProgressRecipeType>('inProgressRecipes', null);

  const [recipe, setRecipe] = useState(INITIAL_RECIPE);
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('');
  const [recipeStates, setRecipeStates] = useState({
    inProgress: false,
    isDone: false,
  });

  useEffect(() => {
    const fetchRecipeMeals = async () => {
      const [dataObject] = await fetchMeals('id', id ?? '');
      setVideoUrl(dataObject.fullObject.strYoutube.replace('watch?v=', 'embed/'));
      setCategory(dataObject.fullObject.strCategory);

      const drinksRecommendations = await fetchDrinks('name', '');
      setRecipe((currState) => ({
        ...currState,
        fullObject: dataObject.fullObject,
        genericInfos: dataObject,
        recommendations: drinksRecommendations.slice(0, 6),
      }));
    };

    const fetchRecipeDrinks = async () => {
      const [dataObject] = await fetchDrinks('id', id ?? '');
      setCategory(dataObject.fullObject.strAlcoholic);

      const mealRecommendations = await fetchMeals('name', '');
      setRecipe((currState) => ({
        ...currState,
        fullObject: dataObject.fullObject,
        genericInfos: dataObject,
        recommendations: mealRecommendations.slice(0, 6),
      }));
    };

    if (pathname.startsWith('/meals')) {
      fetchRecipeMeals();
    } else if (pathname.startsWith('/drinks')) {
      fetchRecipeDrinks();
    }
  }, [id, pathname]);

  useEffect(() => {
    if (doneRecipes) {
      setRecipeStates((prevState) => ({
        ...prevState,
        isDone: doneRecipes.some((recipeDone) => recipeDone.id === id),
      }));
    } else if (inProgressRecipes) {
      let inProgress = false;

      if (pathname.startsWith('/meals')) {
        inProgress = Object.keys(inProgressRecipes.meals).some((key) => key === id);
      } else if (pathname.startsWith('/drinks')) {
        inProgress = Object.keys(inProgressRecipes.drinks).some((key) => key === id);
      }

      setRecipeStates((prevState) => ({
        ...prevState,
        inProgress,
      }));
    }
  }, [doneRecipes, id, inProgressRecipes, pathname]);

  const validIngredients = Object.entries(recipe.fullObject).reduce((acc, curr) => {
    if (curr[0].startsWith('strIngredient') && curr[1] !== '' && curr[1] !== null) {
      const index = Number(curr[0].split('strIngredient')[1]);
      const measure = recipe
        .fullObject[`strMeasure${index}` as keyof typeof recipe.fullObject];
      acc.push([curr[1], measure]);
    }
    return acc;
  }, [] as string[][]);

  return (
    <div>
      <RecipeCard.Info
        category={ category }
        name={ recipe.genericInfos.name }
        image={ recipe.genericInfos.image }
        recipe={ recipe }
      />

      {/* <div className="flex gap-8">
        <RecipeCard.LikeButton recipe={ recipe } />
        <RecipeCard.ShareButton
          shareBtnTestId="share-btn"
          linkToClipboard={ window.location.href }
        />
      </div> */}

      <RecipeCard.IngredientList ingredientList={ validIngredients } />
      <RecipeCard.Instructions
        instruction={ recipe.fullObject.strInstructions }
        videoUrl={ videoUrl }
      />
      <RecipeCard.Recommended recommendations={ recipe.recommendations } />

      {!recipeStates.isDone
      && (
        <Button
          data-testid="start-recipe-btn"
          onClick={ () => navigate(`${pathname}/in-progress`) }
        >
          { recipeStates.inProgress ? 'Continue Recipe' : 'Start Recipe' }
        </Button>
      )}
    </div>
  );
}

export default RecipeDetails;
