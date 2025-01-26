
import { Card, Row, Col } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sedan', sales: 120 },
  { name: 'SUV', sales: 80 },
  { name: 'Truck', sales: 150 },
  { name: 'Coupe', sales: 90 },
  { name: 'Convertible', sales: 60 },
];

const AdminDashboard = () => {
  return (
    <Row gutter={[16, 16]} style={{ height: '80vh', padding: '20px' }}>
      <Col span={24}>
        <Card
          title="Car Sales Chart"
          bordered={false}
          style={{
            width: '100%',
            height: '100%',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminDashboard;



