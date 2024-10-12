import useAuthService from "@/hooks/useAuthService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditorDashboard from "../editor/dashboard";
import PublisherDashboard from "../publisher/dahboard";

const GlobalDashboardManager = () => {
  const { currentRole } = useAuthService();
  const navigator = useNavigate();
  useEffect(() => {
    if (currentRole() == "author")
      navigator("/menu-script/submission-processed", { replace: true });
    if (currentRole() == "editor") navigator("/profile", { replace: true });
  }, []);
  return currentRole() == "editor" ? (
    <EditorDashboard />
  ) : (
    <PublisherDashboard />
  );
};

export default GlobalDashboardManager;
