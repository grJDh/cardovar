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

    addTagtoCards: (state, { payload }) => {
      for (let i = 0; i < Object.keys(state.cards).length; i++) {
        state.cards[i][payload[0]] = {...state.cards[i][payload[0]], [payload[1]]: payload[2]}
      }
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

export const { addCard, changeCard, openCardTemplate, closeCardTemplate, addTagtoCards } = cardsSlice.actions;

export const cardsSelector = state => state.cards;

export default cardsSlice.reducer;