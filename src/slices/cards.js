import { createSlice } from '@reduxjs/toolkit';
import { setFetchedTags } from './tags';

export const fetchCards = () => {
  return async dispatch => {
    dispatch(getCards());

    try {
      const response = await fetch('https://api.npoint.io/6092f6f51e0ff89498be');
      const data = await response.json();

      dispatch(getCardsSuccess(data.cards));
      dispatch(setFetchedTags(data.tags));
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

  selectingMode: false,
  selectedCards: [],

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

    openCardTemplate: (state, { payload }) => {
      state.cardTemplateOpened = true;
      state.cardTemplateMode = payload[0];
      state.editedCard = payload[1];
    },
    closeCardTemplate: state => {
      state.cardTemplateOpened = false;
    },

    addCard: (state, { payload }) => {
      state.cards = {...state.cards, [Object.keys(state.cards).length]: payload};
    },
    changeCard: (state, { payload }) => {
      state.cards = {...state.cards, [state.editedCard]: payload};
    },
    deleteCard: (state, { payload }) => {
      state.cardTemplateMode = "new";
      const { [payload]: temp, ...newCards } = state.cards;
      state.cards = newCards;
    },
    duplicateCard: (state, { payload }) => {
      state.cards = {...state.cards, [Object.keys(state.cards).length]: state.cards[payload]};
    },

    toggleShowHidden: state => {
      state.showHidden = !state.showHidden;
    },
    // toggleCardVisibility: (state, { payload }) => {
    //   state.cards[payload] = {...state.cards[payload], hidden: !state.cards[payload].hidden};
    // },

    updateTagsInCards: (state, { payload }) => {
      state.cards = Object.keys(state.cards).reduce((cardsList, currentCard) => {
        
        const oldTags = new Set(state.cards[currentCard].tags);

        const updatedTags = Object.keys(payload).reduce((arr, tag) => {
          if (oldTags.has(tag)) return [...arr, payload[tag]];
          else return arr;
        }, []);

        return {...cardsList, [currentCard]: {...state.cards[currentCard], tags: updatedTags}};
      }, {});
    },

    toggleSelectingMode: state => {
      state.selectedCards = [];
      state.selectingMode = !state.selectingMode;
    },
    toggleCardSelection: (state, { payload }) => {
      const index = state.selectedCards.indexOf(payload);
      if (index === -1) state.selectedCards = [...state.selectedCards, payload];
      else {
        state.selectedCards = [...state.selectedCards.slice(0, index), ...state.selectedCards.slice(index+1)]
      }
    },

    massAddTagToCard: (state, { payload }) => {
      for (const key of state.selectedCards) {
        state.cards = {...state.cards, [key]: {...state.cards[key], tags: [...state.cards[key].tags, payload]}};
      }
    },
    massDeleteTagFromCard: (state, { payload }) => {
      for (const key of state.selectedCards) {
        state.cards = {...state.cards, [key]: {...state.cards[key], tags: state.cards[key].tags.filter(tag => tag !== payload)}};
      }
    },
    massDeleteCard: state => {
      state.cards = Object.keys(state.cards).reduce((obj, key) => {
          if (state.selectedCards.includes(key)) return obj;
          else return {...obj, [key]: state.cards[key]};
        }, {});
    },
    massToggleCardVisibility: state => {
      for (const key of state.selectedCards) {
        state.cards[key] = {...state.cards[key], hidden: !state.cards[key].hidden};
      }
    },
  }
});

export const { getCards, getCardsSuccess, getCardsFailure, addCard, changeCard, openCardTemplate, closeCardTemplate, updateTagsInCards,
               deleteCard, duplicateCard, toggleShowHidden, toggleSelectingMode, toggleCardSelection, massAddTagToCard, massDeleteTagFromCard,
               massDeleteCard, massToggleCardVisibility } = cardsSlice.actions;

export const cardsSelector = state => state.cards;

export default cardsSlice.reducer;