import store from "@/redux/store.tsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
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
      <Provider store={store}>
        <Navbar />
        {/* <div className="content-body"> */}
        <Outlet />
        <div id="responsive-overlay"></div>
        {/* </div> */}
        <Footer />
      </Provider>
    </Fragment>
  );
};

export default PublicLayout;
