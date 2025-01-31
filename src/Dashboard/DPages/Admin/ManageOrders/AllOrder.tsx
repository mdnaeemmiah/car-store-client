import Skeleton from "@/components/Skeleton/Skeleton";
import { useGetOrdersQuery, useOrderStatusMutation } from "@/redux/features/order/order";
import { IOrder } from "@/types/car.type";
import { Table, Button, Dropdown, Menu } from "antd";
import { useState } from "react";
import { toast } from "sonner"; // For notifications

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

export default function AllOrder() {
  const { isFetching, isLoading, data, refetch } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true, // Ensure latest data is fetched
  });

  const [updateOrderStatus] = useOrderStatusMutation(); // Mutation for updating status

  const orderData: IOrder[] = data?.data || [];
  
  // State to manage updated statuses
  const [statuses, setStatuses] = useState<{ [key: string]: string }>({});

  // Handle status change
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      // Update the UI immediately
      setStatuses((prev) => ({ ...prev, [orderId]: newStatus }));

      // Send request to update the order status in the database
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
      
      // Refetch orders from API to get the latest data
      refetch();

      toast.success(`Order status changed to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status. Please try again.");
    }
  };

  // Dropdown menu for changing status
  const renderStatusMenu = (orderId: string) => (
    <Menu>
      {["Pending", "Paid", "Shipped", "Completed", "Cancelled"].map((status) => (
        <Menu.Item key={status} onClick={() => handleStatusChange(orderId, status)}>
          {status}
        </Menu.Item>
      ))}
    </Menu>
  );

  const columns = [
    {
      title: "User ID",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: IOrder) => {
        // Use the updated status from state if available
        const currentStatus = statuses[record._id] || status;

        return (
          <Dropdown overlay={renderStatusMenu(record._id)} trigger={['hover']}>
            <Button>{currentStatus}</Button>
          </Dropdown>
        );
      },
    },
    {
      title: "Transaction ID",
      dataIndex: ["transaction", "id"],
      key: "transactionId",
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (products: Product[]) => (
        <div>
          {products?.length > 0 ? (
            products.map((product) => (
              <div key={product._id}>
                <p>{product.quantity}</p>
              </div>
            ))
          ) : (
            <p>No products</p>
          )}
        </div>
      ),
    },
  ];

  return isLoading ? (
    <Skeleton />
  ) : (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={orderData}
      rowKey="_id" // Ensures unique row key for each order
    />
  );
}
