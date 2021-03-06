import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [searchForm, setSearchForm] = useState(false);
  const renderSearchImage = () => (
    <button
      className="lupa"
      type="button"
      onClick={ () => setSearchForm(!searchForm) }
    >
      <img
        src={ searchIcon }
        alt="Profile"
        data-testid="search-top-btn"
      />
    </button>
  );

  return (
    <div>
      <div className="search-perfil-app">
        <Link width="40%" to="/perfil">
          <img
            src={ profileIcon }
            alt="Profile"
            data-testid="profile-top-btn"
          />
        </Link>
        { title === 'Comidas'
       || title === 'Bebidas'
       || title === 'Explorar Origem' ? renderSearchImage() : false }
        { searchForm
          ? (
            <SearchBar title={ title } />
          )
          : false}
      </div>
      <div>
        <h1 data-testid="page-title">{ title }</h1>
      </div>
      <header className="container" />
    </div>

  );
}

export default Header;

Header.propTypes = {
  title: propTypes.string.isRequired,
};
