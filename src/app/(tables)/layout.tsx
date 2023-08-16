'use client';
import React from 'react';
import { Layout, Menu } from 'antd';
import RentsTable from './rents-table/page';

const { Header, Content, Footer } = Layout;

const TablesLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', width: '100%' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['1']}
          items={new Array(4).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content style={{ padding: '50px' }}>
        <RentsTable />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default TablesLayout;
