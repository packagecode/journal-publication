import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/manu-script/submission-processed", { replace: true });
  }, []);
  return <></>;
};

export default dashboard;