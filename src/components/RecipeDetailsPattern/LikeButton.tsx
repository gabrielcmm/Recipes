import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import { FavoriteRecipeType, GenericRecipe, MealRecipe, DrinkRecipe } from '../../types';

type Recipe = {
  genericInfos: GenericRecipe;
  fullObject: MealRecipe | DrinkRecipe;
  recommendations: GenericRecipe[];
};

type LikeButtonProps = {
  recipe: Recipe;
};

function LikeButton({ recipe }:LikeButtonProps) {
  const { pathname } = useLocation();
  const [favorited, setFavorited] = useState(false);
  const {
    data: favoriteRecipes,
    setLocalStorage: setFavoriteRecipes,
  } = useLocalStorage<FavoriteRecipeType[]>('favoriteRecipes', []);

  const handleClickFavorite = () => {
    if (favorited) {
      const newFavoriteRecipes = favoriteRecipes
        .filter((favorite) => favorite.id !== recipe.genericInfos.id);
      setFavoriteRecipes(newFavoriteRecipes);
      return;
    }
    const newFavoriteRecipe = {
      id: recipe.genericInfos.id,
      type: pathname.startsWith('/meals') ? 'meal' : 'drink',
      nationality: recipe.fullObject.strArea ?? '',
      category: recipe.fullObject.strCategory,
      alcoholicOrNot: 'strAlcoholic' in recipe.fullObject
        ? recipe.fullObject.strAlcoholic : '',
      name: recipe.genericInfos.name,
      image: recipe.genericInfos.image,
    };

    setFavoriteRecipes([...favoriteRecipes, newFavoriteRecipe]);
  };

  useEffect(() => {
    const isFavorite = favoriteRecipes
      ?.some((favorite) => favorite.id === recipe.genericInfos.id);
    setFavorited(isFavorite ?? false);
  }, [recipe.genericInfos.id, favoriteRecipes]);

  return (
    <button
      className=" text-white rounded-lg flex items-center justify-center"
      onClick={ handleClickFavorite }
    >
      <img
        src={ favorited ? blackHeart : whiteHeart }
        alt="favorite button"
        data-testid="favorite-btn"
      />
    </button>
  );
}

export default LikeButton;
