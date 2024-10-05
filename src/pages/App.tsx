import Loader from "@/components/common/loader/loader";
import TabToTop from "@/components/common/tabtotop/tabtotop";
import { Fragment, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";

function App() {
  const [myClassName, setMyClass] = useState("");

  const BodyClick = () => {
    if (localStorage.getItem("ynexverticalstyles") == "icontext") {
      setMyClass("");
    }
  };

  const [isLoading, setIsLoading] = useState(
    localStorage.ynexloaderdisable != "disable"
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <Fragment>
      {isLoading && <Loader></Loader>}
      <HelmetProvider>
        <Helmet
          htmlAttributes={{
            lang: "en",
            dir: "ltr",
            "data-menu-styles": "dark",
            "data-theme-mode": "light",
            "data-nav-layout": "vertical",
            "data-header-styles": "light",
            "data-vertical-style": "overlay",
            "data-loader": "disable",
            "data-icon-text": myClassName,
          }}
        />
        <div className="page">
          <div className="main-content app-content" onClick={BodyClick}>
            <div className="container-fluid">
              <Outlet />
            </div>
          </div>
        </div>
        <TabToTop />
      </HelmetProvider>
      {/* <div id="responsive-overlay"></div> */}
    </Fragment>
  );
}

export default App;
