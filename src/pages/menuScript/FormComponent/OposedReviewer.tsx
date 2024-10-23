import Country from "@/assets/json/CountryCodes.json";
import { BaseInput } from "@/components";
import BaseButton from "@/components/core/BaseButton";
import BaseTooltip from "@/components/core/BaseTooltip";
import BaseModal from "@/components/modal/modal";
import { showToast } from "@/contexts/Toast";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { Divider, Select } from "antd";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

interface OposedReviewerProps {
  visible: boolean;
  manuscriptId: string | number;
  currentEntity?: any;
  onUpdate?: (reviewer: any) => void;
  onDelete?: (reviewer: any) => void;
  onClose: () => void;
}

const formInitialValues = {
  first_name: "",
  last_name: "",
  degree: "",
  email: "",
  position: "",
  department: "",
  institution: "",
  country: "",
  reason: "",
};

const OposedReviewer: React.FC<OposedReviewerProps> = ({
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
      .post(api(`manuscripts/${manuscriptId}/review-preferences`), formData)
      .then((res) => {
        if (onUpdate) onUpdate(res.data.reviewer);
        if (addAnother) setFormData(formInitialValues);
        else handleModalClose();
      });
  };

  const handleUpdate = async () => {
    await axiosInstance
      .put(
        api(
          `manuscripts/${manuscriptId}/review-preferences/${currentEntity.id}`
        ),
        formData
      )
      .then((res) => {
        if (onUpdate) onUpdate(res.data.reviewer);
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
        first_name: currentEntity.first_name,
        last_name: currentEntity.last_name,
        degree: currentEntity.degree,
        email: currentEntity.email,
        position: currentEntity.position,
        department: currentEntity.department,
        institution: currentEntity.institution,
        country: currentEntity.country,
        reason: currentEntity.reason || "",
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
                content="Update this Reviewer"
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
              <BaseTooltip
                content="Delete this Reviewer"
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
            </>
          )}
          {!currentEntity && (
            <>
              <BaseTooltip
                content="Save this Reviewer"
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
                content="Save & Add another"
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
              ? "Edit Reviewer - " + currentEntity.first_name
              : "Add New Reviewer"}{" "}
          </Divider>
          <div className="mt-4">
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
            <BaseInput
              label="Department"
              labelPosition="left"
              labelRow={3}
              name="department"
              value={formData.department}
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
            <div className="mb-3">
              <Form.Label htmlFor="reason">Reason</Form.Label>
              <Form.Control
                as="textarea"
                id="reason"
                placeholder="write reason here..."
                value={formData.reason}
                name="reason"
                onChange={changeHandler}
              ></Form.Control>
            </div>
          </div>
        </>
      }
    />
  );
};

export default OposedReviewer;
