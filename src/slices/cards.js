import { createSlice } from '@reduxjs/toolkit';

import { cards } from '../cardsArray'

const generateCardsArray = () => {
  let newArray = {};
  for (let i=0; i<cards.length; i++) {
    newArray[i] = cards[i]
  }

  return newArray;
}

export const initialState = {
  cards: generateCardsArray(),

  cardTemplateOpened: false,
  cardTemplateMode: "new",
  editedCard: "",
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, { payload }) => {
      state.cards[Object.keys(state.cards).length] = payload;
    },
    changeCard: (state, { payload }) => {
      state.cards[state.editedCard] = payload;
    },
    deleteCard: (state, { payload }) => {
      const { [payload]: value, ...newCards } = state.cards;
      state.cards = newCards;
    },
    // addTagtoCards: (state, { payload }) => {
    //   for (let i = 0; i < Object.keys(state.cards).length; i++) {
    //     state.cards[i][payload[0]] = {...state.cards[i][payload[0]], [payload[1]]: payload[2]}
    //   }
    // },
    updateTagsinCards: (state, { payload }) => {
      state.cards = Object.keys(state.cards).reduce((obj, i) => {

        const updatedTags = Object.keys(payload[0][0]).reduce((obj, tag) => {
          if (state.cards[i].tags[tag] !== undefined) return {...obj, [payload[0][0][tag]]: state.cards[i].tags[tag]}
          else return {...obj, [payload[0][0][tag]]: payload[0][1][payload[0][0][tag]]}
        }, {});

        const updatedBoolTags = Object.keys(payload[1][0]).reduce((obj, tag) => {
          if (state.cards[i].boolTags[tag] !== undefined) return {...obj, [payload[1][0][tag]]: state.cards[i].boolTags[tag]}
          else return {...obj, [payload[1][0][tag]]: payload[1][1][payload[1][0][tag]]}
        }, {});

        return {...obj, [i]: {...state.cards[i], tags: updatedTags, boolTags: updatedBoolTags}};
      }, {});
    },

    openCardTemplate: (state, { payload }) => {
      state.cardTemplateOpened = true;
      state.cardTemplateMode = payload[0];
      state.editedCard = payload[1];
    },
    closeCardTemplate: (state) => {
      state.cardTemplateOpened = false;
    },
  }
});

export const { addCard, changeCard, openCardTemplate, closeCardTemplate, updateTagsinCards, deleteCard } = cardsSlice.actions;

export const cardsSelector = state => state.cards;

export default cardsSlice.reducer;