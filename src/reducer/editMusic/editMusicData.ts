import { createSlice } from "@reduxjs/toolkit";

const MusicDataReducer = createSlice({
  name: "editMusics",
  initialState: {
    editTitle: "",
    editArtist: "",
    editUrl: "",
  },
  reducers: {
    setMusicData: (state, action) => {
      state.editTitle = action.payload.title;
      state.editArtist = action.payload.artist;
      state.editUrl = action.payload.url;
    },
    updateMusicTitle: (state, action) => {
      state.editTitle = action.payload;
    },
    updateMusicArtist: (state, action) => {
      state.editArtist = action.payload;
    },
    updateMusicUrl: (state, action) => {
      state.editUrl = action.payload;
    },
  },
});

export const {
  setMusicData,
  updateMusicTitle,
  updateMusicArtist,
  updateMusicUrl,
} = MusicDataReducer.actions;

export default MusicDataReducer.reducer;
