import  { useState } from "react";
import {  Input, Select, InputNumber, Button, Form, Space } from "antd";

const { Option } = Select;

interface ICar {
  brand: string;
  model: string;
  year: number;
  price: number;
  category: "Sedan" | "SUV" | "Truck" | "Coupe" | "Convertible";
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const CreateCar = () => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [form] = Form.useForm();

  const handleAddCar = (values: ICar) => {
    setCars((prev) => [...prev, { ...values, createdAt: new Date() }]);
    form.resetFields();
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleAddCar} style={{ marginBottom: "20px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space>
            <Form.Item name="brand" label="Brand" rules={[{ required: true, message: "Brand is required" }]}>
              <Input placeholder="Enter car brand" />
            </Form.Item>
            <Form.Item name="model" label="Model" rules={[{ required: true, message: "Model is required" }]}>
              <Input placeholder="Enter car model" />
            </Form.Item>
            <Form.Item name="year" label="Year" rules={[{ required: true, message: "Year is required" }]}>
              <InputNumber placeholder="Year" min={1900} max={new Date().getFullYear()} />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true, message: "Price is required" }]}>
              <InputNumber
                placeholder="Price"
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => Number(value?.replace(/\$\s?|(,*)/g, ""))}
                min={0}
              />
            </Form.Item>
          </Space>

          <Space>
            <Form.Item name="category" label="Category" rules={[{ required: true, message: "Category is required" }]}>
              <Select placeholder="Select category">
                <Option value="Sedan">Sedan</Option>
                <Option value="SUV">SUV</Option>
                <Option value="Truck">Truck</Option>
                <Option value="Coupe">Coupe</Option>
                <Option value="Convertible">Convertible</Option>
              </Select>
            </Form.Item>
            <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: "Quantity is required" }]}>
              <InputNumber placeholder="Quantity" min={0} />
            </Form.Item>
            <Form.Item name="inStock" label="In Stock" rules={[{ required: true, message: "In Stock is required" }]}>
              <Select placeholder="Select stock status">
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            </Form.Item>
          </Space>

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Enter car description" rows={3} />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Add Car
          </Button>
        </Space>
      </Form>

     
    </div>
  );
};

export default CreateCar;


