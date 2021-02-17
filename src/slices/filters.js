import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  boolFilters: {},

  searchFilterValue: '',

  sorting: "",
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    createBooleanFilters: (state, { payload }) => {
      state.boolFilters = payload;
    },

    toggleFilter: (state, { payload }) => {
      state.boolFilters[payload] = !state.boolFilters[payload];
    },

    changeSearchField: (state, { payload }) => {
      state.searchFilterValue = payload;
    },
  }
});

export const { createBooleanFilters, toggleFilter, changeSearchField } = filtersSlice.actions;

export const filtersSelector = state => state.filters;

export default filtersSlice.reducer;