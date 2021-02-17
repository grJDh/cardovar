import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from '../../components/CheckBox/CheckBox';
import SearchBox from '../../components/SearchBox/SearchBox';
import Button from '../../components/Button/Button';
import Dropdowm from '../../components/Dropdowm/Dropdowm';

import { toggleFilter, changeSearchField } from '../../slices/filters';
import { tagsSelector, openTagTemplate } from '../../slices/tags';
import { openCardTemplate } from '../../slices/cards';

import './Header.scss';

const Header = () => {

  const dispatch = useDispatch();
  const { boolTags } = useSelector(tagsSelector);

  const onToggleFilter = tag => dispatch(toggleFilter(tag));
  const onChangeSearchField = event => dispatch(changeSearchField(event.target.value));
  const onOpenCardTemplate = () => dispatch(openCardTemplate(["new", ""]));
  const onOpenTagTemplate = () => dispatch(openTagTemplate(["new", ""]));
  const onSortingChange = () => "";

  return (
    <header className='header'>
      {/* <Dropdowm label='Sorting' onFunc={onSortingChange}/> */}

      {Object.keys(boolTags).map((tag) => (
        <Checkbox key={tag} label={tag} onFunc={() => onToggleFilter(tag)} />
        ))}

      <SearchBox label='Search' onFunc={onChangeSearchField} autocomplete="off"/>

      <Button label='New card' onFunc={onOpenCardTemplate}/>

      <Button label='New tag' onFunc={onOpenTagTemplate}/>
    </header>
  );
}

export default Header;