import loadable from "@loadable/component";
import { Route, Routes } from "react-router-dom";
import Layout from "@components/Layout/layout";

const Home = loadable(() => import("@pages/Home/home"));
const LogIn = loadable(() => import("@pages/LogIn/login"));
const SetProfile = loadable(() => import("@pages/SetProfile/SetProfile"));
const Admin = loadable(() => import("@pages/Admin/Admin"));
const EditPlayList = loadable(() => import("@pages/Editlist/editPlaylist"));
const Validation = loadable(() => import("@pages/Validation/validation"));
const AddMusic = loadable(() => import("@pages/AddMusic/addMusic"));
const EditMusic = loadable(() => import("@pages/EditMusic/EditMusics"));
const Redirect = loadable(() => import("@pages/Redirect/Redirect"));

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/SetProfile/:username/:step" element={<SetProfile />} />
        <Route path="/:username/admin" element={<Admin />} />
        <Route path="/:username/admin/:playlistId" element={<EditPlayList />} />
        <Route path="/login/validation" element={<Validation />} />
        <Route
          path="/:username/admin/:playlistId/edit"
          element={<AddMusic />}
        />
        <Route
          path="/:username/admin/:playlistId/edit/:musicId"
          element={<EditMusic />}
        />
        <Route path="/redirect" element={<Redirect />} />
      </Routes>
    </Layout>
  );
}

export default App;
