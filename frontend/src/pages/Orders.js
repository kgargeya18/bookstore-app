import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import PageContainer from '../components/PageContainer';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import OrderStatus from '../components/OrderStatus';
import BackButton from '../components/BackButton';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders/my-orders", {
          headers: { Authorization: token }
        });
        setOrders(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingSpinner />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px', 
        marginBottom: '24px' 
      }}>
        <BackButton />
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          margin: 0,
          color: '#222'
        }}>My Orders</h1>
      </div>

      {error && <Alert type="error" message={error} />}

      {orders.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px'
        }}>
          You haven't placed any orders yet.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {orders.map(order => (
            <div
              key={order._id}
              style={{
                background: '#fff3',
                padding: '24px',
                borderRadius: '12px'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div>
                  <p style={{ color: '#666', marginBottom: '4px' }}>
                    Order ID: {order.orderId || order._id}
                  </p>
                  <p style={{ color: '#666' }}>
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <OrderStatus status={order.status} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                {order.books.map(item => (
                  <div
                    key={item._id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 'bold' }}>{item.bookId.title}</p>
                      <p style={{ color: '#666' }}>Quantity: {item.qty}</p>
                    </div>
                    <p style={{ color: '#43e97b', fontWeight: 'bold' }}>
                      ₹{item.price * item.qty}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '16px 0',
                borderTop: '2px solid #eee'
              }}>
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>Shipping Address:</p>
                  <p style={{ color: '#666' }}>{order.shippingAddress.street}</p>
                  <p style={{ color: '#666' }}>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                  <p style={{ color: '#666' }}>{order.shippingAddress.country}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#666', marginBottom: '4px' }}>Total Amount:</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#43e97b' }}>
                    ₹{order.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
};

export default Orders;
