import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "@reducer/counter";
import uiReducer from "@reducer/uiSlice";
import imageReducer from "@reducer/imageSlice";
import musicadd from "@reducer/musicadd";
import userProfileReducer from "@reducer/Admin/userProfileSlice";
import isEdit from "@reducer/editPlayList/isEdit";
import addMusicInformationToggle from "@reducer/toggle/addMusicToggle";
import setProfile from "@reducer/setProfile/setProfile";
import editMusicListToggle from "@reducer/editMusic/editMusic";
import toast from "../reducer/Toast/toast";
import selectedFileReducer from "@reducer/editPlayList/Image/isImageCompress";
import userIdReducer from "@reducer/Admin/userId";
import labelsReducer from "@reducer/AddMusic/labelSlice";

const persistConfig = {
  key: "editMusicsToggle",
  storage,
};

const persistedReducer = persistReducer(persistConfig, editMusicListToggle);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ui: uiReducer,
    image: imageReducer,
    musicAdd: musicadd,
    userProfile: userProfileReducer,
    editPlaylistToggle: isEdit,
    addMusicInformationToggle: addMusicInformationToggle,
    setProfile: setProfile,
    editMusicsToggle: persistedReducer,
    toast: toast,
    selectedFile: selectedFileReducer,
    userId: userIdReducer,
    labels: labelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
