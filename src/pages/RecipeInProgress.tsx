import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import { DoneRecipeType, DrinkRecipe,
  GenericRecipe,
  InProgressRecipeType,
  MealRecipe, RecipeType } from '../types';

import { fetchDrinks, fetchMeals } from '../services/api';
import Button from '../components/Button';
import RecipeCard from '../components/RecipeDetailsPattern';

const INITIAL_RECIPE = {
  genericInfos: {} as GenericRecipe,
  fullObject: {} as (MealRecipe | DrinkRecipe)
  & { strTags?: string, strAlcoholic?: string },
  recommendations: [] as GenericRecipe[],
};

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pageType = pathname.split('/')[1] as RecipeType;
  const [recipe, setRecipe] = useState(INITIAL_RECIPE);
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('');

  const [
    inProgressRecipe,
  ] = useLocalStorage<InProgressRecipeType>(
    'inProgressRecipes',
    { meals: {}, drinks: {} },
  );

  useEffect(() => {
    const fetchRecipeMeals = async () => {
      const [dataObject] = await fetchMeals('id', id);
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
      const [dataObject] = await fetchDrinks('id', id);
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

  const validIngredients = Object.entries(recipe.fullObject).reduce((acc, curr) => {
    if (curr[0].startsWith('strIngredient') && curr[1] !== '' && curr[1] !== null) {
      const index = Number(curr[0].split('strIngredient')[1]);
      const measure = recipe
        .fullObject[`strMeasure${index}` as keyof typeof recipe.fullObject];
      acc.push([curr[1], measure ?? '']);
    }
    return acc;
  }, [] as string[][]);

  let ingredientsLength = 0;
  const prevLocalInProgress = inProgressRecipe ?? { drinks: {}, meals: {} };
  ingredientsLength = prevLocalInProgress[pageType]?.[id ?? 0]?.length ?? 0;

  const handleFinishRecipeClick = async () => {
    const alcoholicOrNot = recipe.fullObject.strAlcoholic ?? '';
    const tags = recipe.fullObject.strTags?.split(',') ?? [];

    const finishRecipe: DoneRecipeType = {
      id: recipe.genericInfos.id,
      type: pageType.slice(0, -1),
      category: recipe.fullObject.strCategory,
      nationality: recipe.fullObject.strArea ?? '',
      alcoholicOrNot,
      name: recipe.genericInfos.name,
      image: recipe.genericInfos.image,
      doneDate: new Date().toISOString(),
      tags,
    };
    const prevLocalStorageContent = JSON
      .parse(localStorage.getItem('doneRecipes') ?? '[]');
    localStorage.setItem('doneRecipes', JSON
      .stringify([...prevLocalStorageContent, finishRecipe]));

    navigate('/done-recipes');
  };
  return (
    <div className="font-medium font-poppins">

      <RecipeCard.Info
        recipe={ recipe }
        category={ category }
        name={ recipe.genericInfos.name }
        image={ recipe.genericInfos.image }
      />
      {/* <RecipeCard.LikeButton recipe={ recipe } />
      <RecipeCard.ShareButton
        shareBtnTestId="share-btn"
        linkToClipboard={ window.location.href.replace('/in-progress', '') }
      /> */}
      <RecipeCard.IngredientList ingredientList={ validIngredients } hasCheckBox />
      <RecipeCard.Instructions
        instruction={ recipe.fullObject.strInstructions }
        videoUrl={ videoUrl }
      />
      <Button
        data-testid="finish-recipe-btn"
        disabled={ validIngredients.length !== ingredientsLength }
        className=""
        onClick={ handleFinishRecipeClick }
      >
        Finalizar Receita
      </Button>
    </div>

  );
}

export default RecipeInProgress;
