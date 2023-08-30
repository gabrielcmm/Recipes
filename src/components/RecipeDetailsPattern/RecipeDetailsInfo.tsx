import React from 'react';

type RecipeDetailsInfoProps = {
  name: string;
  image: string;
  category: string;
};

function RecipeDetailsInfo({ name, image, category }: RecipeDetailsInfoProps) {
  return (
    <>
      <h1
        data-testid="recipe-title"
        className="text-4xl"
      >
        { name }
      </h1>
      <img
        src={ image }
        alt={ name }
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-category">{ category }</p>
    </>
  );
}

export default RecipeDetailsInfo;
