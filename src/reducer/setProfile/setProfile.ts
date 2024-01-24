import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileImage: null,
  backgroundImage: null,
  introduction: '',
};

const setProfile = createSlice({
  name: "setProfile",
  initialState,
  reducers: {
    setProfileImage: (state, action) => {
      state.profileImage = action.payload
    },
    setProfileBackgroundImage: (state, action) => {
      state.backgroundImage = action.payload
    },
    setProfileIntroduction: (state, action) => {
      state.introduction = action.payload
    },
  }
})

export const { setProfileImage, setProfileBackgroundImage, setProfileIntroduction } = setProfile.actions;
export default setProfile.reducer;
