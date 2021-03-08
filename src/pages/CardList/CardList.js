import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from './containers/Card/Card';
import ModalImage from "./parts/ModalImage/ModalImage";
import CardTemplate from './containers/CardTemplate/CardTemplate';
import TagList from '../../containers/TagList/TagList';

import { filtersSelector } from '../../slices/filters';
import { modalSelector, closeModalImage } from '../../slices/modal';
import { cardsSelector, fetchCards } from '../../slices/cards';

import "./CardList.scss"

const CardList = () => {

  const dispatch = useDispatch();

  const { categoriesFilterArray, searchFilterValue, sorting, searchIn } = useSelector(filtersSelector);
  const { modalImageAlt, modalImageSrc, modalImageOpened } = useSelector(modalSelector);
  const { cards, cardsLoading, cardsHasErrors, cardTemplateOpened, cardTemplateMode, editedCard, showHidden } = useSelector(cardsSelector);

  const categoriesFilter = cardCategories => {
    for (let category of cardCategories) {
      if (categoriesFilterArray.includes(category)) return true;
    };

    return false;
  }

  const searchFilter = key => {
    const searching = whereToSearch => whereToSearch.toLowerCase().includes(searchFilterValue.toLowerCase())

    switch (searchIn) {
      case "everywhere":
        const searchinTags = Object.keys(cards[key].tags).map(tag => searching(cards[key].tags[tag])).includes(true);
        return (searching(cards[key].title) || searching(cards[key].desc) || searchinTags) ? true : false;
      case "title":
        return searching(cards[key].title);
      case "desc":
        return searching(cards[key].desc);
      default:
        return searching(cards[key].tags[searchIn]);
    }
  }

  const isCategoriesFilterEmpty = categoriesFilterArray.length;

  const filteredCards = Object.keys(cards)
  .filter(key => (!cards[key].hidden || showHidden))

  .filter(key => (isCategoriesFilterEmpty) ? categoriesFilter(cards[key].categories) : true)

  .filter(key => searchFilter(key))

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

    return filteredCards.map((key) => (
          <Card key={key} cardKey={key} card={cards[key]} />
          ))
  }
 
  return (
    <div className='chars-list'>
      <ModalImage alt={modalImageAlt} src={modalImageSrc} opened={modalImageOpened} close={onCloseModalImage} />

      {renderCardList()}

      <CardTemplate opened={cardTemplateOpened} mode={cardTemplateMode} card={(editedCard) ? cards[editedCard] : ""} />

      <TagList />
    </div>
  );
}

export default CardList;