// userProfileSlice.ts

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userBackgroundImage : null,
  username: "Your Username",
  introText: "Welcome to the Admin Page!",
  userProfileImage: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserBackgroundImage : (state, action) => {
      state.userBackgroundImage = action.payload.userBackgroundImage;
    },
    updateProfile: (state, action) => {
      state.username = action.payload.username;
      state.introText = action.payload.introText;
    },
    setUserProfileImage: (state, action) => {
      state.userProfileImage = action.payload.userProfileImage;
    },
  },
});

export const { setUserBackgroundImage, updateProfile, setUserProfileImage } = userProfileSlice.actions;

export default userProfileSlice.reducer;
