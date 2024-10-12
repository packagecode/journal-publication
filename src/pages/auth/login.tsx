import Cover from "@/assets/images/cover.png";
import Logo from "@/assets/images/journal-logo.png";
import { Button as BaseButton, BaseInput } from "@/components";
import { showToast } from "@/contexts/Toast";
import useAuthService from "@/hooks/useAuthService";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [passwordShow1, setPasswordShow1] = useState<boolean>(false);
  const [loading, setLoading] = useState({
    author: false,
    editor: false,
    publisher: false,
  });
  const [submitButton, setSubmitButton] = useState<string>("");
  const { login, isAuthenticated } = useAuthService();
  const redirectUrl = useSelector((state: RootState) => state.redirectUrl);
  const navigator = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({
    username: "",
    password: "",
    remember_me: false,
  });
  const { username, password, remember_me } = data;
  const [feedback, setFeedback] = useState({
    username: "",
    password: "",
  });
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
      setValidated(true);
      return;
    }

    setLoading((prev) => ({ ...prev, [submitButton]: true }));
    login(username, password, remember_me, submitButton)
      .then(() => {
        showToast("success", "Login Successful");
      })
      .catch((error) => {
        if (error.message) {
          setFeedback((prev) => ({ ...prev, username: error.message }));
        } else {
          const { errors } = error;
          Object.keys(errors).map((field) =>
            errors[field].map((error: string) =>
              setFeedback((prev) => ({ ...prev, [field]: error }))
            )
          );
        }
      })
      .finally(() =>
        setLoading((prev) => ({ ...prev, [submitButton]: false }))
      );
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigator(redirectUrl ? redirectUrl : `/dashboard`, { replace: true });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (location.state) {
      setData({
        ...data,
        username: location.state.username,
        password: location.state.password,
      });
    }
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.has("username")) {
      setData({
        ...data,
        username: queryParams.get("username") || "",
      });
    }
  }, [location.state]);

  return (
    <>
      <div className="main-content landing-main">
        <section className="section bg-primary-transparent">
          <div className="container text-center">
            <div className="row justify-content-center text-center">
              <Col xl={3}>
                <img
                  src={Logo}
                  alt="logo"
                  className="img-fluid"
                  style={{ height: "100px" }}
                />
              </Col>
              <Col xl={9} className="align-self-center">
                <h3 className="fw-semibold mb-2">
                  DIU Journal of Multidisciplinary Research
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
                          name="username"
                          value={username}
                          placeholder="e.g. johndoe"
                          required={true}
                          onChange={changeHandler}
                          feedback={feedback.username}
                          isInvalid={!!feedback.username}
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
                          feedback={feedback.password}
                          isInvalid={!!feedback.password}
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
                        className="d-flex justify-content-around mt-5 align-self-center"
                      >
                        <BaseButton
                          type="submit"
                          variant="primary-gradient"
                          className="btn btn-wave"
                          loading={loading.author}
                          onClick={() => setSubmitButton("author")}
                        >
                          Author Login
                        </BaseButton>
                        <BaseButton
                          type="submit"
                          variant="primary-gradient"
                          className="btn btn-wave"
                          loading={loading.editor}
                          onClick={() => setSubmitButton("editor")}
                        >
                          Editor Login
                        </BaseButton>
                        <BaseButton
                          type="submit"
                          variant="primary-gradient"
                          className="btn btn-wave "
                          loading={loading.publisher}
                          onClick={() => setSubmitButton("publisher")}
                        >
                          Publisher Login
                        </BaseButton>
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
