import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isMajor: false,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleMajor: (state, { payload }) => {
      state.isMajor = payload;
    },
  }
});

export const { toggleMajor } = filtersSlice.actions;

export const filtersSelector = state => state.filters;

export default filtersSlice.reducer;