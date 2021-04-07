import { createSlice } from '@reduxjs/toolkit';

export const fetchCards = albumID => {
  return async dispatch => {
    dispatch(getCards());

    try {
      const urlResponse = await fetch("https://api.npoint.io/990df4a9d4e3b3e82709/" + albumID + "/url");
      const url = await urlResponse.json();

      const response = await fetch(url);
      // console.log(response);
      const data = await response.json();

      dispatch(getCardsSuccess(data.cards));
    } catch (error) {
      console.log(error);
      dispatch(getCardsFailure());
    }
  }
}

export const cleanTagsExported = () => {
  return dispatch => {
    dispatch(cleanTags());
  }
}

export const initialState = {
  //cards
  cards: {},

  cardsLoading: false,
  cardsHasErrors: false,

  cardTemplateOpened: false,
  cardTemplateMode: "new",
  editedCard: "",

  selectingMode: false,
  selectedCards: [],

  showHidden: false,

  //tags
  tags: [],

  tagListOpened: false,
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    //cards
    getCards: state => {
      state.cardsLoading = true;
    },
    getCardsSuccess: (state, { payload }) => {
      state.cards = payload
      state.cardsLoading = false;
      state.cardsHasErrors = false;
    },
    getCardsFailure: state => {
      state.cardsLoading = false;
      state.cardsHasErrors = true;
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
      const id = Math.random().toString(16).slice(2);
      state.cards = {...state.cards, [id]: payload};
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
        state.cards = {...state.cards, [key]: {...state.cards[key], tags: [...new Set([...state.cards[key].tags, payload])]}};
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

    //tags
    cleanTags: state => {
      state.tags = [...new Set(Object.keys(state.cards).reduce((arr, key) => {
        return [...arr, ...state.cards[key].tags]
      }, []))].sort();
    },

    openTagList: state => {
      state.tagListOpened = true;
    },
    closeTagList: state => {
      state.tagListOpened = false;
    },
  }
});

export const { getCards, getCardsSuccess, getCardsFailure, addCard, changeCard, openCardTemplate, closeCardTemplate, updateTagsInCards,
               deleteCard, duplicateCard, toggleShowHidden, toggleSelectingMode, toggleCardSelection, massAddTagToCard, massDeleteTagFromCard,
               massDeleteCard, massToggleCardVisibility,
               
              cleanTags, openTagList, closeTagList } = cardsSlice.actions;

export const cardsSelector = state => state.cards;

export default cardsSlice.reducer;