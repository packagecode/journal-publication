import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Dashboard from "@/pages/layouts/dashboard";
import PublicLayout from "@/pages/layouts/public";
import About from "@/pages/public/about";
import AuthorInstruction from "@/pages/public/authorInstruction";
import Contact from "@/pages/public/contact";
import HomePage from "@/pages/public/index";
import Profile from "@/pages/public/user/profile";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutes from "../components/PrivateRoute/PrivateRoute";
import { BASE_URL } from "../main";
import App from "../pages/App";
import NotFound from "../pages/error/error404";

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
          <Route path="" element={<Dashboard />}>
            <Route path="dashboard" element={<Profile />}></Route>
          </Route>
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
