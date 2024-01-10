// userProfileSlice.ts

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfileBackgroundImage : null,
  username: "Username",
  introText: "Welcome to the Admin Page!",
  userProfileImage: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfileBackgroundImage : (state, action) => {
      state.userProfileBackgroundImage = action.payload;
    },
    updateProfile: (state, action) => {
      state.username = action.payload.username;
      state.introText = action.payload.introText;
    },
    setUserProfileImage: (state, action) => {
      state.userProfileImage = action.payload;
    },
  },
});

export const { setUserProfileBackgroundImage, updateProfile, setUserProfileImage } = userProfileSlice.actions;

export default userProfileSlice.reducer;
