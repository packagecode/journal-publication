import { Fragment } from "react";
import UserLists from "./userlist";

const Authors = () => {
  return (
    <Fragment>
      <UserLists listForRole="author" />
    </Fragment>
  );
};

export default Authors;
