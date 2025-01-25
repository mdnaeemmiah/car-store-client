import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'; // Import MailOutlined
import { Button, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom';

const Register = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f0f2f5', // Optional background color
      }}
    >
      <Form
        name="register"
        initialValues={{ remember: true }}
        style={{
          width: '100%',
          maxWidth: '600px', // Form width set to 600px
          height: '400px', // Set form height to 400px
          padding: '20px',
          background: '#fff', // Optional background
          borderRadius: '8px', // Optional rounded corners
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional shadow
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Name Input */}
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }} // Center align form item and input
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Name"
            style={{
              textAlign: 'center', // Center text inside input
              width: '100%', // Ensure input takes full width
            }}
          />
        </Form.Item>

        {/* Email Input */}
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }} // Center align form item and input
        >
          <Input
            prefix={<MailOutlined />} // Changed to MailOutlined
            placeholder="Email"
            style={{
              textAlign: 'center', // Center text inside input
              width: '100%', // Ensure input takes full width
            }}
          />
        </Form.Item>

        {/* Password Input */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }} // Center align form item and input
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            style={{
              textAlign: 'center', // Center text inside input
              width: '100%', // Ensure input takes full width
            }}
          />
        </Form.Item>

        {/* Submit Button and Login Link */}
        <Form.Item style={{ textAlign: 'center' }}>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
          or <NavLink to="/login">Login now!</NavLink>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
