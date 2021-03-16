import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardListSidebar from './containers/CardListSidebar';
import Card from './containers/Card/Card';
import CardTemplate from './containers/CardTemplate/CardTemplate';
import TagList from './containers/TagList/TagList';
import MassButtonList from './containers/MassButtonList';

import { filtersSelector } from '../../slices/filters';
import { modalSelector, closeModalImage } from '../../slices/modal';
import { cardsSelector, fetchCards } from '../../slices/cards';
import { tagsSelector} from '../../slices/tags';

import "./CardList.scss"
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;

  display: flex;

  background-color: ${props => props.theme.mainBack};
`;

const Cards = styled.div`
  margin-left: ${props => props.sidebarOpened ? "300px" : "60px"};
  transition: margin-left 0.5s ease-in-out;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const StyledModalImage = styled.div`
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.9);

  justify-content: center;
  align-items: center;

  img {
    max-width: 90vw;
    max-height: 90vh;
  }
`;

const CardList = () => {
  const dispatch = useDispatch();

  const { sidebarOpened, searchFilterValue, sorting, searchIn } = useSelector(filtersSelector);
  const { modalImageAlt, modalImageSrc, modalImageOpened } = useSelector(modalSelector);
  const { cards, cardsLoading, cardsHasErrors, showHidden, selectingMode, cardTemplateOpened } = useSelector(cardsSelector);
  const { tagListOpened } = useSelector(tagsSelector);


  // const categoriesFilter = cardCategories => {
  //   for (let category of cardCategories) {
  //     if (categoriesFilterArray.includes(category)) return true;
  //   };

  //   return false;
  // }

  const searchFilter = card => {
    const searching = whereToSearch => whereToSearch.toLowerCase().includes(searchFilterValue.toLowerCase())

    switch (searchIn) {
      case "title":
        return searching(card.title);
      case "desc":
        return searching(card.longDesc);
      default:
        // const searchinTags = Object.keys(card.tags).map(tag => searching(card.tags[tag])).includes(true);
        return (searching(card.title) || searching(card.longDesc)) ? true : false;
    }
  }

  // const isCategoriesFilterEmpty = tagFilterArray.length;

  const filteredCards = Object.keys(cards)
  .filter(key => (!cards[key].hidden || showHidden))

  // .filter(key => (isCategoriesFilterEmpty) ? categoriesFilter(cards[key].categories) : true)

  .filter(key => searchFilter(cards[key]))

  .sort((keyA, keyB) => {
    const compare = (a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    }

    switch (sorting) {
      case "title":
        return compare(cards[keyA].title, cards[keyB].title)
      case "desc":
        return compare(cards[keyA].desc, cards[keyB].desc)
      default:
        return compare(cards[keyA].tags[sorting], cards[keyB].tags[sorting])
    }
  });

  const onCloseModalImage = event => (event.target.tagName !== "IMG") ? dispatch(closeModalImage()) : "";

  // const escListener = (event) => {
  //   if (event.isComposing || event.key === "Escape") {
  //     onCloseModalImage();
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener("keydown", event => escListener(event));
  
  //   return () => {
  //     window.removeEventListener("keydown", event => escListener(event))
  //   }
  // });

  useEffect(() => {
    dispatch(fetchCards())
  }, [dispatch]);

  const renderCardList = () => {
    if (cardsLoading) return <p>Loading cards...</p>
    if (cardsHasErrors) return <p>Unable to display cards.</p>

    return filteredCards.map(key => (
      <Card key={key} cardKey={key} card={cards[key]} />
      ))
  }
 
  return (
    <Wrapper>
      <Cards sidebarOpened={sidebarOpened}>
        {!(cardsLoading || cardsHasErrors) && <CardListSidebar />}

        {renderCardList()}

        {(modalImageOpened) && (
          <StyledModalImage onClick={(event) => onCloseModalImage(event)}>
            <img alt={modalImageAlt} src={modalImageSrc} />
          </StyledModalImage>
        )}

        {(cardTemplateOpened) && <CardTemplate />}

        {(tagListOpened) && <TagList />}

        {(selectingMode) && <MassButtonList />}
      </Cards>
    </Wrapper>
  );
}

export default CardList;