import { Layout, Menu, Button, Grid, Drawer, Row, Col, notification } from 'antd';
import { LoginOutlined, MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/features/auth/atuhSlice';

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const Navbar = () => {
  const dispatch = useAppDispatch();
  const screens = useBreakpoint();
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => setDrawerVisible(!isDrawerVisible);

  const handleLogout = () => {
    dispatch(logout());
    notification.success({
      message: 'Logout Successful',
      description: 'You have successfully logged out.',
      placement: 'topRight', // You can adjust placement if needed
    });
  };

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
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
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <Menu.Item key="1" style={{ fontWeight: '500' }}>
              <NavLink to="/" style={{ color: 'white' }}>
                Home
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2" style={{ fontWeight: '500' }}>
              <NavLink to="/product" style={{ color: 'white' }}>
                All Products
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3" style={{ fontWeight: '500' }}>
              <NavLink to="/about" style={{ color: 'white' }}>
                About Us
              </NavLink>
            </Menu.Item>
            <Menu.Item key="5" style={{ fontWeight: '500', marginLeft: '20px' }}>
              <NavLink to="/dashboard" style={{ color: 'white' }}>
                Dashboard
              </NavLink>
            </Menu.Item>
          </Menu>
        )}

        {!screens.md && (
          <Button
            type="default"
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
            style={{
              color: 'white',
              fontSize: '20px',
            }}
          />
        )}

        {screens.md && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <NavLink to="/login">
              <Button
                type="primary"
                icon={<LoginOutlined />}
                style={{
                  backgroundColor: '#1890ff',
                  border: 'none',
                }}
              >
                Login
              </Button>
            </NavLink>
            <Button onClick={handleLogout}>Logout</Button>{' '}
          </div>
        )}
      </Header>

      {/* Drawer for Small Screens */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        open={isDrawerVisible}
        styles={{ body: { padding: 20 } }}
      >
        <Menu mode="vertical" theme="light" style={{ borderRight: 'none' }}>
          <Menu.Item key="1">
            <NavLink to="/home">Home</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/product">Products</NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to="/about">About Us</NavLink>
          </Menu.Item>
          <Menu.Item key="4">
            <NavLink to="/contact">Contact</NavLink>
          </Menu.Item>
          <Menu.Item key="5">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </Menu.Item>
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
            <p>
              We are a company dedicated to providing excellent services and building great products for our clients.
            </p>
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
              <a href="#" style={{ color: '#1DA1F2', marginRight: '10px' }}>
                Twitter
              </a>
              <a href="#" style={{ color: '#4267B2', marginRight: '10px' }}>
                Facebook
              </a>
              <a href="#" style={{ color: '#E1306C' }}>
                Instagram
              </a>
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
