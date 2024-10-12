import landingpage1 from "@/assets/images/media/landing/1.png";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const LandingBanner = () => {
  return (
    <div className="landing-banner" id="home">
      <section className="section">
        <div className="container main-banner-container">
          <Row>
            <Col xxl={7} xl={7} lg={7} md={8}>
              <div className="py-lg-5">
                <div className="mb-3">
                  <h5 className="fw-semibold text-fixed-white op-9">
                    DIU Journal of Multidisciplinary Research
                  </h5>
                </div>
                <p className="landing-banner-heading mb-3">
                  <span className="text-secondary">Multidisciplinary</span>{" "}
                  journal focusing on innovations in materials-based
                  technologies
                </p>
                <Link to="/login" className="m-1 btn btn-primary-gradient">
                  Submit your manuscript
                  <i className="ri-arrow-right-line ms-2 align-middle"></i>
                </Link>
              </div>
            </Col>
            <Col xxl={5} xl={5} lg={5} md={4}>
              <div className="text-end landing-main-image landing-heading-img">
                <img src={landingpage1} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default LandingBanner;
