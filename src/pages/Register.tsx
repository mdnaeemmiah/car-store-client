import { Button, Row } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import PHForm from './form/PHForm';
import PHInput from './form/PHInput';
import { useAppDispatch } from '@/redux/hooks';
import { toast } from 'sonner';
import { FieldValues } from 'react-hook-form';
import { useRegisterMutation } from '@/redux/features/auth/atuhApi';
import { verifyToken } from '@/utils/veryfyToken';
import { setUser, TUser } from '@/redux/features/auth/atuhSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [register] = useRegisterMutation();

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    const toastId = toast.loading('Registering...');

    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const res = await register(userInfo).unwrap();
  // console.log('API Response:', res); // Debugging API response

  if (!res?.data?.accessToken) {
    throw new Error('No accessToken received');
  }

  const user = verifyToken(res.data.accessToken) as TUser;
  // console.log('Decoded User:', user);
  
  dispatch(setUser({ user, token: res.data.accessToken }));
  toast.success('Registration successful', { id: toastId, duration: 2000 });
  navigate('/');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (err:any) {
  // console.error('Registration error:', err);
  toast.error(err?.message || 'Something went wrong', { id: toastId, duration: 2000 });
}
  };

  return (
    <div style={{ height: 600 }}>
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" name="name" label="Name:" />
          <PHInput type="email" name="email" label="Email:" />
          <PHInput type="password" name="password" label="Password" />
          <Button
            htmlType="submit"
            style={{
              width: '90%',
              backgroundColor: '#4096FF',
              color: 'white',
              margin: '0 20px',
              padding: '18px 0',
            }}
          >
            Register
          </Button>
          <div style={{ margin: '13px 20px 0' }}>
            or <NavLink to="/login">Login now!</NavLink>
          </div>
        </PHForm>
      </Row>
    </div>
  );
};

export default Register;
