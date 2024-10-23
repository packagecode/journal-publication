import BaseTable, {
  defaultPagination,
  formatedColumns,
} from "@/components/tables/BaseTable";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import useGlobalService from "@/hooks/useGlobalService";
import { TablePaginationConfig } from "antd";
import { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ViewManuscript from "../viewManuscript";
import TakeReview from "./takeReview";

const SubmissionNeedingRevision = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleTakeReview, setVisibleTakeReview] = useState(false);
  const [entities, setEntities] = useState([]);
  const [currentEntity, setCurrentEntity] = useState<any>();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    ...defaultPagination(),
    position: ["bottomCenter"],
  });
  const { axiosInstance, api } = useAxiosInstance();
  const { sanitizeHtml } = useGlobalService();

  const fetchEntities = async (page: number, pageSize: number) => {
    setLoading(true);
    await axiosInstance
      .get(
        api(
          `manuscripts?status=submitted&reviewStatus=accepted&page=${page}&per_page=${pageSize}`
        )
      )
      .then((response) => {
        const { current_page, data, total, per_page } =
          response.data.manuscripts;
        setEntities(
          data.map((script: any) => ({
            ...script,
            key: script.id,
          }))
        );
        setPagination((prev) => ({
          ...prev,
          current: current_page,
          pageSize: per_page,
          total: total,
        }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    fetchEntities(pagination.current!, pagination.pageSize!);
  };

  const handleViewScript = (record: any) => () => {
    setCurrentEntity(record);
    setVisible(true);
  };

  const handleTakeReview = (record: any) => () => {
    setCurrentEntity(record);
    setVisibleTakeReview(true);
  };

  const tableColumns = formatedColumns([
    {
      key: "action",
      render: (_row: any, record: any) => (
        <>
          <div>
            <Link to="#" onClick={handleViewScript(record)}>
              View Manuscript
            </Link>
          </div>
          <div>
            <Link to="#" onClick={handleTakeReview(record)}>
              Submit Review
            </Link>
          </div>
        </>
      ),
    },
    { title: "Manuscript Number", key: "script_number" },
    {
      key: "title",
      render: (text: string) => (
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(text),
          }}
        />
      ),
    },
    { title: "Current Status", key: "status" },
  ]);

  useEffect(() => {
    fetchEntities(pagination.current!, pagination.pageSize!);
  }, []);

  return (
    <Fragment>
      <Card className="custom-card overflow-hidden dashboard-right-panel">
        <Card.Header className="justify-content-between">
          <Card.Title>Submission Needing Revision</Card.Title>
        </Card.Header>
        <Card.Body className="p-0">
          <BaseTable
            loading={loading}
            dataSource={entities}
            columns={tableColumns}
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Card.Body>
      </Card>
      {visible && (
        <ViewManuscript
          visible={visible}
          currentEntity={currentEntity}
          onClose={() => setVisible(false)}
        />
      )}
      {visibleTakeReview && (
        <TakeReview
          visible={visibleTakeReview}
          currentEntity={currentEntity}
          onClose={() => setVisibleTakeReview(false)}
        />
      )}
    </Fragment>
  );
};

export default SubmissionNeedingRevision;
