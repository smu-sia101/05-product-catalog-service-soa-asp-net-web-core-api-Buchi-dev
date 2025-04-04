import { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Typography } from 'antd';
import { ShoppingOutlined, DollarOutlined, StockOutlined } from '@ant-design/icons';
import axiosInstance from '../utils/axios';
import API_CONFIG from '../config/api';

const { Title } = Typography;

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_CONFIG.endpoints.products);
      const products = response.data;

      // Calculate statistics
      const totalProducts = products.length;
      const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
      const lowStock = products.filter(product => product.stock < 10).length;

      setStats({
        totalProducts,
        totalValue,
        lowStock,
      });

      // Get 5 most recent products
      const recent = [...products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentProducts(recent);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const recentProductColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
  ];

  return (
    <div>
      <Title level={2}>Dashboard</Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Products"
              value={stats.totalProducts}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Inventory Value"
              value={stats.totalValue}
              prefix={<DollarOutlined />}
              precision={2}
              formatter={(value) => `$ ${value}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Low Stock Items"
              value={stats.lowStock}
              prefix={<StockOutlined />}
              valueStyle={{ color: stats.lowStock > 0 ? '#cf1322' : '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 24 }}>
        <Title level={3}>Recent Products</Title>
        <Table
          columns={recentProductColumns}
          dataSource={recentProducts}
          rowKey="_id"
          loading={loading}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Dashboard; 