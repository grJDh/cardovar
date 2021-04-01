import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "@reach/router"

import SearchBox from '../../../components/SearchBox/SearchBox';
import Button from '../../../components/Button/Button';
import ImageButton from '../../../components/ImageButton/ImageButton';
import Dropdown from '../../../components/Dropdown/Dropdown';

import { filtersSelector, toggleSidebar, openTagFilters, changeSearchField, resetSearchField, setSearchIn } from '../../../slices/filters';
import { cardsSelector, openCardTemplate, toggleShowHidden, toggleSelectingMode, openTagList } from '../../../slices/cards';

import hideIcon from '../../../hide.png';
import showIcon from '../../../show.png';
import selectIcon from '../../../select.png';
import tagIcon from '../../../tag.png';
import filterIcon from '../../../filter.png';
import plusIcon from '../../../plus.png';

import styled from 'styled-components';

const sidebarClosedWidth = '60px';
const sidebarTransitionWidth = 'width 0.5s ease-in-out';
const sidebarTransitionHeight = 'height 0.5s ease-in-out';
const sidebarTransitionFilters = 'opacity 0.5s ease-in-out';

const Sidebar = styled.div`
  width: ${props => props.sidebarOpened ? "300px" : sidebarClosedWidth};
  height: 100%;
  transition: ${sidebarTransitionWidth};

  background-color: ${props => props.theme.main};

  position: fixed;
  left: 0;
  padding: 5px;

  display: flex;
  flex-direction: column;

  overflow-y: hidden;
  overflow-x: hidden;

  color: white;

  box-sizing: border-box;

  @media (max-width: ${props => props.theme.tablet}) {
    ${'' /* display: none; */}
    width: 100%;
    height: ${props => props.sidebarOpened ? "auto" : sidebarClosedWidth};
    transition: ${sidebarTransitionHeight};
    z-index: 5;

    top: 0;
  }
`;

const SidebarFilters = styled.div`
  opacity: ${props => props.sidebarOpened ? 1 : 0};
  transition: ${sidebarTransitionFilters};

  display: flex;
  flex-direction: column;

  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const SidebarButtons = styled.div`
  display: flex;
  flex-direction: column;
  ${'' /* padding: 5px; */}

  @media (max-width: ${props => props.theme.tablet}) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    opacity: ${props => props.sidebarOpened ? 1 : 0};
    transition: ${sidebarTransitionFilters};
  }
`;

const BurgerDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  box-sizing: border-box;

  @media (max-width: ${props => props.theme.tablet}) {
    justify-content: space-between;
    flex-direction: row;
  }
`;

const BurgerButton = styled(Button)`
  width: 100%;

  margin: 0;

  @media (max-width: ${props => props.theme.tablet}) {
    width: ${sidebarClosedWidth};
  }
`;

const TabletImageButton = styled(ImageButton)`
  display: none;
  
  @media (min-width: ${props => props.theme.mobileSmall}) and (max-width: ${props => props.theme.tablet}) {
    display: flex;
    margin-left: 3px;
    margin-right: 3px;

    visibility: ${props => props.props ? "hidden" : "visible"};
    opacity: ${props => props.props ? 0 : 1};
    transition: ${sidebarTransitionFilters};

    p {
      display: none;
      margin-left: 0;
    }

    @media (min-width: ${props => props.theme.tabletSmall}) {
      p {
        opacity: 1;
        display: inline;
        margin-left: 0.3rem;
      }
    }
  }
`;

const Search = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardListSidebar = () => {
  const dispatch = useDispatch();

  // const { sidebarOpened } = useSelector(tagsSelector);
  const { showHidden, selectingMode } = useSelector(cardsSelector);
  const { searchFilterValue, sidebarOpened } = useSelector(filtersSelector);

  const onToggleSidebar = () => dispatch(toggleSidebar());
  // const onToggleCategoryFilter = category => dispatch(toggleCategoryFilter(category));
  const onChangeSearchField = event => dispatch(changeSearchField(event.target.value));
  const onResetSearchField = () => dispatch(resetSearchField());
  const onOpenCardTemplate = () => dispatch(openCardTemplate(["new", ""]));
  const onOpenTagList = () => dispatch(openTagList());
  const onOpenTagFilters = () => dispatch(openTagFilters());
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
    <Sidebar sidebarOpened={sidebarOpened}>

      <BurgerDiv sidebarOpened={sidebarOpened}>
        <BurgerButton label='SDBR' onFunc={onToggleSidebar}/>

        <TabletImageButton
          src={plusIcon}
          label='New card'
          onFunc={onOpenCardTemplate}
          props={sidebarOpened}
        />

        <TabletImageButton
          src={tagIcon}
          label="Tags"
          onFunc={onOpenTagList}
          props={sidebarOpened}
        />

        <TabletImageButton
          src={filterIcon}
          label="Tag filters"
          onFunc={onOpenTagFilters}
          props={sidebarOpened}
        />

        <TabletImageButton
          src={selectIcon}
          label={(selectingMode) ? 'Selection mode: on' : 'Selection mode: off'}
          onFunc={onToggleSelectingMode}
          props={sidebarOpened}
        />

        <TabletImageButton
          src={(showHidden) ? hideIcon : showIcon}
          label={(showHidden) ? "Don't show hidden cards" : 'Show hidden cards'}
          onFunc={onToggleShowHidden}
          props={sidebarOpened}
        />

        <Link to="/">Albums</Link>  
      </BurgerDiv>

      <SidebarFilters sidebarOpened={sidebarOpened}>

        {/* {categories.map((category) => (
          <Checkbox key={category} label={category} onFunc={() => onToggleCategoryFilter(category)} value={categoriesFilterArray.includes(category)} />
          ))} */}
        
        {/* <Dropdown label='Sort by' onFunc={onSetSorting} options={sortingOptionsArray} value={"titles"}/> */}

        <Search>
          <SearchBox label='Search' onFunc={onChangeSearchField} onResetFunc={onResetSearchField} value={searchFilterValue} autocomplete="off"/>

          <Dropdown label='' onFunc={onSetSearchIn} options={searchInOptionsArray} value={"title"}/>
        </Search>
      </SidebarFilters>

      <SidebarButtons sidebarOpened={sidebarOpened}>

        <ImageButton
          src={plusIcon}
          label='New card'
          onFunc={onOpenCardTemplate}
          props={sidebarOpened}
        />

        <ImageButton
          src={tagIcon}
          label="Tags"
          onFunc={onOpenTagList}
          props={sidebarOpened}
        />

        <ImageButton
          src={filterIcon}
          label="Tag filters"
          onFunc={onOpenTagFilters}
          props={sidebarOpened}
        />

        <ImageButton
          src={selectIcon}
          label={(selectingMode) ? 'Selection mode: on' : 'Selection mode: off'}
          onFunc={onToggleSelectingMode}
          props={sidebarOpened}
        />

        <ImageButton
          src={(showHidden) ? hideIcon : showIcon}
          label={(showHidden) ? "Don't show hidden cards" : 'Show hidden cards'}
          onFunc={onToggleShowHidden}
          props={sidebarOpened}
        />
      </SidebarButtons>
    </Sidebar>
  );
}

export default CardListSidebar;