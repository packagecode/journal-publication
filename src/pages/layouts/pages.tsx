import { Fragment, ReactNode, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import RSC from "react-scrollbars-custom";

interface PagesProps {
  pageTitle: string;
  children: ReactNode;
}

const Pages: React.FC<PagesProps> = ({ pageTitle, children }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const toggleFullscreen = () => {
    const contentContainer = document.getElementById("content-container");

    if (!contentContainer) {
      console.error(
        "Element with ID 'content-container' not found in the DOM."
      );
      return;
    }

    if (!isFullscreen && contentContainer.requestFullscreen) {
      contentContainer.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <Fragment>
      <div className="main-content landing-main">
        <div className="container-lg pt-5 pb-3">
          <Row className="justify-content-center">
            <Col xl={8}>
              <Card
                id="content-container"
                className={isFullscreen ? "card-fullscreen" : "normal-content"}
              >
                <Card.Body className="p-0 pb-4">
                  <div className="p-3 rounded-top terms-heading-cover d-flex align-items-center text-fixed-white bg-primary h6 fw-semibold mb-0">
                    {pageTitle}
                    <Link
                      to="#"
                      data-bs-toggle="card-fullscreen"
                      className="ms-auto text-fixed-white"
                      onClick={toggleFullscreen}
                    >
                      <i className="ri-fullscreen-line"></i>
                    </Link>
                  </div>
                  <RSC style={{ height: "100vh" }}>
                    <div className="p-4 terms-conditions" id="terms-scroll">
                      {children}
                    </div>
                  </RSC>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default Pages;
