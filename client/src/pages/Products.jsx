import { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  message, 
  Popconfirm, 
  Space 
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axiosInstance from '../utils/axios';
import API_CONFIG from '../config/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_CONFIG.endpoints.products);
      setProducts(response.data);
    } catch (err) {
      message.error('Failed to fetch products: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddEdit = async (values) => {
    try {
      if (editingProduct) {
        await axiosInstance.put(`${API_CONFIG.endpoints.products}/${editingProduct._id}`, values);
        message.success('Product updated successfully');
      } else {
        await axiosInstance.post(API_CONFIG.endpoints.products, values);
        message.success('Product added successfully');
      }
      setModalVisible(false);
      form.resetFields();
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      message.error(`Failed to ${editingProduct ? 'update' : 'add'} product: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`${API_CONFIG.endpoints.products}/${id}`);
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (err) {
      message.error('Failed to delete product: ' + err.message);
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl) => (
        <img 
          src={imageUrl} 
          alt="Product" 
          style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => {
              setEditingProduct(record);
              form.setFieldsValue(record);
              setModalVisible(true);
            }}
          />
          <Popconfirm
            title="Delete product"
            description="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingProduct(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Add Product
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingProduct(null);
          form.resetFields();
        }}
        onOk={form.submit}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddEdit}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter product description' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Image URL"
            rules={[{ required: true, message: 'Please enter image URL' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter product price' }]}
          >
            <InputNumber
              min={0}
              precision={2}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: 'Please enter stock quantity' }]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products; 