import { Button, Layout } from 'antd';
import DSidebar from './DSidebar';
import { NavLink, Outlet } from 'react-router-dom';
const { Header, Content } = Layout;

const DMainlayout = () => {
  return (
    <Layout style={{ height: '100vh' }}>
     <DSidebar></DSidebar>
      <Layout>
      <Header>
        <NavLink to='/'> <Button >Home</Button></NavLink>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
           <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DMainlayout;

