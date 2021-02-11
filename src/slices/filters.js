import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  boolFilters: {},

  searchFilterValue: '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    createBooleanFilters: (state, { payload }) => {
      state.boolFilters = payload;
    },

    toggleMajor: (state, { payload }) => {
      state.boolFilters.major = payload;
    },
    toggleDead: (state, { payload }) => {
      state.boolFilters.alive = payload;
    },

    changeSearchField: (state, { payload }) => {
      state.searchFilterValue = payload;
    },
  }
});

export const { createBooleanFilters, toggleMajor, toggleDead, changeSearchField } = filtersSlice.actions;

export const filtersSelector = state => state.filters;

export default filtersSlice.reducer;