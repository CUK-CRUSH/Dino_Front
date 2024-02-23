import { createSlice } from "@reduxjs/toolkit";

const editMusicListToggle = createSlice({
  name: "editMusics",
  initialState: {
    isEditMusics: false,
  },
  reducers: {
    setIsEditMusics: (state, action) => {
      state.isEditMusics = action.payload;
    },
  },
});

export const { setIsEditMusics } = editMusicListToggle.actions;

export default editMusicListToggle.reducer;
