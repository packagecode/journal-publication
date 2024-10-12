import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Users = () => {
  const [type, setType] = useState<string>("reviewer");
  const { state } = useLocation();
  useEffect(() => {
    if (state) {
      setType(state.userType);
    }
  }, [state]);
  return (
    <div>
      <h1>Users {type}</h1>
    </div>
  );
};

export default Users;
