import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { InProgressRecipeType } from '../../types';

type IngredientProps = {
  ingredient: string[];
  index: number;
  hasCheckBox?: boolean;
};

function Ingredient({ ingredient, index, hasCheckBox = false }: IngredientProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { pathname } = useLocation();

  const [
    inProgressRecipe, setInProgressRecipe,
  ] = useLocalStorage<InProgressRecipeType>(
    'inProgressRecipes',
    { meals: {}, drinks: {} },
  );

  useEffect(() => {
    if (!inProgressRecipe) return;
    const { meals, drinks } = inProgressRecipe;
    if (pathname.includes('/meals') && Object.values(meals).length > 0) {
      const mealKeys = Object.values(meals) as [string[]];
      if (mealKeys[0].includes(ingredient[0])) {
        setIsChecked(true);
      }
    }
    if (pathname.includes('/drinks') && Object.values(drinks).length > 0) {
      const drinkKeys = Object.values(drinks) as [string[]];
      if (drinkKeys[0].includes(ingredient[0])) {
        setIsChecked(true);
      }
    }
  }, [inProgressRecipe, ingredient, pathname]);

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    const ingredientName = ingredient[0];
    const key = pathname.split('/')[2];

    if (pathname.includes('/meals')) {
      if (!isChecked) {
        const updatedLocalStorage: InProgressRecipeType = {
          ...inProgressRecipe,
          meals: {
            [key]: [...inProgressRecipe.meals[key] ?? [], ingredientName],
          },
        };
        setInProgressRecipe(updatedLocalStorage);
      } else {
        console.log(inProgressRecipe.meals[key].filter((ing) => ing !== ingredientName));
        const updatedLocalStorage: InProgressRecipeType = {
          ...inProgressRecipe,
          meals: {
            [key]: inProgressRecipe.meals[key].filter((ing) => ing !== ingredientName),
          },
        };
        setInProgressRecipe(updatedLocalStorage);
      }
    } else if (pathname.includes('/drinks')) {
      if (!isChecked) {
        const updatedLocalStorage: InProgressRecipeType = {
          ...inProgressRecipe,
          drinks: {
            [key]: [...inProgressRecipe.drinks[key] ?? [], ingredientName],
          },
        };
        setInProgressRecipe(updatedLocalStorage);
      } else {
        const updatedLocalStorage: InProgressRecipeType = {
          ...inProgressRecipe,
          drinks: {
            [key]: inProgressRecipe.drinks[key].filter((ing) => ing !== ingredientName),
          },
        };
        setInProgressRecipe(updatedLocalStorage);
      }
    }
  };

  return (
    <li
      key={ index }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      <label
        htmlFor={ `ing-${index}` }
        aria-checked={ (isChecked && pathname.includes('/in-progress')) }
        data-testid={ `${index}-ingredient-step` }
        className="aria-checked:line-through decoration-black"
      >
        {hasCheckBox
            && <input
              type="checkbox"
              id={ `ing-${index}` }
              checked={ isChecked }
              onChange={ handleCheckChange }
            />}
        <span>{`${ingredient[0]} - ${ingredient[1]}`}</span>
      </label>
    </li>
  );
}

export default Ingredient;
