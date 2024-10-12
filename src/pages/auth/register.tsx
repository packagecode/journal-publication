import Country from "@/assets/json/CountryCodes.json";
import { Button as BaseButton, BaseInput } from "@/components";
import { showToast } from "@/contexts/Toast";
import useAuthService from "@/hooks/useAuthService";
import { Select, Steps } from "antd";
import { Fragment, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [current, setCurrent] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const [validated, setValidated] = useState(false);
  const [passwordShow1, setPasswordShow1] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, checkAvailability } = useAuthService();
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    is_reviewer: false,
  });
  const [personalInfo, setPersonalInfo] = useState({
    degree: "",
    orcid: "",
    phone: "",
    address: "",
  });
  const [institutionInfo, setInstitutionInfo] = useState({
    name: "",
    position: "",
    department: "",
    address: "",
    postal_code: "",
    city: "",
    country: "",
  });

  const [feedback, setFeedback] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    degree: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name.includes(".")) {
      const [key, subKey] = name.split(".");
      if (key === "personalInfo")
        setPersonalInfo((prev) => ({ ...prev, [subKey]: e.target.value }));

      if (key === "institutionInfo")
        setInstitutionInfo((prev) => ({ ...prev, [subKey]: e.target.value }));
    } else setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleCheckAvailability = async () => {
    const { username } = formData;
    if (!username) return;
    await checkAvailability({ username }).then((response) => {
      if (response.username) {
        setFeedback((prev) => ({ ...prev, username: "" }));
      } else {
        setFeedback((prev) => ({
          ...prev,
          username: "The username is already taken.",
        }));
      }
    });
  };

  const handleSubmit = (event: {
    preventDefault: () => void;
    stopPropagation: () => void;
    currentTarget: { checkValidity: () => boolean };
  }) => {
    event.preventDefault();
    event.stopPropagation();

    if (current != completeStep) {
      showToast("error", "Please complete all steps * required fields");
      return;
    }
    if (event.currentTarget.checkValidity() === false) {
      setValidated(true);
      return;
    }

    if (!institutionInfo.name) {
      setFeedback((prev) => ({
        ...prev,
        institution_info: {
          name: "Institution Name field is required",
        },
      }));
      return;
    } else {
      setFeedback((prev) => ({
        ...prev,
        institution_info: { name: "" },
      }));
    }
    if (!institutionInfo.country) {
      setFeedback((prev) => ({
        ...prev,
        institution_info: {
          country: "Country field is required",
        },
      }));
      return;
    } else {
      setFeedback((prev) => ({
        ...prev,
        institution_info: { country: "" },
      }));
    }

    // Submit the form

    setLoading(true);
    register({
      ...formData,
      personalInfo,
      institutionInfo,
    })
      .then(() => {
        showToast("success", "Registration Successful");
        navigator(`/login`, {
          replace: true,
          state: { username: formData.username, password: formData.password },
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

  const next = () => {
    let isValid = true;
    if (current === 0) {
      if (!formData.username) {
        setFeedback((prev) => ({
          ...prev,
          username: "Username field is required",
        }));
        isValid = false;
      } else {
        setFeedback((prev) => ({ ...prev, username: "" }));
      }
      if (!formData.email) {
        setFeedback((prev) => ({
          ...prev,
          email: "Email field is required",
        }));
        isValid = false;
      } else {
        setFeedback((prev) => ({ ...prev, email: "" }));
      }
      if (!formData.password) {
        setFeedback((prev) => ({
          ...prev,
          password: "Password field is required",
        }));
        isValid = false;
      } else if (formData.password !== formData.password_confirmation) {
        setFeedback((prev) => ({
          ...prev,
          password: "Password & Confirm Password must be the same",
        }));
        isValid = false;
      } else {
        setFeedback((prev) => ({ ...prev, password: "" }));
      }
    } else if (current === 1) {
      if (current != completeStep) {
        showToast("error", "Please complete the previous steps");
        return;
      }

      if (!formData.first_name) {
        setFeedback((prev) => ({
          ...prev,
          first_name: "First Name field is required",
        }));
        isValid = false;
      } else {
        setFeedback((prev) => ({ ...prev, first_name: "" }));
      }
      if (!formData.last_name) {
        setFeedback((prev) => ({
          ...prev,
          last_name: "Last Name field is required",
        }));
        isValid = false;
      } else {
        setFeedback((prev) => ({ ...prev, last_name: "" }));
      }
    }

    if (isValid) {
      setCompleteStep(current + 1);
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Fragment>
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
                      <Steps
                        type="navigation"
                        size="small"
                        className="site-navigation-steps"
                        current={current}
                        // labelPlacement="vertical"
                        onChange={(value) => setCurrent(value)}
                        items={[
                          {
                            subTitle: "Login Details",
                          },
                          {
                            subTitle: "Personal Information",
                          },
                          {
                            subTitle: "Institution Information",
                          },
                        ]}
                      />
                      <div className="pt-5 pb-4">
                        {current === 0 && (
                          <>
                            <Col xl={12} className="mt-4">
                              <BaseInput
                                label="Username"
                                labelPosition="left"
                                labelRow={3}
                                name="username"
                                value={formData.username}
                                placeholder="e.g. joneleo"
                                required={true}
                                onChange={changeHandler}
                                onBlur={handleCheckAvailability}
                                feedback={feedback.username}
                                isInvalid={!!feedback.username}
                              />
                            </Col>
                            <Col xl={12} className="mt-4">
                              <BaseInput
                                labelRow={3}
                                label="Email"
                                labelPosition="left"
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="e.g. jone.leo@yahoo.com"
                                required={true}
                                onBlur={handleCheckAvailability}
                                onChange={changeHandler}
                                feedback={feedback.email}
                                isInvalid={!!feedback.email}
                              />
                            </Col>
                            <Col xl={12} className="mt-4 mb-3">
                              <BaseInput
                                label="Password"
                                labelPosition="left"
                                labelRow={3}
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
                                    onClick={() =>
                                      setPasswordShow1(!passwordShow1)
                                    }
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
                            <Col xl={12} className="mt-4 mb-3">
                              <BaseInput
                                label="Confirm Password"
                                labelPosition="left"
                                labelRow={3}
                                type={passwordShow1 ? "text" : "password"}
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                placeholder="******"
                                required={true}
                                onChange={changeHandler}
                                suffix={
                                  <Button
                                    variant="light"
                                    className="btn"
                                    onClick={() =>
                                      setPasswordShow1(!passwordShow1)
                                    }
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
                          </>
                        )}
                        {current === 1 && (
                          <>
                            <Col xl={12} className="mt-0">
                              <BaseInput
                                labelRow={3}
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
                                labelRow={3}
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
                                labelRow={3}
                                label="Degree"
                                labelPosition="left"
                                name="personalInfo.degree"
                                value={personalInfo.degree}
                                placeholder="e.g. PhD in Computer Science, MSc in Physics"
                                onChange={changeHandler}
                                feedback={feedback.degree}
                                isInvalid={!!feedback.degree}
                              />
                            </Col>
                            <Col xl={12} className="mt-4">
                              <BaseInput
                                labelRow={3}
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
                                labelRow={3}
                                label="Secondary Phone"
                                labelPosition="left"
                                name="personalInfo.phone"
                                value={personalInfo.phone}
                                placeholder="e.g. 1234567890"
                                onChange={changeHandler}
                              />
                            </Col>
                            <Col xl={12} className="mt-4">
                              <BaseInput
                                labelRow={3}
                                label={
                                  <>
                                    ORCID{" "}
                                    <OverlayTrigger
                                      overlay={
                                        <Popover
                                          className="popover-primary"
                                          id="tooltip-disabled"
                                        >
                                          <Popover.Header as="h3">
                                            What is ORCID?
                                          </Popover.Header>
                                          <Popover.Body>
                                            An ORCID iD is a nonproprietary
                                            alphanumeric code that uniquely
                                            identifies an academic author. It is
                                            a 16-digit code, in the format:
                                            0000-0000-0000-000X. Publishers use
                                            it to unambiguously attribute any
                                            published work to the correct
                                            authors. ORCID is a not-for-profit
                                            association of publishers and
                                            academic organizations that
                                            maintains the central registry of
                                            these personal identifiers (ORCID
                                            iDs) and associated public profiles
                                            for authors in academic publishing.
                                            Please visit http://orcid.org/ for
                                            more information.
                                          </Popover.Body>
                                        </Popover>
                                      }
                                      key={Math.random()}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="svg-secondary"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        width="24px"
                                        fill="#000000"
                                      >
                                        <path d="M0 0h24v24H0V0z" fill="none" />
                                        <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                      </svg>
                                    </OverlayTrigger>
                                  </>
                                }
                                labelPosition="left"
                                name="personalInfo.orcid"
                                value={personalInfo.orcid}
                                placeholder="e.g. 0000-0000-0000-0000"
                                onChange={changeHandler}
                              />
                            </Col>
                          </>
                        )}
                        {current === 2 && (
                          <>
                            <Col xl={12} className="mt-0">
                              <BaseInput
                                labelRow={3}
                                label="Position"
                                labelPosition="left"
                                name="institutionInfo.position"
                                value={institutionInfo.position}
                                placeholder="e.g. Professor"
                                onChange={changeHandler}
                              />
                            </Col>
                            <Col xl={12} className="mt-4">
                              <BaseInput
                                labelRow={3}
                                label="Institution"
                                labelPosition="left"
                                name="institutionInfo.name"
                                value={institutionInfo.name}
                                placeholder="e.g. University of California"
                                required={true}
                                onChange={changeHandler}
                              />
                            </Col>
                            <Col xl={12} className="mt-4">
                              <BaseInput
                                labelRow={3}
                                label="Department"
                                labelPosition="left"
                                name="institutionInfo.department"
                                value={institutionInfo.department}
                                placeholder="e.g. Computer Science"
                                onChange={changeHandler}
                              />
                            </Col>
                            <Col xl={12} className="mt-4">
                              <BaseInput
                                labelRow={3}
                                label="Address"
                                labelPosition="left"
                                name="institutionInfo.address"
                                value={institutionInfo.address}
                                placeholder="e.g. 1234 Main St"
                                onChange={changeHandler}
                              />
                            </Col>
                            <Col xl={12} className="mt-4">
                              <BaseInput
                                labelRow={3}
                                label="Postal Code"
                                labelPosition="left"
                                name="institutionInfo.postal_code"
                                value={institutionInfo.postal_code}
                                placeholder="e.g. 12345"
                                onChange={changeHandler}
                              />
                            </Col>
                            <Col xl={12} className="mt-4">
                              <BaseInput
                                labelRow={3}
                                label="City"
                                labelPosition="left"
                                name="institutionInfo.city"
                                value={institutionInfo.city}
                                placeholder="e.g. Los Angeles"
                                onChange={changeHandler}
                              />
                            </Col>
                            <Col xl={12} className="mt-4">
                              <Form.Group className="mb-2 row">
                                <div className="col-sm-3">
                                  <Form.Label className="form-label text-default text-danger">
                                    Country *
                                  </Form.Label>
                                </div>
                                <div className="col-sm-9">
                                  <Select
                                    className="w-100"
                                    allowClear
                                    showSearch
                                    value={institutionInfo.country}
                                    filterOption
                                    fieldNames={{
                                      label: "name",
                                      value: "name",
                                    }}
                                    options={Country.sort((a, b) =>
                                      a.name.localeCompare(b.name)
                                    )}
                                    onChange={(value) =>
                                      setInstitutionInfo({
                                        ...institutionInfo,
                                        country: value,
                                      })
                                    }
                                  />
                                </div>
                              </Form.Group>
                            </Col>
                            <Col xl={12} className="mt-4 ">
                              <Form.Label
                                xl={2}
                                className="float-start text-danger"
                              >
                                Available as a Reviewer?*
                              </Form.Label>
                              <div className="d-flex justify-content-around">
                                <Form.Check
                                  type="radio"
                                  name="is_reviewer"
                                  id="is_reviewer_yes"
                                  className="form-check-md"
                                  defaultChecked={formData.is_reviewer}
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      is_reviewer: true,
                                    }));
                                  }}
                                  label="Yes"
                                />
                                <Form.Check
                                  type="radio"
                                  name="is_reviewer"
                                  id="is_reviewer_no"
                                  className="form-check-md"
                                  defaultChecked={!formData.is_reviewer}
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      is_reviewer: false,
                                    }));
                                  }}
                                  label="No"
                                />
                              </div>
                            </Col>
                          </>
                        )}
                      </div>
                      <Col
                        xl={12}
                        className="d-flex justify-content-around mt-2"
                      >
                        {current > 0 && (
                          <BaseButton variant="warning-gradient" onClick={prev}>
                            Previous
                          </BaseButton>
                        )}
                        {current < 2 && (
                          <BaseButton variant="primary-gradient" onClick={next}>
                            Next
                          </BaseButton>
                        )}
                        {current === 2 && (
                          <BaseButton
                            type="submit"
                            variant="primary-gradient"
                            loading={loading}
                            style={{
                              cursor: completeStep < 2 ? "not-allowed" : "",
                            }}
                          >
                            Register
                          </BaseButton>
                        )}
                        {/* <BaseButton
                          type="submit"
                          variant="primary-gradient"
                          className="btn btn-wave"
                          loading={loading}
                        >
                          Register
                        </BaseButton> */}
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
    </Fragment>
  );
};
export default Register;
