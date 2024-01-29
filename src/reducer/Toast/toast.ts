// toast.ts

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toast : ''
};

const toast = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.toast = action.payload;
    },
  },
});

export const { setToast } = toast.actions;

export default toast.reducer;
