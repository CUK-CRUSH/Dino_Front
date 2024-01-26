import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@reducer/counter";
import uiReducer from "@reducer/uiSlice";
import imageReducer from "@reducer/imageSlice";
import musicadd from "@reducer/musicadd";
import userProfileReducer from "@reducer/Admin/userProfileSlice";
import isEdit from "@reducer/editPlayList/isEdit";
import addMusicInformationToggle from "@reducer/toggle/addMusicToggle";
import playlistReducer from "@reducer/editPlayList/setPlaylist";
import setProfile from "@reducer/setProfile/setProfile";
import editMusicListToggle from "@reducer/editMusic/editMusic";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ui: uiReducer,
    image: imageReducer,
    musicAdd: musicadd,
    userProfile: userProfileReducer,
    editPlaylistToggle: isEdit,
    addMusicInformationToggle: addMusicInformationToggle,
    playlist: playlistReducer,
    setProfile: setProfile,
    editMusicsToggle: editMusicListToggle,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
