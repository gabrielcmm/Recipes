import { GenericRecipe } from '../../types';

type RecipeDetailsRecommendationsProps = {
  recommendations: GenericRecipe[];
};

function RecipeDetailsRecommendations({
  recommendations,
}: RecipeDetailsRecommendationsProps) {
  return (
    <>
      <h2>Recomendadas</h2>
      <div className="flex flex-row w-80 overflow-x-scroll">
        {
        recommendations.map((recommendation, index) => (
          <div
            className="flex-none w-1/2 mr-4"
            key={ index }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              src={ recommendation.image }
              alt={ recommendation.name }
              width={ 200 }
              height={ 200 }
            />
            <p
              data-testid={ `${index}-recommendation-title` }
            >
              { recommendation.name }
            </p>
          </div>
        ))
      }
      </div>
    </>
  );
}

export default RecipeDetailsRecommendations;
