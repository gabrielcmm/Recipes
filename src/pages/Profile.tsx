import { ArrowLeft, PencilSimple, UserCircle } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
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
      <div className="flex justify-between mx-2">
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
      {/* <div>
        <button
          data-testid="profile-done-btn"
          onClick={ () => nav('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => nav('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </div> */}

      {/* div que vai conter os favoritados */}
      <div className="flex flex-col gap-2 mx-2 mt-5">
        <h2 className="text-lg font-medium">Favoritos</h2>
        {
          favoriteRecipes.map((recipe) => (
            <div
              key={ recipe.id }
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
          ))
        }
      </div>
    </div>
  );
}

export default Profile;
