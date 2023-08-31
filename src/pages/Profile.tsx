import { ArrowLeft, PencilSimple, UserCircle } from '@phosphor-icons/react';
import { useNavigate, Link } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { FavoriteRecipeType } from '../types';

function Profile() {
  const userEmail = JSON.parse(localStorage.getItem('user') || '{}').email;
  const favoriteRecipes: FavoriteRecipeType[] = JSON.parse(
    localStorage.getItem('favoriteRecipes') || '[]',
  );
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    nav('/');
  };

  return (
    <div className="flex flex-col py-3">
      <div className="flex justify-between mx-2 items-center mb-2">
        <ArrowLeft size={ 30 } onClick={ () => nav(-1) } className="cursor-pointer" />

        <h1>Meu perfil</h1>
        <PencilSimple size={ 30 } className="cursor-pointer" />
      </div>
      <div className="m-auto">
        <UserCircle size={ 150 } />
      </div>
      <h2
        data-testid="profile-email"
        className="text-center text-2xl font-bold"
      >
        {userEmail}
      </h2>
      <div className="flex gap-2 mx-1 mt-3 align-center justify-center">
        <button
          data-testid="profile-done-btn"
          onClick={ () => nav('/done-recipes') }
          className={ buttonVariant() }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => nav('/favorite-recipes') }
          className={ buttonVariant() }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
          className={ buttonVariant() }
        >
          Logout
        </button>
      </div>

      {/* div que vai conter os favoritados */}
      <div className="flex flex-col gap-2 mx-2 mt-5">
        <h2 className="text-lg font-medium">Favoritos</h2>
        {
          favoriteRecipes.map((recipe) => (
            <Link to={ `/${recipe.type}s/${recipe.id}` } key={ recipe.id }>
              <div
                className="flex bg-white rounded-md border-b-gray-100 border-b-2 pb-2"
              >
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  className="w-32 h-32"
                />
                <div className="flex flex-col p-2">
                  <strong>{recipe.name}</strong>
                  <p className="font-light">{recipe.category}</p>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

const buttonVariant = tv({
  base: `bg-white text-black hover:bg-gray-100
  border border-black font-bold py-2 px-4 rounded`,
});

export default Profile;
