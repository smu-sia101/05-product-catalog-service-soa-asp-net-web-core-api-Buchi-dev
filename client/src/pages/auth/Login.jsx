import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Checkbox, Space, Alert } from 'antd';
import { UserOutlined, LockOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setStatus({ type: 'info', message: 'Signing in...' });
      await login(values.email, values.password);
      setStatus({ type: 'success', message: 'Login successful!' });
      message.success('Welcome back!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Login failed. Please check your credentials.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          borderRadius: '12px'
        }}
        bodyStyle={{ padding: '40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <ShoppingOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
          <Title level={2} style={{ margin: 0, color: '#262626' }}>
            Welcome Back
          </Title>
          <Text type="secondary">
            Sign in to manage your product catalog
          </Text>
        </div>

        {status.type && (
          <Alert
            message={status.message}
            type={status.type}
            showIcon
            style={{ marginBottom: '24px' }}
          />
        )}

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} 
              placeholder="Email"
              style={{ borderRadius: '6px' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Password"
              style={{ borderRadius: '6px' }}
            />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/forgot-password" style={{ color: '#1890ff' }}>
                Forgot password?
              </Link>
            </Space>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              loading={loading}
              style={{
                height: '45px',
                borderRadius: '6px',
                fontWeight: '500'
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#1890ff', fontWeight: '500' }}>
                Register now
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 