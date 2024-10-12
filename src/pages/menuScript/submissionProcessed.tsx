import BaseTable, {
  defaultPagination,
  formatedColumns,
} from "@/components/tables/BaseTable";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import useGlobalService from "@/hooks/useGlobalService";
import { TablePaginationConfig } from "antd";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const SubmissionsProcessed = () => {
  const [loading, setLoading] = useState(false);
  const [entities, setEntities] = useState([]);
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
        api(`manuscripts?status=submitted&page=${page}&per_page=${pageSize}`)
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

  const tableHeaders = () => {
    return (
      <div className="d-flex justify-content-between align-items-center"></div>
    );
  };

  const tableColumns = formatedColumns([
    {
      key: "action",
      render: (_row: any, _record: any) => (
        <>
          <div>
            <Link to="#">Send E-mail</Link>
          </div>
        </>
      ),
    },
    { key: "manuscript_number" },
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
    {
      title: "Date Submission Began",
      key: "created_at",
      render: (text: string) => moment(text).format("DD MMM YYYY"),
    },
    {
      title: "Status Date",
      key: "latest_status",
      render: (latest_status: any) =>
        moment(latest_status.created_at).format("DD MMM YYYY"),
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
          <Card.Title>Submissions Being Processed</Card.Title>
        </Card.Header>
        <Card.Body className="p-0">
          <BaseTable
            title={tableHeaders}
            loading={loading}
            dataSource={entities}
            columns={tableColumns}
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default SubmissionsProcessed;
