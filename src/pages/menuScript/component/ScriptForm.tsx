import FileUpload from "@/components/FileUpload/FileUpload";
import Editor from "@/components/ReactQuill/editor";
import BaseButton from "@/components/core/BaseButton";
import { showToast } from "@/contexts/Toast";
import useAxiosInstance from "@/hooks/useAxiosInstance";
// import useGlobalService from "@/hooks/useGlobalService";
import { SetIsFetchScriptCount } from "@/redux/action";
import { RootState } from "@/redux/store";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Divider, Modal, Select, Steps } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { Accordion, Card, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AdditionalInformation from "./AdditionalInformation";
import AuthorsList from "./AuthorsList";
import FundingSourceList from "./FundingSourceList";
import ReviewerList from "./ReviewerList";

const { confirm } = Modal;
interface ScriptFormProps {
  currentScript?: any;
  isUpdate?: boolean;
  onUpdate?: (data: any) => void;
}

const ScriptForm: React.FC<ScriptFormProps> = ({
  currentScript,
  isUpdate,
  onUpdate,
}) => {
  const articleTypes = useSelector((state: RootState) => state.articleTypes);
  const scriptFileTypes = useSelector(
    (state: RootState) => state.scriptFileTypes
  );
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const [stepError, setStepError] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const [storedFiles, setStoredFiles] = useState<any>([]);
  const [files, setFiles] = useState<File[]>([]);
  const { axiosInstance, api } = useAxiosInstance();
  const [formData, setFormData] = useState<any>({
    article_type: "original_paper",
    title: "",
    abstract: "",
    keywords: "",
    cover_letter: "",
    comments: "",
    status: "draft",
  });
  const [fileType, setFileType] = useState("manuscript");
  const [currentAccordian, setCurrentAccordian] = useState(0);

  const navigate = useNavigate();
  const [loading, setLoading] = useState<any>({
    submitLater: false,
    submitNow: false,
  });

  const handleUploadedFiles = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    // if (uploadedFiles.length > 0) setFeedback("");
  };

  const fetchScriptFiles = async () => {
    if (currentScript === null) return;
    await axiosInstance
      .get(api(`manuscripts/${currentScript.id}/files`))
      .then((response) => {
        const { files } = response.data;
        setStoredFiles(files);

        const scriptMissing = files.some(
          (f: any) => f.file_type === "manuscript"
        );
        setStepError((prev) => ({ ...prev, 1: !scriptMissing }));
      });
  };

  const saveManuscriptFiles = async () => {
    if (currentScript === null) {
      showToast("error", "Please complete the first step");
      setFiles([]);
      return;
    }
    const form = new FormData();
    form.append("file", files[0]);
    form.append("file_type", fileType);

    await axiosInstance
      .post(api(`manuscripts/${currentScript.id}/files`), form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setStoredFiles([...storedFiles, response.data.file]);
        setFiles([]);
        if (fileType === "manuscript") setStepError({ ...stepError, 1: false });
        setFileType("manuscript");
      });
  };

  const handleDeleteScriptFile = (fileId: number) => async () => {
    await axiosInstance
      .delete(api(`manuscripts/${currentScript.id}/files/${fileId}`))
      .then(() => {
        setStoredFiles(storedFiles.filter((f: any) => f.id !== fileId));
      });
  };

  const checkFiles = (type: string) => {
    return (
      storedFiles.length > 0 &&
      storedFiles.some((f: any) => f.file_type === type)
    );
  };

  const saveMenuScript = async () => {
    if (isUpdate) {
      await axiosInstance
        .put(api(`manuscripts/${currentScript.id}`), formData)
        .then((response) => {
          onUpdate && onUpdate(response.data.manuscript);
        });
    } else
      await axiosInstance
        .post(api("manuscripts"), formData)
        .then((response) => {
          onUpdate && onUpdate(response.data.manuscript);
        });
  };

  const nextStep = () => {
    if (current === 0 || current === 4) {
      saveMenuScript();
    }
    if (current === 1 && !checkFiles("manuscript")) {
      setStepError((prev) => ({ ...prev, 1: true }));
    }

    if (current === 3) {
      if (
        formData.conflict_interest === "" ||
        formData.availability_statement === "" ||
        formData.data_supporting === "" ||
        formData.special_issue === "" ||
        formData.separate_section === "" ||
        formData.human_animal_rights === ""
      ) {
        setStepError((prev) => ({ ...prev, 3: true }));
      }
      saveMenuScript();
    }

    if (current === 5) {
      if (
        formData.title === "" ||
        formData.abstract === "" ||
        formData.title === null ||
        formData.abstract === null
      ) {
        setStepError((prev) => ({ ...prev, 5: true }));
      } else {
        setStepError((prev) => ({ ...prev, 5: false }));

        const hasError = Object.values(stepError).some(
          (error) => error === true
        );
        if (hasError) {
          showToast(
            "error",
            "Please resolve the step errors before submitting"
          );
          return;
        }
        confirm({
          title: "Do you want to submit now?",
          icon: <ExclamationCircleFilled />,
          content:
            "Once submit, manuscript status will shown as submitted, then you can't change until editor decision.",
          cancelText: "No",
          okText: "Yes, Submit",
          okButtonProps: {
            className: "btn-primary",
          },
          onOk() {
            setLoading((prev: any) => ({ ...prev, submitNow: true }));
            setFormData((prev: any) => ({ ...prev, status: "submitted" }));
          },
        });
      }
    } else {
      setCurrent(current + 1);
    }
  };

  const prevStep = () => {
    setCurrent(current - 1);
  };

  const saveSubmitLater = () => {
    setLoading((prev: any) => ({ ...prev, submitLater: true }));
    setFormData((prev: any) => ({ ...prev, status: "incomplete" }));
  };

  useEffect(() => {
    if (currentScript) {
      fetchScriptFiles();
      setFormData({
        article_type: currentScript.article_type,
        title: currentScript.title,
        abstract: currentScript.abstract,
        keywords: currentScript.keywords,
        cover_letter: currentScript.cover_letter,
        comments: currentScript.comments || "",
        status: currentScript.status,
        conflict_interest: currentScript.conflict_interest,
        availability_statement: currentScript.availability_statement,
        data_supporting: currentScript.data_supporting,
        special_issue: currentScript.special_issue,
        separate_section: currentScript.separate_section,
        human_animal_rights: currentScript.human_animal_rights,
      });

      const aditionalCheck = [
        "conflict_interest",
        "availability_statement",
        "data_supporting",
        "special_issue",
        "separate_section",
        "human_animal_rights",
      ];

      const hasError = aditionalCheck.some(
        (key) => currentScript[key] === "" || currentScript[key] === null
      );
      let errors: any = { 3: hasError };

      const scriptDataCheck = ["title", "abstract"];
      if (currentScript.status === "incomplete") {
        const hasError5 = scriptDataCheck.some(
          (key) => currentScript[key] === "" || currentScript[key] === null
        );
        errors = { ...errors, 5: hasError5 };
      }
      setStepError((prev) => ({ ...prev, ...errors }));
    }
  }, [currentScript]);

  useEffect(() => {
    if (files.length > 0) {
      saveManuscriptFiles();
    }
  }, [files]);

  useEffect(() => {
    if (loading.submitLater || loading.submitNow) {
      saveMenuScript();
      dispatch(SetIsFetchScriptCount(true));
      if (loading.submitLater)
        navigate("/manu-script/submission-incomplete", { replace: true });
      if (loading.submitNow)
        navigate("/manu-script/submission-processed", { replace: true });
    }
  }, [loading, formData]);

  return (
    <Card className="custom-card overflow-hidden">
      <Card.Header className="justify-content-between">
        <Card.Title>Submit New Menuscript</Card.Title>
      </Card.Header>
      <Card.Body className="p-3">
        <Steps
          //   type="navigation"
          size="small"
          //   className="site-navigation-steps"
          current={current}
          labelPlacement="vertical"
          onChange={(value) => setCurrent(value)}
          items={[
            {
              title: "Article Type Selection",
            },
            {
              title: "Attach Files",
              status: stepError[1]
                ? "error"
                : checkFiles("manuscript")
                ? "finish"
                : undefined,
            },
            {
              title: "Review Preferences",
              status: stepError[2] ? "error" : undefined,
            },
            {
              title: "Additional Information",
              status: stepError[3] ? "error" : undefined,
            },
            {
              title: "Comments",
              status: stepError[4] ? "error" : undefined,
            },
            {
              title: "Manuscript Data",
              status: stepError[5] ? "error" : undefined,
            },
          ]}
        />
        <div className="pt-5 pb-4">
          {current === 0 && (
            <Row>
              <Col md={3}>
                <p className="mb-2">
                  Choose the Article Type of your submission from the drop-down
                  menu.
                </p>
                <p className="mb-2 mt-4">
                  By submitting a manuscript, the author(s) or rightsholder(s),
                  as the case may be, agree(s) to the{" "}
                  <Link
                    to="/about"
                    className="text-info text-decoration-underline"
                  >
                    terms and conditions
                  </Link>{" "}
                  of this journal.
                </p>
              </Col>
              <Col md={9}>
                <Card className="custom-card border border-primary ">
                  <Card.Header className="justify-content-between">
                    <Card.Title>Select Article Type</Card.Title>
                  </Card.Header>
                  <Card.Body className="p-3">
                    <Col xxl={6} lg={12} className="mb-3">
                      <Select
                        className="w-100"
                        value={formData.article_type}
                        filterOption
                        options={articleTypes}
                        onChange={(value) =>
                          setFormData((prev: any) => ({
                            ...prev,
                            article_type: value,
                          }))
                        }
                      />
                    </Col>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-end">
                    <BaseButton
                      size="sm"
                      variant="primary-gradient"
                      className="fs-5"
                      onClick={nextStep}
                    >
                      <span>Proceed</span>
                      <i className="ri-arrow-right-line"></i>
                    </BaseButton>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          )}
          {current === 1 && (
            <Row>
              <Col md={3}>
                <p
                  className={`mb-2 ${
                    checkFiles("manuscript") ? "text-success" : "text-danger"
                  }`}
                >
                  {checkFiles("manuscript") ? (
                    <>
                      <i className="ri-checkbox-circle-line"></i> Manuscript
                    </>
                  ) : (
                    <>
                      <i className="ri-file-warning-line"></i> Manuscript
                    </>
                  )}
                </p>
                <p className="mb-2 mt-2">
                  <b>Please provide any additional items.</b>
                </p>
              </Col>
              <Col md={9}>
                <Card className="custom-card card-bg-light">
                  <Card.Body className="p-3 row">
                    <Col xxl={6} xl={12} className="mb-3">
                      <Form.Label className="form-label">
                        Select Item Type
                      </Form.Label>
                      <Select
                        className="w-100"
                        value={fileType}
                        filterOption
                        options={scriptFileTypes}
                        onChange={(value) => setFileType(value)}
                      />
                    </Col>
                    <Col xxl={6} xl={12} className="mb-3">
                      <FileUpload
                        id="fileUploader"
                        files={files}
                        accept="*"
                        // feedback={feedback}
                        // onUploadedFiles={handleUploadedFiles}
                        onUploadedFiles={async (files) =>
                          handleUploadedFiles(files)
                        }
                      />
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
              <Col xxl={12}>
                <Table className="table text-nowrap">
                  <thead className="table-warning">
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">File Name </th>
                      <th scope="col">Size</th>
                      <th scope="col">Last Modified</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storedFiles.map((file: any, index: number) => (
                      <tr key={index}>
                        <td>
                          {
                            scriptFileTypes.find(
                              (f) => f.value === file.file_type
                            )?.label
                          }
                        </td>
                        <td>{file.file_name}</td>
                        <td>{file.file_size}</td>
                        <td>{moment(file.updated_at).format("DD MMM YYYY")}</td>
                        <td>
                          <BaseButton
                            size="sm"
                            variant="primary-transparent"
                            className="btn btn-icon rounded-pill btn-wave me-2"
                            onClick={() => window.open(file.file_url)}
                          >
                            <i className="ri-file-download-line"></i>
                          </BaseButton>
                          <BaseButton
                            size="sm"
                            variant="danger-transparent"
                            className="btn btn-icon rounded-pill btn-wave"
                            onClick={handleDeleteScriptFile(file.id)}
                          >
                            <i className="ri-delete-bin-6-line"></i>
                          </BaseButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              <div className="d-flex justify-content-end mt-5">
                <BaseButton
                  size="sm"
                  variant="primary-transparent"
                  className="fs-6 me-3"
                  onClick={prevStep}
                >
                  <i className="ri-arrow-left-line"></i>
                  <span>Back</span>
                </BaseButton>
                <BaseButton
                  size="sm"
                  variant="primary-gradient"
                  className="fs-5"
                  onClick={nextStep}
                >
                  <span>Proceed</span>
                  <i className="ri-arrow-right-line"></i>
                </BaseButton>
              </div>
            </Row>
          )}
          {current === 2 && (
            <Row>
              <Col md={12}>
                <Accordion
                  defaultActiveKey="0"
                  className="accordion accordion-customicon1 accordions-items-seperate"
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Oppose Reviewers</Accordion.Header>
                    <Accordion.Body>
                      <p
                        className="text-black"
                        style={{ textAlign: "justify" }}
                      >
                        Please identify anyone who you would prefer not to
                        review this submission. Fill in as much contact
                        information as possible to allow us to identify the
                        person in our records, and provide specific reasons why
                        each person should not review your submission in their
                        comments box. Please note that we may need to use a
                        reviewer that you identify here, but will try to
                        accommodate author's wishes when we can.
                      </p>
                      <Divider />
                      <ReviewerList currentScript={currentScript} />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <div className="d-flex justify-content-end mt-3">
                  <BaseButton
                    size="sm"
                    variant="primary-transparent"
                    className="fs-6 me-3"
                    onClick={prevStep}
                  >
                    <i className="ri-arrow-left-line"></i>
                    <span>Back</span>
                  </BaseButton>
                  <BaseButton
                    size="sm"
                    variant="primary-gradient"
                    className="fs-5"
                    onClick={nextStep}
                  >
                    <span>Proceed</span>
                    <i className="ri-arrow-right-line"></i>
                  </BaseButton>
                </div>
              </Col>
            </Row>
          )}
          {current === 3 && (
            <>
              <AdditionalInformation
                onUpdate={(data) =>
                  setFormData((prev: any) => ({ ...prev, ...data }))
                }
                currentScript={currentScript}
                onError={(error) =>
                  setStepError((prev) => ({ ...prev, 3: error }))
                }
              />
              <div className="d-flex justify-content-end mt-3">
                <BaseButton
                  size="sm"
                  variant="primary-transparent"
                  className="fs-6 me-3"
                  onClick={prevStep}
                >
                  <i className="ri-arrow-left-line"></i>
                  <span>Back</span>
                </BaseButton>
                <BaseButton
                  size="sm"
                  variant="primary-gradient"
                  className="fs-5"
                  onClick={nextStep}
                >
                  <span>Proceed</span>
                  <i className="ri-arrow-right-line"></i>
                </BaseButton>
              </div>
            </>
          )}
          {current === 4 && (
            <Row>
              <Col md={12}>
                <Accordion
                  defaultActiveKey="0"
                  className="accordion accordion-customicon1 accordions-items-seperate"
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Enter Comments</Accordion.Header>
                    <Accordion.Body>
                      <p
                        className="text-black"
                        style={{ textAlign: "justify" }}
                      >
                        Please enter any additional comments you would like to
                        send to the publication office. These comments will not
                        appear directly in your submission.
                      </p>
                      <Divider />

                      <div className="mb-3">
                        <Form.Control
                          as="textarea"
                          placeholder="write comments here..."
                          value={formData.comments}
                          name="comments"
                          onChange={(e) =>
                            setFormData((prev: any) => ({
                              ...prev,
                              comments: e.target.value,
                            }))
                          }
                        ></Form.Control>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <div className="d-flex justify-content-end mt-3">
                  <BaseButton
                    size="sm"
                    variant="primary-transparent"
                    className="fs-6 me-3"
                    onClick={prevStep}
                  >
                    <i className="ri-arrow-left-line"></i>
                    <span>Back</span>
                  </BaseButton>
                  <BaseButton
                    size="sm"
                    variant="primary-gradient"
                    className="fs-5"
                    onClick={nextStep}
                  >
                    <span>Proceed</span>
                    <i className="ri-arrow-right-line"></i>
                  </BaseButton>
                </div>
              </Col>
            </Row>
          )}
          {current === 5 && (
            <Row>
              <Col md={12}>
                <Accordion
                  activeKey={currentAccordian.toString()}
                  onSelect={(key) =>
                    setCurrentAccordian(
                      currentAccordian === Number(key) ? 10 : Number(key)
                    )
                  }
                  className="accordion accordion-customicon1 accordions-items-seperate"
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Title</Accordion.Header>
                    <Accordion.Body>
                      <Form.Label className="form-label">
                        Full Title (required){" "}
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="mb-3 border border-primary">
                        <Editor
                          value={formData.title}
                          onChange={(value) =>
                            setFormData((prev: any) => ({
                              ...prev,
                              title: value,
                            }))
                          }
                        />
                      </div>
                      {/* <div
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(formData.title),
                        }}
                      /> */}
                      <BaseButton
                        size="sm"
                        variant="primary-transparent"
                        className="float-end"
                        onClick={() => setCurrentAccordian(1)}
                      >
                        <i className="ri-arrow-down-line me-2"></i>
                        <span>Next </span>
                      </BaseButton>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Abstract</Accordion.Header>
                    <Accordion.Body>
                      <Form.Label className="form-label">
                        Abstract (required){" "}
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="mb-3 border border-primary">
                        <Editor
                          withHeading={true}
                          value={formData.abstract}
                          onChange={(value) =>
                            setFormData((prev: any) => ({
                              ...prev,
                              abstract: value,
                            }))
                          }
                        />
                      </div>
                      <BaseButton
                        size="sm"
                        variant="primary-transparent"
                        className="float-end"
                        onClick={() => setCurrentAccordian(2)}
                      >
                        <i className="ri-arrow-down-line me-2"></i>
                        <span>Next </span>
                      </BaseButton>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Author</Accordion.Header>
                    <Accordion.Body>
                      <AuthorsList currentScript={currentScript} />
                      <BaseButton
                        size="sm"
                        variant="primary-transparent"
                        className="float-end"
                        onClick={() => setCurrentAccordian(3)}
                      >
                        <i className="ri-arrow-down-line me-2"></i>
                        <span>Next </span>
                      </BaseButton>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Funding Information</Accordion.Header>
                    <Accordion.Body>
                      <p
                        className="text-black"
                        style={{ textAlign: "justify" }}
                      >
                        Please choose a funding source from the list that
                        displays as you start to enter the funder's name. If you
                        are unable to make a selection from the list you can
                        continue to enter the entire funder's name. Then enter
                        the award number and select the award recipient.
                      </p>
                      <Divider orientation="left">
                        Required <span className="text-danger">*</span>
                      </Divider>
                      <FundingSourceList currentScript={currentScript} />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <div className="d-flex justify-content-end mt-3">
                  <BaseButton
                    size="sm"
                    variant="primary-transparent"
                    className="fs-6 me-3"
                    onClick={prevStep}
                  >
                    <i className="ri-arrow-left-line"></i>
                    <span>Back</span>
                  </BaseButton>
                  <BaseButton
                    size="sm"
                    variant="primary-gradient"
                    className="fs-6 me-3"
                    onClick={saveSubmitLater}
                    loading={loading.submitLater}
                  >
                    <span>Save & Submit Later</span>
                  </BaseButton>
                  <BaseButton
                    size="sm"
                    variant="primary-gradient"
                    className="fs-6"
                    onClick={nextStep}
                    loading={loading.submitNow}
                  >
                    <span>Submit now</span>
                  </BaseButton>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ScriptForm;
