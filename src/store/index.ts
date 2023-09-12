import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@reducer/counter";
import uiReducer from "@reducer/uiSlice";
import boxDataReducer from "@reducer/boxData";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ui: uiReducer,
    boxData: boxDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
