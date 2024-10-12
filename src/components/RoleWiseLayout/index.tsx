import useAuthService from "@/hooks/useAuthService";
import AuthorLayouts from "@/pages/author/layouts";
import EditorLayouts from "@/pages/editor/layouts";
import PublisherLayouts from "@/pages/publisher/dahboard";
import React from "react";

interface RoleWiseLayoutProps {}

const RoleWiseLayout: React.FC<RoleWiseLayoutProps> = () => {
  const { currentRole } = useAuthService();
  return currentRole() == "author" ? (
    <AuthorLayouts />
  ) : currentRole() == "editor" ? (
    <EditorLayouts />
  ) : (
    <PublisherLayouts />
  );
};

export default RoleWiseLayout;
