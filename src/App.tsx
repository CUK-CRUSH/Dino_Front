import loadable from "@loadable/component";
import { Route, Routes } from "react-router-dom";
import Layout from "@components/Layout/layout";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@store/index";
import "./styles/font.css";
import { RecoilRoot } from "recoil";
import PrivateRoute from '@components/PrivateRouter/PrivateRouter';
import RankingMember from "@pages/Ranking/RankingMember";
import usePageNavigationTracker from "@hooks/usePageNavigationTracker/usePageNavigationTracker.tsx/usePageNavigationTracker";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Loading = loadable(() => import("@pages/Loading/Loading"));
const Welcome = loadable(() => import("@pages/Welcome/Welcome"));
const LogIn = loadable(() => import("@pages/LogIn/login"));
const SetProfile = loadable(() => import("@pages/SetProfile/SetProfile"));
const Admin = loadable(() => import("@pages/Admin/Admin"));
const EditPlayList = loadable(() => import("@pages/Editlist/editPlaylist"));
const Validation = loadable(() => import("@pages/Validation/validation"));
const AddMusic = loadable(() => import("@pages/AddMusic/addMusic"));
const EditMusic = loadable(() => import("@pages/EditMusic/EditMusics"));
const Redirect = loadable(() => import("@pages/Redirect/Redirect"));
const Like = loadable(() => import("@pages/Likes/Like"));
const Search = loadable(() => import("@pages/Search/Search"));
const SearchPlaylistDetail = loadable(
  () => import("@pages/Search/SearchPlaylistDetail")
);
const SearchMemberDetail = loadable(
  () => import("@pages/Search/SearchMemberDetail")
);
const RankingPlaylist = loadable(
  () => import("@pages/Ranking/RankingPlaylist")
)
const Favorites = loadable(() => import("@pages/Favorites/Favorites"));

const Environment = loadable(() => import("@pages/Environment/Environment"));
const Prepare = loadable(() => import("@utils/Preparation"));
const NotFound = loadable(() => import("@pages/NotFound/NotFonud"));
const Unsign = loadable(() => import("@pages/Unsign/Unsign"));
const Visitor = loadable(() => import("@pages/Visit/VisitPage"));

function App() {
  usePageNavigationTracker();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
              
              position="bottom-center"
              // autoClose: 토스트가 자동으로 닫히는 시간(ms 단위), false로 설정하면 자동 닫힘 비활성화
              autoClose={3000}
              // limit: 한 번에 표시할 수 있는 토스트의 최대 개수
              limit={1}
              // hideProgressBar: 토스트 로딩 바 숨김 여부
              hideProgressBar={true}
              // newestOnTop: 새로운 토스트를 위에 표시할지 여부
              newestOnTop={false}
              // closeOnClick: 토스트 클릭 시 닫을지 여부
              closeOnClick
              // rtl: 텍스트 방향이 오른쪽에서 왼쪽으로 (Right To Left)인지 여부
              rtl={false}
              // pauseOnFocusLoss: 포커스를 잃었을 때 토스트 타이머 일시 정지 여부
              pauseOnFocusLoss
              // draggable: 토스트를 드래그하여 닫을 수 있는지 여부
              draggable
              // pauseOnHover: 마우스 호버 시 토스트 타이머 일시 정지 여부
              pauseOnHover
              // closeButton: "닫기" 버튼 표시 여부, false로 설정하면 닫기 버튼 숨김
              closeButton={false}
            />
        <RecoilRoot>
       

          <Layout>
            
            <Routes>

              <Route path="/" element={<Loading />} />

              <Route path="/welcome" element={<Welcome />} />
              <Route path="/login" element={<LogIn />} />

              {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
              <Route element={<PrivateRoute authentication={true} />}>
                <Route path="/SetProfile/:username/:step" element={<SetProfile />} />
              </Route>

              <Route path="user/:username" element={<Admin />} />

              <Route
                path="user/:username/:playlistId"
                element={<EditPlayList />}
              />
              {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
              <Route element={<PrivateRoute authentication={true} />}>
                <Route path="/login/validation" element={<Validation />} />
              </Route>

              <Route
                path="user/:username/:playlistId/edit"
                element={<AddMusic />}
              />
              <Route
                path="user/:username/:playlistId/edit/:musicId"
                element={<EditMusic />}
              />
              <Route
                path="user/:username/:playlistId/like"
                element={<Like />}
              />

              <Route
                path="user/:username/:playlistId/visitor"
                element={<Visitor />}
              />

              <Route element={<PrivateRoute authentication={true} />}>
                <Route path="/env" element={<Environment />} />
              </Route>

              <Route element={<PrivateRoute authentication={true} />}>
                <Route path="/env/unsign" element={<Unsign />} />
              </Route>

              <Route element={<PrivateRoute authentication={true} />}>
                <Route path="/env/favorites" element={<Favorites />} />
              </Route>

              <Route path="/redirect" element={<Redirect />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/search/playlist"
                element={<SearchPlaylistDetail />}
              />
              <Route
                path="/ranking/playlist"
                element={<RankingPlaylist />}
              />
              <Route
                path="/ranking/member"
                element={<RankingMember />}
              />
              <Route path="/search/member" element={<SearchMemberDetail />} />

              <Route path="/unprepared" element={<Prepare />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </RecoilRoot>
      </PersistGate>
    </Provider>
  );
}

export default App;