import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Alert } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();
  const { register } = useAuth();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setStatus({ type: 'info', message: 'Creating your account...' });
      await register(values.username, values.email, values.password);
      setStatus({ type: 'success', message: 'Registration successful!' });
      message.success('Welcome to Product Catalog!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Registration failed. Please try again.' 
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
            Create Account
          </Title>
          <Text type="secondary">
            Join us to manage your product catalog
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
          name="register"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} 
              placeholder="Username"
              style={{ borderRadius: '6px' }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined style={{ color: '#bfbfbf' }} />} 
              placeholder="Email"
              style={{ borderRadius: '6px' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Password"
              style={{ borderRadius: '6px' }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Confirm Password"
              style={{ borderRadius: '6px' }}
            />
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#1890ff', fontWeight: '500' }}>
                Sign in
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register; 