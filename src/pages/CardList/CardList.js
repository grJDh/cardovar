import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from './containers/Card/Card';
import ModalImage from "./parts/ModalImage/ModalImage";
import CardTemplate from './containers/CardTemplate/CardTemplate';
import TagList from '../../containers/TagList/TagList';

import { filtersSelector } from '../../slices/filters';
import { modalSelector, closeModalImage } from '../../slices/modal';
import { cardsSelector } from '../../slices/cards';

import "./CardList.scss"

const CardList = () => {

  const dispatch = useDispatch();

  const { boolFilters, searchFilterValue, searchIn } = useSelector(filtersSelector);
  const { modalImageAlt, modalImageSrc, modalImageOpened } = useSelector(modalSelector);
  const { cards, cardTemplateOpened, cardTemplateMode, editedCard, showHidden } = useSelector(cardsSelector);

  const boolTagsFilter = boolTags => {
    const boolTagsKeys = Object.keys(boolTags);
    if (boolTagsKeys.length) {
      for (let i of boolTagsKeys) {
        if (!(!boolFilters[i] || boolTags[i])) return false;
      };

      return true;
    }
  }

  const searchFilter = key => {
    const searching = whereToSearch => whereToSearch.toLowerCase().includes(searchFilterValue.toLowerCase())

    switch (searchIn) {
      case "everywhere":
        const searchinTags = Object.keys(cards[key].tags).map(tag => searching(cards[key].tags[tag])).includes(true);
        return (searching(cards[key].title) || searching(cards[key].desc) || searchinTags) ? true : false;
      case "titles":
        return searching(cards[key].title);
      case "desc":
        return searching(cards[key].desc);
      default:
        return searching(cards[key].tags[searchIn]);
    }
  }

  const filteredCards = Object.keys(cards)
  .filter(key => (!cards[key].hidden || showHidden))

  .filter(key => boolTagsFilter(cards[key].boolTags))

  .filter(key => searchFilter(key))

  .sort((keyA, keyB) => {
    if (cards[keyA].title > cards[keyB].title) return 1;
    if (cards[keyA].title < cards[keyB].title) return -1;
    // if (a.name === b.name) return 0;
    return 0;
  });

  const onClose = event => (event.target.tagName !== "IMG") ? dispatch(closeModalImage()) : "";
 
  return (
    <div className='chars-list'>

      <ModalImage alt={modalImageAlt} src={modalImageSrc} opened={modalImageOpened} close={onClose} />

      {filteredCards.map((key) => (
        <Card key={key} cardKey={key} card={cards[key]} />
        ))}

      <CardTemplate opened={cardTemplateOpened} mode={cardTemplateMode} card={(editedCard) ? cards[editedCard] : ""} />

      <TagList />
    </div>
  );
}

export default CardList;