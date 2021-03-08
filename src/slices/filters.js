import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  categoriesFilterArray: [],

  searchFilterValue: '',

  sorting: "title",

  searchIn: "title",
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleCategoryFilter: (state, { payload }) => {
      const id = state.categoriesFilterArray.indexOf(payload);
      if (id === -1) state.categoriesFilterArray = [...state.categoriesFilterArray, payload]
      else state.categoriesFilterArray = state.categoriesFilterArray.filter(category => category !== payload);
    },

    changeSearchField: (state, { payload }) => {
      state.searchFilterValue = payload;
    },

    setSorting: (state, { payload }) => {
      state.sorting = payload;
    },

    setSearchIn: (state, { payload }) => {
      state.searchIn = payload;
    },
  }
});

export const { toggleCategoryFilter, changeSearchField, setSorting, setSearchIn } = filtersSlice.actions;

export const filtersSelector = state => state.filters;

export default filtersSlice.reducer;