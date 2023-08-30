import LikeButton from './LikeButton';
import ShareButton from './ShareButton';
import RecipeDetailsInfo from './RecipeDetailsInfo';
import RecipeDetailsIngredient from './RecipeDetailsIngredient';
import RecipeDetailsInstruction from './RecipeDetailsInstruction';
import RecipeDetailsRecommendations from './RecipeDetailsRecommendations';

const RecipeCard = {
  IngredientList: RecipeDetailsIngredient,
  LikeButton,
  Info: RecipeDetailsInfo,
  Instructions: RecipeDetailsInstruction,
  Recommended: RecipeDetailsRecommendations,
  ShareButton,
};

export default RecipeCard;
