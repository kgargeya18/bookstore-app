import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import PageContainer from '../components/PageContainer';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import Button from '../components/Button';
import AddressForm from '../components/AddressForm';
import BackButton from '../components/BackButton';

const Checkout = () => {
  const { cart, clearCart, calculateTotal } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const handleAddressChange = (field, value) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const validateAddress = () => {
    for (let field in address) {
      if (!address[field].trim()) {
        setError(`Please enter your ${field}`);
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    try {
      if (!validateAddress()) return;
      
      setLoading(true);
      setError('');

      const orderData = {
        books: cart.map(item => {
          const book = item.bookId || item;
          return {
            bookId: book._id,
            qty: item.qty,
            price: book.price
          };
        }),
        shippingAddress: address
      };

      await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: { Authorization: token }
      });

      clearCart();
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingSpinner />
      </PageContainer>
    );
  }

  if (!cart.length) {
    navigate('/cart');
    return null;
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
        }}>Checkout</h1>
      </div>

      {error && <Alert type="error" message={error} />}

      <div style={{ display: 'flex', gap: '32px' }}>
        {/* Left Column - Order Summary */}
        <div style={{ flex: '1' }}>
          <div style={{
            background: '#fff3',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '24px'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Order Summary</h2>
            {cart.map(item => {
              const book = item.bookId || item;
              return (
                <div
                  key={book._id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: '1px solid #eee'
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 'bold' }}>{book.title}</p>
                    <p style={{ color: '#666' }}>Quantity: {item.qty}</p>
                  </div>
                  <p style={{ color: '#43e97b', fontWeight: 'bold' }}>
                    ₹{book.price * item.qty}
                  </p>
                </div>
              );
            })}
            <div style={{
              marginTop: '16px',
              padding: '16px 0',
              borderTop: '2px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Total:</p>
              <p style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#43e97b'
              }}>₹{calculateTotal()}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Shipping Address */}
        <div style={{ flex: '1' }}>
          <div style={{
            background: '#fff3',
            padding: '24px',
            borderRadius: '12px'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Shipping Address</h2>
            <AddressForm
              address={address}
              onChange={handleAddressChange}
            />

            <Button
              onClick={handlePlaceOrder}
              style={{ width: '100%', marginTop: '24px' }}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Checkout;
