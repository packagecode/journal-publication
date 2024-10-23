import BaseButton from "@/components/core/BaseButton";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import OposedReviewer from "../FormComponent/OposedReviewer";

interface ComponentProps {
  currentScript: any;
}
const ReviewerList: React.FC<ComponentProps> = ({ currentScript }) => {
  const [entities, setEntities] = useState<any[]>([]);
  const [currentEntity, setCurrentEntity] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  const { axiosInstance, api } = useAxiosInstance();

  const fetchEntities = async () => {
    if (!currentScript) return;
    await axiosInstance
      .get(api(`manuscripts/${currentScript.id}/review-preferences`))
      .then((res) => setEntities(res.data.reviewers));
  };

  const handleDelete = (deleteID: number) => async () => {
    if (!currentScript) return;
    await axiosInstance
      .delete(
        api(`manuscripts/${currentScript.id}/review-preferences/${deleteID}`)
      )
      .then(() => {
        setEntities(entities.filter((r: any) => r.id !== deleteID));
      });
  };

  useEffect(() => {
    if (!currentScript) return;
    fetchEntities();
  }, [currentScript]);

  return (
    <Fragment>
      <Card className="custom-card border border-primary">
        <Card.Header className="justify-content-between">
          <Card.Title>Currently Opposed Reviewers List</Card.Title>
          <BaseButton
            variant="outline-light"
            onClick={() => {
              setCurrentEntity(null);
              setVisible(true);
            }}
          >
            <i className="ri-add-line"></i> Add Opposed Reviewer
          </BaseButton>
        </Card.Header>
        <Card.Body className="p-3">
          <Table className="table text-nowrap">
            <tbody className="table-warning">
              {entities.length == 0 && (
                <tr>
                  <td>There are currently no Opposed Reviewers in the list.</td>
                </tr>
              )}
              {entities.length > 0 &&
                entities.map((reviewer: any, index: number) => (
                  <tr key={`reviewer_${index}`}>
                    <td scope="col">
                      <BaseButton
                        variant="primary-transparent"
                        className="btn btn-icon rounded-pill btn-wave me-4"
                        onClick={() => {
                          setCurrentEntity(reviewer);
                          setVisible(true);
                        }}
                      >
                        <i className="ri-edit-line"></i>
                      </BaseButton>
                      <BaseButton
                        variant="danger-transparent"
                        className="btn btn-icon rounded-pill btn-wave"
                        onClick={handleDelete(reviewer.id)}
                      >
                        <i className="ri-delete-bin-6-line"></i>
                      </BaseButton>
                    </td>
                    <td scope="col">
                      {reviewer.first_name + " " + reviewer.last_name}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <OposedReviewer
        visible={visible}
        manuscriptId={currentScript && currentScript.id}
        currentEntity={currentEntity}
        onClose={() => setVisible(false)}
        onUpdate={(entity) => {
          if (entities.some((e: any) => e.id === entity.id)) {
            setEntities(
              entities.map((e: any) => (e.id === entity.id ? entity : e))
            );
          } else setEntities([...entities, entity]);
        }}
        onDelete={(entity: any) => {
          handleDelete(entity.id)();
          setVisible(false);
        }}
      />
    </Fragment>
  );
};

export default ReviewerList;
