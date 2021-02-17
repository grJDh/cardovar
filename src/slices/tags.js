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

  tagTemplateOpened: false,
  tagTemplateMode: "new",
  editedTag: "",
}

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, { payload }) => {
      state[[payload[0]]] = {...state[[payload[0]]], [payload[1]]: payload[2]};
    },

    openTagTemplate: (state, { payload }) => {
      state.tagTemplateOpened = true;
      state.tagTemplateMode = payload[0];
      state.editedTag = payload[1];
    },
    closeTagTemplate: (state) => {
      state.tagTemplateOpened = false;
    },
  }
});

export const { addTag, openTagTemplate, closeTagTemplate } = tagsSlice.actions;

export const tagsSelector = state => state.tags;

export default tagsSlice.reducer;