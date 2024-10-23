import TextEditor from "@/components/ReactQuill/editor";
import BaseButton from "@/components/core/BaseButton";
import BaseModal from "@/components/modal/modal";
import { showToast } from "@/contexts/Toast";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { Select } from "antd";
import { useState } from "react";
import { Card } from "react-bootstrap";

interface TakeReviewProps {
  visible: boolean;
  onClose: () => void;
  currentEntity: any;
}
const TakeReview: React.FC<TakeReviewProps> = ({
  visible,
  onClose,
  currentEntity,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    type: "minor",
    author_comment: "",
    editor_comment: "",
  });
  const { axiosInstance, api } = useAxiosInstance();

  const handleClickSubmit = async () => {
    setLoading(true);
    await axiosInstance
      .post(api(`manuscripts/${currentEntity.id}/reviewers`), formData)
      .then(() => {
        showToast("success", "Review submitted successfully");
        onClose();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <BaseModal
        title={
          <div className="d-flex justify-content-start">
            <div>
              Reviewer Recommendation and Comments for Manuscript Number{" "}
              {currentEntity?.script_number}
            </div>
          </div>
        }
        show={visible}
        onCancel={onClose}
        footer={null}
        width="xl"
        className="bg-journal"
        maskClosable={false}
        body={
          <>
            <div className="">
              <Card className="custom-card overflow-hidden dashboard-right-panel">
                <Card.Header className="justify-content-between">
                  <Card.Title>Reviewer Recommendation</Card.Title>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="text-muted">
                    Please provide your recommendation for the manuscript
                  </div>
                  <Select
                    className="w-100"
                    value={formData.type}
                    options={[
                      { label: "Minor Revision", value: "minor" },
                      { label: "Major Revision", value: "major" },
                    ]}
                    onChange={(value) =>
                      setFormData({ ...formData, type: value })
                    }
                  />
                </Card.Body>
              </Card>
              <Card className="custom-card overflow-hidden dashboard-right-panel">
                <Card.Header className="justify-content-between">
                  <Card.Title>Reviewer commments to Author</Card.Title>
                </Card.Header>
                <Card.Body className="p-1">
                  <TextEditor
                    value={formData.author_comment}
                    onChange={(value) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        author_comment: value,
                      }))
                    }
                  />
                </Card.Body>
              </Card>
              <Card className="custom-card overflow-hidden dashboard-right-panel">
                <Card.Header className="justify-content-between">
                  <Card.Title>
                    Reviewer Confidentail commments to Editor
                  </Card.Title>
                </Card.Header>
                <Card.Body className="p-1">
                  <TextEditor
                    value={formData.editor_comment}
                    onChange={(value) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        editor_comment: value,
                      }))
                    }
                  />
                </Card.Body>
              </Card>
              <div className="d-flex justify-content-between">
                <BaseButton variant="warning-transparent" onClick={onClose}>
                  Cancel
                </BaseButton>
                <BaseButton
                  variant="primary"
                  loading={loading}
                  onClick={handleClickSubmit}
                >
                  Submit Review
                </BaseButton>
              </div>
            </div>
          </>
        }
      />
    </>
  );
};

export default TakeReview;
