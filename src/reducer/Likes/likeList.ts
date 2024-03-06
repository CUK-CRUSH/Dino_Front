import { getLikeList } from "@api/playlist-controller/playlistControl";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@store/index";

interface FetchLikeListDTO {
  playlistId: number;
  page: number;
}

interface LikeListUser {
  id: number;
  username: string;
  introduction: string;
  profileImageUrl: string;
}

export const fetchLikeList = createAsyncThunk<
  LikeListUser[],
  FetchLikeListDTO,
  { dispatch: AppDispatch; state: RootState }
>("likeList/fetchLikeList", async ({ playlistId, page }) => {
  const response = await getLikeList(playlistId, page);

  if (!response.data) {
    throw new Error("API Response is missing data field");
  }

  return response.data;
});

export const likeListSlice = createSlice({
  name: "likeList",
  initialState: {
    likeList: [] as LikeListUser[],
    currentPage: 0,
    isLast: false,
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikeList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLikeList.fulfilled, (state, action) => {
        state.status = "idle";
        // Add any fetched posts to the array
        state.likeList = state.likeList.concat(action.payload);
        state.currentPage += 1;
        state.isLast = action.payload.length < 15;
      })
      .addCase(fetchLikeList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || null;
      });
  },
});

export default likeListSlice.reducer;
