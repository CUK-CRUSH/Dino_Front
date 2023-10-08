import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { title: "", artist: "", url: "" },
  { title: "", artist: "", url: "" },
  { title: "", artist: "", url: "" },
  { title: "", artist: "", url: "" },
];

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    updateGridData: (state, action) => {
      const { index, title, artist, url } = action.payload;
      state[index] = { title, artist, url };
    },
  },
});

export const { updateGridData } = gridSlice.actions;
export default gridSlice.reducer;
