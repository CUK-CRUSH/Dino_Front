// userProfileSlice.ts

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toast : ''
};

const userProfileSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.toast = action.payload;
    },
  },
});

export const { setToast } = userProfileSlice.actions;

export default userProfileSlice.reducer;
