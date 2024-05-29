"use client";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Layout } from "../../components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColumnsType } from "antd/es/table";
import FruitManagementForm, { FruitType } from "./form/ModalForm";
import Chip, { ChipTheme } from "@/components/Chip";
import { useQuery } from "@tanstack/react-query";
import { MUTATION_KEY, QUERY_KEY } from "@/api/queries/key";
import { deleteFruit, getFruitList } from "@/api/queries/fetch";
import { formatCurrency } from "@/util/commons";
import DeleteModal from "@/components/Modal/DeleteModal";

const userStatusTheme: { [K in "ACTIVE" | "INACTIVE"]: ChipTheme } = {
  ACTIVE: "outlined-green",
  INACTIVE: "outlined-red",
};

const UserManagement: React.FC = () => {
  const [deleteFruitModalCtrl, setDeleteFruitModalCtrl] = useState<
    | { open: false }
    | {
        open: true;
        id: number;
      }
  >({ open: false });
  const [manageFruitModalCtrl, setManageFruitModalCtrl] = useState<
    | { open: false }
    | {
        open: true;
        data?: FruitType;
      }
  >({ open: false });

  const { data, isFetching, refetch } = useQuery({
    queryFn: () => getFruitList(),
    queryKey: [QUERY_KEY.FUIRT_LIST],
    refetchInterval: 7200000,
    refetchOnWindowFocus: false,
  });

  const columns: ColumnsType<FruitType> = [
    {
      title: "No",
      render: (_, __, i) => <div>{i + 1}</div>,
      width: 60,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (item: FruitType["price"]) => {
        const newItem = parseInt(item);
        if (isNaN(newItem)) return formatCurrency(0);

        return formatCurrency(newItem);
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      render: (item) => <span>{moment(item).format("DD MMMM YYYY")}</span>,
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      render: (item) => <span> {moment(item).format("DD MMMM YYYY")}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item: "ACTIVE" | "INACTIVE") => (
        <Chip theme={userStatusTheme[item]}>{item}</Chip>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      render: (_, row) => {
        return (
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "10px" }}>
              <EditOutlined
                onClick={() => {
                  setManageFruitModalCtrl({
                    open: true,
                    data: row,
                  });
                }}
              />
            </div>
            <div>
              <DeleteOutlined
                onClick={() => {
                  setDeleteFruitModalCtrl({
                    open: true,
                    id: row.id,
                  });
                }}
              />
            </div>
          </div>
        );
      },
    },
  ];

  const renderModal = () => {
    return (
      <>
        {manageFruitModalCtrl.open && (
          <FruitManagementForm
            isOpen={manageFruitModalCtrl.open}
            onClose={() => setManageFruitModalCtrl({ open: false })}
            fuitData={manageFruitModalCtrl.data}
            refetchFruit={refetch}
          />
        )}
        {deleteFruitModalCtrl.open && (
          <DeleteModal
            title="Delete Fruit"
            isOpen={deleteFruitModalCtrl.open}
            onClose={() => setDeleteFruitModalCtrl({ open: false })}
            param={deleteFruitModalCtrl.id}
            mutationFn={deleteFruit}
            mutationKey={MUTATION_KEY.FRUIT_DELETE}
          />
        )}
      </>
    );
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Layout
      rightHeader={[
        <Button
          key={"1"}
          type="button"
          title="Add new fruit"
          onClick={() => setManageFruitModalCtrl({ open: true })}
        />,
      ]}
    >
      <ToastContainer autoClose={2000} hideProgressBar={true} />

      <Card className="card-box">
        <Table
          columns={columns}
          dataSource={data?.data.data.data || []}
          loading={isFetching}
          pagination={false}
          sticky
          scroll={{ y: `calc(88vh - 230px)` }}
        />
      </Card>
      {renderModal()}
    </Layout>
  );
};

export default UserManagement;
