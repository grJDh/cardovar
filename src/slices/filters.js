import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isMajor: false,
  isDead: true,
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
  }
});

export const { toggleMajor, toggleDead } = filtersSlice.actions;

export const filtersSelector = state => state.filters;

export default filtersSlice.reducer;