import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {
    selectedImage: null,
  },
  reducers: {
    selectImage: (state, action) => {
      state.selectedImage = action.payload;
    },
  },
});

export const { selectImage } = imageSlice.actions;

export default imageSlice.reducer;
