import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  artist: "",
  url: "",
  image: null,
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
    updateImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { updateTitle, updateArtist, updateURL, updateImage } =
  musicAddSlice.actions;
export default musicAddSlice.reducer;
