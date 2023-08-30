import { useSelector } from 'react-redux';
import { RootState } from '../types';

function ProductsList() {
  const { recipesFromApi } = useSelector((state:RootState) => state.recipes);
  const initialRecipes = recipesFromApi.slice(0, 12);
  return (
    <ul>
      {initialRecipes.map((recipe, index) => (
        <li key={ recipe.id } data-testid={ `${index}-recipe-card` }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>
            {recipe.name}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default ProductsList;
