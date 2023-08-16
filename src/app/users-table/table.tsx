import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";

interface DataType {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  user_position: string;
  cuil: string;
  create_at: string;
  update_at: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    sorter: true,
    width: "20%",
  },
  {
    title: "Nombre",
    dataIndex: "first_name",
    sorter: true,
    render: (name, data) => {
      console.log({ name, data });
      return name;
    },
    width: "20%",
  },
  {
    title: "Rol",
    dataIndex: "user_position",
    width: "20%",
  },
  {
    title: "Cuil",
    dataIndex: "cuil",
  },
  {
    title: "Fecha de Creación",
    dataIndex: "create_at",
  },
  {
    title: "Fecha de Actualización",
    dataIndex: "update_at",
  },
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const UsersTableComponent: React.FC = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  //   const { data, isLoading } = useQuery()

  //   useEffect(() => {
  //     fetchData();
  //   }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default UsersTableComponent;
