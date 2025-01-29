// import { useLoginMutation } from '@/redux/features/auth/atuhApi';
// import { setUser, TUser } from '@/redux/features/auth/atuhSlice';
// import { useAppDispatch } from '@/redux/hooks';
// import { verifyToken } from '@/utils/veryfyToken';
// import { LockOutlined, MailOutlined } from '@ant-design/icons';
// import { Button, Checkbox, Form, Input } from 'antd';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';


// type TFormConfig = {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   resolver?: any;
// };

// type TFormProps = {
//   onSubmit: SubmitHandler<FieldValues>;
// } & TFormConfig;

// const Login = ({
//   resolver,
// }:TFormProps) => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const [login] = useLoginMutation();

//   const onSubmit = async (data:FieldValues ) => {
//     console.log(data);
//     const toastId = toast.loading('Logging in');

//     try {
//       const userInfo = {
//         id: data.userId,
//         password: data.password,
//       };
//       const res = await login(userInfo).unwrap();
//       const user = verifyToken(res.data.accessToken) as TUser;
//       dispatch(setUser({ user: user, token: res.data.accessToken }));
//       toast.success('Logged in', { id: toastId, duration: 2000 });
//       navigate(`/${user.role}/dashboard`);
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       toast.error('Something went wrong', { id: toastId, duration: 2000 });
//     }
//   };

//   const formConfig: TFormConfig = {};

//   if (resolver) {
//     formConfig['resolver'] = resolver;
//   }

//   const methods = useForm(formConfig);

//   const submit: SubmitHandler<FieldValues> = (data) => {
//     onSubmit(data);
//     methods.reset();
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         background: '#f0f2f5', // Optional background color
//       }}
//     >
//       <FormProvider {...methods}>
//       <Form  onFinish={methods.handleSubmit(submit)}
//         name="login"
//         initialValues={{ remember: true }}
//         style={{
//           width: '100%',
//           maxWidth: '600px', // Form width set to 600px
//           height: '400px', // Set form height to 400px
//           padding: '20px',
//           background: '#fff', // Optional background
//           borderRadius: '8px', // Optional rounded corners
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional shadow
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//         }}
//       >
//         {/* Email Input */}
//         <Form.Item
//           name="email"
//           rules={[{ required: true, message: 'Please input your email!' }]}
//           style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }} // Center align form item and input
//         >
//           <Input
//             prefix={<MailOutlined />}
//             placeholder="Email"
//             style={{
//               textAlign: 'center', // Center text inside input
//               width: '100%', // Ensure input takes full width
//             }}
//           />
//         </Form.Item>

//         {/* Password Input */}
//         <Form.Item
//           name="password"
//           rules={[{ required: true, message: 'Please input your Password!' }]}
//           style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }} // Center align form item and input
//         >
//           <Input
//             prefix={<LockOutlined />}
//             type="password"
//             placeholder="Password"
//             style={{
//               textAlign: 'center', // Center text inside input
//               width: '100%', // Ensure input takes full width
//             }}
//           />
//         </Form.Item>

//         {/* Remember Me and Forgot Password */}
//         <Form.Item
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between', // Justify between checkbox and link
//             alignItems: 'center',
//             padding: 0, // Remove extra padding
//           }}
//         >
//           <Form.Item name="remember" valuePropName="checked" noStyle>
//             <Checkbox>Remember me</Checkbox>
//           </Form.Item>
//           <a href="">Forgot password</a>
//         </Form.Item>

//         {/* Submit Button and Register Link */}
//         <Form.Item style={{ textAlign: 'center' }}>
//           <Button block type="primary" htmlType="submit">
//             Log in
//           </Button>
//           or <NavLink to="/register">Register now!</NavLink>
//         </Form.Item>
//       </Form>
//       </FormProvider>
//     </div>
//   );
// };

// export default Login;

import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useAppDispatch } from '../redux/hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLoginMutation } from '@/redux/features/auth/atuhApi';
import { verifyToken } from '@/utils/veryfyToken';
import { setUser, TUser } from '@/redux/features/auth/atuhSlice';
import PHForm from './form/PHForm';
import PHInput from './form/PHInput';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const defaultValues = {
  //   email: 'sdsf@sddeftdddxddadxddmsle.com',
  //   password: '32sd4ddffdstfssdasadsaaasdsdfdss',
  // };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading('Logging in');

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success('Logged in', { id: toastId, duration: 2000 });
      navigate(`/`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err:any) {
      toast.error(err?.data?.message || 'Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <div style={{height:600}}>
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <PHForm onSubmit={onSubmit} >
        <PHInput  type="text" name="email" label="email:" />
        <PHInput type="text" name="password" label="Password" />
        <Button
            htmlType="submit"
            style={{
              width: '90%',
              backgroundColor: '#4096FF',
              color: 'white',
              margin:'0 20px',
              padding: '18px 0',
            }}
          >
            Login
          </Button>
      <div style={{ margin: '13px 20px 0' }}>
      or <NavLink to="/register">Register  now!</NavLink>
      </div>
      </PHForm>
    </Row>
    </div>
  );
};

export default Login;