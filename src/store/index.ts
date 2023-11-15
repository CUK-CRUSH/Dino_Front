import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@reducer/counter";
import uiReducer from "@reducer/uiSlice";
import imageReducer from "@reducer/imageSlice";
import musicadd from "@reducer/musicadd";
import userProfileReducer from "@reducer/userProfileSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ui: uiReducer,
    image: imageReducer,
    musicAdd: musicadd,
    userProfile: userProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
