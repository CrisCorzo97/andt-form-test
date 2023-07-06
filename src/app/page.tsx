"use client";
import {
  MinusCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Upload, message } from "antd";
import styles from "./page.module.css";
import axios from "axios";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState } from "react";

const { TextArea } = Input;

const API_URL = process.env.API_URL;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("bucketName", "News");

  axios
    .post("http://localhost:3005/storage/upload", formData)
    .then((response) => {
      // Manejar la respuesta del servidor
      console.log(response.data);
    })
    .catch((error) => {
      // Manejar errores de envío
      console.error(error);
    });
};

const FormTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className={styles.body}>
      <Form
        form={form}
        wrapperCol={{ span: 20 }}
        size="large"
        onFinish={onFinish}
      >
        <Form.Item
          name="principal-image"
          label="Imagen principal"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={(file) => {
              beforeUpload(file);
              return false;
            }}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item name="title" label="Título">
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Categoría">
          <Select onChange={handleChange}>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.List name="toppics">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "subtitle"]}
                    label="Subtitulo"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "content"]}
                    label="Contenido"
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                  {/* <Form.Item
                    {...restField}
                    name={[name, "image"]}
                    label="Imagen"
                    valuePropName="fileList"
                    getValueFromEvent={uploadImage}
                  >
                    <Upload action="/upload.do" listType="picture-card">
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item> */}
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Crear
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default () => <FormTest />;
