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
    <div className="p-2">
      <h1 className="text-2xl mb-4">Ingredientes</h1>
      <ul className="">
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
