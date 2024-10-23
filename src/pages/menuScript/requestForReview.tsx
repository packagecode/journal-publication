import BaseButton from "@/components/core/BaseButton";
import BaseTable, {
  defaultPagination,
  formatedColumns,
} from "@/components/tables/BaseTable";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import useGlobalService from "@/hooks/useGlobalService";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm, TablePaginationConfig } from "antd";
import { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ViewManuscript from "./viewManuscript";

const RequestForReview = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
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
          `request-for-review?status=pending&page=${page}&per_page=${pageSize}`
        )
      )
      .then((response) => {
        const { current_page, manuscripts, total, per_page } = response.data;
        setEntities(
          manuscripts.map((script: any) => ({
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

  const handleViewScript = async (record: any) => {
    await axiosInstance
      .get(api(`manuscripts/${record.manuscript_id}`))
      .then((response) => {
        setCurrentEntity(response.data.manuscript);
        setVisible(true);
      });
  };

  const handleStatusAction = async (record: any, status: string) => {
    await axiosInstance
      .put(api(`manuscripts/${record.manuscript_id}/reviewers/${record.id}`), {
        status,
      })
      .then(() => {
        fetchEntities(pagination.current!, pagination.pageSize!);
      });
  };

  const tableColumns = formatedColumns([
    {
      key: "action",
      width: 150,
      render: (_row: any, record: any) => (
        <>
          <div className="mb-3">
            <Popconfirm
              title="Are you sure you want to accept for review this manuscript?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              okText="Yes, Accept"
              okButtonProps={{ className: "btn-success-transparent" }}
              onConfirm={() => handleStatusAction(record, "accepted")}
            >
              <BaseButton variant="primary-transparent" className="me-2">
                Accept
              </BaseButton>
            </Popconfirm>
            <Popconfirm
              title="Are you sure you want to reject this manuscript?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              okText="Yes, Reject"
              okButtonProps={{ className: "btn-success-transparent" }}
              onConfirm={() => handleStatusAction(record, "rejected")}
            >
              <BaseButton variant="danger-transparent">Reject</BaseButton>
            </Popconfirm>
          </div>
          <div>
            <BaseButton
              variant="link"
              className="p-0 text-primary"
              onClick={() => handleViewScript(record)}
            >
              View Manuscript
            </BaseButton>
          </div>
        </>
      ),
    },
    {
      title: "Manuscript Number",
      key: "manuscript",
      render: (manuscript: any) => manuscript.script_number,
    },
    {
      title: "title",
      key: "manuscript",
      render: (manuscript: any) => (
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(manuscript.title),
          }}
        />
      ),
    },
    { key: "status" },
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
    </Fragment>
  );
};

export default RequestForReview;
