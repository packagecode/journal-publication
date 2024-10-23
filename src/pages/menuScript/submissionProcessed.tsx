import BaseButton from "@/components/core/BaseButton";
import BaseTable, {
  defaultPagination,
  formatedColumns,
} from "@/components/tables/BaseTable";
import useAuthService from "@/hooks/useAuthService";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import useGlobalService from "@/hooks/useGlobalService";
import { TablePaginationConfig } from "antd";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import SendMail from "../mail/sendMail";
import AssignReviewer from "./component/AssignReviewer";
import ViewManuscript from "./viewManuscript";

const SubmissionsProcessed = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleReviewer, setVisibleReviewer] = useState(false);
  const [entities, setEntities] = useState([]);
  const [currentEntity, setCurrentEntity] = useState<any>();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    ...defaultPagination(),
    position: ["bottomCenter"],
  });
  const { currentRole } = useAuthService();
  const { axiosInstance, api } = useAxiosInstance();
  const { sanitizeHtml } = useGlobalService();
  const [visibleMail, setVisibleMail] = useState(false);

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

  const handleViewScript = (record: any) => () => {
    setCurrentEntity(record);
    setVisible(true);
  };

  const assignReviewer = (record: any) => () => {
    setCurrentEntity(record);
    setVisibleReviewer(true);
  };

  const handleSendMail = (record: any) => () => {
    setCurrentEntity(record);
    setVisibleMail(true);
  };

  const tableColumns = formatedColumns([
    {
      key: "action",
      width: 180,
      render: (_row: any, record: any) => (
        <>
          <div>
            <BaseButton
              variant="link"
              className="p-0 text-primary"
              onClick={handleViewScript(record)}
            >
              View Manuscript
            </BaseButton>
          </div>
          {currentRole() != "author" && (
            <div>
              <BaseButton
                variant="link"
                className="p-0 text-primary"
                onClick={() => {
                  const fileUrl = record.files?.filter(
                    (file: any) => file.file_type === "manuscript"
                  )[0]?.file_url;
                  if (!fileUrl) return;
                  window.open(fileUrl, "_blank");
                }}
              >
                Download Manuscript
              </BaseButton>
            </div>
          )}
          {currentRole() === "editor" && (
            <div>
              <BaseButton
                variant="link"
                className="p-0 text-primary"
                onClick={assignReviewer(record)}
              >
                Assign Reviewer
              </BaseButton>
            </div>
          )}
          {currentRole() != "author" && (
            <div>
              <BaseButton
                variant="link"
                className="p-0 text-primary"
                onClick={handleSendMail(record)}
              >
                Send E-mail
              </BaseButton>
            </div>
          )}
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
      {visible && (
        <ViewManuscript
          visible={visible}
          currentEntity={currentEntity}
          onClose={() => setVisible(false)}
        />
      )}
      {visibleReviewer && (
        <AssignReviewer
          visible={visibleReviewer}
          currentEntity={currentEntity}
          onClose={() => setVisibleReviewer(false)}
        />
      )}
      {visibleMail && (
        <SendMail
          visible={visibleMail}
          onClose={() => setVisibleMail(false)}
          emails={[currentEntity?.user?.email]}
        />
      )}
    </Fragment>
  );
};

export default SubmissionsProcessed;
