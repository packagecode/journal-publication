import useAxiosInstance from "@/hooks/useAxiosInstance";
import { SetIsFetchScriptCount } from "@/redux/action";
import { RootState } from "@/redux/store";
import { Fragment, useEffect, useRef, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const user: any = useSelector((state: RootState) => state.user);
  const isFetchScriptCount: any = useSelector(
    (state: RootState) => state.isFetchScriptCount
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const { axiosInstance, api } = useAxiosInstance();
  const [entitiesCount, setEntitiesCount] = useState<any>({});

  const fetchEntitiesCount = async () => {
    await axiosInstance.get(api("manuscript/count")).then((response) => {
      setEntitiesCount(response.data.manuscripts);
    });
  };

  const getCount = (key: string) => {
    return entitiesCount[key] || 0;
  };

  useEffect(() => {
    fetchEntitiesCount();
    // Check if the ref is attached to the element
    if (panelRef.current) {
      const divElement = document.querySelector(".dashboard-right-panel");
      divElement?.setAttribute(
        "style",
        `min-height: ${panelRef.current.offsetHeight}px`
      );
    }
  }, []);

  useEffect(() => {
    if (isFetchScriptCount) {
      fetchEntitiesCount();
      dispatch(SetIsFetchScriptCount(false));
    }
  }, [isFetchScriptCount]);

  const MenuItem = ({
    path,
    label,
    icon = "ri-gradienter-line",
  }: {
    path: string;
    label: string;
    icon?: string;
  }) => {
    const isActive = location.pathname === path ? "active" : "";
    return (
      <li className={isActive}>
        <Link to={path}>
          <div className="d-flex align-items-center">
            <span className="me-2 lh-1">
              <i
                className={`${icon} align-middle fs-14 fw-semibold ${
                  isActive ? "text-success" : ""
                }`}
              ></i>
            </span>
            <span className="flex-fill text-nowrap">{label}</span>
          </div>
        </Link>
      </li>
    );
  };

  return (
    <Fragment>
      <div className="main-content landing-main">
        <div className="pt-5 pb-3">
          <div className="container-xxl">
            <Row>
              <Col md={5} xl={3}>
                <Card className="custom-card" ref={panelRef}>
                  <Card.Header>
                    <Card.Title>
                      <Link to="/dashboard">Author Dashboard</Link>
                    </Card.Title>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <div className="p-3 task-navigation border-bottom border-block-end-dashed">
                      <ul className="list-unstyled task-main-nav mb-0">
                        <MenuItem
                          path="/profile"
                          label={`${user.first_name}'s Profile`}
                        />
                        <li className="px-0 pt-0">
                          <span className="fs-11 text-muted op-7 fw-semibold">
                            New Submissions
                          </span>
                        </li>
                        <MenuItem
                          path="/manu-script/create"
                          label="Submit New Manuscript"
                        />
                        <MenuItem
                          path="#"
                          label={`Submissions Sent Back to Author (${getCount(
                            "sent_back"
                          )})`}
                        />
                        <MenuItem
                          path="/manu-script/submission-incomplete"
                          label={`Incomplete Submissions (${getCount(
                            "incomplete"
                          )})`}
                        />
                        <MenuItem
                          path="#"
                          label={`Waiting for Author's Approval (${getCount(
                            "waiting_for_approval"
                          )})`}
                        />
                        <MenuItem
                          path="/manu-script/submission-processed"
                          label={`Submissions Being Processed (${getCount(
                            "submitted"
                          )})`}
                        />
                        <li className="px-0 pt-0">
                          <span className="fs-11 text-muted op-7 fw-semibold">
                            Revisions
                          </span>
                        </li>
                        <MenuItem
                          path="#"
                          label="Submissions Needing Revision (0)"
                        />
                        <MenuItem
                          path="#"
                          label="Revisions Sent Back to Author (0)"
                        />
                        <MenuItem
                          path="#"
                          label="Submissions Being Revised (0)"
                        />
                        <MenuItem
                          path="#"
                          label="Waiting for Author's Approval (0)"
                        />
                        <MenuItem
                          path="#"
                          label="Revisions Being Processed (0)"
                        />
                        <MenuItem path="#" label="Declined Revisions (0)" />
                        <li className="px-0 pt-0">
                          <span className="fs-11 text-muted op-7 fw-semibold">
                            Completed
                          </span>
                        </li>
                        <MenuItem
                          path="#"
                          label="Submissions with a Decision (0)"
                        />
                        <MenuItem path="#" label="Production Completed (0)" />
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={7} xl={9}>
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
