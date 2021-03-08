import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  tags: {
    "Age": "",
    "Gender": "",
    "Race": "",
    "Home": "",
    "Organisation": "",
  },
  categories: [
    "Major",
    "Alive",
  ],

  tagListOpened: false,
}

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    updateInfo: (state, { payload }) => {
      state.tags = payload[0];
      state.categories = payload[1];
    },

    openTagList: (state) => {
      state.tagListOpened = true;
    },
    closeTagList: (state) => {
      state.tagListOpened = false;
    },
  }
});

export const { updateInfo, openTagList, closeTagList } = tagsSlice.actions;

export const tagsSelector = state => state.tags;

export default tagsSlice.reducer;