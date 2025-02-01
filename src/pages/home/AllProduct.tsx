import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card, Pagination, Input, Slider, Select } from "antd";
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

const AllProduct = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetAllCarsQuery(undefined);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<string | null>(null);

  // Ensure data is an array
  const products: ICar[] = Array.isArray(data) ? data : data?.data || [];

  // Filtered Products
  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              product.model?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesModel = selectedModel ? product.model === selectedModel : true;
    const matchesAvailability = selectedAvailability ? (selectedAvailability === "inStock" ? product.stock > 0 : product.stock === 0) : true;

    return matchesSearchTerm && matchesPriceRange && matchesModel && matchesAvailability;
  });

  // Paginate Results
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (product: ICar) => {
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
    <div className="container mx-auto p-6 text-center">
      {/* Title */}
      <h2
        className="text-2xl font-bold mb-6"
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          color: "#1677FF",
          textShadow: "2px 2px 20px rgba(0, 25, 0, 0.8)",
          marginBottom: "40px",
        }}
      >
        Available Products
      </h2>

      {/* Search and Filters in One Line */}
    {/* Search and Filters Section */}
<div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-6 mb-6">
  {/* Search Input */}
  <div className="flex flex-col flex-1">
    <label className="font-semibold text-left mb-1">Search:</label>
    <Input
      placeholder="Search by name, brand, or category"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="text-center"
    />
  </div>

  {/* Model Selection */}
  <div className="flex flex-col flex-1">
    <label className="font-semibold text-left mb-1">Model:</label>
    <Select
      placeholder="Select Model"
      value={selectedModel}
      onChange={(value) => setSelectedModel(value)}
      className="w-full"
    >
      {Array.from(new Set(products.map((product) => product.model))).map((model) => (
        <Select.Option key={model} value={model}>
          {model}
        </Select.Option>
      ))}
    </Select>
  </div>

  {/* Availability Selection */}
  <div className="flex flex-col flex-1">
    <label className="font-semibold text-left mb-1">Availability:</label>
    <Select
      placeholder="Select Availability"
      value={selectedAvailability}
      onChange={(value) => setSelectedAvailability(value)}
      className="w-full"
    >
      <Select.Option value="inStock">In Stock</Select.Option>
      <Select.Option value="outOfStock">Out of Stock</Select.Option>
    </Select>
  </div>

  {/* Price Range Slider */}
  <div className="flex flex-col flex-1">
    <label className="font-semibold text-left mb-1">Price Range:</label>
    <Slider
      range
      min={0}
      max={100000}
      value={priceRange}
      onChange={(value) => setPriceRange(value as [number, number])}
      className="w-full"
    />
  </div>
</div>

      {/* Product Grid */}
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
              <p className="text-gray-600 text-sm text-left">
                <strong>Brand:</strong> {product.brand}
              </p>
              <p className="text-gray-600 text-sm text-left">
                <strong>Model:</strong> {product.model}
              </p>
              <p className="text-gray-600 text-sm text-left">
                <strong>Price:</strong> ${product.price}
              </p>
              <p className="text-gray-500 text-sm text-left">
                <strong>Stock:</strong> {product.stock} units
              </p>
              <p className="text-gray-400 text-xs text-left">
                <strong>Added:</strong> {formatDate(product.createdAt)}
              </p>
              <p className="text-gray-400 text-xs text-left">
                <strong>Last Updated:</strong> {formatDate(product.updatedAt)}
              </p>
              <Button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full"
              >
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
          total={filteredProducts.length}
          pageSize={itemsPerPage}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default AllProduct;