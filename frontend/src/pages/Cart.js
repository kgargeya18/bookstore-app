import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import PageContainer from '../components/PageContainer';
import Alert from '../components/Alert';
import Button from '../components/Button';
import Book3D from '../components/Book3D';
import BackButton from '../components/BackButton';
import Breadcrumb from '../components/Breadcrumb';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, calculateTotal } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleQuantityChange = (bookId, newQty) => {
    if (newQty < 1) return;
    updateQuantity(bookId, newQty);
  };

  const handleCheckout = () => {
    if (!token) {
      setError('Please login to checkout');
      return;
    }
    navigate('/checkout');
  };

  return (
    <PageContainer>
      <Breadcrumb />
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <BackButton />
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#222' }}>Your Cart</h1>
      </div>

      {error && <Alert type="error" message={error} />}

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px' }}>
          Your cart is empty. <a href="/" style={{ color: '#43e97b' }}>Continue shopping</a>
        </div>
      ) : (
        <>
          {cart.map(item => {
            const book = item.book;
            return (
              <div key={book._id} style={{ display: 'flex', alignItems: 'center', padding: '16px', background: '#fff3', borderRadius: '12px', marginBottom: '16px' }}>
                <div style={{ width: '100px', marginRight: '24px' }}>
                  <Book3D color="#ff9800" title={book.title} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>{book.title}</h3>
                  <p style={{ color: '#666', marginBottom: '8px' }}>{book.author}</p>
                  <p style={{ color: '#43e97b', fontWeight: 'bold' }}>₹{book.price}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '4px', borderRadius: '8px' }}>
                    <button onClick={() => handleQuantityChange(book._id, item.qty - 1)}>-</button>
                    <span style={{ width: '40px', textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => handleQuantityChange(book._id, item.qty + 1)}>+</button>
                  </div>
                  <Button variant="danger" size="small" onClick={() => removeFromCart(book._id)}>Remove</Button>
                </div>
              </div>
            );
          })}

          <div style={{ borderTop: '1px solid #eee', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p>Total ({cart.reduce((sum, item) => sum + item.qty, 0)} items): <strong>₹{calculateTotal()}</strong></p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="outline" onClick={() => navigate('/')}>Continue Shopping</Button>
              <Button onClick={handleCheckout}>Proceed to Checkout</Button>
            </div>
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default Cart;
