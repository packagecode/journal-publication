import Country from "@/assets/json/CountryCodes.json";
import { BaseInput } from "@/components";
import BaseButton from "@/components/core/BaseButton";
import { showToast } from "@/contexts/Toast";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { SetUser } from "@/redux/action";
import { RootState } from "@/redux/store";
import SelectAnt from "antd/lib/select";
import { Fragment, useState } from "react";
import { Button, Card, Col, Form, Nav, Tab } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const feedbackFields = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
  gender: "",
  dob: "",
  degree: "",
  institutionName: "",
};

const Profile = () => {
  const user: any = useSelector((state: RootState) => state.user);
  const [validated, setValidated] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { axiosInstance, api } = useAxiosInstance();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    phone: user?.phone,
    password: "",
    password_confirmation: "",
  });

  const [personalInfo, setPersonalInfo] = useState({
    degree: user?.personal_info?.degree,
    phone: user?.personal_info?.phone,
    gender: user?.personal_info?.gender,
    dob: user?.personal_info?.dob,
    orcid: user?.personal_info?.orcid,
    address: user?.personal_info?.address,
  });

  const [institutionInfo, setInstitutionInfo] = useState({
    name: user?.institution_info?.name,
    position: user?.institution_info?.position,
    department: user?.institution_info?.department,
    address: user?.institution_info?.address,
    postal_code: user?.institution_info?.postal_code,
    city: user?.institution_info?.city,
    country: user?.institution_info?.country,
  });

  const [feedback, setFeedback] = useState(feedbackFields);

  const changeHandler = (e: any) => {
    const { name } = e.target;

    if (name.includes(".")) {
      const [key, subKey] = name.split(".");
      if (key === "personalInfo")
        setPersonalInfo((prev) => ({ ...prev, [subKey]: e.target.value }));
      if (key === "institutionInfo")
        setInstitutionInfo((prev) => ({ ...prev, [subKey]: e.target.value }));
    } else setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const checkPassword = (e: any) => {
    setFeedback({ ...feedback, password: "" });
    if (e.target.name === "password") {
      if (e.target.value.length > 0 && e.target.value.length < 8) {
        setFeedback({
          ...feedback,
          password: "Password must be at least 8 characters",
        });
      } else if (
        formData.password_confirmation &&
        e.target.value !== formData.password_confirmation
      ) {
        setFeedback({
          ...feedback,
          password: "Oops! The passwords don’t match. Please try again",
        });
      }
    } else if (e.target.name === "password_confirmation") {
      if (formData.password && e.target.value !== formData.password) {
        setFeedback({
          ...feedback,
          password: "Oops! The passwords don’t match. Please try again",
        });
      } else {
        setFeedback({ ...feedback, password: "" });
      }
    }
  };

  const handleSubmit = async (event: {
    preventDefault: () => void;
    stopPropagation: () => void;
    currentTarget: { checkValidity: () => boolean };
  }) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.checkValidity() === false) {
      if (!institutionInfo.name)
        setFeedback({
          ...feedback,
          institutionName: "Institution name is required",
        });
      setValidated(true);
      return;
    } else {
      setFeedback({ ...feedback, institutionName: "" });
    }

    if (institutionInfo.country == null) {
      showToast("error", "Country is required");
      return;
    }
    if (
      formData.password &&
      formData.password_confirmation !== formData.password
    ) {
      setFeedback({
        ...feedback,
        password: "Oops! The passwords don’t match. Please try again",
      });
      return;
    } else {
      setFeedback({ ...feedback, password: "" });
    }

    if (formData.password === "") {
      delete (formData as any).password;
      delete (formData as any).password_confirmation;
    }
    setLoading(true);
    await axiosInstance
      .patch(api("users/" + user.id), {
        ...formData,
        personalInfo,
        institutionInfo,
      })
      .then((response) => {
        dispatch(SetUser(response.data.user));
        setValidated(false);
        setFeedback(feedbackFields);
        showToast("success", "Profile updated successfully");
      })
      .finally(() => setLoading(false));
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <Fragment>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Tab.Container defaultActiveKey="first">
          <Card className="custom-card overflow-hidden">
            <Card.Header className="justify-content-between">
              <Card.Title>{user?.full_name} Profile</Card.Title>
              <div>
                <Nav
                  className="nav nav-tabs justify-content-end nav-tabs-header mb-0"
                  role="tablist"
                  defaultActiveKey="first"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="first" href="#personal-info">
                      Personal Info
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second" href="#institution-info">
                      Institution Information
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Tab.Content className="tab-content">
                <Tab.Pane
                  className="tab-pane show  text-muted radius-0 border-0"
                  id="personal-info"
                  eventKey="first"
                  role="tabpanel"
                >
                  <div className="row gy-4">
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="First Name"
                        name="first_name"
                        value={formData.first_name}
                        placeholder="e.g. jone"
                        required={true}
                        onChange={changeHandler}
                        feedback={feedback.first_name}
                        isInvalid={!!feedback.first_name}
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        placeholder="e.g. leo"
                        required={true}
                        onChange={changeHandler}
                        feedback={feedback.last_name}
                        isInvalid={!!feedback.last_name}
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        placeholder="e.g. 1234567890"
                        onChange={changeHandler}
                        feedback={feedback.phone}
                        isInvalid={!!feedback.phone}
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="Email"
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
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="Password"
                        type={passwordShow ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        placeholder="******"
                        onChange={changeHandler}
                        onInput={checkPassword}
                        feedback={feedback.password}
                        isInvalid={!!feedback.password}
                        suffix={
                          <Button
                            variant="light"
                            className="btn"
                            onClick={() => setPasswordShow(!passwordShow)}
                          >
                            <i
                              aria-hidden="true"
                              className={`${
                                passwordShow ? "ri-eye-line" : "ri-eye-off-line"
                              } align-middle`}
                            ></i>
                          </Button>
                        }
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="Confirm Password"
                        type={passwordShow ? "text" : "password"}
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        placeholder="******"
                        onChange={changeHandler}
                        onInput={checkPassword}
                        isInvalid={!!feedback.password}
                        suffix={
                          <Button
                            variant="light"
                            className="btn"
                            onClick={() => setPasswordShow(!passwordShow)}
                          >
                            <i
                              aria-hidden="true"
                              className={`${
                                passwordShow ? "ri-eye-line" : "ri-eye-off-line"
                              } align-middle`}
                            ></i>
                          </Button>
                        }
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <Form.Label>Date of Birth</Form.Label>
                      <DatePicker
                        selected={personalInfo.dob}
                        onChange={(date: any) =>
                          setPersonalInfo({ ...personalInfo, dob: date })
                        }
                        className="form-control"
                        dateFormat="yyyy-MM-dd"
                        isClearable
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <Form.Label>Gender</Form.Label>
                      <Select
                        name="gender"
                        options={genderOptions}
                        className="basic-multi-select "
                        isSearchable
                        menuPlacement="auto"
                        classNamePrefix="Select2"
                        onChange={(selectedOption: any) =>
                          setPersonalInfo({
                            ...personalInfo,
                            gender: selectedOption.value,
                          })
                        }
                        defaultValue={genderOptions.find(
                          (g) => g.value === personalInfo.gender
                        )}
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="Secondary Phone"
                        name="personalInfo.phone"
                        value={personalInfo.phone}
                        placeholder="e.g. 1234567890"
                        onChange={changeHandler}
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="Degree"
                        name="personalInfo.degree"
                        value={personalInfo.degree}
                        placeholder="e.g. BSc in Computer Science"
                        onChange={changeHandler}
                        feedback={feedback.degree}
                        isInvalid={!!feedback.degree}
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="ORCID"
                        name="personalInfo.orcid"
                        value={personalInfo.orcid}
                        placeholder="e.g. 0000-0002-1825-0097"
                        onChange={changeHandler}
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="Address"
                        name="personalInfo.address"
                        value={personalInfo.address}
                        placeholder="e.g. 1234 Main St, New York, NY 10001"
                        onChange={changeHandler}
                      />
                    </Col>
                  </div>
                </Tab.Pane>
                <Tab.Pane
                  className="tab-pane  text-muted radius-0 border-0"
                  id="institution-info"
                  eventKey="second"
                  role="tabpanel"
                >
                  <div className="row gy-4">
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="Institution"
                        name="institutionInfo.name"
                        value={institutionInfo.name}
                        placeholder="e.g. University of California"
                        required={true}
                        onChange={changeHandler}
                        feedback={feedback.institutionName}
                        isInvalid={!!feedback.institutionName}
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="Position"
                        name="institutionInfo.position"
                        value={institutionInfo.position}
                        placeholder="e.g. Professor"
                        onChange={changeHandler}
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="Department"
                        name="institutionInfo.department"
                        value={institutionInfo.department}
                        placeholder="e.g. Computer Science"
                        onChange={changeHandler}
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="Address"
                        name="institutionInfo.address"
                        value={institutionInfo.address}
                        placeholder="e.g. 1234 Main St"
                        onChange={changeHandler}
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="Postal Code"
                        name="institutionInfo.postal_code"
                        value={institutionInfo.postal_code}
                        placeholder="e.g. 12345"
                        onChange={changeHandler}
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <BaseInput
                        label="City"
                        name="institutionInfo.city"
                        value={institutionInfo.city}
                        placeholder="e.g. Los Angeles"
                        onChange={changeHandler}
                      />
                    </Col>
                    <Col sm={6} xl={4}>
                      <Form.Group className="mb-2">
                        <Form.Label className="form-label text-default text-danger">
                          Country *
                        </Form.Label>
                        <SelectAnt
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
                      </Form.Group>
                    </Col>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
            <Card.Footer className="card-footer">
              <div>
                <BaseButton
                  variant="primary-gradient"
                  className="btn float-end btn-wave"
                  type="submit"
                  loading={loading}
                >
                  Update
                </BaseButton>
              </div>
            </Card.Footer>
          </Card>
        </Tab.Container>
      </Form>
    </Fragment>
  );
};

export default Profile;
