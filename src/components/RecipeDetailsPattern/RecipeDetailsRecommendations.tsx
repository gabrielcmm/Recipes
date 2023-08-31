import React, { useRef } from 'react';
import userEvent from '@testing-library/user-event';
import { any } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { GenericRecipe } from '../../types';

type RecipeDetailsRecommendationsProps = {
  recommendations: GenericRecipe[];
};

function RecipeDetailsRecommendations({
  recommendations,
}: RecipeDetailsRecommendationsProps) {
  const child = useRef<any>(null);
  const navigate = useNavigate();

  const scroll = (scrollOffset: number) => {
    child.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl mb-3">Recomendadas</h2>
      <div className="w-full flex items-center relative">
        <button
          className=" absolute h-10 w-4 bg-black left-1
         text-white opacity-60 rounded-full"
          onClick={ () => scroll(-100) }
        >
          {'  '}
          {' < '}
          {'  '}
        </button>
        <div
          className="flex items-center w-full gap-2 overflow-x-hidden scroll-smooth"
          ref={ child }
        >
          {
        recommendations.map((recommendation) => (
          <img
            key={ recommendation.id }
            src={ recommendation.image }
            alt={ recommendation.name }
            className="w-50 h-40 rounded-lg"
          />
        ))
      }
        </div>
        <button
          className=" h-10 w-4 bg-black absolute right-1
         text-white opacity-60 rounded-full"
          onClick={ () => scroll(100) }
        >
          {'  '}
          {' > '}
          {'  '}
        </button>
      </div>
    </div>
  );
}

export default RecipeDetailsRecommendations;
