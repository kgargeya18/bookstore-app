
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Book3D from "./Book3D";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book, showDetails = false }) => {
  const { addToCart } = useContext(CartContext);
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const buyNow = async () => {
    if (!token) {
      alert("Please login to buy books");
      navigate("/login");
      return;
    }
    
    try {
      // Add the book to cart first
      await addToCart(book, 1);
      // Navigate to checkout
      navigate("/checkout");
    } catch (err) {
      alert("Failed to add to cart");
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} style={{ color: index < rating ? '#ffc107' : '#e4e5e9' }}>★</span>
    ));
  };
  return (
    <div style={{ background: "linear-gradient(135deg,#1e3c72,#2a5298)", borderRadius: 20, boxShadow: "0 8px 32px #0006", padding: 16, margin: 8, color: "#fff", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Book3D color="#ff9800" title={book.title} />
      <h2 style={{ fontWeight: "bold", fontSize: 22, margin: "12px 0 4px 0" }}>{book.title}</h2>
      <p style={{ fontSize: 16, marginBottom: 4 }}>{book.author}</p>
      {book.genre && (
        <p style={{ fontSize: 14, color: '#aaa', marginBottom: 4 }}>
          {book.genre} • {book.category}
        </p>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ fontSize: 14 }}>{renderStars(Math.round(book.averageRating))}</div>
        <span style={{ color: '#aaa', fontSize: 14 }}>
          ({book.totalRatings} {book.totalRatings === 1 ? 'review' : 'reviews'})
        </span>
      </div>
      <p style={{ color: "#ffd700", fontWeight: "bold", fontSize: 18 }}>₹{book.price}</p>
      {showDetails && (
        <p style={{ 
          fontSize: 14, 
          color: '#ddd', 
          margin: '8px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 8 
        }}>
          <span style={{ 
            backgroundColor: book.stock > 0 ? '#43e97b33' : '#ff174433',
            color: book.stock > 0 ? '#43e97b' : '#ff1744',
            padding: '2px 8px',
            borderRadius: 12,
            fontSize: 12
          }}>
            {book.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
          {book.stock > 0 && `${book.stock} copies available`}
        </p>
      )}
      <button
        onClick={() => {
          if (!token) {
            alert("Please login to add items to cart");
            navigate("/login");
            return;
          }
          addToCart(book);
          alert("Book added to cart!");
        }}
        style={{ background: "#43e97b", color: "#222", fontWeight: "bold", padding: "8px 20px", borderRadius: 8, marginTop: 10, boxShadow: "0 2px 8px #43e97b88", border: "none", cursor: "pointer" }}
      >
        Add to Cart
      </button>
      {user && user.role !== "admin" && (
        <button
          onClick={buyNow}
          style={{ background: "#ff9800", color: "#fff", fontWeight: "bold", padding: "8px 20px", borderRadius: 8, marginTop: 10, boxShadow: "0 2px 8px #ff980088", border: "none", cursor: "pointer" }}
        >
          Buy Now
        </button>
      )}
    </div>
  );
};

export default BookCard;
