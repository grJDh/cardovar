import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  modalImageOpened: false,
  modalImageAlt: '',
  modalImageSrc: ''
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModalImage: (state, { payload }) => {
      state.modalImageOpened = true;
      state.modalImageAlt = payload.alt;
      state.modalImageSrc = payload.src;
    },
    closeModalImage: (state) => {
      state.modalImageOpened = false;
      state.modalImageAlt = "";
      state.modalImageSrc = "";
    },
  }
});

export const { openModalImage, closeModalImage } = modalSlice.actions;

export const modalSelector = state => state.modal;

export default modalSlice.reducer;