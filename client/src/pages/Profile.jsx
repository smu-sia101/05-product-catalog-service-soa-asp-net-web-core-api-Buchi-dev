import { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Typography, Alert } from 'antd';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const { Title } = Typography;

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileStatus, setProfileStatus] = useState({ type: '', message: '' });
  const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' });
  const [form] = Form.useForm();
  const [profileForm] = Form.useForm();

  // Update form values when user data changes
  useEffect(() => {
    if (user) {
      profileForm.setFieldsValue({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user, profileForm]);

  const handleUpdateProfile = async (values) => {
    try {
      setLoading(true);
      setProfileStatus({ type: 'info', message: 'Updating your profile...' });
      
      const response = await axios.put(
        'http://localhost:5000/api/auth/update-details',
        values
      );

      if (response.data) {
        updateUser(response.data);
        setProfileStatus({ 
          type: 'success', 
          message: 'Profile updated successfully!' 
        });
      }
    } catch {
      setProfileStatus({ 
        type: 'error', 
        message: 'Failed to update profile. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (values) => {
    try {
      setLoading(true);
      setPasswordStatus({ type: 'info', message: 'Updating your password...' });
      
      await axios.put(
        'http://localhost:5000/api/auth/update-password', 
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword
        }
      );

      setPasswordStatus({ 
        type: 'success', 
        message: 'Password updated successfully!' 
      });
      form.resetFields();
    } catch {
      setPasswordStatus({ 
        type: 'error', 
        message: 'Failed to update password. Please check your current password.' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <Alert
          message="Not Logged In"
          description="Please log in to view your profile"
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title level={2}>Profile Settings</Title>

      <Card title="Personal Information" style={{ marginBottom: 24 }}>
        {profileStatus.type && (
          <Alert
            message={profileStatus.message}
            type={profileStatus.type}
            showIcon
            style={{ marginBottom: '24px' }}
          />
        )}

        <Form
          form={profileForm}
          layout="vertical"
          onFinish={handleUpdateProfile}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              style={{ borderRadius: '6px' }}
            >
              {loading ? 'Updating Profile...' : 'Update Profile'}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Change Password">
        {passwordStatus.type && (
          <Alert
            message={passwordStatus.message}
            type={passwordStatus.type}
            showIcon
            style={{ marginBottom: '24px' }}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdatePassword}
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password style={{ borderRadius: '6px' }} />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: 'Please enter your new password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password style={{ borderRadius: '6px' }} />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password style={{ borderRadius: '6px' }} />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              style={{ borderRadius: '6px' }}
            >
              {loading ? 'Updating Password...' : 'Update Password'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile; 