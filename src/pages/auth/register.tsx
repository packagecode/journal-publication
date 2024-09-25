import { BaseInput } from "@/components";
import { showToast } from "@/contexts/Toast";
import useAuthService from "@/hooks/useAuthService";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const [passwordShow1, setPasswordShow1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordFeedbackMessage, setPasswordFeedbackMessage] = useState("");
  const { login, isAuthenticated } = useAuthService();
  const navigator = useNavigate();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { first_name, last_name, email, phone, password } = data;

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
    login(email, phone, false)
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
        <div className="container p-0 my-5">
          <Row className="">
            <Col xxl={3} xl={3} lg={12} className="align-self-center p-5">
              <h5 className="fw-semibold text-primary mb-1">
                Pre-registration Page
              </h5>
              <p>
                To register to use the Editorial Manager system, please enter
                the requested information. Upon successful registration, you
                will be sent an e-mail with instructions to verify your
                registration.
              </p>
            </Col>
            <Col xxl={6} xl={6} lg={12} className="align-self-center">
              <Card className="custom-card">
                <Card.Header>
                  <Card.Title>Registration</Card.Title>
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
                          label="First Name"
                          labelPosition="left"
                          name="first_name"
                          value={first_name}
                          placeholder="e.g. jone"
                          required={true}
                          onChange={changeHandler}
                        />
                      </Col>
                      <Col xl={12} className="mt-4">
                        <BaseInput
                          label="Last Name"
                          labelPosition="left"
                          name="last_name"
                          value={last_name}
                          placeholder="e.g. leo"
                          onChange={changeHandler}
                        />
                      </Col>
                      <Col xl={12} className="mt-4">
                        <BaseInput
                          label="Phone"
                          labelPosition="left"
                          name="phone"
                          value={phone}
                          placeholder="e.g. 1234567890"
                          onChange={changeHandler}
                        />
                      </Col>
                      <Col xl={12} className="mt-4">
                        <BaseInput
                          label="Email"
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
                          className="btn btn-wave"
                        >
                          Next
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
                      <Link to="/login">
                        <div className="d-flex align-items-center">
                          <span className="me-2 lh-1">
                            <i className="ri-login-box-line align-middle fs-14"></i>
                          </span>
                          <span className="flex-fill text-nowrap">
                            Already have an account? Sign In
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
export default Register;
