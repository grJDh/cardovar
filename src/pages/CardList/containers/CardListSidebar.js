import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "@reach/router"

// import Checkbox from '../../components/CheckBox/CheckBox';
import SearchBox from '../../../components/SearchBox/SearchBox';
import Button from '../../../components/Button/Button';
import ImageButton from '../../../components/ImageButton/ImageButton';
import Dropdown from '../../../components/Dropdown/Dropdown';

// eslint-disable-next-line
import { filtersSelector, toggleSidebar, toggleCategoryFilter, changeSearchField, setSorting, setSearchIn } from '../../../slices/filters';
import { openTagList } from '../../../slices/tags';
import { cardsSelector, openCardTemplate, toggleShowHidden, toggleSelectingMode } from '../../../slices/cards';

import hideIcon from '../../../hide.png';
import showIcon from '../../../show.png';
import selectIcon from '../../../select.png';
import tagIcon from '../../../tag.png';

import styled from 'styled-components';

const sidebarClosedWidth = '60px';
const sidebarTransitionWidth = 'width 0.5s ease-in-out';
// const sidebarTransitionHeight = 'height 0.5s ease-in-out';
const sidebarTransitionFilters = 'opacity 0.5s ease-in-out';

const SideBar = styled.div`
  width: ${props => props.sidebarOpened ? "300px" : sidebarClosedWidth};
  height: 100%;
  transition: ${sidebarTransitionWidth};

  background-color: ${props => props.theme.main};

  position: fixed;
  left: 0;

  display: flex;
  flex-direction: column;

  overflow-y: auto;
  overflow-x: hidden;

  color: white;
`;

const SideBarFilters = styled.div`
  opacity: ${props => props.sidebarOpened ? 1 : 0};
  transition: ${sidebarTransitionFilters};

  display: flex;
  flex-direction: column;
`;

const SideBarButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

const BurgerButton = styled(Button)`
  width: ${sidebarClosedWidth};

  margin: 0;
`;

const CardListSidebar = () => {
  const dispatch = useDispatch();

  // const { sidebarOpened } = useSelector(tagsSelector);
  const { showHidden, selectingMode } = useSelector(cardsSelector);
  const { sidebarOpened } = useSelector(filtersSelector);

  const onToggleSidebar = () => dispatch(toggleSidebar());
  // const onToggleCategoryFilter = category => dispatch(toggleCategoryFilter(category));
  const onChangeSearchField = event => dispatch(changeSearchField(event.target.value));
  const onOpenCardTemplate = () => dispatch(openCardTemplate(["new", ""]));
  const onOpenTagList = () => dispatch(openTagList());
  // const onSetSorting = event => dispatch(setSorting(event.target.value));
  const onSetSearchIn = event => dispatch(setSearchIn(event.target.value));
  const onToggleShowHidden = () => dispatch(toggleShowHidden());
  const onToggleSelectingMode = () => dispatch(toggleSelectingMode());
  
  const searchInOptionsArray = [
    ["everywhere", "everywhere"],
    ["title", "in titles"],
    ["desc", "in descriptions"],
  ];

  // const sortingOptionsArray = [
  //   ["title", "Title"],
  //   ["desc", "Description"]
  // ].concat(Object.keys(tags).map((tag) => [tag, tag]));

  return (
    <SideBar sidebarOpened={sidebarOpened}>

      <BurgerButton label='SDBR' onFunc={onToggleSidebar}/>

      <SideBarFilters sidebarOpened={sidebarOpened}>
      
        <Link to="/">Albums</Link>

        {/* {categories.map((category) => (
          <Checkbox key={category} label={category} onFunc={() => onToggleCategoryFilter(category)} value={categoriesFilterArray.includes(category)} />
          ))} */}
        
        {/* <Dropdown label='Sort by' onFunc={onSetSorting} options={sortingOptionsArray} value={"titles"}/> */}

        <SearchBox label='Search' onFunc={onChangeSearchField} autocomplete="off"/>

        <Dropdown label='' onFunc={onSetSearchIn} options={searchInOptionsArray} value={"title"}/>
      </SideBarFilters>

      <SideBarButtons sidebarOpened={sidebarOpened}>

        <Button label='New card' onFunc={onOpenCardTemplate}/>

        <ImageButton
          src={tagIcon}
          label="Tags"
          onFunc={onOpenTagList}
          props={sidebarOpened}
        />

        <ImageButton
          src={selectIcon}
          label={(selectingMode) ? 'Turn off selecting mode' : 'Turn on selecting mode'}
          onFunc={onToggleSelectingMode}
          props={sidebarOpened}
        />

        <ImageButton
          src={(showHidden) ? hideIcon : showIcon}
          label={(showHidden) ? 'Hide hidden cards' : 'Show hidden cards'}
          onFunc={onToggleShowHidden}
          props={sidebarOpened}
        />
      </SideBarButtons>
    </SideBar>
  );
}

export default CardListSidebar;