import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  tags: [],

  tagListOpened: false,
}

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setFetchedTags: (state, { payload }) => {
      state.tags = payload;
    },

    openTagList: (state) => {
      state.tagListOpened = true;
    },
    closeTagList: (state) => {
      state.tagListOpened = false;
    },
  }
});

export const { setFetchedTags, openTagList, closeTagList } = tagsSlice.actions;

export const tagsSelector = state => state.tags;

export default tagsSlice.reducer;