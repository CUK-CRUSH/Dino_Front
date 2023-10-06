import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@reducer/counter";
import uiReducer from "@reducer/uiSlice";
// import modalDataReducer from "@reducer/modalData";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ui: uiReducer,
    // modalData: modalDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
