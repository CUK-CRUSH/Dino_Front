import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileImage: undefined,
  profileBackgroundImage: undefined,
  profileIntroduction: '',
};

const setProfile = createSlice({
  name: "setProfile",
  initialState,
  reducers: {
    setProfileImage: (state, action) => {
      state.profileImage = action.payload
    },
    setProfileBackgroundImage: (state, action) => {
      state.profileBackgroundImage = action.payload
    },
    setProfileIntroduction: (state, action) => {
      state.profileIntroduction = action.payload
    },
  }
})

export const { setProfileImage, setProfileBackgroundImage, setProfileIntroduction } = setProfile.actions;
export default setProfile.reducer;
