import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';

import CardList from './pages/CardList/CardList';
import Header from './containers/Header/Header';

// import { tagsSelector } from './slices/tags';
// import { createCategories } from './slices/filters';

import './App.scss';

const App = () => {

  // const { categories } = useSelector(tagsSelector);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const booleanFilters = () => {
  //     let tempFilters = {};
  //     for (let i of Object.keys(boolTags)) {
  //       tempFilters = {...tempFilters, [i]: false}
  //     }
    
  //     return tempFilters;
  //   }
  
  //   dispatch(createCategories(booleanFilters()));
  // }, [boolTags, dispatch]);

  return (
    <div className="app">
      <Header />

      <CardList />
    </div>
  );
}

export default App;

// categories
// попытка добавить несколько новых категорйи не работает
// albums
// code review
// settings
// different styles