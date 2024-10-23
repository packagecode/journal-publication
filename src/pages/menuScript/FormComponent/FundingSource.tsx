import { BaseInput } from "@/components";
import BaseButton from "@/components/core/BaseButton";
import BaseTooltip from "@/components/core/BaseTooltip";
import BaseModal from "@/components/modal/modal";
import { showToast } from "@/contexts/Toast";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { Divider } from "antd";
import { useEffect, useState } from "react";

interface ComponentProps {
  visible: boolean;
  manuscriptId: string | number;
  currentEntity?: any;
  onUpdate?: (reviewer: any) => void;
  onDelete?: (reviewer: any) => void;
  onClose: () => void;
}

const formInitialValues = {
  founder_name: "",
  award_number: "",
  grant_recipient: "",
};

const LABEL_ROW = 4;

const FundingSource: React.FC<ComponentProps> = ({
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
      .post(api(`manuscripts/${manuscriptId}/funding-sources`), formData)
      .then((res) => {
        if (onUpdate) onUpdate(res.data.funding_source);
        if (addAnother) setFormData(formInitialValues);
        else handleModalClose();
      });
  };

  const handleUpdate = async () => {
    await axiosInstance
      .put(
        api(`manuscripts/${manuscriptId}/funding-sources/${currentEntity.id}`),
        formData
      )
      .then((res) => {
        if (onUpdate) onUpdate(res.data.funding_source);
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
        founder_name: currentEntity.founder_name,
        award_number: currentEntity.award_number,
        grant_recipient: currentEntity.grant_recipient,
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
                content="Update this Funding Source"
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
                content="Delete this Funding Source"
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
                content="Save this Funding Source"
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
              ? "Edit Funding Source - " + currentEntity.founder_name
              : "Add New Funding Source"}
          </Divider>
          <div className="mt-4">
            <BaseInput
              label="Founder Name"
              labelPosition="left"
              labelRow={LABEL_ROW}
              name="founder_name"
              value={formData.founder_name}
              onChange={changeHandler}
              className="mb-3"
              size="sm"
            />
            <BaseInput
              label="Award Number"
              labelPosition="left"
              labelRow={LABEL_ROW}
              name="award_number"
              value={formData.award_number}
              onChange={changeHandler}
              className="mb-3"
              size="sm"
            />
            <BaseInput
              label="Grant Recipient"
              labelPosition="left"
              labelRow={LABEL_ROW}
              name="grant_recipient"
              value={formData.grant_recipient}
              onChange={changeHandler}
              className="mb-3"
              size="sm"
            />
          </div>
        </>
      }
    />
  );
};

export default FundingSource;
