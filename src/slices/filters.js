import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
  }
});

export const { } = filtersSlice.actions;

export const filtersSelector = state => state.filters;

export default filtersSlice.reducer;