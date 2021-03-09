import { createSlice } from '@reduxjs/toolkit';

export const fetchCards = () => {
  return async dispatch => {
    dispatch(getCards());

    try {
      const response = await fetch('https://api.npoint.io/6092f6f51e0ff89498be');
      const data = await response.json();

      dispatch(getCardsSuccess(data));
    } catch (error) {
      dispatch(getCardsFailure());
    }
  }
}

export const initialState = {
  cards: {},

  cardsLoading: false,
  cardsHasErrors: false,

  cardTemplateOpened: false,
  cardTemplateMode: "new",
  editedCard: "",

  showHidden: false,
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    getCards: state => {
      state.cardsLoading = true;
    },
    getCardsSuccess: (state, { payload }) => {
      state.cards = payload
      state.cardsLoading = false
      state.cardsHasErrors = false
    },
    getCardsFailure: state => {
      state.cardsLoading = false
      state.cardsHasErrors = true
    },

    addCard: (state, { payload }) => {
      state.cards[Object.keys(state.cards).length] = payload;
    },
    changeCard: (state, { payload }) => {
      state.cards[state.editedCard] = payload;
    },
    deleteCard: (state, { payload }) => {
      state.cardTemplateMode = "new";
      const { [payload]: temp, ...newCards } = state.cards;
      state.cards = newCards;
    },
    toggleCardVisibility: (state, { payload }) => {
      state.cards[payload] = {...state.cards[payload], hidden: !state.cards[payload].hidden};
    },
    updateTagsinCards: (state, { payload }) => {
      state.cards = Object.keys(state.cards).reduce((obj, i) => {

        const updatedTags = Object.keys(payload[0]).reduce((obj, tag) => {
          if (state.cards[i].tags[tag] !== undefined) return {...obj, [payload[0][tag]]: state.cards[i].tags[tag]}
          else return {...obj, [payload[0][tag]]: payload[1][payload[0][tag]]}
        }, {});

        const updatedCategories = state.cards[i].categories.reduce((arr, category) => {
          if (payload[2][category]) return [...arr, payload[2][category]];
          else return arr;
        }, []);

        return {...obj, [i]: {...state.cards[i], tags: updatedTags, categories: updatedCategories}};
      }, {});
    },

    openCardTemplate: (state, { payload }) => {
      state.cardTemplateOpened = true;
      state.cardTemplateMode = payload[0];
      state.editedCard = payload[1];
    },
    closeCardTemplate: state => {
      state.cardTemplateOpened = false;
    },

    toggleShowHidden: state => {
      state.showHidden = !state.showHidden;
    },
  }
});

export const { getCards, getCardsSuccess, getCardsFailure, addCard, changeCard, openCardTemplate, closeCardTemplate, updateTagsinCards, deleteCard, toggleShowHidden, toggleCardVisibility } = cardsSlice.actions;

export const cardsSelector = state => state.cards;

export default cardsSlice.reducer;