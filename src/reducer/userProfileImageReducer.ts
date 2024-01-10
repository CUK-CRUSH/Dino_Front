// userProfileImageReducer.ts
// 필요없는 파일로 생각...

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
