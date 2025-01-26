import { Form, Input, InputNumber, Button, Select, Upload, Row, Col, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';

const { Option } = Select;

const CreateCar = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fileList, setFileList] = React.useState<any>([]);

  const onFinish = () => {
    console.log('Form values:');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (info: any) => {
    let fileList = [...info.fileList];

    // Limit the number of files uploaded to 1
    fileList = fileList.slice(-1);

    // Display error if file is not image
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fileList = fileList.map((file: any) => {
      if (file.status === 'error') {
        message.error(`${file.name} file upload failed.`);
      }
      return file;
    });

    setFileList(fileList);
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        category: 'Sedan',
        quantity: 1,
        stock: 10,
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: 'Please input the brand!' }]}>
            <Input placeholder="Enter car brand" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Model"
            name="model"
            rules={[{ required: true, message: 'Please input the model!' }]}>
            <Input placeholder="Enter car model" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Year"
            name="year"
            rules={[{ required: true, message: 'Please input the year!' }]}>
            <InputNumber placeholder="Enter manufacturing year" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input the price!' }]}>
            <InputNumber placeholder="Enter price" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select the category!' }]}>
        <Select placeholder="Select car category">
          <Option value="Sedan">Sedan</Option>
          <Option value="SUV">SUV</Option>
          <Option value="Truck">Truck</Option>
          <Option value="Coupe">Coupe</Option>
          <Option value="Convertible">Convertible</Option>
        </Select>
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please input the quantity!' }]}>
            <InputNumber placeholder="Enter quantity" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Stock"
            name="stock"
            rules={[{ required: true, message: 'Please input the stock!' }]}>
            <InputNumber placeholder="Enter stock" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please provide a description!' }]}>
        <Input.TextArea placeholder="Enter a detailed description" rows={4} />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Car Image"
            name="imageUrl">
            <Upload
              name="imageUrl"
              listType="picture"
              action="/upload"
              showUploadList={false}
              fileList={fileList}
              onChange={handleChange}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            {fileList.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <strong>Uploaded File:</strong> {fileList[0]?.name}
              </div>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <div style={{ textAlign: 'center' }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </div>
      </Form.Item>
    </Form>
  );
};

export default CreateCar;
