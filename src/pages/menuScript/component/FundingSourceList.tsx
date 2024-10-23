import BaseButton from "@/components/core/BaseButton";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import FundingSource from "../FormComponent/FundingSource";

interface ComponentProps {
  currentScript: any;
}
const FundingSourceList: React.FC<ComponentProps> = ({ currentScript }) => {
  const [entities, setEntities] = useState<any[]>([]);
  const [currentEntity, setCurrentEntity] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  const { axiosInstance, api } = useAxiosInstance();

  const fetchEntities = async () => {
    if (!currentScript) return;
    await axiosInstance
      .get(api(`manuscripts/${currentScript.id}/funding-sources`))
      .then((res) => setEntities(res.data.funding_sources));
  };

  const handleDelete = (deleteID: number) => async () => {
    if (!currentScript) return;
    await axiosInstance
      .delete(
        api(`manuscripts/${currentScript.id}/funding-sources/${deleteID}`)
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
          <Card.Title>Current Funding Sources List</Card.Title>
          <BaseButton
            variant="outline-light"
            onClick={() => {
              setCurrentEntity(null);
              setVisible(true);
            }}
          >
            <i className="ri-add-line"></i> Add a Funding Source
          </BaseButton>
        </Card.Header>
        <Card.Body className="p-3">
          <Table className="table text-nowrap">
            <tbody className="table-warning">
              {entities.length == 0 && (
                <tr>
                  <td>There are currently no funding sources</td>
                </tr>
              )}
              {entities.length > 0 &&
                entities.map((entity: any, index: number) => (
                  <tr key={`fsource_${index}`}>
                    <td scope="col" width="20%">
                      <BaseButton
                        variant="primary-transparent"
                        className="btn btn-icon rounded-pill btn-wave me-4"
                        onClick={() => {
                          setCurrentEntity(entity);
                          setVisible(true);
                        }}
                      >
                        <i className="ri-edit-line"></i>
                      </BaseButton>
                      <BaseButton
                        variant="danger-transparent"
                        className="btn btn-icon rounded-pill btn-wave"
                        onClick={handleDelete(entity.id)}
                      >
                        <i className="ri-delete-bin-6-line"></i>
                      </BaseButton>
                    </td>
                    <td scope="col">{entity.founder_name}</td>
                    <td scope="col">{entity.award_number}</td>
                    <td scope="col">{entity.grant_recipient}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <FundingSource
        manuscriptId={currentScript && currentScript.id}
        currentEntity={currentEntity}
        visible={visible}
        onClose={() => setVisible(false)}
        onUpdate={(data: any) => {
          if (currentEntity) {
            setEntities(
              entities.map((e: any) => (e.id === currentEntity.id ? data : e))
            );
          } else {
            setEntities([...entities, data]);
          }
          setVisible(false);
        }}
        onDelete={(entity: any) => {
          handleDelete(entity.id)();
          setVisible(false);
        }}
      />
    </Fragment>
  );
};

export default FundingSourceList;
