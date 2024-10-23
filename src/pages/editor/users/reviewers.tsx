import { Fragment } from "react";
import UserLists from "./userlist";

const Reviewers = () => {
  return (
    <Fragment>
      <UserLists listForRole="reviewer" />
    </Fragment>
  );
};

export default Reviewers;
