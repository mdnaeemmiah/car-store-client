import { useState } from 'react';
import { Form, Input, InputNumber, Button, Select, Row, Col, Space } from 'antd';
import { useCreateCarMutation } from '@/redux/features/admin/carManagement.Api';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import axios from 'axios';
import { ImSpinner9 } from "react-icons/im";

const { Option } = Select;

const CreateCar = () => {
  const [createCar] = useCreateCarMutation();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);

  // ImageBB API Key
  const IMAGEBB_API_KEY = 'b3876efcf3dde5da0a26b59df9da8615';

  // Handle Image Upload
  const handleImage = async (e) => {
    const imageFile = e.target.files[0];

    if (!imageFile) {
        console.log("No image selected");
        return;
    }

    console.log("Selected File:", imageFile);

    const formData = new FormData();
    formData.append("image", imageFile); 

    console.log("FormData content:", [...formData.entries()]);

    try {

        const response = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=b3876efcf3dde5da0a26b59df9da8615`, {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        
        if (result.success) {
            console.log("Uploaded Image URL:", result.data.url);
        } else {
            console.error("Upload failed:", result);
        }
    } catch (error) {
        console.error("Error uploading image:", error);
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
      imageUrl: imageUrl || '', // Ensure imageUrl is included
    };

    try {
      const res = await createCar(carData);
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success('Car created successfully', { id: toastId });
      }
    } catch (err) {
      toast.error('Something went wrong while creating the car', { id: toastId });
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

      <Form.Item >
      <div className="flex flex-col mx-auto text-center">
                <label>
                  {imgLoading ? (
                    <ImSpinner9 className="animate-spin m-auto" size={24} />
                  ) : (
                    <input
                      className="text-sm cursor-pointer hidden"
                      type="file"
                      name="image"
                      onChange={handleImage}
                      id="image"
                      accept="image/*"
                      hidden
                    />
                  )}
                  {/* <div
                    // disabled={imgLoading}
                    className={`${
                      imgLoading &&
                      "bg-rose-200 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    } bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 bg-[#FF407D]`}
                  >
                    Upload Imageddddddddd
                  </div> */}
                  {preview && (
                    <img
                      className="w-36 mt-3 h-20 object-cover rounded"
                      src={preview}
                      alt=""
                    />
                  )}
                </label>
              </div>
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