import { useState } from 'react';
import { Form, Input, InputNumber, Button, Select, Row, Col, Space, Upload } from 'antd';
import { useCreateCarMutation } from '@/redux/features/admin/carManagement.Api';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/db9egbkam/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'naeemmiah';

const CreateCar = () => {
  const [createCar] = useCreateCarMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setImageUrl(response.data.secure_url);
      toast.success('Image uploaded successfully');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Image upload failed');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!imageUrl) {
      toast.error('Please upload an image');
      return;
    }

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
      imageUrl,
    };

    try {
      await createCar(carData).unwrap();
      toast.success('Car created successfully', { id: toastId });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('Something went wrong while creating the car', { id: toastId });
    }
  };

  return (
    <Form layout="vertical" onFinish={onSubmit} initialValues={{ category: 'Sedan', quantity: 1, stock: 10 }}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Brand" name="brand" rules={[{ required: true, message: 'Please input the brand!' }]}>
            <Input placeholder="Enter car brand" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Model" name="model" rules={[{ required: true, message: 'Please input the model!' }]}>
            <Input placeholder="Enter car model" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Year" name="year" rules={[{ required: true, message: 'Please input the year!' }]}>
            <InputNumber placeholder="Enter manufacturing year" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the price!' }]}>
            <InputNumber placeholder="Enter price" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select the category!' }]}>
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
          <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Please input the quantity!' }]}>
            <InputNumber placeholder="Enter quantity" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Stock" name="stock" rules={[{ required: true, message: 'Please input the stock!' }]}>
            <InputNumber placeholder="Enter stock" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please provide a description!' }]}>
        <Input.TextArea placeholder="Enter a detailed description" rows={4} />
      </Form.Item>

      <Form.Item label="Car Image">
        <Upload
          beforeUpload={(file) => {
            handleImageUpload(file);
            return false;
          }}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />} loading={loading}>
            {loading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </Upload>
        {imageUrl && (
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <img src={imageUrl} alt="Car" style={{ width: '50%', maxWidth: '60px', borderRadius: '8px' }} />
          </div>
        )}
      </Form.Item>

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