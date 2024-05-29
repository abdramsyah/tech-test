"use client";

import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Card, MenuProps, Pagination, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Input, Layout, SortDropdown } from "../../components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColumnsType } from "antd/es/table";
import FruitManagementForm, { FruitType } from "./form/ModalForm";
import { useQuery } from "@tanstack/react-query";
import { MUTATION_KEY, QUERY_KEY } from "@/api/queries/key";
import { deleteFruit, getFruitList } from "@/api/queries/fetch";
import { formatCurrency } from "@/util/commons";
import DeleteModal from "@/components/Modal/DeleteModal";
import { SearchParams } from "@/types/global";
import useDebounce from "@/util/hooks/useDebounce";

// const sortList = ["name", "price", 'created'];
const sortList: {
  title: string;
  key: string;
  dir: SearchParams["direction"];
}[] = [
  { title: "Name", key: "name", dir: "ASC" },
  { title: "Name", key: "name", dir: "DESC" },
  { title: "Color", key: "color", dir: "ASC" },
  { title: "Color", key: "color", dir: "DESC" },
  { title: "Price", key: "price", dir: "ASC" },
  { title: "Price", key: "price", dir: "DESC" },
  { title: "Stock", key: "stock", dir: "ASC" },
  { title: "Stock", key: "stock", dir: "DESC" },
  { title: "Created At", key: "created_at", dir: "ASC" },
  { title: "Created At", key: "created_at", dir: "DESC" },
  { title: "Updated At", key: "updated_at", dir: "ASC" },
  { title: "Updated At", key: "updated_at", dir: "DESC" },
];

const FruitManagement: React.FC = () => {
  const debounce = useDebounce();

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
  const [params, setParams] = useState<SearchParams>({
    page: 1,
    size: 10,
  });

  const { data, isFetching, refetch } = useQuery({
    queryFn: () => getFruitList(params),
    queryKey: [QUERY_KEY.FUIRT_LIST],
    refetchInterval: 7200000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  const menu: MenuProps = {
    items: sortList.map((e, i) => ({
      key: i,
      label: `${e.title} ${e.dir}`,
      onClick: () => setParams({ ...params, sort: e.key, direction: e.dir }),
    })),
  };

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
            onSuccess={refetch}
            param={deleteFruitModalCtrl.id}
            mutationFn={deleteFruit}
            mutationKey={MUTATION_KEY.FRUIT_DELETE}
          />
        )}
      </>
    );
  };

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
        <div className="filter-search">
          <Input
            label="Search"
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) =>
              debounce(() =>
                setParams({ ...params, page: 1, search: e.target.value })
              )
            }
            allowClear
            style={{ width: 250 }}
          />
          <SortDropdown sortData={menu} label="Urutkan" />
        </div>
        <Table
          columns={columns}
          dataSource={data?.data.data.data || []}
          loading={isFetching}
          pagination={false}
          sticky
          scroll={{ y: `calc(88vh - 230px)` }}
        />

        <div className="pagination">
          <Pagination
            current={data?.data.data?.currenPage}
            total={data?.data.data.lastPage}
            onChange={(page) =>
              setParams({
                ...params,
                page: page,
              })
            }
            pageSizeOptions={[10, 20, 50, 100, 200]}
            showSizeChanger
            onShowSizeChange={(_, size) =>
              setParams((state) => ({
                ...state,
                page: 1,
                size,
              }))
            }
          />
        </div>
      </Card>
      {renderModal()}
    </Layout>
  );
};

export default FruitManagement;
