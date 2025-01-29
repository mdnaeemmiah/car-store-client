import { Card, Button, Col, Row, Typography, Space } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface CartItem {
  image: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  stock: number;
}

const cartItems: CartItem[] = [
  {
    image: 'src/assets/images/img6.avif',
    brand: 'Tesla',
    model: 'Model S',
    year: 2022,
    price: 79999,
    stock: 5,
  },
  {
    image: 'src/assets/images/img3.avif',
    brand: 'BMW',
    model: 'X5',
    year: 2021,
    price: 65999,
    stock: 3,
  },
  {
    image: 'src/assets/images/img4.avif',
    brand: 'BMW',
    model: 'X5',
    year: 2021,
    price: 65999,
    stock: 3,
  },
  {
    image: 'src/assets/images/img11.avif',
    brand: 'BMW',
    model: 'X5',
    year: 2021,
    price: 65999,
    stock: 3,
  },
  // Add more items as needed
];
const AllProduct = () => {
   

    return (
        <div style={{ padding: '20px' }}>
      <Title level={2}>Your Cart</Title>
      <Row gutter={[16, 16]}>
        {cartItems.map((item, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card
              hoverable
              cover={<img alt={item.model} src={item.image} />}
              actions={[
                <Button icon={<ShoppingCartOutlined />} type="primary">
                  Add to Cart
                </Button>,
              ]}
            >
              <Title level={4}>{item.brand} {item.model}</Title>
              <Text>Year: {item.year}</Text>
              <div>
                <Space direction="vertical">
                  <Text>Price: ${item.price}</Text>
                  <Text>In Stock: {item.stock}</Text>
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    );
};

export default AllProduct;