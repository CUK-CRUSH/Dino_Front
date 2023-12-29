import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  artist: "",
  url: "",
};

const musicAddSlice = createSlice({
  name: "musicAdd",
  initialState,
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateArtist: (state, action) => {
      state.artist = action.payload;
    },
    updateURL: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const { updateTitle, updateArtist, updateURL } = musicAddSlice.actions;
export default musicAddSlice.reducer;
