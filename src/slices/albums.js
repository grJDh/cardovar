import { createSlice } from '@reduxjs/toolkit';

export const fetchAlbums = () => {
  return async dispatch => {
    dispatch(getAlbums());

    try {
      const response = await fetch('https://api.npoint.io/990df4a9d4e3b3e82709');
      const data = await response.json();

      dispatch(getAlbumsSuccess(data));
    } catch (error) {
      dispatch(getAlbumsFailure());
    }
  }
}

export const initialState = {
  albums: {},
  
  albumsLoading: false,
  albumsHasErrors: false,

  albumTemplateOpened: false,
  albumTemplateMode: "new",
  editedAlbum: "",

  showHidden: false,
}

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    getAlbums: state => {
      state.albumsLoading = true;
    },
    getAlbumsSuccess: (state, { payload }) => {
      state.albums = payload
      state.albumsLoading = false
      state.albumsHasErrors = false
    },
    getAlbumsFailure: state => {
      state.albumsLoading = false
      state.albumsHasErrors = true
    },

    openAlbumTemplate: (state, { payload }) => {
      state.albumTemplateOpened = true;
      state.albumTemplateMode = payload[0];
      state.editedAlbum = payload[1];
    },
    closeAlbumTemplate: state => {
      state.albumTemplateOpened = false;
    },

    addAlbum: (state, { payload }) => {
      state.albums = {...state.albums, [Object.keys(state.albums).length]: payload};
    },
    changeAlbum: (state, { payload }) => {
      state.albums = {...state.albums, [state.editedAlbum]: payload};
    },
    deleteAlbum: (state, { payload }) => {
      state.albumTemplateMode = "new";
      const { [payload]: temp, ...newAlbums } = state.albums;
      state.albums = newAlbums;
    },
    duplicateAlbum: (state, { payload }) => {
      state.albums = {...state.albums, [Object.keys(state.albums).length]: state.albums[payload]};
    },
    toggleAlbumVisibility: (state, { payload }) => {
      state.albums[payload] = {...state.albums[payload], hidden: !state.albums[payload].hidden};
    },

    toggleShowHidden: state => {
      state.showHidden = !state.showHidden;
    },
  }
});

export const { getAlbums, getAlbumsSuccess, getAlbumsFailure, openAlbumTemplate, closeAlbumTemplate, addAlbum, changeAlbum,
               deleteAlbum, duplicateAlbum, toggleAlbumVisibility, toggleShowHidden } = albumsSlice.actions;

export const albumsSelector = state => state.albums;

export default albumsSlice.reducer;