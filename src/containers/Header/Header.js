import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from '../../components/CheckBox/CheckBox';
import SearchBox from '../../components/SearchBox/SearchBox';

import './Header.scss';

import { filtersSelector, toggleMajor, toggleDead, changeSearchField } from '../../slices/filters';

const Header = () => {

  const dispatch = useDispatch();
  const { isMajor, isDead, searchFilterValue } = useSelector(filtersSelector);

  const onToggleMajor = () => dispatch(toggleMajor(!isMajor));
  const onToggleDead = () => dispatch(toggleDead(!isDead));
  const onChangeSearchField = event => dispatch(changeSearchField(event.target.value));


  return (
    <header className='header'>
      <Checkbox label='Только важные' onFunc={onToggleMajor} />
      <Checkbox label='Только живые' onFunc={onToggleDead} />

      <SearchBox label='Поиск' onFunc={onChangeSearchField} />
    </header>
  );
}

export default Header;