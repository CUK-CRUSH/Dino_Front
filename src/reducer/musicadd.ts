import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  artist: "",
  url: "",
};

const musicAddSlice = createSlice({
  name: "musicAdd",
  initialState,
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateArtist: (state, action) => {
      state.artist = action.payload;
    },
    updateURL: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const { updateTitle, updateArtist, updateURL } = musicAddSlice.actions;
export default musicAddSlice.reducer;

// 1. title, artist, url을 db로 던진다.
// 2. db에서 최대 9개까지만 저장하도록 할거임. 넘어가면(length>9) + 버튼을 안보이게 막는다.
// 3. addMusic 컴포넌트에서는 db에서 get 데이터를 가져다가 쓴다.
// 4. 여기서 redux를 어떻게 써야할까?
// 5. 굳이 필요한가? 공부를 더 해보고 필요없으면 addmusic에 reducer를 rollback하자.(아마 필요없을거같음. 로그인이 있기땜시)
