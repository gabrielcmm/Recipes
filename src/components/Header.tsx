import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const capitalize = (...str: string[]) => {
    return str.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  const pageTitle = capitalize(...pathname.replace('/', '').split('-'));

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <header>
      <div>
        <h1 className="text-primary-light-100 dark:text-primary-dark-300">Pesquisa</h1>
        <button onClick={ toggleDarkMode }>DarkMode/LightMode</button>
        <button onClick={ () => navigate('/profile') }>
          <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
        </button>
        {pageTitle === 'Meals' || pageTitle === 'Drinks' ? (
          <button onClick={ () => setIsSearchVisible(!isSearchVisible) }>
            <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
          </button>
        ) : null}
        {isSearchVisible && (
          <SearchBar />
        )}
      </div>
      <h2 data-testid="page-title">{pageTitle}</h2>
    </header>
  );
}

export default Header;
