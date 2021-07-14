import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContextRecipes from '../context/ContextRecipes';
import useFetchInicialDrinks from '../Hooks/fetchInicialDrinks';
import FilterBar from '../components/FilterBar';
import Loading from '../components/Loading';

function Bebidas() {
  const DOZE = 12;
  Bebidas.displayName = 'Bebidas';
  const { dataDrink } = useContext(ContextRecipes);
  useFetchInicialDrinks();

  const dataAux = { ...dataDrink };
  const { drinks } = dataAux;

  const loadingFunc = () => (
    <Loading />
  );
  const dataRender = () => (
    <div
      className="container-fluid d-flex flex-wrap"
    >
      { drinks && drinks.slice(0, DOZE).map((drink, index) => (
        <Link
          className="text-decoration-none"
          to={ `/bebidas/${drink.idDrink}` }
          key={ drink.idDrink }
        >
          <div
            className="card m-1 "
            data-testid={ `${index}-recipe-card` }
            key={ drink.idDrink }
          >
            <p
              className=" color-secondary "
              data-testid={ `${index}-card-name` }
            >
              {drink.strDrink}
            </p>
            <img
              width="100em"
              className=" m-1 p-1"
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
          </div>
        </Link>
      ))}
    </div>);

  return (
    <div>
      <Header title={ Bebidas.displayName } />
      <FilterBar title={ Bebidas.displayName } />
      <div>
        {!dataDrink.drinks ? loadingFunc() : dataRender()}
      </div>
      <Footer />
    </div>
  );
}

export default Bebidas;
