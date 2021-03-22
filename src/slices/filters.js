import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  sidebarOpened: false,

  tagFilterOpened: false,
  tagFilterIncludeArray: [],
  tagFilterExcludeArray: [],

  searchFilterValue: "",

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

    openTagFilters: state => {
      state.tagFilterOpened = true;
    },
    closeTagFilters: state => {
      state.tagFilterOpened = false;
    },

    updateTagFilterArrays: (state, { payload }) => {
      state.tagFilterIncludeArray = payload[0];
      state.tagFilterExcludeArray = payload[1];
    },

    changeSearchField: (state, { payload }) => {
      state.searchFilterValue = payload;
    },
    resetSearchField: state => {
      state.searchFilterValue = "";
    },

    setSorting: (state, { payload }) => {
      state.sorting = payload;
    },

    setSearchIn: (state, { payload }) => {
      state.searchIn = payload;
    },
  }
});

export const { toggleSidebar, openTagFilters, closeTagFilters, updateTagFilterArrays,
               changeSearchField, resetSearchField, setSorting, setSearchIn } = filtersSlice.actions;

export const filtersSelector = state => state.filters;

export default filtersSlice.reducer;