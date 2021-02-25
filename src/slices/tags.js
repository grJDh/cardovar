import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  tags: {
    "Age": "",
    "Gender": "",
    "Race": "",
    "Home": "",
    "Organisation": "",
  },
  boolTags: {
    "Major": false,
    "Alive": true
  },

  tagListOpened: false,
}

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, { payload }) => {
      state[[payload[0]]] = {...state[[payload[0]]], [payload[1]]: payload[2]};
    },
    updateTags: (state, { payload }) => {
      state.tags = payload[0];
      state.boolTags = payload[1];
    },

    openTagList: (state) => {
      state.tagListOpened = true;
    },
    closeTagList: (state) => {
      state.tagListOpened = false;
    },
  }
});

export const { addTag, openTagList, closeTagList, updateTags } = tagsSlice.actions;

export const tagsSelector = state => state.tags;

export default tagsSlice.reducer;