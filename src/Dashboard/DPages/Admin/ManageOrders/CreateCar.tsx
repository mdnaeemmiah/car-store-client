import { useState } from 'react';
import { Form, Input, InputNumber, Button, Select, Row, Col, Space, Upload } from 'antd';
import { useCreateCarMutation } from '@/redux/features/admin/carManagement.Api';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const CreateCar = () => {
  const [createCar] = useCreateCarMutation();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // ImageBB API Key
  const IMAGEBB_API_KEY = '87257ff001089ad0825d46f7f1846bb8';

  // Handle Image Upload
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`,
        formData
      );
      // console.log(res)
      const imageUrl = res.data.data.image.url;
      setImageUrl(imageUrl);
      toast.success('Image uploaded successfully');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to upload image');
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...');

    const carData = {
      brand: data.brand,
      model: data.model,
      year: data.year,
      price: data.price,
      category: data.category,
      description: data.description,
      quantity: data.quantity,
      stock: data.stock,
      imageUrl: imageUrl, // Add image URL
    };
  console.log(imageUrl)
    try {
      const res = await createCar(carData);
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success('Car created', { id: toastId });
      }
    } catch (err) {
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={onSubmit}
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
            rules={[{ required: true, message: 'Please input the brand!' }]}
          >
            <Input placeholder="Enter car brand" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Model"
            name="model"
            rules={[{ required: true, message: 'Please input the model!' }]}
          >
            <Input placeholder="Enter car model" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Year"
            name="year"
            rules={[{ required: true, message: 'Please input the year!' }]}
          >
            <InputNumber placeholder="Enter manufacturing year" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <InputNumber placeholder="Enter price" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select the category!' }]}
      >
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
            rules={[{ required: true, message: 'Please input the quantity!' }]}
          >
            <InputNumber placeholder="Enter quantity" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Stock"
            name="stock"
            rules={[{ required: true, message: 'Please input the stock!' }]}
          >
            <InputNumber placeholder="Enter stock" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please provide a description!' }]}
      >
        <Input.TextArea placeholder="Enter a detailed description" rows={4} />
      </Form.Item>

      <Form.Item
        label="Upload Image"
        name="image"
        rules={[{ required: true, message: 'Please upload an image!' }]}
      >
        <Upload
          beforeUpload={(file) => {
            handleImageUpload(file);
            return false; // Prevent automatic upload
          }}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <div style={{ textAlign: 'center' }}>
          <Space>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Space>
        </div>
      </Form.Item>
    </Form>
  );
};

export default CreateCar;
