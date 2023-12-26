import React from "react";
import loadable from "@loadable/component";
import { Route, Routes } from "react-router-dom";
import Layout from "@components/Layout/layout";

import AdminEditPage from "@pages/Admin/AdminEditPage";
const Home = loadable(() => import("@pages/Home/home"));
const LogIn = loadable(() => import("@pages/LogIn/login"));

const SignUp = loadable(() => import("@pages/SignUp"));
const Admin = loadable(() => import("@pages/Admin/AdminPage"));
const EditPlayList = loadable(() => import("@pages/Editlist/EditPlaylist"));
const Validation = loadable(() => import("@pages/Validation/validation"));

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/edit" element={<AdminEditPage />} />
        <Route path="/admin/:id" element={<EditPlayList />} />
          <Route path="/login/validation" element={<Validation />} />
      </Routes>
    </Layout>
  );
}

export default App;
