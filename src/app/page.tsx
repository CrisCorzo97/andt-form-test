"use client";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Upload } from "antd";
import styles from "./page.module.css";

const { TextArea } = Input;

const normFile = (e: any) => {
  console.log(e);
};

const FormTest: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  const handleChange = () => {
    form.setFieldsValue({ categories: [] });
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
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
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
                  <Form.Item
                    {...restField}
                    name={[name, "image"]}
                    label="Imagen"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload action="/upload.do" listType="picture-card">
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item>
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
