import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function ReceitasFeitas() {
  ReceitasFeitas.displayName = 'Receitas Feitas';
  const [typeToRender, setTypeToRender] = useState('All');
  const [shared, setShared] = useState('escondido');

  const saveTypeToRender = (event) => {
    const { value } = event.target;
    if (value === 'All') setTypeToRender(value);
    if (value === 'Food') setTypeToRender('comida');
    if (value === 'Drinks') setTypeToRender('bebida');
  };

  const renderFilterButtons = () => {
    const buttons = ['All', 'Food', 'Drinks'];
    const dataTest = ['filter-by-all-btn', 'filter-by-food-btn', 'filter-by-drink-btn'];
    return (
      // temos abaixo classesbootstrap
      <div>
        {buttons.map((button, index) => (
          <Button
            className="btn btn-dark btn-sm m-3 p-3"
            type="button"
            key={ index }
            value={ button }
            data-testid={ dataTest[index] }
            onClick={ (event) => saveTypeToRender(event) }
          >
            {button}
          </Button>
        ))}
      </div>);
  };

  const sharing = (type, id) => {
    const numberOfCharactersToRemove = '/receitas-feitas'.length;
    const url = window.location.href;
    let link = url.substring(0, url.length - numberOfCharactersToRemove);
    if (type === 'comida') {
      link += `/comidas/${id}`;
    }
    if (type === 'bebida') {
      link += `/bebidas/${id}`;
    }
    copy(link);
    setShared('aparente');
  };

  const doneRecipesExists = (recipesToRender) => {
    const alterURL = {
      comida: 'comidas',
      bebida: 'bebidas',
    };
    return (
      <div>
        {recipesToRender && recipesToRender.map((recipe, index) => (
          <div key={ recipe.id }>
            <Link
              to={ `/${alterURL[recipe.type]}/${recipe.id}` }
            >
              <div className="img-details-container">
                <img
                  width="300em"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </div>
            </Link>
            {recipe.type === 'comida'
              ? (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.area} - ${recipe.category}`}
                </p>)
              : (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.alcoholicOrNot}`}
                </p>)}
            <button type="button" onClick={ () => sharing(recipe.type, recipe.id) }>
              <img
                src={ shareIcon }
                alt="shareIcon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <p className={ shared }>Link copiado!</p>
            <Link
              to={ `/${alterURL[recipe.type]}/${recipe.id}` }
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <p>
              {recipe.tags && recipe.tags.map((tag, indexIn) => (
                <div
                  key={ indexIn }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </div>
              ))}

            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderDoneRecipes = () => {
    if (localStorage.getItem('doneRecipes')) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      let recipesToRender = doneRecipes;
      console.log(recipesToRender);
      if (typeToRender !== 'All') {
        recipesToRender = doneRecipes.filter((recipe) => recipe.type === typeToRender);
      }
      return (
        <div>
          { recipesToRender ? doneRecipesExists(recipesToRender) : <h1>Carregando</h1> }
        </div>);
    }
    return (
      <div>
        <h2>N??o h?? receitas Feitas</h2>
      </div>
    );
  };

  return (
    <div>
      <header>
        <Header title={ ReceitasFeitas.displayName } />
      </header>
      <body>
        { renderFilterButtons() }
        { renderDoneRecipes() }
      </body>
    </div>
  );
}

export default ReceitasFeitas;
