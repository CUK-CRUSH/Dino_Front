import { createSlice } from "@reduxjs/toolkit";

const LikeToggle = createSlice({
  name: "likeToggle",
  initialState: {
    isLikeToggle: false,
  },
  reducers: {
    setIsLikeToggle: (state, action) => {
      state.isLikeToggle = action.payload;
    },
  },
});

export const { setIsLikeToggle } = LikeToggle.actions;

export default LikeToggle.reducer;
