// import useLocalStorage from 'use-local-storage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipeType } from '../types';
import ShareButton from '../components/RecipeDetailsPattern/ShareButton';
import useLocalStorage from '../hooks/useLocalStorage';

const doneRecipesMock: DoneRecipeType[] = [
  {
    id: '52977',
    type: 'meal',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
    nationality: 'Italian',
  },
  {
    id: '178319',
    type: 'drink',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
    nationality: '',
  },
  {
    id: '178319',
    type: 'drink',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
    nationality: '',
  },
  {
    id: '178319',
    type: 'meal',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
    nationality: '',
  },
];

function DoneRecipes() {
  const { data: doneRecipes } = useLocalStorage<DoneRecipeType[]>('doneRecipes', []);
  const [filteredRecipes, setFilteredRecipes] = useState<DoneRecipeType[]>([]);

  useEffect(() => {
    setFilteredRecipes(doneRecipesMock);
  }, [doneRecipes]);

  const handleFilter = (filter: string) => {
    if (filter === 'all') {
      setFilteredRecipes(doneRecipesMock);
      return;
    }
    setFilteredRecipes(doneRecipesMock.filter((recipe) => recipe.type === filter));
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
              <div />
              <img
                className="w-20 h-20 rounded-tl-lg"
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />

              <p data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </p>
            </Link>
            <div>
              <p
                data-testid={ `${index}-horizontal-done-date` }
                className="text-xs"
              >
                { `Done on: ${recipe.doneDate}` }

              </p>
              <div className="mt-2">
                <ShareButton
                  shareBtnTestId={ `${index}-horizontal-share-btn` }
                  linkToClipboard={
                window.location.href
                  .replace('/done-recipes', `/${recipe.type}s/${recipe.id}`)
              }
                />
              </div>
            </div>
          </li>
        ))
      }
        </ul>
      </div>
      <div className="h-40" />
    </div>
  );
}

export default DoneRecipes;
