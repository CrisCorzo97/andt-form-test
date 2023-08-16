"use client";
import React from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import UsersTableComponent from "./table";

const { Header, Content, Footer } = Layout;

const UsersTable: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
      </Header>
      <Content className="site-layout" style={{ padding: "50px" }}>
        <Breadcrumb
          items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
          style={{ margin: "16px 0" }}
        />
        <UsersTableComponent />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default UsersTable;
