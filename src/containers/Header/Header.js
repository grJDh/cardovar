import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from '../../components/CheckBox/CheckBox';
import SearchBox from '../../components/SearchBox/SearchBox';

import { filtersSelector, toggleFilter, changeSearchField } from '../../slices/filters';
import { tagsSelector } from '../../slices/tags';

import { capitalize } from '../../exported';

import './Header.scss';

const Header = () => {

  const dispatch = useDispatch();
  const { boolFilters } = useSelector(filtersSelector);
  const { boolTags } = useSelector(tagsSelector);

  const onToggleFilter = (tag) => dispatch(toggleFilter(tag));
  const onChangeSearchField = event => dispatch(changeSearchField(event.target.value));

  return (
    <header className='header'>
      {Object.keys(boolTags).map((tag) => (
        <Checkbox key={tag} label={capitalize(tag)} onFunc={() => onToggleFilter(tag)} />
        ))}

      <SearchBox label='Поиск' onFunc={onChangeSearchField} />
    </header>
  );
}

export default Header;