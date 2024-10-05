import face1 from "@/assets/images/faces/1.jpg";
import media43 from "@/assets/images/media/media-43.jpg";
import media44 from "@/assets/images/media/media-44.jpg";
import media45 from "@/assets/images/media/media-45.jpg";
import media66 from "@/assets/images/media/media-66.png";
import Search from "@/pages/common/search";
import { FC, Fragment } from "react";
import { Button, Card, Carousel, Col, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import LandingBanner from "../common/landing-banner";
import LatestArticle from "./latestArticle";

interface LandingProps {}

const Landing: FC<LandingProps> = () => {
  function handleClick() {
    if (document.querySelector(".offcanvas-end")?.classList.contains("show")) {
      document.querySelector(".offcanvas-end")?.classList.remove("show");
    }
  }

  const handleChange = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <Fragment>
      {/* <Helmet>
        <body className="landing-body"></body>
      </Helmet>
      <Navbar /> */}
      <div className="main-content landing-main" onClick={() => handleClick()}>
        <LandingBanner />
        <Search />
        <div className="container">
          <Row>
            <Col xxl={3} lg={5} className="pl-0">
              <Card className="custom-card mb-3">
                <Card.Body>
                  <div className="d-flex align-items-center flex-wrap justify-content-between gap-2">
                    <div
                      className="d-flex flex-wrap"
                      style={{ alignItems: "center" }}
                    >
                      <div>
                        <span className="avatar avatar-xxl avatar-rounded">
                          <img
                            src={face1}
                            className="rounded-circle img-fluid"
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="ms-3">
                        <h6 className="fw-bold mb-0 d-flex align-items-center">
                          Brenda Simpson
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="btn-list mt-4">
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary-gradient"
                        type="button"
                        size="sm"
                      >
                        Submit to Sensors
                      </Button>
                      <Button
                        variant=""
                        type="button"
                        size="sm"
                        className="btn-light"
                      >
                        Review for Sensors
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card className="custom-card products-navigation-card">
                <Card.Body className="card-body p-0">
                  <div className="p-4 border-bottom">
                    <h4 className="fw-semibold mb-0">Journal Menu</h4>
                    <div className="px-2 py-3 pb-0">
                      <ul style={{ paddingInlineStart: "1rem" }}>
                        <li>
                          <Link to="/">Sensors</Link>
                        </li>
                        <li>
                          <Link to="/">Aims & Scope</Link>
                        </li>
                        <li>
                          <Link to="/">Editorial Board</Link>
                        </li>
                        <li>
                          <Link to="/">Reviewer Board</Link>
                        </li>
                        <li>
                          <Link to="/">Instructions for Authors</Link>
                        </li>
                        <li>
                          <Link to="/">Topics</Link>
                        </li>
                        <li>
                          <Link to="/">Paper Template</Link>
                        </li>
                        <li>
                          <Link to="/">Peer Review Process</Link>
                        </li>
                        <li>
                          <Link to="/">Indexing & Archiving</Link>
                        </li>
                        <li>
                          <Link to="/">COPE</Link>
                        </li>
                        <li>
                          <Link to="/">Copyright </Link>
                        </li>
                        <li>
                          <Link to="/">Plagiarism Policy</Link>
                        </li>
                        <li>
                          <Link to="/">Journal History</Link>
                        </li>
                        <li>
                          <Link to="/">Journal Awards</Link>
                        </li>
                        <li>
                          <Link to="/">Editorial Office</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="p-4 border-bottom">
                    <h4 className="fw-semibold mb-0">Journal Browser</h4>
                    <div className="px-2 py-3 pb-0">
                      <div className="mb-2">
                        <select
                          className="form-control"
                          name="sensors"
                          onChange={handleChange}
                        >
                          <option value={undefined}>Volume</option>
                          <option value="all">All Journal</option>
                          <option value="sensors">Sensors</option>
                          <option value="digital">Digital</option>
                        </select>
                      </div>
                      <div className="mb-2">
                        <select
                          className="form-control"
                          name="sensors"
                          onChange={handleChange}
                        >
                          <option value={undefined}>Issue</option>

                          <option value="all">All Journal</option>
                          <option value="sensors">Sensors</option>
                          <option value="digital">Digital</option>
                        </select>
                      </div>
                      <div className="d-grid gap-2">
                        <Button
                          variant=""
                          type="button"
                          size="sm"
                          className="btn-light"
                        >
                          Go
                        </Button>
                      </div>
                    </div>
                    <div className="px-2 py-3 row">
                      <Col sm={6} className="d-flex justify-content-center">
                        <ul className="list-unstyled task-main-nav mb-0">
                          <li className="active">
                            <Link to="#">Volume - 2010</Link>
                          </li>
                          <li>
                            <Link to="#">Volume - 2011</Link>
                          </li>
                          <li>
                            <Link to="#">Volume - 2012</Link>
                          </li>
                          <li>
                            <Link to="#">Volume - 2013</Link>
                          </li>
                          <li>
                            <Link to="#">Volume - 2014</Link>
                          </li>
                          <li>
                            <Link to="#">Volume - 2015</Link>
                          </li>
                          <li>
                            <Link to="#">Volume - 2016</Link>
                          </li>
                          <li>
                            <Link to="#">Volume - 2017</Link>
                          </li>
                          <li>
                            <Link to="#">Volume - 2018</Link>
                          </li>
                          <li>
                            <Link to="#">Volume - 2019</Link>
                          </li>
                          <li>
                            <Link to="#">Volume - 2020</Link>
                          </li>
                        </ul>
                      </Col>
                      <Col sm={6} className="d-flex justify-content-center">
                        <ul className="list-unstyled task-main-nav mb-0">
                          <li className="active">
                            <Link to="#">Issue 1</Link>
                          </li>
                          <li>
                            <Link to="#">Issue 2</Link>
                          </li>
                          <li>
                            <Link to="#">Issue 3</Link>
                          </li>
                          <li>
                            <Link to="#">Issue 4</Link>
                          </li>
                          <li>
                            <Link to="#">Issue 5</Link>
                          </li>
                          <li>
                            <Link to="#">Issue 6</Link>
                          </li>
                          <li>
                            <Link to="#">Issue 7</Link>
                          </li>
                          <li>
                            <Link to="#">Issue 8</Link>
                          </li>
                          <li>
                            <Link to="#">Issue 9</Link>
                          </li>
                          <li>
                            <Link to="#">Issue 10</Link>
                          </li>
                          <li>
                            <Link to="#">Issue 11</Link>
                          </li>
                        </ul>
                      </Col>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={6} lg={5}>
              <Carousel
                fade
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                indicators={false}
              >
                <Carousel.Item className="active">
                  <img src={media43} className="d-block w-100" alt="..." />
                </Carousel.Item>
                <Carousel.Item>
                  <img src={media44} className="d-block w-100" alt="..." />
                </Carousel.Item>
                <Carousel.Item>
                  <img src={media45} className="d-block w-100" alt="..." />
                </Carousel.Item>
              </Carousel>
              <LatestArticle />
            </Col>
            <Col xxl={3} lg={2} className="pe-0">
              <Card className="custom-card">
                <Card.Header>
                  <Card.Title>Journal Matrix</Card.Title>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="p-3 task-navigation border-bottom border-block-end-dashed">
                    <ul className="list-unstyled task-main-nav mb-0">
                      <li className="active">
                        <Link to="#">
                          <div className="d-flex align-items-center">
                            <span className="me-2 lh-1">
                              <i className="ri-task-line align-middle fs-14"></i>
                            </span>
                            <span className="flex-fill text-nowrap">
                              Acceptance Rate
                            </span>
                            <span className="badge bg-success-transparent rounded-pill">
                              60%
                            </span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <div className="d-flex align-items-center">
                            <span className="me-2 lh-1">
                              <i className="ri-price-tag-line align-middle fs-14"></i>
                            </span>
                            <span className="flex-fill text-nowrap">
                              Submission to final decision
                            </span>
                            <span className="badge bg-success-transparent rounded-pill">
                              75 Days
                            </span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <div className="d-flex align-items-center">
                            <span className="me-2 lh-1">
                              <i className="ri-price-tag-line align-middle fs-14 fw-semibold text-secondary"></i>
                            </span>
                            <span className="flex-fill text-nowrap">
                              Acceptance to publication
                            </span>
                            <span className="badge bg-success-transparent rounded-pill">
                              17 Days
                            </span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <div className="d-flex align-items-center">
                            <span className="me-2 lh-1">
                              <i className="ri-focus-3-line align-middle fs-14 fw-semibold text-warning"></i>
                            </span>
                            <span className="flex-fill text-nowrap">
                              CiteScore
                            </span>
                            <span className="badge bg-success-transparent rounded-pill">
                              6,200
                            </span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <div className="d-flex align-items-center">
                            <span className="me-2 lh-1">
                              <i className="ri-gradienter-line align-middle fs-14 fw-semibold text-success"></i>
                            </span>
                            <span className="flex-fill text-nowrap">
                              Journal Citetion Indicator
                            </span>
                            <span className="badge bg-success-transparent rounded-pill">
                              -
                            </span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <div className="d-flex align-items-center">
                            <span className="me-2 lh-1">
                              <i className="ri-scan-2-line align-middle fs-14 fw-semibold text-danger"></i>
                            </span>
                            <span className="flex-fill text-nowrap">
                              Impact Factor
                            </span>
                            <span className="badge bg-success-transparent rounded-pill">
                              -
                            </span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 text-center">
                    <img src={media66} alt="" />
                  </div>
                </Card.Body>
              </Card>
              <Card className="custom-card">
                <Card.Header>
                  <Card.Title>Recent Articles</Card.Title>
                </Card.Header>
                <Card.Body className="p-0">
                  <ListGroup>
                    <ListGroup.Item>
                      <div className="d-flex gap-3 flex-wrap align-items-center">
                        <div className="flex-fill">
                          <Link to="#" className="fs-14 fw-semibold mb-0">
                            Animals
                          </Link>
                          <p className="mb-1 popular-blog-content text-truncate">
                            There are many variations of passages of Lorem Ipsum
                            available
                          </p>
                          <span className="text-muted fs-11">
                            24,Nov 2022 - 18:27
                          </span>
                        </div>
                        <div>
                          <Button
                            variant=""
                            className="btn btn-icon btn-light btn-sm rtl-rotate"
                          >
                            <i className="ri-arrow-right-s-line"></i>
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="d-flex gap-3 flex-wrap align-items-center">
                        <div className="flex-fill">
                          <Link to="#" className="fs-14 fw-semibold mb-0">
                            Travel
                          </Link>
                          <p className="mb-1 popular-blog-content text-truncate">
                            Latin words, combined with a handful of model
                            sentence
                          </p>
                          <span className="text-muted fs-11">
                            28,Nov 2022 - 10:45
                          </span>
                        </div>
                        <div>
                          <Button
                            variant=""
                            className="btn btn-icon btn-light btn-sm rtl-rotate"
                          >
                            <i className="ri-arrow-right-s-line"></i>
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="d-flex gap-3 flex-wrap align-items-center">
                        <div className="flex-fill">
                          <Link to="#" className="fs-14 fw-semibold mb-0">
                            Interior
                          </Link>
                          <p className="mb-1 popular-blog-content text-truncate">
                            Contrary to popular belief, Lorem Ipsum is not
                            simply random
                          </p>
                          <span className="text-muted fs-11">
                            30,Nov 2022 - 08:32
                          </span>
                        </div>
                        <div>
                          <Button
                            variant=""
                            className="btn btn-icon btn-light btn-sm rtl-rotate"
                          >
                            <i className="ri-arrow-right-s-line"></i>
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="d-flex gap-3 flex-wrap align-items-center">
                        <div className="flex-fill">
                          <Link to="#" className="fs-14 fw-semibold mb-0">
                            Nature
                          </Link>
                          <p className="mb-1 popular-blog-content text-truncate">
                            It was popularised in the 1960s with the release of
                            Letraset sheets containing
                          </p>
                          <span className="text-muted fs-11">
                            3,Dec 2022 - 12:56
                          </span>
                        </div>
                        <div>
                          <Button
                            variant=""
                            className="btn btn-icon btn-light btn-sm rtl-rotate"
                          >
                            <i className="ri-arrow-right-s-line"></i>
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="text-center">
                      <Button variant="" className="btn btn-primary-light">
                        Load more
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              <Card className="custom-card">
                <Card.Body className="p-0">
                  <ListGroup>
                    <ListGroup.Item>
                      <Link to="#">
                        <div className="d-flex align-items-center">
                          <span className="me-2 lh-1">
                            <i className="ri-login-circle-line align-middle fs-14"></i>
                          </span>
                          <span className="flex-fill text-nowrap">
                            Submit your menuscript
                          </span>
                        </div>
                      </Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to="#">
                        <div className="d-flex align-items-center">
                          <span className="me-2 lh-1">
                            <i className="ri-git-repository-line align-middle fs-14"></i>
                          </span>
                          <span className="flex-fill text-nowrap">
                            Author Guidelines
                          </span>
                        </div>
                      </Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to="#">
                        <div className="d-flex align-items-center">
                          <span className="me-2 lh-1">
                            <i className="ri-group-fill align-middle fs-14"></i>
                          </span>
                          <span className="flex-fill text-nowrap">
                            Editorial Board
                          </span>
                        </div>
                      </Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to="#">
                        <div className="d-flex align-items-center">
                          <span className="me-2 lh-1">
                            <i className="ri-computer-line align-middle fs-14"></i>
                          </span>
                          <span className="flex-fill text-nowrap">
                            Databases and Indexing
                          </span>
                        </div>
                      </Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to="#">
                        <div className="d-flex align-items-center">
                          <span className="me-2 lh-1">
                            <i className="ri-flag-fill align-middle fs-14"></i>
                          </span>
                          <span className="flex-fill text-nowrap">
                            Sing up for content alerts
                          </span>
                        </div>
                      </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className="text-center">
                      <Link to="#" className="btn btn-primary-light btn-block">
                        Sign up
                      </Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
