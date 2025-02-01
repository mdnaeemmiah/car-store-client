

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
 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      toast.error(err?.data?.message || 'Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <div style={{height:600}}>
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <PHForm onSubmit={onSubmit} >
        <PHInput  type="text" name="email" label="email:" />
        <PHInput type="password" name="password" label="Password" />
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