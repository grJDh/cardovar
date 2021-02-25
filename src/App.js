import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';

import CardList from './pages/CardList/CardList';
import Header from './containers/Header/Header';

import { tagsSelector } from './slices/tags';
import { createBooleanFilters } from './slices/filters';

import './App.scss';

const App = () => {

  const { boolTags } = useSelector(tagsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const booleanFilters = () => {
      let tempFilters = {};
      for (let i of Object.keys(boolTags)) {
        tempFilters = {...tempFilters, [i]: false}
      }
    
      return tempFilters;
    }
  
    const onCreateBooleanFilters = () => dispatch(createBooleanFilters(booleanFilters()));

    onCreateBooleanFilters();
  }, [boolTags, dispatch]);

  return (
    <div className="app">
      <Header />

      <CardList />
    </div>
  );
}

export default App;

// hidden/shown
// settings
// sorting
// albums
// different styles