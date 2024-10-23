import { BaseInput } from "@/components";
import BaseButton from "@/components/core/BaseButton";
import BaseModal from "@/components/modal/modal";
import TextEditor from "@/components/ReactQuill/editor";
import { SampleMail } from "@/components/sampleMail";
import { showToast } from "@/contexts/Toast";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { useState } from "react";
import { Card, Form } from "react-bootstrap";

interface Props {
  visible: boolean;
  onClose: () => void;
  emails: string[];
}

const SendMail: React.FC<Props> = ({ visible, onClose, emails }) => {
  const [mailBody, setMailBody] = useState<any>(SampleMail);
  const [subject, setSubject] = useState<string>("");
  const { axiosInstance, api } = useAxiosInstance();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subject) {
      showToast("error", "Subject is required");
      return;
    }
    setLoading(true);
    await axiosInstance
      .post(api("send-mail"), {
        subject,
        body: mailBody,
        emails,
      })
      .then(() => {
        showToast("success", "Mail sent successfully");
        setLoading(false);
        onClose();
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <BaseModal
      title={
        <div className="d-flex justify-content-start">
          <div>Send Mail</div>
        </div>
      }
      show={visible}
      onCancel={onClose}
      footer={null}
      width="lg"
      className="bg-journal"
      maskClosable={false}
      body={
        <>
          <Card className="custom-card">
            <Card.Body className="card-body p-0">
              <BaseInput
                label="Subject"
                type="text"
                name="subject"
                value={subject}
                placeholder="Write your subject here"
                onChange={(e) => setSubject(e.target.value)}
              />

              <Form.Label className="form-label mt-4">Mail Body</Form.Label>
              <div className="mb-3 border border-primary">
                <TextEditor
                  value={mailBody}
                  onChange={(value) => setMailBody(value)}
                />
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="">
                <BaseButton
                  variant="primary-gradient"
                  loading={loading}
                  onClick={handleSubmit}
                >
                  Send
                </BaseButton>
              </div>
            </Card.Footer>
          </Card>
        </>
      }
    />
  );
};

export default SendMail;
