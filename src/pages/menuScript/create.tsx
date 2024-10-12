import useAxiosInstance from "@/hooks/useAxiosInstance";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ScriptForm from "./component/ScriptForm";

const MenuScriptCreate: React.FC = () => {
  const [currentScript, setCurrentScript] = useState<any>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const { axiosInstance, api } = useAxiosInstance();
  const { state } = useLocation();

  const fetchMenuScript = async () => {
    await axiosInstance
      .get(api("manuscripts?status=draft&from=create"))
      .then((response) => {
        const { manuscript } = response.data;
        setCurrentScript(manuscript);
      });
  };

  useEffect(() => {
    if (state) {
      setIsUpdate(true);
      setCurrentScript(state.manuscript);
    } else fetchMenuScript();
  }, [state]);

  return (
    <ScriptForm
      currentScript={currentScript}
      isUpdate={isUpdate}
      onUpdate={(script) => setCurrentScript(script)}
    />
  );
};

export default MenuScriptCreate;
