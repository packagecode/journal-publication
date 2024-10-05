import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../common/footer";
import Navbar from "../common/navbar";

const PublicLayout = () => {
  const location = useLocation();
  const { pathname } = location;
  const bodyClass = pathname == "/" ? "landing-body" : "landing-body pages";

  return (
    <Fragment>
      <Helmet>
        <body className={bodyClass}></body>
      </Helmet>
      <Navbar />
      {/* <div className="content-body"> */}
      <Outlet />
      <div id="responsive-overlay"></div>
      {/* </div> */}
      <Footer />
    </Fragment>
  );
};

export default PublicLayout;
