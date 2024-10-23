import { Fragment } from "react";
import UserLists from "./userlist";

const Editors = () => {
  return (
    <Fragment>
      <UserLists listForRole="editor" />
    </Fragment>
  );
};

export default Editors;
