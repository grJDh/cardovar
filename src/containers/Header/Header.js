import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from '../../components/CheckBox/CheckBox';
import SearchBox from '../../components/SearchBox/SearchBox';
import Button from '../../components/Button/Button';
import Dropdown from '../../components/Dropdown/Dropdown';

import { filtersSelector, toggleFilter, changeSearchField, setSorting, setSearchIn } from '../../slices/filters';
import { tagsSelector, openTagList } from '../../slices/tags';
import { cardsSelector, openCardTemplate, toggleShowHidden } from '../../slices/cards';

import './Header.scss';

const Header = () => {

  const dispatch = useDispatch();
  const { tags, boolTags } = useSelector(tagsSelector);
  const { boolFilters } = useSelector(filtersSelector);
  const { showHidden } = useSelector(cardsSelector);

  const onToggleFilter = tag => dispatch(toggleFilter(tag));
  const onChangeSearchField = event => dispatch(changeSearchField(event.target.value));
  const onOpenCardTemplate = () => dispatch(openCardTemplate(["new", ""]));
  const onOpenTagList = () => dispatch(openTagList());
  const onSetSorting = event => dispatch(setSorting(event.target.value));
  const onSetSearchIn = event => dispatch(setSearchIn(event.target.value));

  const onToggleShowHidden = () => dispatch(toggleShowHidden());

  const searchInOptionsArray = [
    ["everywhere", "everywhere"],
    ["title", "in titles"],
    ["desc", "in descriptions"]
  ].concat(Object.keys(tags).map((tag) => [tag, "in " + tag]));

  const sortingOptionsArray = [
    ["title", "Title"],
    ["desc", "Description"]
  ].concat(Object.keys(tags).map((tag) => [tag, tag]));

  return (
    <header className='header'>
      {Object.keys(boolTags).map((tag) => (
        <Checkbox key={tag} label={tag} onFunc={() => onToggleFilter(tag)} value={boolFilters[tag]}/>
        ))}

      <SearchBox label='Search' onFunc={onChangeSearchField} autocomplete="off"/>

      <Dropdown label='' onFunc={onSetSearchIn} options={searchInOptionsArray} value={"titles"}/>

      <Button label='New card' onFunc={onOpenCardTemplate}/>

      <Button label='Tag list' onFunc={onOpenTagList}/>

      <Dropdown label='Sort by' onFunc={onSetSorting} options={sortingOptionsArray} value={"titles"}/>

      <Button label={(showHidden) ? 'Hide hidden cards' : 'Show hidden cards'}   onFunc={onToggleShowHidden}/>
    </header>
  );
}

export default Header;