import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileImageLoader: false,
  profileBackgroundImageLoader: false,
  
};

const setProfile = createSlice({
  name: "imageLoader",
  initialState,
  reducers: {
    setProfileImageLoader: (state, action) => {
      state.profileImageLoader = action.payload
    },
    setProfileBackgroundImageLoader: (state, action) => {
      state.profileBackgroundImageLoader = action.payload
    },
  }
})

export const { setProfileImageLoader, setProfileBackgroundImageLoader } = setProfile.actions;
export default setProfile.reducer;
