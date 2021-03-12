import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';

import tagsReducer from './slices/tags';
import filtersReducer from './slices/filters';
import modalReducer from './slices/modal';
import cardsReducer from './slices/cards';
import albumsReducer from './slices/albums';


const rootReducer = combineReducers({
  tags: tagsReducer,
  filters: filtersReducer,
  modal: modalReducer,
  cards: cardsReducer,
  albums: albumsReducer,
});

const store = configureStore({ reducer: rootReducer });

ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
