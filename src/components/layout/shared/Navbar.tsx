import { Layout, Menu, Button, Grid, Drawer, Row, Col, notification, Dropdown, Avatar } from 'antd';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout, selectCurrentUser } from '@/redux/features/auth/atuhSlice';

import { useState, useEffect } from "react";
import {   Badge,Typography, Divider } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart, updateQuantity } from "@/redux/features/cart/cartSlice";
;
import { toast } from "sonner";


import { useCreateOrderMutation } from "@/redux/features/order/order";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

// Cart Drawer (Ant Design)
const CartDrawer = ({ open, setOpen }) => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart);

  const [createOrder, { isLoading, isSuccess, data, isError, error }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    await createOrder({ products: cartData.items });
  };

  useEffect(() => {
    if (isLoading) toast.loading("Processing ...");
    if (isSuccess) {
      toast.success(data?.message);
      if (data?.data) {
        setTimeout(() => (window.location.href = data.data), 1000);
      }
    }
    if (isError) toast.error(JSON.stringify(error));
  }, [isLoading, isSuccess, isError, data, error]);

  return (
    <Drawer title="Your Cart" placement="right" onClose={() => setOpen(false)} open={open} width={400}>
      {cartData.items.length > 0 ? (
        <>
          <div style={{ maxHeight: 400, overflowY: "auto" }}>
            {cartData.items.map((item) => (
              <Row key={item.product} gutter={16} align="middle" style={{ marginBottom: 16 }}>
                <Col span={6}>
                  <img src={item.imageUrl} alt={item.name} style={{ width: "100%", borderRadius: 8 }} />
                </Col>
                <Col span={10}>
                  <Title level={5}>{item.name}</Title>
                  <div className="flex items-center gap-2 mt-1">
                    <Button size="small" onClick={() => dispatch(updateQuantity({ id: item.product, quantity: Math.max(item.quantity - 1, 1) }))}>
                      -
                    </Button>
                    <Text strong>{item.quantity}</Text>
                    <Button size="small" onClick={() => dispatch(updateQuantity({ id: item.product, quantity: Math.min(item.quantity + 1, item.stock) }))}>
                      +
                    </Button>
                  </div>
                </Col>
                <Col span={6}>
                  <Text strong>${(item.quantity * item.price).toFixed(2)}</Text>
                </Col>
                <Col span={2}>
                  <Button type="link" danger onClick={() => dispatch(removeFromCart(item.product))}>
                    X
                  </Button>
                </Col>
              </Row>
            ))}
          </div>

          <Divider />

          <Row justify="space-between">
            <Text>Total Quantity:</Text>
            <Text strong>{cartData.totalQuantity}</Text>
          </Row>
          <Row justify="space-between" style={{ marginBottom: 16 }}>
            <Text>Total Price:</Text>
            <Text strong>${cartData.totalPrice.toFixed(2)}</Text>
          </Row>

          <Button type="primary" block onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </>
      ) : (
        <Text type="secondary">Your cart is empty.</Text>
      )}
    </Drawer>
  );
};

