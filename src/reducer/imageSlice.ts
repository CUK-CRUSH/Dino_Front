// imageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedImage: null,
  userProfileImage: null, // Add userProfileImage property
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    selectImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    selectUserProfileImage: (state, action) => {
      state.userProfileImage = action.payload;
    },
  },
});

export const { selectImage, selectUserProfileImage } = imageSlice.actions;

export default imageSlice.reducer;
