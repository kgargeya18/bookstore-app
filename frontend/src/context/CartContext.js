import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add a book to cart
  const addToCart = (book) => {
    setCart(prev => {
      const existing = prev.find(item => item.book._id === book._id);
      if (existing) {
        return prev.map(item =>
          item.book._id === book._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { book, qty: 1 }];
      }
    });
  };

  // Update quantity of a book
  const updateQuantity = (bookId, qty) => {
    setCart(prev =>
      prev.map(item =>
        item.book._id === bookId ? { ...item, qty } : item
      )
    );
  };

  // Remove book from cart
  const removeFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.book._id !== bookId));
  };

  // Clear cart (after checkout)
  const clearCart = () => setCart([]);

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.book.price * item.qty, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, calculateTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
