import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  productImage: string;
  productName: string;
  price: number;
  status: string;
  orderDate: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Product Image',
    dataIndex: 'productImage',
    key: 'productImage',
    render: (imageUrl) => (
      <img
        src={imageUrl}
        alt="Product"
        style={{ width: '50px', height: '50px', borderRadius: '4px' }}
      />
    ),
  },
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price) => `$${price}`,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color = 'green';
      if (status === 'Pending') color = 'orange';
      if (status === 'Cancelled') color = 'red';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: 'Order Date',
    dataIndex: 'orderDate',
    key: 'orderDate',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Cancel</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    productImage: 'https://via.placeholder.com/50',
    productName: 'Tesla Model S',
    price: 79990,
    status: 'Delivered',
    orderDate: '2023-10-01',
  },
  {
    key: '2',
    productImage: 'https://via.placeholder.com/50',
    productName: 'Ford Mustang',
    price: 55000,
    status: 'Pending',
    orderDate: '2023-10-05',
  },
  {
    key: '3',
    productImage: 'https://via.placeholder.com/50',
    productName: 'Toyota Camry',
    price: 30000,
    status: 'Cancelled',
    orderDate: '2023-09-20',
  },
];

const OrderHistory: React.FC = () => (
  <Table<DataType>
    columns={columns}
    dataSource={data}
    pagination={{ pageSize: 5 }}
    scroll={{ x: 'max-content' }}
  />
);

export default OrderHistory;