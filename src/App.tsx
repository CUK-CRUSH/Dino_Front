import loadable from "@loadable/component";
import { Route, Routes } from "react-router-dom";
import Layout from "@components/Layout/layout";
import AdminEditPage from "@pages/Admin/AdminEditPage";
const Home = loadable(() => import("@pages/Home/home"));
const LogIn = loadable(() => import("@pages/LogIn/login"));
const Admin = loadable(() => import("@pages/Admin/AdminPage"));
const EditPlayList = loadable(() => import("@pages/Editlist/editPlaylist"));
const AddMusic = loadable(() => import("@pages/AddMusic/addMusic"));
const Validation = loadable(() => import("@pages/Validation/validation"));

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/edit" element={<AdminEditPage />} />
        <Route path="/admin/:id" element={<EditPlayList />} />
        <Route path="/admin/:id/edit" element={<AddMusic />} />

        <Route path="/login/validation" element={<Validation />} />
      </Routes>
    </Layout>
  );
}

export default App;
