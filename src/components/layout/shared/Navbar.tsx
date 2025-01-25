import { Layout, Menu, Button, Grid, Drawer } from 'antd';
import { UserOutlined, LoginOutlined, MenuOutlined } from '@ant-design/icons';
import  { useState } from 'react';

const { Header } = Layout;
const { useBreakpoint } = Grid;

const Navbar = () => {
  const screens = useBreakpoint();
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => setDrawerVisible(!isDrawerVisible);

  return (
    <Layout style={{ minHeight: '100%', width: '100%' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#001529',
          padding: screens.md ? '0 100px' : '0 20px', // Adjust padding for mobile
        }}
      >
        {/* Left - Logo */}
        <div >
          <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
            Car Store
          </span>
        </div>

        {/* Center - Navigation Items for Larger Screens */}
        {screens.md &&  (
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
              <span style={{ color: 'white' }}>Home</span>
            </Menu.Item>
            <Menu.Item key="2" style={{ fontWeight: '500' }}>
              <span style={{ color: 'white' }}>All Products</span>
            </Menu.Item>
            <Menu.Item key="3" style={{ fontWeight: '500' }}>
              <span style={{ color: 'white' }}>About Us</span>
            </Menu.Item>
            <Menu.Item key="4" style={{ fontWeight: '500' }}>
              <span style={{ color: 'white' }}>Contact Us</span>
            </Menu.Item>
          </Menu>
        )}

        {/* Right - Buttons and Drawer Toggle for Smaller Screens */}
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
            <Button
              type="default"
              icon={<UserOutlined />}
              style={{
                color: '#001529',
                fontWeight: '500',
              }}
            >
              Sign Up
            </Button>
          </div>
        )}
      </Header>

      {/* Drawer for Navigation in Smaller Screens */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        visible={isDrawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="vertical"
          theme="light"
          style={{
            borderRight: 'none',
          }}
        >
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Products</Menu.Item>
          <Menu.Item key="3">About Us</Menu.Item>
          <Menu.Item key="4">Contact</Menu.Item>
        </Menu>
        <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button type="primary" block icon={<LoginOutlined />}>
            Login
          </Button>
          <Button type="default" block icon={<UserOutlined />}>
            Sign Up
          </Button>
        </div>
      </Drawer>
    </Layout>
  );
};

export default Navbar;
