import { useEffect, useState } from "react";
import { Accordion, Card, Col, Form, Row } from "react-bootstrap";

interface AdditionalInformationProps {
  onUpdate?: (data: any) => void;
  onError?: (error: boolean) => void;
  currentScript?: any;
}

const AdditionalInformation: React.FC<AdditionalInformationProps> = ({
  onUpdate,
  onError,
  currentScript,
}) => {
  const [formData, setFormData] = useState({
    conflict_interest: "",
    availability_statement: "",
    data_supporting: "",
    special_issue: "",
    separate_section: "",
    human_animal_rights: "",
  });

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    onUpdate && onUpdate(formData);
    const areAllFilled = Object.values(formData).every((value) => value !== "");
    const anyValues = Object.values(formData).some((value) => value !== "");

    if (anyValues)
      if (areAllFilled) {
        onError && onError(false);
      } else {
        onError && onError(true);
      }
  }, [formData]);

  useEffect(() => {
    if (currentScript) {
      setFormData({
        conflict_interest: currentScript.conflict_interest || "",
        availability_statement: currentScript.availability_statement || "",
        data_supporting: currentScript.data_supporting || "",
        special_issue: currentScript.special_issue || "",
        separate_section: currentScript.separate_section || "",
        human_animal_rights: currentScript.human_animal_rights || "",
      });
    }
  }, [currentScript]);

  return (
    <Row>
      <Col md={12}>
        <Accordion
          defaultActiveKey="0"
          className="accordion accordion-customicon1 accordions-items-seperate"
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Questionnaire</Accordion.Header>
            <Accordion.Body>
              <Card className="card border border-success custom-card">
                <Card.Body>
                  <p className="card-text">
                    Please verify that you have included a conflict of interest
                    statement in your manuscript. A conflict of interest exists
                    whenever an author has a financial or personal relationship
                    with a third party whose interests could be positively or
                    negatively influenced by the article’s content. This should
                    be added in a separate section before the reference list. If
                    no conflict of interest exists for all participating
                    authors, the corresponding author should use the following
                    wording: On behalf of all authors, the corresponding author
                    states that there is no conflict of interest.
                  </p>
                  <Col className="row">
                    <Col md={3}>
                      <span className="text-danger">Answer required</span>
                    </Col>
                    <Col md={9}>
                      <Form.Group className="mb-3 d-flex">
                        <Form.Check
                          type="radio"
                          className="form-check-md me-3"
                          id="conflictOfInterestNo"
                          name="conflict_interest"
                          value="No"
                          checked={formData.conflict_interest === "No"}
                          label="No"
                          onChange={handleInputChange}
                        />
                        <Form.Check
                          type="radio"
                          className="form-check-md"
                          id="conflictOfInterestYes"
                          name="conflict_interest"
                          value="Yes"
                          checked={formData.conflict_interest === "Yes"}
                          label="Yes, conflict of interest statement include"
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Col>
                </Card.Body>
              </Card>
              <Card className="card border border-success custom-card">
                <Card.Body>
                  <p className="card-text">
                    Please confirm that you have included a data availability
                    statement in your main manuscript file. Templates and
                    examples can be found in the instructions for authors.
                  </p>
                  <Col className="row">
                    <Col md={3}>
                      <span className="text-danger">Answer required</span>
                    </Col>
                    <Col md={9}>
                      <Form.Group className="mb-3 d-flex">
                        <Form.Check
                          type="radio"
                          className="form-check-md me-3"
                          id="availabilityStatementNo"
                          name="availability_statement"
                          value="No"
                          checked={formData.availability_statement === "No"}
                          label="No"
                          onChange={handleInputChange}
                        />
                        <Form.Check
                          type="radio"
                          className="form-check-md"
                          id="availabilityStatementYes"
                          name="availability_statement"
                          value="Yes"
                          checked={formData.availability_statement === "Yes"}
                          label="Yes, data availability statement include"
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Col>
                </Card.Body>
              </Card>
              <Card className="card border border-success custom-card">
                <Card.Body>
                  <p className="card-text">
                    In addition to including a data availability statement in
                    your manuscript file, please choose the statement below
                    which best describes the accessibility of any data
                    supporting your manuscript.
                  </p>
                  <Col className="row">
                    <Col md={3}>
                      <span className="text-danger">Answer required</span>
                    </Col>
                    <Col md={9}>
                      <Form.Group className="mb-3 d-flex">
                        <Form.Check
                          type="radio"
                          className="form-check-md me-3"
                          id="dataSupportingNo"
                          name="data_supporting"
                          value="No"
                          checked={formData.data_supporting === "No"}
                          label="No"
                          onChange={handleInputChange}
                        />
                        <Form.Check
                          type="radio"
                          className="form-check-md"
                          id="dataSupportingYes"
                          name="data_supporting"
                          value="Yes"
                          checked={formData.data_supporting === "Yes"}
                          label="Yes"
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Col>
                </Card.Body>
              </Card>
              <Card className="card border border-success custom-card">
                <Card.Body>
                  <p className="card-text">
                    Does this manuscript belong to a special issue?
                  </p>
                  <Col className="row">
                    <Col md={3}>
                      <span className="text-danger">Answer required</span>
                    </Col>
                    <Col md={9}>
                      <Form.Group className="mb-3 d-flex">
                        <Form.Check
                          type="radio"
                          className="form-check-md me-3"
                          id="specialIssueNo"
                          name="special_issue"
                          value="No"
                          checked={formData.special_issue === "No"}
                          label="No"
                          onChange={handleInputChange}
                        />
                        <Form.Check
                          type="radio"
                          className="form-check-md"
                          id="specialIssueYes"
                          name="special_issue"
                          value="Yes"
                          checked={formData.special_issue === "Yes"}
                          label="Yes"
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Col>
                </Card.Body>
              </Card>
              <Card className="card border border-success custom-card">
                <Card.Body>
                  <p className="card-text">
                    Please verify that you have included an informed consent
                    statement in your manuscript. Informed consent ensures that
                    participants understand the nature of their involvement and
                    have voluntarily agreed to participate without coercion. If
                    no issues regarding informed consent exist, please add the
                    following statement: "On behalf of all authors, the
                    corresponding author states that informed consent was
                    obtained from all participants involved in the study." This
                    should be placed in a separate section before the reference
                    list.
                  </p>
                  <Col className="row">
                    <Col md={3}>
                      <span className="text-danger">Answer required</span>
                    </Col>
                    <Col md={9}>
                      <Form.Group className="mb-3 d-flex">
                        <Form.Check
                          type="radio"
                          className="form-check-md me-3"
                          id="separateSectionNo"
                          name="separate_section"
                          value="No"
                          checked={formData.separate_section === "No"}
                          label="No"
                          onChange={handleInputChange}
                        />
                        <Form.Check
                          type="radio"
                          className="form-check-md"
                          id="separateSectionYes"
                          name="separate_section"
                          value="Yes"
                          checked={formData.separate_section === "Yes"}
                          label="Yes, Informed Consent statement included."
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Col>
                </Card.Body>
              </Card>
              <Card className="card border border-success custom-card">
                <Card.Body>
                  <p className="card-text">
                    Please verify that you have included a statement on human
                    and animal rights in your manuscript. Human and animal
                    rights are fundamental, ensuring ethical treatment and
                    welfare. If no concerns regarding human and animal rights
                    exist, please include the following statement: "On behalf of
                    all authors, the corresponding author affirms that human and
                    animal rights were upheld in the study." This should be
                    positioned in a separate section before the reference list.
                  </p>
                  <Col className="row">
                    <Col md={3}>
                      <span className="text-danger">Answer required</span>
                    </Col>
                    <Col md={9}>
                      <Form.Group className="mb-3 d-flex">
                        <Form.Check
                          type="radio"
                          className="form-check-md me-3"
                          id="humanAnimalRightsNo"
                          name="human_animal_rights"
                          value="No"
                          checked={formData.human_animal_rights === "No"}
                          label="No"
                          onChange={handleInputChange}
                        />
                        <Form.Check
                          type="radio"
                          className="form-check-md"
                          id="humanAnimalRightsYes"
                          name="human_animal_rights"
                          value="Yes"
                          checked={formData.human_animal_rights === "Yes"}
                          label="Yes, Human and Animal Rights statement included."
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Col>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  );
};

export default AdditionalInformation;
