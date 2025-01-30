import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card, Pagination } from "antd";
import { useGetAllCarsQuery } from "@/redux/features/admin/carManagement.Api";
import { toast } from "sonner";
import { useState } from "react";
import { ICar } from "@/types/car.type";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

interface IProduct {
  _id: string;
  category: string;
  price: number;
  stock: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const AllProduct = () => {
  const dispatch = useAppDispatch();
  const { data,  isLoading } = useGetAllCarsQuery(undefined);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Check if data is an array, if not, set to an empty array
  const products: ICar[] = Array.isArray(data) ? data : data?.data || [];
  const totalItems = products.length;

  // Paginate products
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (product: IProduct) => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.category,
        price: product.price,
        quantity: 1,
        stock: product.stock,
        imageUrl: product.imageUrl || "/placeholder.svg",
      })
    );
    toast.success(`${product.category} added to cart!`);
  };

  if (isLoading) {
    return <p>Loading products...</p>;
  }

 

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedProducts.map((product) => (
          <Card key={product._id} className="shadow-md">
            <CardHeader>
              <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.category}
                className="rounded-lg object-cover object-center aspect-square w-full"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl">{product.category}</CardTitle>
              <p className="text-gray-600 text-sm">Price: ${product.price}</p>
              <p className="text-gray-500 text-sm">In Stock: {product.stock} units</p>
              <p className="text-gray-400 text-xs">Added: {formatDate(product.createdAt)}</p>
              <p className="text-gray-400 text-xs">Last Updated: {formatDate(product.updatedAt)}</p>
              <Button onClick={() => handleAddToCart(product)} className="mt-4 w-full">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={itemsPerPage}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default AllProduct;