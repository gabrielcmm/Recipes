import { DrinkRecipe, GenericRecipe, MealRecipe } from '../../types';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';

type RecipeType = {
  genericInfos: GenericRecipe,
  fullObject: MealRecipe | DrinkRecipe,
  recommendations: GenericRecipe[],
};

type RecipeDetailsInfoProps = {
  name: string;
  image: string;
  category: string;
  recipe: RecipeType
};

function RecipeDetailsInfo({ recipe, name, image, category }: RecipeDetailsInfoProps) {
  return (
    <div className="mb-2">
      <div
        className={ `w-full h-96
         bg-cover bg-center bg-fixed bg-no-repeat 
         rounded-b-3xl mb-4` }
        style={ { backgroundImage: `url(${image})` } }
      >
        <div className="w-full h-full flex gap-10 justify-end items-end pb-4 pr-4">
          <LikeButton recipe={ recipe } />
          <ShareButton
            shareBtnTestId="share-btn"
            linkToClipboard={ window.location.href }
          />
        </div>
      </div>
      <div className="p-2">
        <h1
          data-testid="recipe-title"
          className="text-4xl"
        >
          { name }
        </h1>
        <p data-testid="recipe-category" className="text-2xl">{ category }</p>
      </div>
    </div>
  );
}

export default RecipeDetailsInfo;
