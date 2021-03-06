import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import RecipesProvider from './context/RecipesProvider';
import App from './App';

ReactDOM.render(
  <RecipesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecipesProvider>, document.getElementById('root'),

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
