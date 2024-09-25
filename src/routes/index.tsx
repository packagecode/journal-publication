import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import PublicLayout from "@/pages/layouts/public";
import Contact from "@/pages/public/contact";
import HomePage from "@/pages/public/index";
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
        <Route path={`${BASE_URL}contact-us`} element={<Contact />} />
        <Route path={`${BASE_URL}login`} element={<Login />} />
        <Route path={`${BASE_URL}register`} element={<Register />} />
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
