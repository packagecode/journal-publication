import diuLogo from "@/assets/images/diu.png";
import diuLogoBlack from "@/assets/images/diu_black.png";
import fgsLogo from "@/assets/images/fgs-logo.png";
import iqacLogo from "@/assets/images/iqac.png";
import wurLogo from "@/assets/images/wur.png";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="page-footer">
      <section className="section landing-footer text-fixed-white">
        <div className="container">
          <Row>
            <Col xl={4}>
              <div className="px-4">
                <p className="fw-semibold mb-3 text-fixed-white">
                  <Link to="/">
                    <img src={diuLogoBlack} alt="" />
                  </Link>
                </p>
                <p className="mb-2 op-6 fw-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit et magnam, fuga est mollitia eius, quo illum
                  illo inventore optio aut quas omnis rem. Dolores accusantium
                  aspernatur minus ea incidunt.
                </p>
                <p className="mb-0 op-6 fw-normal">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Autem ea esse ad
                </p>
              </div>
            </Col>
            <Col xl={2}>
              <div className="px-4">
                <h6 className="fw-semibold mb-3 text-fixed-white">
                  Further Information
                </h6>
                <ul className="list-unstyled op-6 fw-normal landing-footer-list">
                  <li>
                    <Link to="#" className="text-fixed-white">
                      Article Processing Charges
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-fixed-white">
                      Pay an Invoice
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-fixed-white">
                      Open Access Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-fixed-white">
                      Contact DIU Journal
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xl={2}>
              <div className="px-4">
                <h6 className="fw-semibold mb-3 text-fixed-white">
                  Guidelines
                </h6>
                <ul className="list-unstyled op-6 fw-normal landing-footer-list">
                  <li>
                    <Link to="#" className="text-fixed-white">
                      For Authors
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-fixed-white">
                      For Reviewers
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-fixed-white">
                      For Editors
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-fixed-white">
                      For Librarians
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-fixed-white">
                      For Publishers
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xl={4}>
              <div className="px-4">
                <h6 className="fw-semibold mb-3 text-fixed-white">CONTACT</h6>
                <ul className="list-unstyled fw-normal landing-footer-list">
                  <li>
                    <Link to="#" className="text-fixed-white op-6">
                      <i className="ri-home-4-line me-1 align-middle"></i> New
                      York, NY 10012, US
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-fixed-white op-6">
                      <i className="ri-mail-line me-1 align-middle"></i>{" "}
                      info@fmail.com
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-fixed-white op-6">
                      <i className="ri-phone-line me-1 align-middle"></i>{" "}
                      +(555)-1920 1831
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-fixed-white op-6">
                      <i className="ri-printer-line me-1 align-middle"></i>{" "}
                      +(123) 1293 123
                    </Link>
                  </li>
                  <li className="mt-3">
                    <p className="mb-2 fw-semibold op-8">FOLLOW US ON :</p>
                    <div className="mb-0">
                      <div className="btn-list">
                        <Button
                          variant=""
                          className="btn btn-sm btn-icon btn-primary-light btn-wave waves-effect waves-light"
                        >
                          <i className="ri-facebook-line fw-bold"></i>
                        </Button>
                        <Button
                          variant=""
                          className="btn btn-sm btn-icon btn-secondary-light btn-wave waves-effect waves-light"
                        >
                          <i className="ri-twitter-line fw-bold"></i>
                        </Button>
                        <Button
                          variant=""
                          className="btn btn-sm btn-icon btn-warning-light btn-wave waves-effect waves-light"
                        >
                          <i className="ri-instagram-line fw-bold"></i>
                        </Button>
                        <Button
                          variant=""
                          className="btn btn-sm btn-icon btn-success-light btn-wave waves-effect waves-light"
                        >
                          <i className="ri-github-line fw-bold"></i>
                        </Button>
                        <Button
                          variant=""
                          className="btn btn-sm btn-icon btn-danger-light btn-wave waves-effect waves-light"
                        >
                          <i className="ri-youtube-line fw-bold"></i>
                        </Button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col
              xs
              lg="8"
              className="footer-logo-bg d-flex flex-row justify-content-around"
            >
              <Link to="https://diu.ac/" target="_blank" className="p-3">
                <img src={diuLogo} alt="diu" className="img-fluid img-height" />
              </Link>
              <Link to="https://iqac.diu.ac/" target="_blank" className="p-3">
                <img src={iqacLogo} alt="" className="img-fluid img-height" />
              </Link>
              <Link
                to="https://www.topuniversities.com/world-university-rankings/2022"
                target="_blank"
                className="p-3"
              >
                <img src={wurLogo} alt="" className="img-fluid img-height" />
              </Link>
              <Link to="https://diu.ac/alumni" target="_blank" className="p-3">
                <img src={fgsLogo} alt="" className="img-fluid img-height" />
              </Link>
            </Col>
          </Row>
        </div>
      </section>
      <div className="text-center landing-main-footer py-3">
        <span className="text-muted fs-15">
          {" "}
          Copyright © <span id="year">2024</span>{" "}
          <Link
            to="https://diu.ac/"
            target="_blank"
            className="text-primary fw-semibold"
          >
            <u>DIU</u>{" "}
          </Link>
          All rights reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
