import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "antd";
import { useGetAllCarsQuery } from "@/redux/features/admin/carManagement.Api";

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
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const AllProduct = () => {
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useGetAllCarsQuery(undefined);

  // Check if data is an array, if not, set to an empty array
  const products: IProduct[] = Array.isArray(data) ? data : data?.data || [];

  const handleAddToCart = (product: IProduct) => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        stock: product.stock,
        imageUrl: product.imageUrl || "/placeholder.svg", // default placeholder if imageUrl is not available
      })
    );
  };

  // Show loading state
  if (isLoading) {
    return <p>Loading products...</p>;
  }

  // Show error state
  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="shadow-md">
            <CardHeader>
              <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="rounded-lg object-cover object-center aspect-square w-full"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl">{product.name}</CardTitle>
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
    </div>
  );
};

export default AllProduct;
