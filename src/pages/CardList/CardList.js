import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Header from '../../containers/Header/Header';
import Card from './containers/Card/Card';
import CardTemplate from './containers/CardTemplate/CardTemplate';
import TagList from './containers/TagList/TagList';

import { filtersSelector } from '../../slices/filters';
import { modalSelector, closeModalImage } from '../../slices/modal';
import { cardsSelector, fetchCards } from '../../slices/cards';

import "./CardList.scss"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledModalImage = styled.div`
  display: ${props => props.opened ? 'flex': 'none'};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
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

  const { categoriesFilterArray, searchFilterValue, sorting, searchIn } = useSelector(filtersSelector);
  const { modalImageAlt, modalImageSrc, modalImageOpened } = useSelector(modalSelector);
  const { cards, cardsLoading, cardsHasErrors, showHidden, selectedCards } = useSelector(cardsSelector);

  const categoriesFilter = cardCategories => {
    for (let category of cardCategories) {
      if (categoriesFilterArray.includes(category)) return true;
    };

    return false;
  }

  const searchFilter = card => {
    const searching = whereToSearch => whereToSearch.toLowerCase().includes(searchFilterValue.toLowerCase())

    switch (searchIn) {
      case "everywhere":
        const searchinTags = Object.keys(card.tags).map(tag => searching(card.tags[tag])).includes(true);
        return (searching(card.title) || searching(card.desc) || searchinTags) ? true : false;
      case "title":
        return searching(card.title);
      case "desc":
        return searching(card.desc);
      default:
        return searching(card.tags[searchIn]);
    }
  }

  const isCategoriesFilterEmpty = categoriesFilterArray.length;

  const filteredCards = Object.keys(cards)
  .filter(key => (!cards[key].hidden || showHidden))

  .filter(key => (isCategoriesFilterEmpty) ? categoriesFilter(cards[key].categories) : true)

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
      <Card key={key} cardKey={key} card={cards[key]} selected={selectedCards.includes(cards[key])} />
      ))
  }
 
  return (
    <Wrapper>
      <Header />

      {renderCardList()}

      <StyledModalImage opened={modalImageOpened} onClick={(event) => onCloseModalImage(event)}>
        <img alt={modalImageAlt} src={modalImageSrc} />
      </StyledModalImage>

      <CardTemplate />

      <TagList />
    </Wrapper>
  );
}

export default CardList;