import UserLazyDropdown from "@/components/LazyDropdown/UserLazyDropdown";
import TextEditor from "@/components/ReactQuill/editor";
import BaseButton from "@/components/core/BaseButton";
import BaseModal from "@/components/modal/modal";
import { AssignReviewerMail } from "@/components/sampleMail";
import BaseTable, { formatedColumns } from "@/components/tables/BaseTable";
import { showToast } from "@/contexts/Toast";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import SendMail from "@/pages/mail/sendMail";
import { Divider } from "antd";
import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";

interface AssignReviewerProps {
  visible: boolean;
  onClose: () => void;
  currentEntity: any;
}

const AssignReviewer: React.FC<AssignReviewerProps> = ({
  visible,
  onClose,
  currentEntity,
}) => {
  const [assignedReviewer, setAssignedReviewer] = useState<any>([]);
  const [reviewers, setReviewers] = useState<any>([]);
  const [selectReviewer, setSelectReviewer] = useState<any>();
  const [mailBody, setMailBody] = useState<any>(AssignReviewerMail);
  const { axiosInstance, api } = useAxiosInstance();
  const [loading, setLoading] = useState(false);
  const [visibleMail, setVisibleMail] = useState(false);
  const [currentReviewer, setCurrentReviewer] = useState<any>();

  const handleChangeReviewer = (value: any, options: any) => {
    if (value) {
      // Check if the reviewer already exists in the reviewers list
      if (reviewers.find((r: any) => r.reviewer_id === value)) {
        showToast("error", "Already added in list");
        return;
      }

      if (assignedReviewer.find((r: any) => r.user_id === value)) {
        showToast("error", "Already assigned reviewer");
        return;
      }

      // Add the new reviewer to the list
      setReviewers((prev: any) => [
        ...prev,
        { key: value, reviewer_id: value, label: options.label },
      ]);

      // Reset the selected reviewer state
      setSelectReviewer(null);
    }
  };

  const handleRemove = (row: any) => {
    setReviewers((prev: any) => {
      return prev.filter(
        (reviewer: any) => reviewer.reviewer_id !== row.reviewer_id
      );
    });
  };

  const handleSubmit = async () => {
    if (reviewers.length === 0) {
      showToast("error", "Please select reviewer");
      return;
    }
    setLoading(true);
    await axiosInstance
      .post(api("assignReviewer"), {
        manuscript_id: currentEntity?.id,
        reviewers: reviewers.map((r: any) => r.reviewer_id),
        mail_body: mailBody,
      })
      .then(() => {
        showToast("success", "Reviewer assigned successfully");
        setReviewers([]);
        fetchReviewers();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const removeAssignedReviewer = async (row: any) => {
    if (row.status != "pending") return;
    const index = assignedReviewer.findIndex(
      (reviewer: any) => reviewer.reviewer_id === row.reviewer_id
    );
    const newAssignedReviewer = [...assignedReviewer];
    newAssignedReviewer[index].loading = true;
    setAssignedReviewer(newAssignedReviewer);

    await axiosInstance
      .delete(
        api(`manuscripts/${currentEntity?.id}/reviewers/${row.reviewer_id}`)
      )
      .then(() => {
        showToast("success", "Reviewer removed successfully");
        fetchReviewers();
      })
      .catch(() => {
        setAssignedReviewer((prev: any) => {
          return prev.map((reviewer: any) => {
            return { ...reviewer, loading: false };
          });
        });
      })
      .finally(() => {
        setAssignedReviewer((prev: any) => {
          return prev.map((reviewer: any) => {
            return { ...reviewer, loading: false };
          });
        });
      });
  };

  const fetchReviewers = async () => {
    await axiosInstance
      .get(api(`manuscripts/${currentEntity.id}/reviewers?simple`))
      .then((response) => {
        const { reviewers } = response.data;
        setAssignedReviewer(
          reviewers.map((r: any) => ({
            ...r,
            key: Math.random(),
            loading: false,
          }))
        );
      });
  };

  useEffect(() => {
    if (currentEntity) {
      fetchReviewers();
    }
  }, [currentEntity]);

  return (
    <>
      <BaseModal
        title={
          <div className="d-flex justify-content-start">
            <div>Assign Reviewer for {currentEntity?.script_number}</div>
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
            <Card className="custom-card">
              <Card.Header className="justify-content-between">
                <Card.Title>
                  {assignedReviewer.length > 0
                    ? "Already Assign Reviewer's"
                    : "Assign Reviewer's"}
                </Card.Title>
              </Card.Header>
              <Card.Body className="card-body p-0">
                {assignedReviewer.length > 0 && (
                  <div className="mb-5">
                    <BaseTable
                      scroll={{ x: 500 }}
                      dataSource={assignedReviewer}
                      columns={formatedColumns([
                        {
                          key: "SI",
                          render: (_row: any, _record: any, index: number) =>
                            index + 1,
                        },
                        {
                          title: "Reviewer Name",
                          key: "user_info",
                        },
                        { key: "status" },
                        {
                          key: "Actions",
                          align: "center",
                          render: (_: any, record: any) => {
                            return (
                              <div className="d-flex justify-content-around">
                                <BaseButton
                                  variant="primary-transparent"
                                  size="sm"
                                  onClick={() => {
                                    setVisibleMail(true);
                                    setCurrentReviewer(record);
                                  }}
                                >
                                  Send E-mail
                                </BaseButton>
                                {record.status === "pending" && (
                                  <BaseButton
                                    variant="danger-transparent"
                                    size="sm"
                                    onClick={() =>
                                      removeAssignedReviewer(record)
                                    }
                                    loading={record.loading}
                                  >
                                    Remove
                                  </BaseButton>
                                )}
                              </div>
                            );
                          },
                        },
                      ])}
                      pagination={false}
                    />
                  </div>
                )}
                <UserLazyDropdown
                  label="Add Reviewer"
                  value={selectReviewer}
                  itemText="user_info"
                  itemValue="user_id"
                  resourceKey="entities"
                  endPoint={`entities?role=reviewer&excepts=${currentEntity?.user_id}`}
                  placeholder="Select Reviewer"
                  onChange={handleChangeReviewer}
                />
                <Divider orientation="left">Selected Reviewer's</Divider>
                <BaseTable
                  scroll={{ x: 500 }}
                  dataSource={reviewers}
                  columns={formatedColumns([
                    {
                      key: "SI",
                      render: (_row: any, _record: any, index: number) =>
                        index + 1,
                    },
                    {
                      key: "action",
                      render: (_row: any, record: any) => (
                        <>
                          <div>
                            <BaseButton
                              size="sm"
                              variant="danger-transparent"
                              onClick={() => handleRemove(record)}
                            >
                              Remove
                            </BaseButton>
                          </div>
                        </>
                      ),
                    },
                    { title: "Reviewer Name", key: "label" },
                  ])}
                  pagination={false}
                />
                {reviewers.length > 0 && (
                  <>
                    <Form.Label className="form-label mt-4">
                      Mail Body
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="text-center">
                      Available Variable : <b>[Reviewer’s Name]</b> &nbsp;{" "}
                      <b>[Manuscript Title]</b> &nbsp; <b>[Manuscript ID]</b>{" "}
                    </div>
                    <div className="mb-3 border border-primary">
                      <TextEditor
                        value={mailBody}
                        onChange={(value) => setMailBody(value)}
                      />
                    </div>
                  </>
                )}
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-around col-md-4 col-12">
                  <BaseButton
                    variant="primary-gradient"
                    loading={loading}
                    onClick={handleSubmit}
                  >
                    Assign Now
                  </BaseButton>
                </div>
              </Card.Footer>
            </Card>
            <SendMail
              visible={visibleMail}
              onClose={() => setVisibleMail(false)}
              emails={[currentReviewer?.user_mail]}
            />
          </>
        }
      />
    </>
  );
};

export default AssignReviewer;
