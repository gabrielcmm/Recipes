import React from 'react';

// Importando os ícones
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../Footer.css';

function Footer(): JSX.Element {
  return (
    <div className="footer" data-testid="footer">
      <a href="/meals">
        <img src={ mealIcon } alt="Ícone de Comidas" data-testid="meals-bottom-btn" />
      </a>
      <a href="/drinks">
        <img src={ drinkIcon } alt="Ícone de Bebidas" data-testid="drinks-bottom-btn" />
      </a>
    </div>
  );
}

export default Footer;
