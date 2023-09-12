import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoxData {
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  input5: string;
  input6: string;
}

const initialState: BoxData[] = [
  { input1: "", input2: "", input3: "", input4: "", input5: "", input6: "" },
  { input1: "", input2: "", input3: "", input4: "", input5: "", input6: "" },
  { input1: "", input2: "", input3: "", input4: "", input5: "", input6: "" },
  { input1: "", input2: "", input3: "", input4: "", input5: "", input6: "" },
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
