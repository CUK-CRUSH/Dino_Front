// userProfileImageReducer.ts

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfileImage: null,
};

const userProfileImageSlice = createSlice({
  name: "userProfileImage",
  initialState,
  reducers: {
    setUserProfileImage: (state, action) => {
      state.userProfileImage = action.payload;
    },
  },
});

export const { setUserProfileImage } = userProfileImageSlice.actions;

export default userProfileImageSlice.reducer;
