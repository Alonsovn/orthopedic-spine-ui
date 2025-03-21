// src/components/LoginForm.tsx
import React from 'react';
import { Form, Input, Button, Layout, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Slices/userSlice';
import { useLoginMutation } from '../../Api/orthopedicSpineApi';

const { Content } = Layout;
const { Title } = Typography;

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [loginApi, { isLoading }] = useLoginMutation();

  const onLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await loginApi(values).unwrap();

      if (!response || !response.accessToken || !response.refreshToken) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const payload = {
        email: values.email,
        password: values.password,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };

      dispatch(login(payload));

      message.success('Logged in successfully!');
    } catch (error) {
      message.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <Content style={{ width: 300, margin: '100px auto' }}>
      <Title level={2}>Iniciar sesión</Title>
      <Form name="login_form" onFinish={onLogin}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Favor ingresar su correo!' },
            { type: 'email', message: 'El correo ingresado no es valido!' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Favor ingresar su contraseña!' }]}>
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100%' }}>
            Iniciar sesion
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default Login;
