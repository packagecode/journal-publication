import Country from "@/assets/json/CountryCodes.json";
import { BaseInput } from "@/components";
import BaseButton from "@/components/core/BaseButton";
import BaseModal from "@/components/modal/modal";
import { showToast } from "@/contexts/Toast";
import useAuthService from "@/hooks/useAuthService";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { RootState } from "@/redux/store";
import { Select, Steps } from "antd";
import { useEffect, useState } from "react";
import { Button, Col, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { useSelector } from "react-redux";

const formInitialValues = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
  password_confirmation: "",
  as_reviewer: false,
  role: [],
};

const perInfoInitialValues = {
  degree: "",
  orcid: "",
  phone: "",
  address: "",
};

const instInfoInitialValues = {
  name: "",
  position: "",
  department: "",
  address: "",
  postal_code: "",
  city: "",
  country: "",
};

interface AddUserProps {
  visible: boolean;
  createRole?: string;
  currentEntity?: any;
  onClose: () => void;
  onCreated?: (user: any) => void;
  onUpdated?: (user: any) => void;
}

const AddUser: React.FC<AddUserProps> = ({
  visible,
  createRole,
  currentEntity,
  onClose,
  onCreated,
  onUpdated,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [current, setCurrent] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const [validated, setValidated] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(formInitialValues);
  const [personalInfo, setPersonalInfo] = useState(perInfoInitialValues);
  const [institutionInfo, setInstitutionInfo] = useState(instInfoInitialValues);
  const { checkAvailability } = useAuthService();
  const JournalRoles: any = useSelector(
    (state: RootState) => state.journalRoles
  );
  const { axiosInstance, api } = useAxiosInstance();
  const [feedback, setFeedback] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    degree: "",
    role: "",
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
    if (!/^[a-zA-Z0-9_]*$/.test(username)) {
      setFeedback((prev) => ({
        ...prev,
        username: "Username should not contain special characters or spaces",
      }));
      return;
    } else {
      setFeedback((prev) => ({ ...prev, username: "" }));
    }
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

  const handleFormReset = () => {
    setFormData(formInitialValues);
    setPersonalInfo(perInfoInitialValues);
    setInstitutionInfo(instInfoInitialValues);
  };

  const handleUpdate = async () => {
    if (!currentEntity) return;
    setLoading(true);
    await axiosInstance
      .put(api(`users/${currentEntity.id}`), {
        ...formData,
        personalInfo,
        institutionInfo,
      })
      .then((response) => {
        showToast("success", "User has been updated successfully");
        if (onUpdated) onUpdated(response.data.user);
        handleFormReset();
        onClose();
        setCurrent(0);
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

  const handleSubmit = async (event: {
    preventDefault: () => void;
    stopPropagation: () => void;
    currentTarget: { checkValidity: () => boolean };
  }) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isUpdate && current != completeStep) {
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
    // update the user
    if (isUpdate) {
      await handleUpdate();
      return;
    }

    // submit the form
    setLoading(true);
    await axiosInstance
      .post(api("users"), {
        ...formData,
        personalInfo,
        institutionInfo,
      })
      .then((response) => {
        showToast("success", "User has been created successfully");
        const { user } = response.data;
        if (user.roles.includes(createRole)) {
          onCreated && onCreated(user);
        }
        handleFormReset();
        onClose();
        setCurrent(0);
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

  const validateField = (field: string, errorMessage: string) => {
    if (!formData[field as keyof typeof formData]) {
      setFeedback((prev) => ({ ...prev, [field]: errorMessage }));
      return false;
    } else {
      setFeedback((prev) => ({ ...prev, [field]: "" }));
      return true;
    }
  };

  const next = () => {
    let isValid = true;

    const validateStep = (validations: any) => {
      validations.forEach(
        ({ field, message }: { field: string; message: string }) => {
          isValid = validateField(field, message) && isValid;
        }
      );
    };

    if (current === 0) {
      validateStep([
        { field: "username", message: "Username field is required" },
        { field: "email", message: "Email field is required" },
      ]);

      if (!formData.password && !isUpdate) {
        setFeedback((prev) => ({
          ...prev,
          password: "Password field is required",
        }));
        isValid = false;
      } else if (
        formData.password &&
        formData.password !== formData.password_confirmation
      ) {
        setFeedback((prev) => ({
          ...prev,
          password: "Password & Confirm Password must be the same",
        }));
        isValid = false;
      } else {
        setFeedback((prev) => ({ ...prev, password: "" }));
      }
    }

    if (current === 1) {
      if (!isUpdate && current !== completeStep) {
        showToast("error", "Please complete the previous steps");
        return;
      }

      validateStep([
        { field: "first_name", message: "First Name field is required" },
        { field: "last_name", message: "Last Name field is required" },
      ]);
    }

    if (isValid) {
      setCompleteStep(current + 1);
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    if (createRole) {
      setFormData((prev: any) => ({
        ...prev,
        role: [createRole],
      }));
    }
  }, [createRole]);

  useEffect(() => {
    if (formData.role.length == 0) {
      setFormData((prev: any) => ({
        ...prev,
        role: [createRole],
      }));
    }
  }, [formData]);

  useEffect(() => {
    if (currentEntity) {
      setCurrent(0);
      setIsUpdate(true);
      setFormData({
        ...formData,
        username: currentEntity.username,
        first_name: currentEntity.first_name,
        last_name: currentEntity.last_name,
        email: currentEntity.email,
        phone: currentEntity.phone,
        as_reviewer: currentEntity.as_reviewer,
        role: currentEntity.roles.map((role: any) => role.name),
      });

      setPersonalInfo({
        degree: currentEntity.personal_info?.degree,
        orcid: currentEntity.personal_info?.orcid,
        phone: currentEntity.personal_info?.phone,
        address: currentEntity.personal_info?.address,
      });

      setInstitutionInfo({
        name: currentEntity.institution_info?.name,
        position: currentEntity.institution_info?.position,
        department: currentEntity.institution_info?.department,
        address: currentEntity.institution_info?.address,
        postal_code: currentEntity.institution_info?.postal_code,
        city: currentEntity.institution_info?.city,
        country: currentEntity.institution_info?.country,
      });
    } else {
      setIsUpdate(false);
      setFormData(formInitialValues);
      setPersonalInfo(perInfoInitialValues);
      setInstitutionInfo(instInfoInitialValues);
    }
  }, [currentEntity]);

  return (
    <BaseModal
      title={<div className="d-flex justify-content-start"></div>}
      show={visible}
      onCancel={onClose}
      footer={null}
      width="lg"
      maskClosable={false}
      body={
        <>
          <div className="row gy-3">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Steps
                type="navigation"
                size="small"
                className="site-navigation-steps"
                current={current}
                onChange={(value) => setCurrent(value)}
                items={[
                  {
                    subTitle: "Login Information",
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
                      <Form.Group className="mb-2 row">
                        <div className="col-sm-3">
                          <Form.Label className="form-label text-default text-danger">
                            Roles *
                          </Form.Label>
                        </div>
                        <div className="col-sm-9">
                          <Select
                            className="w-100"
                            value={formData.role}
                            filterOption
                            options={JournalRoles}
                            mode="tags"
                            tokenSeparators={[","]}
                            onChange={(value) =>
                              setFormData({
                                ...formData,
                                role: value,
                              })
                            }
                          />
                          {feedback.role && (
                            <Form.Control.Feedback type="invalid">
                              {feedback.role}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col xl={12} className="mt-4">
                      <BaseInput
                        label="Username"
                        labelPosition="left"
                        labelRow={3}
                        name="username"
                        value={formData.username}
                        placeholder="e.g. joneleo"
                        required={!isUpdate}
                        disabled={isUpdate}
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
                        type={passwordShow ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        placeholder="******"
                        required={!isUpdate}
                        onChange={changeHandler}
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
                    <Col xl={12} className="mt-4 mb-3">
                      <BaseInput
                        label="Confirm Password"
                        labelPosition="left"
                        labelRow={3}
                        type={passwordShow ? "text" : "password"}
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        placeholder="******"
                        required={!isUpdate}
                        onChange={changeHandler}
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
                                    An ORCID iD is a nonproprietary alphanumeric
                                    code that uniquely identifies an academic
                                    author. It is a 16-digit code, in the
                                    format: 0000-0000-0000-000X. Publishers use
                                    it to unambiguously attribute any published
                                    work to the correct authors. ORCID is a
                                    not-for-profit association of publishers and
                                    academic organizations that maintains the
                                    central registry of these personal
                                    identifiers (ORCID iDs) and associated
                                    public profiles for authors in academic
                                    publishing. Please visit http://orcid.org/
                                    for more information.
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
                      <Form.Label xl={2} className="float-start text-danger">
                        Available as a Reviewer?*
                      </Form.Label>
                      <div className="d-flex justify-content-around">
                        <Form.Check
                          type="radio"
                          name="as_reviewer"
                          id="as_reviewer_yes"
                          className="form-check-md"
                          defaultChecked={formData.as_reviewer}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              as_reviewer: true,
                            }));
                          }}
                          label="Yes"
                        />
                        <Form.Check
                          type="radio"
                          name="as_reviewer"
                          id="as_reviewer_no"
                          className="form-check-md"
                          defaultChecked={!formData.as_reviewer}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              as_reviewer: false,
                            }));
                          }}
                          label="No"
                        />
                      </div>
                    </Col>
                  </>
                )}
              </div>
              <Col xl={12} className="d-flex justify-content-around mt-2">
                {current > 0 && (
                  <BaseButton variant="warning-gradient" onClick={prev}>
                    Previous
                  </BaseButton>
                )}
                {!isUpdate && (
                  <BaseButton
                    variant="outline-primary"
                    onClick={handleFormReset}
                  >
                    Reset
                  </BaseButton>
                )}
                <BaseButton variant="outline-primary" onClick={() => onClose()}>
                  Cancel
                </BaseButton>
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
                      cursor:
                        !isUpdate && completeStep < 2 ? "not-allowed" : "",
                    }}
                  >
                    Submit
                  </BaseButton>
                )}
              </Col>
            </Form>
          </div>
        </>
      }
    />
  );
};

export default AddUser;
