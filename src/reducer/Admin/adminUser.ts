import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPlayList } from "@api/playlist-controller/playlistControl";  // API 호출 함수
import { getMemberDTO } from "types/Admin";
import { AppDispatch, RootState } from "@store/index";


export const fetchUserData = createAsyncThunk<
  getMemberDTO[],
  string | undefined,
  { dispatch: AppDispatch; state: RootState }
>(
  'userData/fetchUserData',
  async (username, { getState }) => {
    const { lastFetch } = (getState() as RootState).adminUser;
    const now = Date.now();
    // 마지막으로 데이터를 가져온 시간이 10분 이내라면 API를 호출하지 않음

    if (lastFetch && now - lastFetch < 600000) {
      return;
    }
    const response = await getPlayList(username);
    if (!response.data) {
      throw new Error("API Response is missing data field");
    }

    return response.data;
  }
);


export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    userData: [] as getMemberDTO[],
    lastFetch: null as number | null,  // 새로 추가
    status: "idle",
    error: null as string | null,

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "idle";
        state.userData = action.payload;
        state.lastFetch = Date.now();
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || null;
      });
  },

});

export default userDataSlice.reducer;