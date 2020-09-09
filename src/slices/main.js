import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  modalImageOpened: false,
  modalImageAlt: '',
  modalImageSrc: ''
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    openModalImage: (state, { payload }) => {
      state.modalImageOpened = true;
      state.modalImageAlt = payload.alt;
      state.modalImageSrc = payload.src;
    },
    closeModalImage: (state ) => {
      state.modalImageOpened = false;
    },
  }
});

export const { openModalImage, closeModalImage } = mainSlice.actions;

export const mainSelector = state => state.main;

export default mainSlice.reducer;