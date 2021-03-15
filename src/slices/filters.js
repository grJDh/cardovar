import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  sidebarOpened: false,

  tagFilterArray: [],

  searchFilterValue: '',

  sorting: "title",

  searchIn: "title",
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleSidebar: state => {
      state.sidebarOpened = !state.sidebarOpened;
    },

    toggleTagFilter: (state, { payload }) => {
      const id = state.tagFilterArray.indexOf(payload);
      if (id === -1) state.tagFilterArray = [...state.tagFilterArray, payload]
      else state.tagFilterArray = state.tagFilterArray.filter(category => category !== payload);
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

export const { toggleSidebar, toggleTagFilter, changeSearchField, setSorting, setSearchIn } = filtersSlice.actions;

export const filtersSelector = state => state.filters;

export default filtersSlice.reducer;