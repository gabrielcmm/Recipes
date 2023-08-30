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
    <div className="mb-32">
      <div className="flex gap-5 justify-center">
        <button onClick={ () => handleFilter('all') } data-testid="filter-by-all-btn">
          All
        </button>
        <button onClick={ () => handleFilter('meal') } data-testid="filter-by-meal-btn">
          Meals
        </button>
        <button onClick={ () => handleFilter('drink') } data-testid="filter-by-drink-btn">
          Drinks
        </button>
      </div>

      <ul className="list-none">
        {
        filteredRecipes.map((recipe, index) => (
          <li key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </p>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.type === 'meal'
                  ? `${recipe.nationality} - ${recipe.category}`
                  : recipe.alcoholicOrNot}
              </p>
            </Link>
            <button
              className=" text-white rounded-lg flex items-center justify-center"
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
          </li>
        ))
      }
      </ul>
    </div>
  );
}

export default FavoriteRecipes;
