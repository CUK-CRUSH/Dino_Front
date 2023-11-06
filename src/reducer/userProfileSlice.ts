// userProfileSlice.ts

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "Your Username",
  introText: "Welcome to the Admin Page!",
  userProfileImage: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.username = action.payload.username;
      state.introText = action.payload.introText;
    },
    setUserProfileImage: (state, action) => {
      state.userProfileImage = action.payload;
    },
  },
});

export const { updateProfile, setUserProfileImage } = userProfileSlice.actions;

export default userProfileSlice.reducer;
