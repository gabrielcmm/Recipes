import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShareButton from '../components/RecipeDetailsPattern/ShareButton';
import { FavoriteRecipeType } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import blackHeart from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const {
    data: favoriteRecipes,
    setLocalStorage: setFavoriteRecipes,
  } = useLocalStorage<FavoriteRecipeType[]>('favoriteRecipes', []);
  const [filteredRecipes, setFilteredRecipes] = useState<FavoriteRecipeType[]>([]);

  useEffect(() => {
    setFilteredRecipes(favoriteRecipes);
  }, [favoriteRecipes]);

  const handleFilter = (filter: string) => {
    if (filter === 'all') {
      setFilteredRecipes(favoriteRecipes);
      return;
    }
    setFilteredRecipes(favoriteRecipes.filter((recipe) => recipe.type === filter));
  };

  const handleClickFavorite = (id: string) => {
    const newFavoriteRecipes = favoriteRecipes
      .filter((favorite) => favorite.id !== id);
    setFavoriteRecipes(newFavoriteRecipes);
  };

  return (
    <div className="mt-10 mb-32">
      <div className="flex gap-5 justify-center">
        <button
          className="rounded-full py-1 px-3 border"
          onClick={ () => handleFilter('all') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          className="rounded-full py-1 px-3 border"
          onClick={ () => handleFilter('meal') }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          className="rounded-full py-1 px-3 border"
          onClick={ () => handleFilter('drink') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>

      <div className="flex flex-col  mx-2 mt-5 p-2">

        <ul className="w-full list-none flex flex-col gap-4">
          {
        filteredRecipes.map((recipe, index) => (
          <li
            key={ recipe.id }
            className="flex bg-white rounded-md border-b-gray-100 border-b-2
          pb-2 items-center justify-between drop-shadow-md shadow-black"
          >
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className="w-20 h-20 rounded-tl-lg"
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </p>
              <p>{recipe.category}</p>
            </Link>
            <div className="flex mr-8">
              <button
                className=" w-20 text-white rounded-lg flex items-center justify-center"
                onClick={ () => handleClickFavorite(recipe.id) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeart }
                  alt="favorite button"
                />
              </button>
              <ShareButton
                shareBtnTestId={ `${index}-horizontal-share-btn` }
                linkToClipboard={
                window.location.href
                  .replace('/favorite-recipes', `/${recipe.type}s/${recipe.id}`)
              }
              />
            </div>
          </li>
        ))
      }
        </ul>
        <div className="h-20" />
      </div>
    </div>
  );
}

export default FavoriteRecipes;
