import Cover from "@/assets/images/cover.png";
import Logo from "@/assets/images/diu.png";
import { BaseInput } from "@/components";
import { showToast } from "@/contexts/Toast";
import useAuthService from "@/hooks/useAuthService";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [passwordShow1, setPasswordShow1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordFeedbackMessage, setPasswordFeedbackMessage] = useState("");
  const { login, isAuthenticated } = useAuthService();
  const navigator = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    remember_me: false,
  });
  const { email, password, remember_me } = data;

  const changeHandler = (e: any) => {
    if (e.target.name === "remember_me") {
      setData({ ...data, [e.target.name]: e.target.checked });
      return;
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: {
    preventDefault: () => void;
    stopPropagation: () => void;
    currentTarget: { checkValidity: () => boolean };
  }) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.checkValidity() === false) {
      setPasswordFeedbackMessage("The Password field is required");
      setValidated(true);
      return;
    }

    setLoading(true);
    login(email, password, remember_me)
      .then(() => {
        showToast("success", "Login Successful");
        navigator(`/dashboards`, { replace: true });
      })
      .catch((error) => {
        if (error.errors && error.errors.message) {
          console.log(error.errors.message[0]);
          setPasswordFeedbackMessage(error.errors.message[0]);
        } else {
          setPasswordFeedbackMessage("Something went wrong");
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    console.log(isAuthenticated);
    console.log(loading);
  }, [isAuthenticated, loading]);

  return (
    <>
      <div className="main-content landing-main">
        <section className="section bg-light">
          <div className="container text-center">
            <div className="row justify-content-center text-center">
              <Col xl={2}>
                <img
                  src={Logo}
                  alt="logo"
                  className="img-fluid"
                  style={{ height: "100px" }}
                />
              </Col>
              <Col xl={10} className="align-self-center">
                <h3 className="fw-semibold mb-2">
                  DIU Journal of Multidisciplinary Area
                </h3>
              </Col>
            </div>
            <div className="row text-start">
              <div className="col-12 col-md-4"></div>
            </div>
          </div>
        </section>
        <div className="container p-0">
          <Row className="">
            <Col xxl={3} xl={3} lg={12} className="align-self-center p-5">
              <img
                src={Cover}
                alt="cover"
                className="img-fluid border border-1 border-primary"
              />
            </Col>
            <Col xxl={6} xl={6} lg={12} className="align-self-center">
              <Card className="custom-card">
                <Card.Header>
                  <Card.Title>Please enter the following</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="row gy-3">
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
                      <Col xl={12} className="mt-0">
                        <BaseInput
                          label="Username"
                          labelPosition="left"
                          type="email"
                          name="email"
                          value={email}
                          placeholder="e.g. jone.leo@yahoo.com"
                          required={true}
                          onChange={changeHandler}
                        />
                      </Col>
                      <Col xl={12} className="mt-4 mb-3">
                        <BaseInput
                          label="Password"
                          labelPosition="left"
                          type={passwordShow1 ? "text" : "password"}
                          name="password"
                          value={password}
                          placeholder="******"
                          required={true}
                          onChange={changeHandler}
                          feedback={passwordFeedbackMessage}
                          isInvalid={!!passwordFeedbackMessage}
                          suffix={
                            <Button
                              variant="light"
                              className="btn"
                              onClick={() => setPasswordShow1(!passwordShow1)}
                            >
                              <i
                                aria-hidden="true"
                                className={`${
                                  passwordShow1
                                    ? "ri-eye-line"
                                    : "ri-eye-off-line"
                                } align-middle`}
                              ></i>
                            </Button>
                          }
                        />
                      </Col>
                      <Col
                        xl={12}
                        className="d-flex justify-content-around mt-2 align-self-center"
                      >
                        <Button
                          type="button"
                          variant="primary-gradient"
                          className="btn btn-wave rounded-pill"
                        >
                          Author Login
                        </Button>
                        <Button
                          type="button"
                          variant="primary-gradient"
                          className="btn btn-wave rounded-pill"
                        >
                          Editor Login
                        </Button>
                        <Button
                          type="button"
                          variant="primary-gradient"
                          className="btn btn-wave rounded-pill"
                        >
                          Publisher Login
                        </Button>
                      </Col>
                    </Form>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={3} xl={3} lg={12} className="align-self-center">
              <Card className="custom-card">
                <Card.Body className="p-0">
                  <ListGroup>
                    <ListGroup.Item>
                      <Link to="/register">
                        <div className="d-flex align-items-center">
                          <span className="me-2 lh-1">
                            <i className="ri-login-box-line align-middle fs-14"></i>
                          </span>
                          <span className="flex-fill text-nowrap">
                            Register
                          </span>
                        </div>
                      </Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to="#">
                        <div className="d-flex align-items-center">
                          <span className="me-2 lh-1">
                            <i className="ri-lock-unlock-line align-middle fs-14"></i>
                          </span>
                          <span className="flex-fill text-nowrap">
                            Forgot Password
                          </span>
                        </div>
                      </Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Login;
