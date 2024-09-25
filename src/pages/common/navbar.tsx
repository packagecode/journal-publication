import {
  default as desktoplogo,
  default as togglelogo,
} from "@/assets/images/diu.png";
import diuLogoBlack from "@/assets/images/diu_black.png";
import { ThemeChanger } from "@/redux/action";
import store from "@/redux/store";
import { FC, Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({ local_varaiable, ThemeChanger }: any) => {
  const location = useLocation();
  const { pathname } = location;
  const Logo = pathname == "/" ? desktoplogo : diuLogoBlack;
  const LogoHeight = pathname == "/" ? "3rem" : "2.5rem";

  useEffect(() => {
    const theme = store.getState();
    ThemeChanger({
      ...theme,
      dataNavStyle: "menu-click",
      dataNavLayout: "horizontal",
    });

    function handleResize() {
      if (window.innerWidth <= 992) {
        const theme = store.getState();
        ThemeChanger({
          ...theme,
          toggled: "close",
          dataNavLayout: "horizontal",
        });
      } else {
        const theme = store.getState();
        ThemeChanger({
          ...theme,
          toggled: "open",
          dataNavLayout: "horizontal",
        });
      }
    }

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function toggleNavigation() {
    if (window.innerWidth <= 992) {
      const theme = store.getState();
      ThemeChanger({ ...theme, toggled: "open", dataNavLayout: "horizontal" });
    }
  }
  const Topup = () => {
    if (window.scrollY > 30 && document.querySelector(".landing-body")) {
      const Scolls = document.querySelectorAll(".sticky");
      Scolls.forEach((e) => {
        e.classList.add("sticky-pin");
      });
    } else {
      const Scolls = document.querySelectorAll(".sticky");
      Scolls.forEach((e) => {
        e.classList.remove("sticky-pin");
      });
    }
  };
  window.addEventListener("scroll", Topup);

  const customStyles: any = ` ${
    local_varaiable.colorPrimaryRgb != ""
      ? `--primary-rgb:${local_varaiable.colorPrimaryRgb}`
      : ""
  }`;

  return (
    <Fragment>
      <Helmet>
        <html
          dir={local_varaiable.dir}
          data-theme-mode={local_varaiable.dataThemeMode}
          data-menu-position={local_varaiable.dataMenuPosition}
          data-nav-layout={local_varaiable.dataNavLayout}
          data-nav-style={local_varaiable.dataNavStyle}
          data-toggled={local_varaiable.toggled}
          style={customStyles}
        ></html>
      </Helmet>

      <header className="app-header">
        <div className="main-header-container container-fluid">
          <div className="header-content-left">
            <div className="header-element">
              <div className="horizontal-logo">
                <Link to="/" className="header-logo">
                  <img src={togglelogo} alt="logo" className="toggle-logo" />
                </Link>
              </div>
            </div>

            <div className="header-element">
              <Link
                to="#"
                className="sidemenu-toggle header-link"
                data-bs-toggle="sidebar"
                onClick={toggleNavigation}
              >
                <span className="open-toggle">
                  <i className="ri-menu-3-line fs-20"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="header-content-right">
            <div className="header-element align-items-center">
              <div className="btn-list d-lg-none d-block">
                <Link to="/" className="btn btn-primary-light">
                  Sing In
                </Link>
                <Button variant="" className="btn btn-wave btn-light">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <aside className="app-sidebar sticky" id="sidebar">
        <div className="container p-0">
          <div className="main-sidebar">
            <nav className="main-menu-container nav nav-pills sub-open">
              <div className="landing-logo-container">
                <div className="horizontal-logo">
                  <Link to="/" className="header-logo">
                    <img src={togglelogo} alt="logo" className="desktop-logo" />
                    <img
                      src={Logo}
                      alt="logo"
                      className="desktop-white"
                      style={{ height: LogoHeight }}
                    />
                  </Link>
                </div>
              </div>
              <div
                className="slide-left"
                id="slide-left"
                onClick={() => toggleNavigation()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#7b8191"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>{" "}
                </svg>
              </div>
              <ul className="main-menu">
                <li className="slide">
                  <Link className="side-menu__item" to="/">
                    <span className="side-menu__label">Home</span>
                  </Link>
                </li>
                <li className="slide">
                  <Link to="/" className="side-menu__item">
                    <span className="side-menu__label">About Us</span>
                  </Link>
                </li>
                <li className="slide">
                  <Link to="/contact-us" className="side-menu__item">
                    <span className="side-menu__label">Contact</span>
                  </Link>
                </li>
              </ul>
              <div className="slide-right" id="slide-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#7b8191"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>{" "}
                </svg>
              </div>
              <div className="d-lg-flex d-none">
                <div className="btn-list d-lg-flex d-none mt-lg-2 mt-xl-0 mt-0">
                  <Link
                    to="/login"
                    className="btn btn-wave btn-primary-gradient"
                  >
                    Sign In
                  </Link>
                  <Button variant="" className="btn btn-wave btn-light">
                    Submit
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </aside>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Navbar);
