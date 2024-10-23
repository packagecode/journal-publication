import Country from "@/assets/json/CountryCodes.json";
import { BaseInput } from "@/components";
import BaseButton from "@/components/core/BaseButton";
import BaseTooltip from "@/components/core/BaseTooltip";
import BaseModal from "@/components/modal/modal";
import { showToast } from "@/contexts/Toast";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { Divider, Select } from "antd";
import { useEffect, useState } from "react";
import { Col, Form, OverlayTrigger, Popover } from "react-bootstrap";

interface ComponentProps {
  visible: boolean;
  manuscriptId: string | number;
  currentEntity?: any;
  onUpdate?: (author: any) => void;
  onDelete?: (author: any) => void;
  onClose: () => void;
}

const formInitialValues = {
  title: "",
  first_name: "",
  last_name: "",
  degree: "",
  email: "",
  position: "",
  institution: "",
  country: "",
  corresponding_author: false,
};

const ScriptAuthor: React.FC<ComponentProps> = ({
  visible,
  manuscriptId,
  currentEntity,
  onUpdate,
  onDelete,
  onClose,
}) => {
  const [formData, setFormData] = useState(formInitialValues);
  const { axiosInstance, api } = useAxiosInstance();

  const changeHandler = (e: any) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSave = async (addAnother = false) => {
    if (manuscriptId === null) {
      showToast("error", "Please complete the first step");
      return;
    }
    await axiosInstance
      .post(api(`manuscripts/${manuscriptId}/authors`), formData)
      .then((res) => {
        if (onUpdate) onUpdate(res.data.author);
        if (addAnother) setFormData(formInitialValues);
        else handleModalClose();
      });
  };

  const handleUpdate = async () => {
    await axiosInstance
      .put(
        api(`manuscripts/${manuscriptId}/authors/${currentEntity.id}`),
        formData
      )
      .then((res) => {
        if (onUpdate) onUpdate(res.data.author);
        setFormData(formInitialValues);
        handleModalClose();
      });
  };

  const handleDelete = () => {
    if (onDelete) onDelete(currentEntity);
  };

  const handleModalClose = () => {
    setFormData(formInitialValues);
    onClose();
  };

  useEffect(() => {
    if (currentEntity) {
      setFormData({
        title: currentEntity.title,
        first_name: currentEntity.first_name,
        last_name: currentEntity.last_name,
        degree: currentEntity.degree,
        email: currentEntity.email,
        position: currentEntity.position,
        institution: currentEntity.institution,
        country: currentEntity.country,
        corresponding_author: currentEntity.corresponding_author,
      });
    }
  }, [currentEntity]);
  return (
    <BaseModal
      title={
        <div className="d-flex justify-content-start">
          {currentEntity && (
            <>
              <BaseTooltip
                content="Update this Author"
                className="tooltip-primary"
              >
                <BaseButton
                  variant="outline-primary"
                  className="me-3"
                  onClick={() => handleUpdate()}
                >
                  <i className="ri-save-line"></i>
                </BaseButton>
              </BaseTooltip>
              {!currentEntity.corresponding_author && (
                <BaseTooltip
                  content="Delete this Author"
                  className="tooltip-danger"
                >
                  <BaseButton
                    variant="outline-danger"
                    className="me-3"
                    onClick={() => handleDelete()}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </BaseButton>
                </BaseTooltip>
              )}
            </>
          )}
          {!currentEntity && (
            <>
              <BaseTooltip
                content="Save this Author"
                className="tooltip-primary"
              >
                <BaseButton
                  variant="outline-primary"
                  className="me-3"
                  onClick={() => handleSave()}
                >
                  <i className="ri-save-line"></i>
                </BaseButton>
              </BaseTooltip>
              <BaseTooltip
                content="Save & Add Another"
                className="tooltip-primary"
              >
                <BaseButton
                  variant="outline-primary"
                  className="me-3"
                  onClick={() => handleSave(true)}
                >
                  <i className="ri-file-add-line"></i>
                </BaseButton>
              </BaseTooltip>
              <BaseTooltip content="Clear form" className="tooltip-danger">
                <BaseButton
                  variant="outline-danger"
                  onClick={() => setFormData(formInitialValues)}
                >
                  <i className="ri-refresh-line"></i>
                </BaseButton>
              </BaseTooltip>
            </>
          )}
        </div>
      }
      show={visible}
      onCancel={handleModalClose}
      footer={null}
      body={
        <>
          <Divider orientation="left">
            {currentEntity
              ? `Edit Author: ${currentEntity.title} ${currentEntity.first_name} ${currentEntity.last_name}`
              : "Add New Author"}
          </Divider>
          <div className="mt-4">
            <BaseInput
              label="Title"
              labelPosition="left"
              labelRow={3}
              name="title"
              value={formData.title}
              onChange={changeHandler}
              required={true}
              className="mb-3"
              size="sm"
            />
            <BaseInput
              label="First Name"
              labelPosition="left"
              labelRow={3}
              name="first_name"
              value={formData.first_name}
              onChange={changeHandler}
              required={true}
              className="mb-3"
              size="sm"
            />
            <BaseInput
              label="Last Name"
              labelPosition="left"
              labelRow={3}
              name="last_name"
              value={formData.last_name}
              onChange={changeHandler}
              required={true}
              className="mb-3"
              size="sm"
            />
            <BaseInput
              label="Email"
              labelPosition="left"
              labelRow={3}
              name="email"
              value={formData.email}
              onChange={changeHandler}
              required={true}
              className="mb-3"
              size="sm"
            />
            <BaseInput
              label="Degree"
              labelPosition="left"
              labelRow={3}
              name="degree"
              value={formData.degree}
              onChange={changeHandler}
              className="mb-3"
              size="sm"
            />
            <BaseInput
              label="Position"
              labelPosition="left"
              labelRow={3}
              name="position"
              value={formData.position}
              onChange={changeHandler}
              className="mb-3"
              size="sm"
            />
            <BaseInput
              label="Institution"
              labelPosition="left"
              labelRow={3}
              name="institution"
              value={formData.institution}
              onChange={changeHandler}
              className="mb-3"
              size="sm"
            />
            <Form.Group className="mb-2 row">
              <div className="col-sm-3">
                <Form.Label className="form-label text-default">
                  Country
                </Form.Label>
              </div>
              <div className="col-sm-9">
                <Select
                  className="w-100"
                  allowClear
                  showSearch
                  value={formData.country}
                  filterOption
                  fieldNames={{
                    label: "name",
                    value: "name",
                  }}
                  options={Country.sort((a, b) => a.name.localeCompare(b.name))}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      country: value,
                    })
                  }
                />
              </div>
            </Form.Group>
            <Col xl={12} className="mt-4 ">
              <div className="d-flex justify-content-around">
                <Form.Check
                  type="checkbox"
                  name="corresponding_author"
                  id="corresponding_authorID"
                  className="form-check-md"
                  defaultChecked={formData.corresponding_author}
                  checked={formData.corresponding_author}
                  disabled={
                    currentEntity && currentEntity.corresponding_author
                      ? true
                      : false
                  }
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      corresponding_author: !prev.corresponding_author,
                    }));
                  }}
                  label="This is the corresponding author"
                />
                {currentEntity && currentEntity.corresponding_author && (
                  <OverlayTrigger
                    overlay={
                      <Popover>
                        <Popover.Body>
                          To change the corresponding author for a submission,
                          add the new Corresponding Author as an additional
                          author and select the 'This is the corresponding
                          author' checkbox. The current author will then be
                          automatically designated as a contributing author (and
                          may be removed).
                        </Popover.Body>
                      </Popover>
                    }
                    key={Math.random()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-secondary ms-2 mt-1"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                  </OverlayTrigger>
                )}
              </div>
            </Col>
          </div>
        </>
      }
    />
  );
};

export default ScriptAuthor;
