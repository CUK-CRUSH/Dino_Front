import { createSlice } from "@reduxjs/toolkit";

const userIdReducer = createSlice({
  name: "userId",
  initialState: {
    value: 0,
  },
  reducers: {
    setUserId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserId } = userIdReducer.actions;

export default userIdReducer.reducer;
