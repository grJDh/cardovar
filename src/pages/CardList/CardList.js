import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "@reach/router"

import CardListSidebar from './containers/CardListSidebar';
import Card from './containers/Card/Card';
import CardTemplate from './containers/CardTemplate/CardTemplate';
import TagList from './containers/TagList/TagList';
import TagFilters from './containers/TagFilters/TagFilters';
import MassButtonList from './containers/MassButtonList';

import { filtersSelector } from '../../slices/filters';
import { modalSelector, closeModalImage } from '../../slices/modal';
import { cardsSelector, fetchCards } from '../../slices/cards';

import "./CardList.scss"
import styled, { keyframes } from 'styled-components';

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

const shine = keyframes`
  from {
    background-position: -300px;
  }

  to {
    background-position: 550px;
  }
`;

const SkeletonCard = styled.div`
  min-width: 300px;
  width: 100%;
  max-width: 420px;
  height: 550px;
  margin: 0.7rem;
  padding: 0.5rem;
  background-color: ${props => props.theme.main};
  border-radius: 6px;
  box-shadow: 2px 2px 4px 2px rgba( 0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const SkeletonCardImg = styled.div`
  background-image: linear-gradient(90deg, ${props => props.theme.mainDark} 0px, ${props => props.theme.mainBack} 80px, ${props => props.theme.mainDark} 160px);
  background-size: 1000px;
  height: 420px;
  width: 350px;
  border-radius: 5px;

  animation: ${shine} 2s infinite linear
`;

const SkeletonCardTitle = styled(SkeletonCardImg)`
  height: 35px;
`;

const SkeletonCardDesc = styled(SkeletonCardTitle)`
  height: 25px;
`;

const CardList = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { sidebarOpened, tagFilterOpened, tagFilterIncludeArray, tagFilterExcludeArray, searchFilterValue, sorting, searchIn } = useSelector(filtersSelector);
  const { modalImageAlt, modalImageSrc, modalImageOpened } = useSelector(modalSelector);
  // eslint-disable-next-line
  const { cards, tags, cardsLoading, cardsHasErrors, showHidden, selectingMode, cardTemplateOpened, tagListOpened } = useSelector(cardsSelector);

  const tagFilter = cardTags => {
    if (!(tagFilterIncludeArray.length + tagFilterExcludeArray.length)) return true;

    let flag = false;
    
    for (let tag of cardTags) {
      console.log(tag, tagFilterExcludeArray.includes(tag), tagFilterIncludeArray.includes(tag))
      if (tagFilterExcludeArray.includes(tag)) return false;
      if (tagFilterIncludeArray.includes(tag)) flag = true;
    };

    if (flag) return true
    else return false;
  }

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

  // console.log(tags)
  // console.log(cards)

  const filteredCards = Object.keys(cards)
  .filter(key => (!cards[key].hidden || showHidden))

  .filter(key => tagFilter(cards[key].tags))

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
    dispatch(fetchCards(params.albumID));
  }, [dispatch, params.albumID]);

  const loadingCardList = () => {
    return [1,2,3,4,5,6,7,8].map(key => (
      <SkeletonCard key={key}>
        <SkeletonCardTitle></SkeletonCardTitle>
        <SkeletonCardImg></SkeletonCardImg>
        <SkeletonCardDesc></SkeletonCardDesc>
      </SkeletonCard>
      ))
  }

  const renderCardList = () => {
    if (cardsLoading) return loadingCardList()
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

        {(tagFilterOpened) && <TagFilters />}

        {(selectingMode) && <MassButtonList />}
      </Cards>
    </Wrapper>
  );
}

export default CardList;