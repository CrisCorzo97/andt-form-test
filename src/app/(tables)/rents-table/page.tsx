'use client';
import React from 'react';
import { Card } from 'antd';
import { CustomTable } from '@/components/custom-table/custom_table';
import axios from 'axios';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];

const RentsTable: React.FC = () => {
  // const data = (await axios.get('http://localhost:3005/rents')).data;
  // console.log(data);
  return (
    <Card title={'Listado de conductores'}>
      <CustomTable<any>
        rowKey={'id'}
        columns={columns}
        dataSource={[]}
        loading={false}
        pagination={false}
      />
    </Card>
  );
};

export default RentsTable;
