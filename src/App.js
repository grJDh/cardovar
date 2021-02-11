import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';

import CharsList from './containers/CharsList/CharsList';
import Header from './containers/Header/Header';

import { chars } from './charsArray';

import { tagsSelector } from './slices/tags';
import { createBooleanFilters } from './slices/filters';

import './App.scss';

const App = () => {

  const { boolTags } = useSelector(tagsSelector);

  const dispatch = useDispatch();

  const booleanFilters = () => {
    let tempFilters = {};
    for (let i of Object.keys(boolTags)) {
      tempFilters = {...tempFilters, [i]: false}
    }
  
    return tempFilters;
  }

  const onCreateBooleanFilters = () => dispatch(createBooleanFilters(booleanFilters()));

  onCreateBooleanFilters();

  return (
    <div className="app">
      <Header/>

      <CharsList chars={chars}/>
    </div>
  );
}

export default App;

// tags
// different styles
// categories
// hidden/shown