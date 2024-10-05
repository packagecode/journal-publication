import { Button as BaseButton, BaseInput } from "@/components";
import { showToast } from "@/contexts/Toast";
import useAuthService from "@/hooks/useAuthService";
import { useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const [passwordShow1, setPasswordShow1] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuthService();
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [feedback, setFeedback] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const changeHandler = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    setLoading(true);
    register(formData)
      .then(() => {
        showToast("success", "Registration Successful");
        navigator(`/login`, {
          replace: true,
          state: { email: formData.email, password: formData.password },
        });
      })
      .catch((error) => {
        const { errors } = error;
        Object.keys(errors).map((field) =>
          errors[field].map((error: string) =>
            setFeedback((prev) => ({ ...prev, [field]: error }))
          )
        );
      })
      .finally(() => setLoading(false));
  };

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
                          value={formData.first_name}
                          placeholder="e.g. jone"
                          required={true}
                          onChange={changeHandler}
                          feedback={feedback.first_name}
                          isInvalid={!!feedback.first_name}
                        />
                      </Col>
                      <Col xl={12} className="mt-4">
                        <BaseInput
                          label="Last Name"
                          labelPosition="left"
                          name="last_name"
                          value={formData.last_name}
                          placeholder="e.g. leo"
                          required={true}
                          onChange={changeHandler}
                          feedback={feedback.last_name}
                          isInvalid={!!feedback.last_name}
                        />
                      </Col>
                      <Col xl={12} className="mt-4">
                        <BaseInput
                          label="Phone"
                          labelPosition="left"
                          name="phone"
                          value={formData.phone}
                          placeholder="e.g. 1234567890"
                          onChange={changeHandler}
                          feedback={feedback.phone}
                          isInvalid={!!feedback.phone}
                        />
                      </Col>
                      <Col xl={12} className="mt-4">
                        <BaseInput
                          label="Email"
                          labelPosition="left"
                          type="email"
                          name="email"
                          value={formData.email}
                          placeholder="e.g. jone.leo@yahoo.com"
                          required={true}
                          onChange={changeHandler}
                          feedback={feedback.email}
                          isInvalid={!!feedback.email}
                        />
                      </Col>
                      <Col xl={12} className="mt-4 mb-3">
                        <BaseInput
                          label="Password"
                          labelPosition="left"
                          type={passwordShow1 ? "text" : "password"}
                          name="password"
                          value={formData.password}
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
                        className="d-flex justify-content-around mt-2 align-self-center"
                      >
                        <BaseButton
                          type="submit"
                          variant="primary-gradient"
                          className="btn btn-wave"
                          loading={loading}
                        >
                          Register
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
