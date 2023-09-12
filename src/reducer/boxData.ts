import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoxData {
  input1: string;
  input2: string;
}

const initialState: BoxData[] = [
  { input1: "", input2: "" },
  { input1: "", input2: "" },
  { input1: "", input2: "" },
  { input1: "", input2: "" },
];

const boxDataSlice = createSlice({
  name: "boxData",
  initialState,
  reducers: {
    updateBoxData: (
      state: BoxData[],
      action: PayloadAction<{ boxId: number; data: BoxData }>
    ) => {
      const { boxId, data } = action.payload;
      state[boxId] = { ...state[boxId], ...data };
    },
  },
});

export const { updateBoxData } = boxDataSlice.actions;
export default boxDataSlice.reducer;
