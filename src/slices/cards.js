import { createSlice } from '@reduxjs/toolkit';

import { cards } from '../cardsArray'

export const initialState = {
  cards: cards,

  cardTemplateOpened: false,
  cardTemplateMode: "new",
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, { payload }) => {
      state.cards = [...state.cards, payload];
    },

    openCardTemplateMode: (state, { payload }) => {
      state.cardTemplateOpened = true;
      state.cardTemplateMode = payload;
    },
    closeCardTemplateMode: (state) => {
      state.cardTemplateOpened = false;
    },
  }
});

export const { addCard, openCardTemplateMode, closeCardTemplateMode } = cardsSlice.actions;

export const cardsSelector = state => state.cards;

export default cardsSlice.reducer;