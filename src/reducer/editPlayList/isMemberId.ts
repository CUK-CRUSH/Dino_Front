import { createSlice } from "@reduxjs/toolkit";

const memberIdSlice = createSlice({
  name: "memberId",
  initialState: -1,
  reducers: {
    setMemberId: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMemberId } = memberIdSlice.actions;

export default memberIdSlice.reducer;
