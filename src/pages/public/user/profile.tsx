import { BaseInput } from "@/components";
import BaseButton from "@/components/core/BaseButton";
import { showToast } from "@/contexts/Toast";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { SetUser } from "@/redux/action";
import { RootState } from "@/redux/store";
import { Fragment, useState } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

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
    confirm_password: "",
    gender: user?.gender,
    dob: user?.dob,
  });
  const [feedback, setFeedback] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    dob: "",
  });

  const changeHandler = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        formData.confirm_password &&
        e.target.value !== formData.confirm_password
      ) {
        setFeedback({
          ...feedback,
          password: "Oops! The passwords don’t match. Please try again",
        });
      }
    } else if (e.target.name === "confirm_password") {
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
      setValidated(true);
      return;
    }

    if (formData.password && formData.confirm_password !== formData.password) {
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
    }
    delete (formData as any).confirm_password;
    setLoading(true);
    await axiosInstance
      .patch(api("users/" + user.id), formData)
      .then((response) => {
        dispatch(SetUser(response.data.user));
        setValidated(false);
        setFeedback({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: "",
          gender: "",
          dob: "",
        });
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
        <Card className="custom-card overflow-hidden dashboard-right-panel">
          <Card.Header className="justify-content-between">
            <Card.Title>{user?.full_name} Profile</Card.Title>
          </Card.Header>
          <Card.Body className="p-4">
            <div className="row gy-4">
              <Col xl={4}>
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
              <Col xl={4}>
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
              <Col xl={4}>
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
              <Col xl={4}>
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
              <Col xl={4}>
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
              <Col xl={4}>
                <BaseInput
                  label="Confirm Password"
                  type={passwordShow ? "text" : "password"}
                  name="confirm_password"
                  value={formData.confirm_password}
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
              <Col xl={4}>
                <Form.Label>Date of Birth</Form.Label>
                <DatePicker
                  selected={formData.dob}
                  onChange={(date: any) =>
                    setFormData({ ...formData, dob: date })
                  }
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                  isClearable
                />
              </Col>
              <Col xl={4}>
                <Form.Label>Gender</Form.Label>
                <Select
                  name="gender"
                  options={genderOptions}
                  className="basic-multi-select "
                  isSearchable
                  menuPlacement="auto"
                  classNamePrefix="Select2"
                  onChange={(selectedOption: any) =>
                    setFormData({ ...formData, gender: selectedOption.value })
                  }
                  defaultValue={genderOptions.find(
                    (g) => g.value === formData.gender
                  )}
                />
              </Col>
            </div>
          </Card.Body>
          <Card.Footer className="card-footer">
            <div>
              <BaseButton
                variant="outline-primary"
                className="btn float-end btn-wave"
                type="submit"
                loading={loading}
              >
                Update
              </BaseButton>
            </div>
          </Card.Footer>
        </Card>
      </Form>
    </Fragment>
  );
};

export default Profile;
