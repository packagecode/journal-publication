import { BaseInput } from "@/components";
import BaseButton from "@/components/core/BaseButton";
import BaseTooltip from "@/components/core/BaseTooltip";
import BaseTable, {
  defaultPagination,
  formatedColumns,
} from "@/components/tables/BaseTable";
import { showToast } from "@/contexts/Toast";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import useGlobalService from "@/hooks/useGlobalService";
import AddUser from "@/pages/dashboard/addUser";
import ViewProfile from "@/pages/dashboard/viewProfile";
import SendMail from "@/pages/mail/sendMail";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm, TablePaginationConfig } from "antd";
import { Fragment, useEffect, useState } from "react";
import { Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

interface UserListsProps {
  listForRole: string;
}

const UserLists: React.FC<UserListsProps> = ({ listForRole }) => {
  const [loading, setLoading] = useState(false);
  const [entities, setEntities] = useState([]);
  const [currentEntity, setCurrentEntity] = useState<any>();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    ...defaultPagination(),
    position: ["bottomCenter"],
  });
  const [visible, setVisible] = useState(false);
  const [visibleProfile, setVisibleProfile] = useState(false);
  const [visibleMail, setVisibleMail] = useState(false);
  const { axiosInstance, api } = useAxiosInstance();
  const [filter, setFilter] = useState<any>({});
  const { toQueryString } = useGlobalService();

  const fetchEntities = async (page: number, pageSize: number) => {
    setLoading(true);
    await axiosInstance
      .get(
        api(
          `users${toQueryString(
            filter
          )}&role=${listForRole}&page=${page}&per_page=${pageSize}`
        )
      )
      .then((response) => {
        const { current_page, data, total, per_page } = response.data.users;
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
      <div className="d-flex justify-content-start align-items-center">
        <BaseInput
          className="me-3"
          name="search"
          value={filter.name}
          placeholder="enter name ..."
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
        <BaseInput
          className="me-3"
          name="institution"
          value={filter.institution}
          placeholder="enter institution name ..."
          onChange={(e) =>
            setFilter({ ...filter, institution: e.target.value })
          }
        />
        <BaseButton
          variant="primary-gradient"
          onClick={() => fetchEntities(1, pagination.pageSize!)}
        >
          Search
        </BaseButton>
      </div>
    );
  };

  const handleOnEdit = (entity: any) => () => {
    setCurrentEntity(entity);
    setVisible(true);
  };

  const changeStatus = async (user: any) => {
    await axiosInstance.patch(api(`/users/${user.id}/status`)).then(() => {
      setEntities((prev: any) => {
        return prev.map((u: any) => {
          if (u.id === user.id) {
            return { ...user, key: user.id, active: !user.active };
          }
          return u;
        });
      });
      showToast("success", "Changed Successful");
    });
  };

  const tableColumns = formatedColumns([
    {
      key: "action",
      render: (_row: any, record: any) => (
        <>
          <div>
            <Link to="#" onClick={handleOnEdit(record)}>
              Edit Profile
            </Link>
          </div>
          <div>
            <Link
              to="#"
              onClick={() => [setCurrentEntity(record), setVisibleMail(true)]}
            >
              Send E-mail
            </Link>
          </div>
        </>
      ),
    },
    {
      key: "username",
      render: (username: string, record: any) => {
        return (
          <BaseTooltip content="View Profile" className="tooltip-success">
            <BaseButton
              variant="link"
              onClick={() => {
                setCurrentEntity(record);
                setVisibleProfile(true);
              }}
            >
              {username}
            </BaseButton>
          </BaseTooltip>
        );
      },
    },
    {
      title: "Name",
      key: "full_name",
      render: (full_name: string, record: any) => {
        return (
          <>
            <div>{full_name}</div>
            <div>{record.personal_info?.degree}</div>
          </>
        );
      },
    },
    {
      title: "Contact Info",
      key: "email",
      render: (email: string) => {
        return <Link to={`mailto:${email}`}>{email}</Link>;
      },
    },
    {
      key: "phone",
    },
    {
      title: "Institution",
      key: "institution_info",
      render: (institution_info: any) => {
        return (
          <div>
            <div>{institution_info?.position}</div>
            <div>{institution_info?.department}</div>
            <Link to="#">{institution_info?.name}</Link>
            <div>{institution_info?.country}</div>
          </div>
        );
      },
    },
    // {
    //   title: "Created Date",
    //   key: "created_at",
    //   render: (text: string) => moment(text).format("DD MMM YYYY"),
    // },
    {
      title: "Status",
      key: "active",
      render: (active: string, record: any) => {
        return (
          <Popconfirm
            title="Change Status?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            okText={active ? "Inactive" : "Active"}
            okButtonProps={{ className: "btn-success-transparent" }}
            okType={active ? "danger" : "default"}
            onConfirm={() => changeStatus(record)}
          >
            <Badge
              bg={active ? "primary-gradient" : "danger-gradient"}
              className="rounded-pill"
              style={{ width: "60px", cursor: "pointer" }}
            >
              {active ? "Active" : "Inactive"}
            </Badge>
          </Popconfirm>
        );
      },
    },
  ]);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    fetchEntities(pagination.current!, pagination.pageSize!);
  }, []);

  return (
    <Fragment>
      <Card className="custom-card overflow-hidden dashboard-right-panel">
        <Card.Header className="justify-content-between">
          <Card.Title>{capitalize(listForRole)}s List</Card.Title>
          <BaseButton
            variant="primary-gradient"
            size="sm"
            onClick={() => {
              setCurrentEntity(undefined);
              setVisible(true);
            }}
          >
            Add {capitalize(listForRole)}
          </BaseButton>
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
      <AddUser
        visible={visible}
        createRole={listForRole}
        currentEntity={currentEntity}
        onClose={() => setVisible(false)}
        onCreated={(_user) => fetchEntities(1, pagination.pageSize!)}
        onUpdated={(user) => {
          setEntities((prev: any) => {
            return prev.map((entity: any) => {
              if (entity.id === user.id) {
                return user;
              }
              return entity;
            });
          });
          setCurrentEntity(undefined);
        }}
      />
      {visibleProfile && (
        <ViewProfile
          visible={visibleProfile}
          currentEntity={currentEntity}
          onClose={() => {
            setVisibleProfile(false);
            setCurrentEntity(undefined);
          }}
        />
      )}
      {visibleMail && (
        <SendMail
          visible={visibleMail}
          onClose={() => setVisibleMail(false)}
          emails={[currentEntity?.email]}
        />
      )}
    </Fragment>
  );
};

export default UserLists;
