import { Badge } from "@/components/ui/badge";
import { useGetOrdersQuery } from "@/redux/features/order/order";
import { Skeleton, Table } from "antd";
import type { TableProps } from "antd";

export interface Transaction {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export interface Product {
  product: string;
  quantity: number;
  _id: string;
}

export interface Order {
  transaction: Transaction;
  _id: string;
  user: string;
  products: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function OrderDetails() {
  const { isLoading, data } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const orderData: Order[] = data?.data;

  const columns: TableProps<Order>['columns'] = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge variant={status === "Pending" ? "outline" : "default"}>
          {status}
        </Badge>
      ),
    },
  ];

  return isLoading ? (
    <Skeleton />
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'flex-start',  // Align to the left of the container
        minHeight: '100vh',
        // width: '100vw',
        padding: '0',  // No padding
        margin: '0',   // No margin
        boxSizing: 'border-box', // Include padding and margin in box size calculation
      }}
    >
      <div
        style={{
          width: '100%',
        }}
      >
        <Table<Order>
          columns={columns}
          dataSource={orderData}
          pagination={{
            position: ['bottomCenter'],
            pageSize: 5,
          }}
          scroll={{ x: 'max-content', y: 'calc(100vh - 200px)' }}
          rowKey="_id"
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
}
