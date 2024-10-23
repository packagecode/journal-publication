import PrivateRoutes from "@/components/PrivateRoute/PrivateRoute";
import RoleWiseLayout from "@/components/RoleWiseLayout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Profile from "@/pages/dashboard/profile";
import Authors from "@/pages/editor/users/authors";
import Editors from "@/pages/editor/users/editors";
import Reviewers from "@/pages/editor/users/reviewers";
import NotFound from "@/pages/error/error404";
import GlobalDashboardManager from "@/pages/layouts/dashboard";
import PublicLayout from "@/pages/layouts/public";
import MenuScriptCreate from "@/pages/menuScript/create";
import IncompleteSubmission from "@/pages/menuScript/incomplete";
import RequestForReview from "@/pages/menuScript/requestForReview";
import SubmissionNeedingRevision from "@/pages/menuScript/revision/submissionNeedingRevision";
import WaitingForRevision from "@/pages/menuScript/revision/waitingForRevision";
import SubmissionsProcessed from "@/pages/menuScript/submissionProcessed";
import About from "@/pages/public/about";
import AuthorInstruction from "@/pages/public/authorInstruction";
import Contact from "@/pages/public/contact";
import HomePage from "@/pages/public/index";
import { Navigate, Route, Routes } from "react-router-dom";
import { BASE_URL } from "../main";
import App from "../pages/App";

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
            <Route path="dashboard" element={<GlobalDashboardManager />} />
            <Route path="profile" element={<Profile />} />
            <Route path="manu-script">
              <Route path="create" element={<MenuScriptCreate />} />
              <Route path="submission-incomplete" element={<IncompleteSubmission />} />
              <Route path="submission-processed" element={<SubmissionsProcessed />} />
              <Route path="submission-needing-revision" element={<SubmissionNeedingRevision />} />
              <Route path="request-for-review" element={<RequestForReview />} />
              <Route path="waiting-for-revision" element={<WaitingForRevision />} />
            </Route>
            <Route path="reviewers" element={<Reviewers />} />
            <Route path="authors" element={<Authors />} />
            <Route path="editors" element={<Editors />} />
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
