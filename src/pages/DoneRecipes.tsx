// import useLocalStorage from 'use-local-storage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipeType } from '../types';
import ShareButton from '../components/RecipeDetailsPattern/ShareButton';
import useLocalStorage from '../hooks/useLocalStorage';

function DoneRecipes() {
  const { data: doneRecipes } = useLocalStorage<DoneRecipeType[]>('doneRecipes', []);
  const [filteredRecipes, setFilteredRecipes] = useState<DoneRecipeType[]>([]);

  useEffect(() => {
    setFilteredRecipes(doneRecipes);
  }, [doneRecipes]);

  const handleFilter = (filter: string) => {
    if (filter === 'all') {
      setFilteredRecipes(doneRecipes);
      return;
    }
    setFilteredRecipes(doneRecipes.filter((recipe) => recipe.type === filter));
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
            <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
            {
              recipe.tags.slice(0, 2).map((tag) => (
                <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>
              ))
            }
            <ShareButton
              shareBtnTestId={ `${index}-horizontal-share-btn` }
              linkToClipboard={
                window.location.href
                  .replace('/done-recipes', `/${recipe.type}s/${recipe.id}`)
              }
            />
          </li>
        ))
      }
      </ul>
    </div>
  );
}

export default DoneRecipes;
