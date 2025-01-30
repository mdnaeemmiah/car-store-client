import Skeleton from "@/components/Skeleton/Skeleton";
import { Badge } from "@/components/ui/badge";
import { useGetOrdersQuery } from "@/redux/features/order/order";
import { IOrder } from "@/types/car.type";
import { Table } from "antd";

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
  const { isFetching ,isLoading, data } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log(data)

  const orderData: IOrder[] = data?.data;

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
      render: (status: string) => (
        <Badge variant={status === "Pending" ? "outline" : "default"}>{status}</Badge>
      ),
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
            products.map((product) =>
              product ? (
                <div key={product._id}>
                  <p> {product.quantity}</p>
                </div>
              ) : (
                <p>No product details available</p>
              )
            )
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
    
    />
  );
}
