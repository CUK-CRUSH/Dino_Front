// userProfileSlice.ts

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileBackgroundImage : null,
  username: '',
  introduction: '',
  profileImage: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setProfileBackgroundImage : (state, action) => {
      state.profileBackgroundImage = action.payload;
    },
      setProfileUsername: (state, action) => {
        state.username = action.payload;
      },
      setProfileIntroduction : (state, action) =>{
        state.introduction = action.payload
      },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

export const { setProfileBackgroundImage, setProfileUsername, setProfileIntroduction, setProfileImage } = userProfileSlice.actions;

export default userProfileSlice.reducer;
