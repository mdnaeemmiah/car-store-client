import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom';

const Login = () => {
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
        name="login"
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
        {/* Email Input */}
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }} // Center align form item and input
        >
          <Input
            prefix={<MailOutlined />}
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

        {/* Remember Me and Forgot Password */}
        <Form.Item
          style={{
            display: 'flex',
            justifyContent: 'space-between', // Justify between checkbox and link
            alignItems: 'center',
            padding: 0, // Remove extra padding
          }}
        >
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="">Forgot password</a>
        </Form.Item>

        {/* Submit Button and Register Link */}
        <Form.Item style={{ textAlign: 'center' }}>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <NavLink to="/register">Register now!</NavLink>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
