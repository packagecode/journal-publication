import PrivateRoutes from "@/components/PrivateRoute/PrivateRoute";
import RoleWiseLayout from "@/components/RoleWiseLayout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Profile from "@/pages/author/profile";
import Users from "@/pages/editor/users";
import NotFound from "@/pages/error/error404";
import PublicLayout from "@/pages/layouts/public";
import MenuScriptCreate from "@/pages/menuScript/create";
import IncompleteSubmission from "@/pages/menuScript/incomplete";
import SubmissionsProcessed from "@/pages/menuScript/submissionProcessed";
import About from "@/pages/public/about";
import AuthorInstruction from "@/pages/public/authorInstruction";
import Contact from "@/pages/public/contact";
import HomePage from "@/pages/public/index";
import { Navigate, Route, Routes } from "react-router-dom";
import { BASE_URL } from "../main";
import App from "../pages/App";
import GlobalDashboardManager from "../pages/layouts/dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={BASE_URL} element={<PublicLayout />}>
        <Route path={`${BASE_URL}`} element={<HomePage />} />
        <Route path={`${BASE_URL}about`} element={<About />} />
        <Route
          path={`${BASE_URL}author-instruction`}
          element={<AuthorInstruction />}
        />
        <Route path={`${BASE_URL}contact-us`} element={<Contact />} />
        <Route path={`${BASE_URL}login`} element={<Login />} />
        <Route path={`${BASE_URL}register`} element={<Register />} />
        <Route path={BASE_URL} element={<PrivateRoutes />}>
          <Route path="" element={<RoleWiseLayout />}>
            <Route
              path="dashboard"
              element={<GlobalDashboardManager />}
            ></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route
              path="menu-script/create"
              element={<MenuScriptCreate />}
            ></Route>
            <Route
              path="menu-script/submission-incomplete"
              element={<IncompleteSubmission />}
            ></Route>
            <Route
              path="menu-script/submission-processed"
              element={<SubmissionsProcessed />}
            ></Route>
            <Route path="users" element={<Users />}></Route>
          </Route>
          {/* <Route path="editor" element={<EditorDashboard />}>
            <Route path="dashboard" element={<Profile />}></Route>
          </Route>
          <Route path="publisher" element={<AuthorDashboard />}>
            <Route path="dashboard" element={<Profile />}></Route>
          </Route> */}
        </Route>
      </Route>
      <Route path={BASE_URL} element={<PrivateRoutes />}>
        <Route path="" element={<App />}></Route>
      </Route>
      <Route path={`${BASE_URL}404`} element={<NotFound />} />
      <Route path="*" element={<Navigate to="404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
