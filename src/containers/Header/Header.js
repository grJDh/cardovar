import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from '../../components/CheckBox/CheckBox';
import SearchBox from '../../components/SearchBox/SearchBox';
import Button from '../../components/Button/Button';
import Dropdown from '../../components/Dropdown/Dropdown';

import { filtersSelector, toggleFilter, changeSearchField, setSearchIn } from '../../slices/filters';
import { tagsSelector, openTagList } from '../../slices/tags';
import { openCardTemplate } from '../../slices/cards';

import './Header.scss';

const Header = () => {

  const dispatch = useDispatch();
  const { tags, boolTags } = useSelector(tagsSelector);
  const { boolFilters } = useSelector(filtersSelector);

  const onToggleFilter = tag => dispatch(toggleFilter(tag));
  const onChangeSearchField = event => dispatch(changeSearchField(event.target.value));
  const onOpenCardTemplate = () => dispatch(openCardTemplate(["new", ""]));
  const onOpenTagList = () => dispatch(openTagList());
  const onSetSearchIn = event => dispatch(setSearchIn(event.target.value));

  return (
    <header className='header'>
      {Object.keys(boolTags).map((tag) => (
        <Checkbox key={tag} label={tag} onFunc={() => onToggleFilter(tag)} value={boolFilters[tag]}/>
        ))}

      <SearchBox label='Search' onFunc={onChangeSearchField} autocomplete="off"/>

      <Dropdown label='' onFunc={onSetSearchIn} options={Object.keys(tags)}/>

      <Button label='New card' onFunc={onOpenCardTemplate}/>

      <Button label='Tag list' onFunc={onOpenTagList}/>
    </header>
  );
}

export default Header;