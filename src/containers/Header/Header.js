import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from '../../components/CheckBox/CheckBox';
import SearchBox from '../../components/SearchBox/SearchBox';
import Button from '../../components/Button/Button';

import { toggleFilter, changeSearchField } from '../../slices/filters';
import { tagsSelector } from '../../slices/tags';
import { openCardTemplateMode } from '../../slices/cards';

import './Header.scss';

const Header = () => {

  const dispatch = useDispatch();
  const { boolTags } = useSelector(tagsSelector);

  const onToggleFilter = (tag) => dispatch(toggleFilter(tag));
  const onChangeSearchField = event => dispatch(changeSearchField(event.target.value));
  const onOpenCardTemplateMode = () => dispatch(openCardTemplateMode(["new", ""]));

  return (
    <header className='header'>
      {Object.keys(boolTags).map((tag) => (
        <Checkbox key={tag} label={tag} onFunc={() => onToggleFilter(tag)} />
        ))}

      <SearchBox label='Search' onFunc={onChangeSearchField} autocomplete="off"/>

      <Button label='New card' onFunc={onOpenCardTemplateMode}/>
    </header>
  );
}

export default Header;