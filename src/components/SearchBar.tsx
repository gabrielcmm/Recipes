import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch, FilterOptions } from '../types';
import { fetchMeals, fetchDrinks } from '../services/api';
import { fetchRecipes } from '../redux/actions';

function SearchBar() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const [radio, setRadio] = useState<FilterOptions>('ingredient');
  const [searchRecipe, setSearchRecipe] = useState('');

  const fetchData = async () => {
    let result = [];
    if (radio === 'firstLetter' && searchRecipe.length > 1) {
      window.alert('Your search must have only 1 (one) character');
      return;
    }
    switch (pathname) {
      case '/meals':
        result = await fetchMeals(radio, searchRecipe);
        dispatch(fetchRecipes(result));
        if (result && result.length === 1) {
          navigate(`/meals/${result[0].id}`);
        } else if (result.length <= 0) {
          window.alert("Sorry, we haven't found any recipes for these filters.");
        }
        break;

      case '/drinks':
        result = await fetchDrinks(radio, searchRecipe);
        dispatch(fetchRecipes(result));
        if (result && result.length === 1) {
          navigate(`/drinks/${result[0].id}`);
        } else if (result.length <= 0) {
          window.alert("Sorry, we haven't found any recipes for these filters.");
        }
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar Receita"
        data-testid="search-input"
        onChange={ (e) => setSearchRecipe(e.target.value) }
        value={ searchRecipe }
      />

      <label htmlFor="ingredient" data-testid="ingredient-search-radio-label">
        <input
          type="radio"
          name="search-radio"
          id="ingredient"
          value={ radio }
          onChange={ () => setRadio('ingredient') }
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      <label htmlFor="name" data-testid="name-search-radio-label">
        <input
          type="radio"
          name="search-radio"
          id="name"
          value={ radio }
          onChange={ () => setRadio('name') }
          data-testid="name-search-radio"
        />
        Nome
      </label>
      <label htmlFor="first-letter" data-testid="first-letter-search-radio-label">
        <input
          type="radio"
          name="search-radio"
          id="first-letter"
          value={ radio }
          onChange={ () => setRadio('firstLetter') }
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => fetchData() }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
