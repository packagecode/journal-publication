import BaseModal from "@/components/modal/modal";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import face13 from "@/assets/images/faces/13.jpg";
import useGlobalService from "@/hooks/useGlobalService";
import { RootState } from "@/redux/store";
import moment from "moment";
import { useSelector } from "react-redux";

interface ProfileProps {
  visible: boolean;
  onClose: () => void;
  currentEntity: any;
}

const ViewManuscript: React.FC<ProfileProps> = ({
  visible,
  onClose,
  currentEntity,
}) => {
  const articleTypes = useSelector((state: RootState) => state.articleTypes);
  const { sanitizeHtml, numberToOrdinal } = useGlobalService();

  const dateFormat = (date: string, format: string = "DD MMM YYYY") => {
    return moment(date).format(format);
  };

  return (
    <BaseModal
      title={
        <div className="d-flex justify-content-start">
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(currentEntity?.title),
            }}
          />
        </div>
      }
      show={visible}
      onCancel={onClose}
      footer={null}
      width="xxl"
      className="bg-journal"
      body={
        <>
          <Row>
            <Col xl={9}>
              <Card className="custom-card">
                <div className="card-header justify-content-between">
                  <Card.Title>Abstract</Card.Title>
                  <div>{currentEntity?.script_number}</div>
                </div>
                <Card.Body>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(currentEntity?.abstract),
                    }}
                  />
                </Card.Body>
                <Card.Footer className="card-footer">
                  <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
                    <div>
                      <span className="d-block text-muted fs-12">
                        Submitted by
                      </span>
                      <div className="d-flex align-items-center">
                        <div className="me-2 lh-1">
                          <span className="avatar avatar-xs avatar-rounded">
                            <img src={face13} alt="" />
                          </span>
                        </div>
                        <span className="d-block fs-14 fw-semibold">
                          {currentEntity?.user?.full_name}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="d-block text-muted fs-12">
                        Submission Date
                      </span>
                      <span className="d-block fs-14 fw-semibold">
                        {dateFormat(currentEntity?.created_at)}
                      </span>
                    </div>
                    <div>
                      <span className="d-block text-muted fs-12">
                        Latest Status Date
                      </span>
                      <span className="d-block fs-14 fw-semibold">
                        {dateFormat(currentEntity?.latest_status?.created_at)}
                      </span>
                    </div>
                    <div>
                      <span className="d-block text-muted fs-12">Status</span>
                      <span className="d-block">
                        <span className="badge bg-primary-transparent">
                          {currentEntity?.status}
                        </span>
                      </span>
                    </div>
                    <div>
                      <span className="d-block text-muted fs-12">
                        Article Type
                      </span>
                      <span className="d-block fs-14 fw-semibold">
                        <span className="badge bg-success-transparent">
                          {
                            articleTypes.find(
                              (a) => a.value === currentEntity?.article_type
                            )?.label
                          }
                        </span>
                      </span>
                    </div>
                  </div>
                </Card.Footer>
              </Card>
              <Card className="custom-card">
                <Card.Header>
                  <Card.Title>Manuscript Status</Card.Title>
                </Card.Header>
                <Card.Body>
                  <ul className="timeline list-unstyled">
                    {currentEntity?.statuses?.map((status: any) => (
                      <li key={Math.random()}>
                        <div className="timeline-time text-end">
                          <span className="date">
                            {dateFormat(status.created_at, "dddd")}
                          </span>
                          <span className="time d-inline-block">
                            {dateFormat(status.created_at, "hh:mm A")}
                          </span>
                        </div>
                        <div className="timeline-icon">
                          <Link to="#"> </Link>
                        </div>
                        <div className="timeline-body">
                          <div className="d-flex align-items-top timeline-main-content flex-wrap mt-0">
                            <div className="flex-fill">
                              <div className="d-flex align-items-center">
                                <div className="mt-sm-0 mt-2">
                                  <p className="mb-0 fs-14 fw-semibold">
                                    {status.status}
                                  </p>
                                  <p className="mb-0 text-muted">
                                    {status.comments}
                                  </p>
                                </div>
                                <div className="ms-auto">
                                  <span className="float-end badge bg-light text-muted timeline-badge">
                                    {dateFormat(status.created_at)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3}>
              <Card className="custom-card">
                <Card.Header className="justify-content-between">
                  <Card.Title>Manuscript Author's</Card.Title>
                </Card.Header>
                <Card.Body className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table text-nowrap">
                      <tbody>
                        {currentEntity?.authors?.length === 0 && (
                          <tr>
                            <td>
                              <div className="fw-semibold">No Author's</div>
                            </td>
                          </tr>
                        )}
                        {currentEntity?.authors?.map(
                          (author: any, index: number) => (
                            <tr key={Math.random()}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="fw-semibold">{`${author.title} ${author.first_name} ${author.last_name}`}</div>
                                </div>
                                <div>[{numberToOrdinal(index + 1)} Author]</div>
                                {author.corresponding_author == 1 && (
                                  <div>[Corresponding Author]</div>
                                )}
                                {author.degree && <div>{author.degree}</div>}
                                {author.institution && (
                                  <div>{author.institution}</div>
                                )}
                                {author.country && <div>{author.country}</div>}
                                {author.email && <div>{author.email}</div>}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
              <Card className="custom-card">
                <Card.Header className="justify-content-between">
                  <Card.Title>Preferences Reviewer's</Card.Title>
                </Card.Header>
                <Card.Body className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table text-nowrap">
                      <tbody>
                        {currentEntity?.review_preferences?.length === 0 && (
                          <tr>
                            <td>
                              <div className="fw-semibold">No Reviewer's</div>
                            </td>
                          </tr>
                        )}
                        {currentEntity?.review_preferences?.map(
                          (reviewer: any) => (
                            <tr key={Math.random()}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="fw-semibold">{`${reviewer.first_name} ${reviewer.last_name}`}</div>
                                </div>
                                {reviewer.degree && (
                                  <div>{reviewer.degree}</div>
                                )}
                                {reviewer.institution && (
                                  <div>{reviewer.institution}</div>
                                )}
                                {reviewer.country && (
                                  <div>{reviewer.country}</div>
                                )}
                                {reviewer.email && <div>{reviewer.email}</div>}
                                {reviewer.reason && (
                                  <span className="d-block fs-14 fw-semibold">
                                    <span className="badge bg-success-transparent">
                                      {reviewer.reason}
                                    </span>
                                  </span>
                                )}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
              <Card className="custom-card">
                <Card.Header className="justify-content-between">
                  <Card.Title>Funding Sources</Card.Title>
                </Card.Header>
                <Card.Body className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table text-nowrap">
                      <tbody>
                        {currentEntity?.funding_sources?.length === 0 && (
                          <tr>
                            <td>
                              <div className="fw-semibold">
                                No Funding Sources
                              </div>
                            </td>
                          </tr>
                        )}
                        {currentEntity?.funding_sources?.map((source: any) => (
                          <tr key={Math.random()}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="fw-semibold">
                                  Founder Name: {source.founder_name}
                                </div>
                              </div>
                              {source.award_number && (
                                <div>Award Number: {source.award_number}</div>
                              )}
                              {source.grant_recipient && (
                                <div>
                                  Grant Recipient: {source.grant_recipient}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
              <Card className="custom-card overflow-hidden">
                <Card.Header>
                  <Card.Title>Attached Files</Card.Title>
                </Card.Header>
                <Card.Body className="p-0">
                  <ul className="list-group list-group-flush">
                    {currentEntity?.files?.map((file: any) => (
                      <li key={Math.random()} className="list-group-item">
                        <div className="d-flex align-items-center flex-wrap gap-2">
                          <div className="flex-fill">
                            <Link
                              to="#"
                              onClick={() => window.open(file.file_url)}
                            >
                              <span className="d-block fw-semibold">
                                {file.file_type}
                              </span>
                            </Link>
                            <span className="d-block text-muted fs-12 fw-normal">
                              {file.file_size} | {file.file_extension}
                            </span>
                          </div>
                          <div className="btn-list">
                            <Button
                              variant="info-light"
                              className="btn btn-sm btn-icon  btn-wave"
                              onClick={() => window.open(file.file_url)}
                            >
                              <i className="ri-download-2-line"></i>
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      }
    />
  );
};
export default ViewManuscript;
