import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isMajor: false,
  isDead: true,

  searchFilterValue: '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleMajor: (state, { payload }) => {
      state.isMajor = payload;
    },
    toggleDead: (state, { payload }) => {
      state.isDead = payload;
    },

    changeSearchField: (state, { payload }) => {
      state.searchFilterValue = payload;
    },
  }
});

export const { toggleMajor, toggleDead, changeSearchField } = filtersSlice.actions;

export const filtersSelector = state => state.filters;

export default filtersSlice.reducer;