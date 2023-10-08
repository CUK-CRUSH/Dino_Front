// gridSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface GridData {
  boxData: { title: string; artist: string; url: string }[]; // Array of boxes
}

const initialState: GridData[] = [
  {
    boxData: Array(9).fill({ title: "", artist: "", url: "" }), // Initialize with 9 empty boxes
  },
  {
    boxData: Array(9).fill({ title: "", artist: "", url: "" }), // Initialize with 9 empty boxes
  },
  {
    boxData: Array(9).fill({ title: "", artist: "", url: "" }), // Initialize with 9 empty boxes
  },
  {
    boxData: Array(9).fill({ title: "", artist: "", url: "" }), // Initialize with 9 empty boxes
  },
  // ... Initialize other GridData objects similarly
];

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    updateGridData: (
      state,
      action: {
        payload: {
          boxIndex: number;
          dataIndex: number;
          title: string;
          artist: string;
          url: string;
        };
      }
    ) => {
      const { boxIndex, dataIndex, title, artist, url } = action.payload;
      state[boxIndex].boxData[dataIndex] = { title, artist, url };
    },
  },
});

export const { updateGridData } = gridSlice.actions;
export default gridSlice.reducer;