// Cart Sheet (ShadCN)
const CartSheet = () => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart);
  const [createOrder, { isLoading, isSuccess, data, isError, error }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    await createOrder({ products: cartData.items });
  };

  useEffect(() => {
    if (isLoading) toast.loading("Processing ...");
    if (isSuccess) {
      toast.success(data?.message);
      if (data?.data) {
        setTimeout(() => (window.location.href = data.data), 1000);
      }
    }
    if (isError) toast.error(JSON.stringify(error));
  }, [isLoading, isSuccess, isError, data, error]);

  return (
    <Sheet>
        <SheetTrigger asChild>
        <Button variant="link" className="relative pt-4   rounded">
          <ShoppingCartOutlined style={{ fontSize: 24, color: "white" }} />
          <Badge count={cartData.totalQuantity} className="absolute right-0 top-0" />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Review your items and proceed to checkout.</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {cartData.items.length > 0 ? (
            <ul className="space-y-4">
              {cartData.items.map((item) => (
                <li key={item.product} className="flex items-center gap-4">
                  <img src={item.imageUrl} alt={item.name} className="h-16 w-16 rounded object-cover" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Button size="small" onClick={() => dispatch(updateQuantity({ id: item.product, quantity: Math.max(item.quantity - 1, 1) }))}>
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button size="small" onClick={() => dispatch(updateQuantity({ id: item.product, quantity: Math.min(item.quantity + 1, item.stock) }))}>
                        +
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">${(item.quantity * item.price).toFixed(2)}</p>
                  <Button type="link" danger onClick={() => dispatch(removeFromCart(item.product))}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        <SheetFooter className="border-t pt-4">
          <SheetClose asChild>
            <Button className="w-full" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

// Cart Container (Switches Between AntD & ShadCN)
const CartContainer = () => {
  const screens = useBreakpoint();
  const [open, setOpen] = useState(false);

  return screens.md ? <CartSheet /> : <CartDrawer open={open} setOpen={setOpen} />;
};





const { Header, Content, Footer } = Layout;

const Navbar = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const userRole = useAppSelector((state) => state.auth.user?.role) || "user";

  const toggleDrawer = () => setDrawerVisible(!isDrawerVisible);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    notification.success({
      message: 'Logout Successful',
      description: 'You have successfully logged out.',
      placement: 'topRight',
    });
  };

  const menuItems = (
    <Menu>
      <Menu.Item key="dashboard">
        <NavLink to={`/${userRole}/dashboard`}>Dashboard</NavLink>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#001529',
          padding: screens.md ? '0 100px' : '0 20px',
        }}
      >
        <div>
          <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
            Car Store
          </span>
        </div>

        {screens.md && (
          <Menu theme="dark" mode="horizontal" style={{ flex: 1, justifyContent: 'center' }}>
            <Menu.Item key="1"><NavLink to="/" style={{ color: 'white' }}>Home</NavLink></Menu.Item>
            <Menu.Item key="2"><NavLink to="/product" style={{ color: 'white' }}>All Products</NavLink></Menu.Item>
            <Menu.Item key="3"><NavLink to="/about" style={{ color: 'white' }}>About Us</NavLink></Menu.Item>
            <Menu.Item key="4"><CartContainer /></Menu.Item>
          </Menu>
        )}

      {screens.md && user ? (
     <Dropdown overlay={menuItems} placement="bottomRight">
    <Avatar 
      style={{ backgroundColor: 'orange', cursor: 'pointer' }}  
      size="large" 
      icon={<UserOutlined />} 
    />
    </Dropdown>
   ) : (
    <NavLink to="/login">
    <Button type="primary" icon={<LoginOutlined />}>Login</Button>
    </NavLink>
     )}
      </Header>

      {/* Drawer for Small Screens */}
      <Drawer title="Menu" placement="right" onClose={toggleDrawer} open={isDrawerVisible}>
        <Menu mode="vertical" theme="light">
          <Menu.Item key="1"><NavLink to="/">Home</NavLink></Menu.Item>
          <Menu.Item key="2"><NavLink to="/product">Products</NavLink></Menu.Item>
          <Menu.Item key="3"><NavLink to="/about">About Us</NavLink></Menu.Item>
          <Menu.Item key="4"><NavLink to={`/${userRole}/dashboard`}>Dashboard</NavLink></Menu.Item>
        </Menu>
      </Drawer>

      {/* Content */}
      <Content style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </Content>

      {/* Footer */}
      <Footer style={{ background: '#001529', color: 'white', textAlign: 'left', padding: '20px 50px' }}>
        <Row justify="start" gutter={[16, 16]} align="top">
          <Col xs={24} sm={12} md={8}>
            <h3 style={{ color: '#fff' }}>About Us</h3>
            <p>We provide excellent services and products to our customers.</p>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <h3 style={{ color: '#fff' }}>Contact</h3>
            <p>Email: contact@company.com</p>
            <p>Phone: +123 456 789</p>
            <p>Address: 123 Business Street, City</p>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <h3 style={{ color: '#fff' }}>Follow Us</h3>
            <p>
              <a href="#" style={{ color: '#1DA1F2', marginRight: '10px' }}>Twitter</a>
              <a href="#" style={{ color: '#4267B2', marginRight: '10px' }}>Facebook</a>
              <a href="#" style={{ color: '#E1306C' }}>Instagram</a>
            </p>
          </Col>
        </Row>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </div>
      </Footer>
    </Layout>
  );
};

export default Navbar;