import { Fragment, useEffect, useRef } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Check if the ref is attached to the element
    if (panelRef.current) {
      const divElement = document.querySelector(".dashboard-right-panel");
      divElement?.setAttribute(
        "style",
        `min-height: ${panelRef.current.offsetHeight}px`
      );
    }
  }, []);

  return (
    <Fragment>
      <div className="main-content landing-main">
        <div className="pt-5 pb-3">
          <div className="container">
            <Row>
              <Col xl={3}>
                <Card className="custom-card" ref={panelRef}>
                  <Card.Header>
                    <Card.Title>
                      <Link to="/dashboard">Dashboard</Link>
                    </Card.Title>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <div className="p-3 task-navigation border-bottom border-block-end-dashed">
                      <ul className="list-unstyled task-main-nav mb-0">
                        <li className="px-0 pt-0">
                          <span className="fs-11 text-muted op-7 fw-semibold">
                            New Submissions
                          </span>
                        </li>
                        <li className="active">
                          <Link to="#">
                            <div className="d-flex align-items-center">
                              <span className="me-2 lh-1">
                                <i className="ri-gradienter-line align-middle fs-14 fw-semibold text-success"></i>
                              </span>
                              <span className="flex-fill text-nowrap">
                                Submit New Manuscript
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <div className="d-flex align-items-center">
                              <span className="me-2 lh-1">
                                <i className="ri-gradienter-line align-middle fs-14 fw-semibold "></i>
                              </span>
                              <span className="flex-fill text-nowrap">
                                Submissions Sent Back to Author (0)
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <div className="d-flex align-items-center">
                              <span className="me-2 lh-1">
                                <i className="ri-gradienter-line align-middle fs-14 fw-semibold "></i>
                              </span>
                              <span className="flex-fill text-nowrap">
                                Incomplete Submissions (0)
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <div className="d-flex align-items-center">
                              <span className="me-2 lh-1">
                                <i className="ri-gradienter-line align-middle fs-14 fw-semibold "></i>
                              </span>
                              <span className="flex-fill text-nowrap">
                                Waiting for Author's Approval (0)
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <div className="d-flex align-items-center">
                              <span className="me-2 lh-1">
                                <i className="ri-gradienter-line align-middle fs-14 fw-semibold "></i>
                              </span>
                              <span className="flex-fill text-nowrap">
                                Submissions Being Processed (0)
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li className="px-0 pt-0">
                          <span className="fs-11 text-muted op-7 fw-semibold">
                            Revisions
                          </span>
                        </li>
                        <li>
                          <Link to="#">
                            <div className="d-flex align-items-center">
                              <span className="me-2 lh-1">
                                <i className="ri-gradienter-line align-middle fs-14 fw-semibold "></i>
                              </span>
                              <span className="flex-fill text-nowrap">
                                Submissions Needing Revision (0)
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <div className="d-flex align-items-center">
                              <span className="me-2 lh-1">
                                <i className="ri-gradienter-line align-middle fs-14 fw-semibold "></i>
                              </span>
                              <span className="flex-fill text-nowrap">
                                Revisions Sent Back to Author (0)
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <div className="d-flex align-items-center">
                              <span className="me-2 lh-1">
                                <i className="ri-gradienter-line align-middle fs-14 fw-semibold "></i>
                              </span>
                              <span className="flex-fill text-nowrap">
                                Submissions Being Revised (0)
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <div className="d-flex align-items-center">
                              <span className="me-2 lh-1">
                                <i className="ri-gradienter-line align-middle fs-14 fw-semibold "></i>
                              </span>
                              <span className="flex-fill text-nowrap">
                                Waiting for Author's Approval (0)
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <div className="d-flex align-items-center">
                              <span className="me-2 lh-1">
                                <i className="ri-gradienter-line align-middle fs-14 fw-semibold "></i>
                              </span>
                              <span className="flex-fill text-nowrap">
                                Revisions Being Processed (0)
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <div className="d-flex align-items-center">
                              <span className="me-2 lh-1">
                                <i className="ri-gradienter-line align-middle fs-14 fw-semibold "></i>
                              </span>
                              <span className="flex-fill text-nowrap">
                                Declined Revisions (0)
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li className="px-0 pt-0">
                          <span className="fs-11 text-muted op-7 fw-semibold">
                            Completed
                          </span>
                        </li>
                        <li>
                          <Link to="#">
                            <div className="d-flex align-items-center">
                              <span className="me-2 lh-1">
                                <i className="ri-gradienter-line align-middle fs-14 fw-semibold "></i>
                              </span>
                              <span className="flex-fill text-nowrap">
                                Submissions with a Decision (0)
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <div className="d-flex align-items-center">
                              <span className="me-2 lh-1">
                                <i className="ri-gradienter-line align-middle fs-14 fw-semibold "></i>
                              </span>
                              <span className="flex-fill text-nowrap">
                                Production Completed (0)
                              </span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xl={9}>
                <Outlet />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
