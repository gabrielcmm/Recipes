import Ingredient from './Ingredient';

type RecipeIngredientProps = {
  ingredientList: string[][];
  hasCheckBox?: boolean;
};

function RecipeDetailsIngredient(
  { ingredientList,
    hasCheckBox = false }: RecipeIngredientProps,
) {
  return (
    <div>
      <h1>Ingredients</h1>
      <ul>
        {ingredientList.map((ingredient, index) => (
          <Ingredient
            key={ index }
            index={ index }
            ingredient={ ingredient }
            hasCheckBox={ hasCheckBox }
          />
        ))}
      </ul>
    </div>
  );
}

export default RecipeDetailsIngredient;
