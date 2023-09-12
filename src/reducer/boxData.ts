import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoxData {
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  input5: string;
  input6: string;
  input7: string;
  input8: string;
  input9: string;
  input10: string;
  input11: string;
  input12: string;
  input13: string;
  input14: string;
  input15: string;
  input16: string;
  input17: string;
  input18: string;
  input19: string;
}

const initialState: BoxData[] = [
  {
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    input10: "",
    input11: "",
    input12: "",
    input13: "",
    input14: "",
    input15: "",
    input16: "",
    input17: "",
    input18: "",
    input19: "",
  },
  {
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    input10: "",
    input11: "",
    input12: "",
    input13: "",
    input14: "",
    input15: "",
    input16: "",
    input17: "",
    input18: "",
    input19: "",
  },
  {
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    input10: "",
    input11: "",
    input12: "",
    input13: "",
    input14: "",
    input15: "",
    input16: "",
    input17: "",
    input18: "",
    input19: "",
  },
  {
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    input10: "",
    input11: "",
    input12: "",
    input13: "",
    input14: "",
    input15: "",
    input16: "",
    input17: "",
    input18: "",
    input19: "",
  },
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
