import face9 from "@/assets/images/faces/9.jpg";
import BaseButton from "@/components/core/BaseButton";
import BaseModal from "@/components/modal/modal";
import { Card, Col, ListGroup, Row } from "react-bootstrap";

interface ProfileProps {
  visible: boolean;
  onClose: () => void;
  currentEntity: any;
}

const ViewProfile: React.FC<ProfileProps> = ({
  visible,
  onClose,
  currentEntity,
}) => {
  return (
    <BaseModal
      title={<div className="d-flex justify-content-start"></div>}
      show={visible}
      onCancel={onClose}
      footer={null}
      width="xl"
      className="bg-journal"
      body={
        <>
          <Row>
            <Col xxl={5} xl={12}>
              <Card className="custom-card overflow-hidden">
                <Card.Body className="card-body p-0">
                  <div className="d-sm-flex align-items-top p-4 border-bottom-0 main-profile-cover">
                    <div>
                      <span className="avatar avatar-xxl avatar-rounded me-3">
                        <img src={face9} alt="" />
                      </span>
                    </div>
                    <div className="flex-fill main-profile-info">
                      <div className="d-flex align-items-center justify-content-between">
                        <h6 className="fw-semibold mb-1 text-fixed-white">
                          {currentEntity?.full_name}
                        </h6>
                      </div>
                      <p className="mb-1 text-muted text-fixed-white op-7">
                        {currentEntity?.institution_info?.position}
                      </p>
                      <div className="fs-12 text-fixed-white mb-4 op-5">
                        <span className="me-3">
                          <i className="bi bi-mortarboard me-1 align-middle"></i>
                          {currentEntity?.personal_info?.degree}
                        </span>
                        <div className="me-3">
                          <i className="ri-building-line me-1 align-middle"></i>
                          {currentEntity?.institution_info?.name}
                        </div>
                        <span>
                          <i className="ri-map-pin-line me-1 align-middle"></i>
                          {currentEntity?.institution_info?.country}
                        </span>
                      </div>
                      {/* <div className="d-flex mb-0">
                        <div className="me-4">
                          <p className="fw-bold fs-20 text-fixed-white text-shadow mb-0">
                            113
                          </p>
                          <p className="mb-0 fs-11 op-5 text-fixed-white">
                            Projects
                          </p>
                        </div>
                        <div className="me-4">
                          <p className="fw-bold fs-20 text-fixed-white text-shadow mb-0">
                            12.2k
                          </p>
                          <p className="mb-0 fs-11 op-5 text-fixed-white">
                            Followers
                          </p>
                        </div>
                        <div className="me-4">
                          <p className="fw-bold fs-20 text-fixed-white text-shadow mb-0">
                            128
                          </p>
                          <p className="mb-0 fs-11 op-5 text-fixed-white">
                            Following
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="p-4 border-bottom border-block-end-dashed">
                    <p className="fs-15 mb-2 me-4 fw-semibold">
                      Contact Information :
                    </p>
                    <div className="text-muted">
                      <p className="mb-2">
                        <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-muted">
                          <i className="ri-mail-line align-middle fs-14"></i>
                        </span>
                        {currentEntity?.email}
                      </p>
                      <p className="mb-2">
                        <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-muted">
                          <i className="ri-phone-line align-middle fs-14"></i>
                        </span>
                        {currentEntity?.phone}
                      </p>
                      <p className="mb-0">
                        <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-muted">
                          <i className="ri-map-pin-line align-middle fs-14"></i>
                        </span>
                        {currentEntity?.institution_info?.address}
                      </p>
                    </div>
                  </div>
                  <div className="ps-4 border-bottom border-block-end-dashed">
                    <div className="border-bottom border-block-end-dashed">
                      <p className="fs-15 mb-2 me-4 fw-semibold">
                        Personal Information :
                      </p>
                      <ListGroup>
                        <ListGroup.Item>
                          <div className="d-flex flex-wrap align-items-center">
                            <div className="me-2 fw-semibold">ORCID:</div>
                            <span className="fs-12 text-muted">
                              {currentEntity?.personal_info?.orcid}
                            </span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="d-flex flex-wrap align-items-center">
                            <div className="me-2 fw-semibold">Gender:</div>
                            <span className="fs-12 text-muted">
                              {currentEntity?.personal_info?.gender}
                            </span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="d-flex flex-wrap align-items-center">
                            <div className="me-2 fw-semibold">
                              Date of Birth:
                            </div>
                            <span className="fs-12 text-muted">
                              {currentEntity?.institution_info?.dob}
                            </span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="d-flex flex-wrap align-items-center">
                            <div className="me-2 fw-semibold">
                              Secondary Phone:
                            </div>
                            <span className="fs-12 text-muted">
                              {currentEntity?.institution_info?.phone}
                            </span>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>
                  <div className="ps-4 pt-4 border-bottom border-block-end-dashed">
                    <div className="border-bottom border-block-end-dashed">
                      <p className="fs-15 mb-2 me-4 fw-semibold">
                        Institution Information :
                      </p>
                      <ListGroup>
                        <ListGroup.Item>
                          <div className="d-flex flex-wrap align-items-center">
                            <div className="me-2 fw-semibold">Position:</div>
                            <span className="fs-12 text-muted">
                              {currentEntity?.institution_info?.position}
                            </span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="d-flex flex-wrap align-items-center">
                            <div className="me-2 fw-semibold">Department:</div>
                            <span className="fs-12 text-muted">
                              {currentEntity?.institution_info?.department}
                            </span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="d-flex flex-wrap align-items-center">
                            <div className="me-2 fw-semibold">Instition:</div>
                            <span className="fs-12 text-muted">
                              {currentEntity?.institution_info?.name}
                            </span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="d-flex flex-wrap align-items-center">
                            <div className="me-2 fw-semibold">Postal Code:</div>
                            <span className="fs-12 text-muted">
                              {currentEntity?.institution_info?.postal_code}
                            </span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="d-flex flex-wrap align-items-center">
                            <div className="me-2 fw-semibold">City:</div>
                            <span className="fs-12 text-muted">
                              {currentEntity?.institution_info?.city}
                            </span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="d-flex flex-wrap align-items-center">
                            <div className="me-2 fw-semibold">Country:</div>
                            <span className="fs-12 text-muted">
                              {currentEntity?.institution_info?.country}
                            </span>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={7} xl={12}>
              <Card className="custom-card overflow-hidden">
                <Card.Header>
                  <Card.Title>Latest 5 Manuscript's</Card.Title>
                </Card.Header>
                <Card.Body className="card-body">
                  <div className="row gy-3">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="rounded border">
                        <div className="p-3 d-flex align-items-top flex-wrap">
                          <div className="flex-fill">
                            <p className="mb-1 fw-semibold lh-1">
                              Manuscript Title here
                            </p>
                            <p className="fs-11 mb-2 text-muted">
                              24, Dec - 04:32PM
                            </p>
                            <p className="fs-12 text-muted mb-0">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                            </p>
                            <p className="fs-12 text-muted mb-3">
                              As opposed to using 'Content here &#128076;
                            </p>
                            <div className="d-flex align-items-center justify-content-between mb-md-0 mb-2">
                              <div>
                                <div className="btn-list">
                                  <BaseButton
                                    variant="primary-transparent"
                                    className="btn-wave"
                                  >
                                    Details
                                  </BaseButton>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="rounded border">
                        <div className="p-3 d-flex align-items-top flex-wrap">
                          <div className="flex-fill">
                            <p className="mb-1 fw-semibold lh-1">
                              Manuscript Title here
                            </p>
                            <p className="fs-11 mb-2 text-muted">
                              24, Dec - 04:32PM
                            </p>
                            <p className="fs-12 text-muted mb-0">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                            </p>
                            <p className="fs-12 text-muted mb-3">
                              As opposed to using 'Content here &#128076;
                            </p>
                            <div className="d-flex align-items-center justify-content-between mb-md-0 mb-2">
                              <div>
                                <div className="btn-list">
                                  <BaseButton
                                    variant="primary-transparent"
                                    className="btn-wave"
                                  >
                                    Details
                                  </BaseButton>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="rounded border">
                        <div className="p-3 d-flex align-items-top flex-wrap">
                          <div className="flex-fill">
                            <p className="mb-1 fw-semibold lh-1">
                              Manuscript Title here
                            </p>
                            <p className="fs-11 mb-2 text-muted">
                              24, Dec - 04:32PM
                            </p>
                            <p className="fs-12 text-muted mb-0">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                            </p>
                            <p className="fs-12 text-muted mb-3">
                              As opposed to using 'Content here &#128076;
                            </p>
                            <div className="d-flex align-items-center justify-content-between mb-md-0 mb-2">
                              <div>
                                <div className="btn-list">
                                  <BaseButton
                                    variant="primary-transparent"
                                    className="btn btn-wave"
                                  >
                                    Details
                                  </BaseButton>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="rounded border">
                        <div className="p-3 d-flex align-items-top flex-wrap">
                          <div className="flex-fill">
                            <p className="mb-1 fw-semibold lh-1">
                              Manuscript Title here
                            </p>
                            <p className="fs-11 mb-2 text-muted">
                              24, Dec - 04:32PM
                            </p>
                            <p className="fs-12 text-muted mb-0">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                            </p>
                            <p className="fs-12 text-muted mb-3">
                              As opposed to using 'Content here &#128076;
                            </p>
                            <div className="d-flex align-items-center justify-content-between mb-md-0 mb-2">
                              <div>
                                <div className="btn-list">
                                  <BaseButton
                                    variant="primary-transparent"
                                    className="btn btn-wave"
                                  >
                                    Details
                                  </BaseButton>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="rounded border">
                        <div className="p-3 d-flex align-items-top flex-wrap">
                          <div className="flex-fill">
                            <p className="mb-1 fw-semibold lh-1">
                              Manuscript Title here
                            </p>
                            <p className="fs-11 mb-2 text-muted">
                              24, Dec - 04:32PM
                            </p>
                            <p className="fs-12 text-muted mb-0">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                            </p>
                            <p className="fs-12 text-muted mb-3">
                              As opposed to using 'Content here &#128076;
                            </p>
                            <div className="d-flex align-items-center justify-content-between mb-md-0 mb-2">
                              <div>
                                <div className="btn-list">
                                  <BaseButton
                                    variant="primary-transparent"
                                    className="btn btn-wave"
                                  >
                                    Details
                                  </BaseButton>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      }
    />
  );
};
export default ViewProfile;
