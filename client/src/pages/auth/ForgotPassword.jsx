import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Alert, Space } from 'antd';
import { MailOutlined, LockOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_CONFIG from '../../config/api';

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const navigate = useNavigate();

  const onVerifyEmail = async (values) => {
    try {
      setLoading(true);
      setStatus({ type: 'info', message: 'Verifying your email...' });
      
      // Check if email exists in the system
      const response = await axios.post(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.checkEmail}`, {
        email: values.email
      });

      if (response.data.exists) {
        setVerifiedEmail(values.email);
        setStatus({ 
          type: 'success', 
          message: 'Email verified! Please set your new password.' 
        });
        setEmailVerified(true);
      } else {
        setStatus({ 
          type: 'error', 
          message: 'This email is not registered in our system. Please check your email or register a new account.' 
        });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Email verification failed. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const onResetPassword = async (values) => {
    try {
      setLoading(true);
      setStatus({ type: 'info', message: 'Resetting your password...' });
      
      // Reset password with verified email
      await axios.post(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.resetPassword}`, {
        email: verifiedEmail,
        newPassword: values.newPassword
      });

      setStatus({ type: 'success', message: 'Password reset successful!' });
      message.success('Password has been reset successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to reset password. Please try again.' 
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
            {emailVerified ? 'Reset Password' : 'Forgot Password'}
          </Title>
          <Text type="secondary">
            {emailVerified 
              ? 'Enter your new password'
              : 'Enter your email to reset your password'
            }
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

        {!emailVerified ? (
          <Form
            name="verify-email"
            onFinish={onVerifyEmail}
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
                prefix={<MailOutlined style={{ color: '#bfbfbf' }} />} 
                placeholder="Email"
                style={{ borderRadius: '6px' }}
              />
            </Form.Item>

            <Form.Item>
              <Space direction="vertical" style={{ width: '100%' }}>
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
                  {loading ? 'Verifying...' : 'Verify Email'}
                </Button>
                <Button 
                  type="link" 
                  block
                  onClick={() => {
                    setStatus({ type: '', message: '' });
                    navigate('/login');
                  }}
                >
                  Back to Login
                </Button>
              </Space>
            </Form.Item>
          </Form>
        ) : (
          <Form
            name="reset-password"
            onFinish={onResetPassword}
            layout="vertical"
            requiredMark={false}
            size="large"
          >
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: 'Please input your new password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="New Password"
                style={{ borderRadius: '6px' }}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
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
              <Space direction="vertical" style={{ width: '100%' }}>
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
                  {loading ? 'Resetting Password...' : 'Reset Password'}
                </Button>
                <Button 
                  type="link" 
                  block
                  onClick={() => {
                    setEmailVerified(false);
                    setStatus({ type: '', message: '' });
                  }}
                >
                  Try Different Email
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword; 