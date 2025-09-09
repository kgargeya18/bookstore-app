import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", price: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!adminToken) navigate("/admin/login");

    const fetchData = async () => {
      try {
        const bookRes = await axios.get("http://localhost:5000/api/books", {
          headers: { Authorization: adminToken },
        });
        setBooks(Array.isArray(bookRes.data) ? bookRes.data : bookRes.data.books || []);

        const orderRes = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: adminToken },
        });
        setOrders(Array.isArray(orderRes.data) ? orderRes.data : orderRes.data.orders || []);
      } catch (err) {
        setError("Failed to load data");
      }
    };

    fetchData();
  }, [adminToken, navigate]);

  const handleBookChange = (e) => setNewBook({ ...newBook, [e.target.name]: e.target.value });

  const addBook = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/books", newBook, {
        headers: { Authorization: adminToken },
      });
      setBooks([...books, res.data]);
      setNewBook({ title: "", author: "", price: "" });
      setMessage("✅ Book added successfully");
    } catch (err) {
      setError("❌ Failed to add book");
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: adminToken },
      });
      setBooks(books.filter((book) => book._id !== id));
      setMessage("✅ Book deleted successfully");
    } catch (err) {
      setError("❌ Failed to delete book");
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status },
        { headers: { Authorization: adminToken } }
      );
      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, status: res.data.status } : order
        )
      );
      setMessage(`✅ Order updated to ${status}`);
    } catch (err) {
      setError("❌ Failed to update order status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div style={{ padding: 32, background: "linear-gradient(135deg,#ff9800 0%,#ffd700 100%)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <BackButton 
            text="← Back to Home" 
            onClick={() => navigate("/")}
            style={{ background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)" }}
          />
          <h2 style={{ fontWeight: "bold", fontSize: 32, margin: 0, color: "#222" }}>📚 Admin Dashboard</h2>
        </div>
        <button onClick={handleLogout} style={{ background: "#ff1744", color: "#fff", fontWeight: "bold", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      {/* Feedback messages */}
      {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      {/* Add Book Form */}
      <form onSubmit={addBook} style={{ marginBottom: 32, display: "flex", gap: 12 }}>
        <input name="title" placeholder="Title" value={newBook.title} onChange={handleBookChange} style={{ borderRadius: 8, padding: 8 }} />
        <input name="author" placeholder="Author" value={newBook.author} onChange={handleBookChange} style={{ borderRadius: 8, padding: 8 }} />
        <input name="price" placeholder="Price" value={newBook.price} onChange={handleBookChange} style={{ borderRadius: 8, padding: 8 }} />
        <button style={{ background: "#43e97b", color: "#222", fontWeight: "bold", borderRadius: 8, padding: "8px 16px", border: "none" }}>Add Book</button>
      </form>

      {/* Books Section */}
      <h3 style={{ fontWeight: "bold", fontSize: 24, marginBottom: 16 }}>Books</h3>
      <ul>
        {books.map((book) => (
          <li key={book._id} style={{ marginBottom: 8, background: "#fff3", padding: 12, borderRadius: 8 }}>
            {book.title} by {book.author} - ₹{book.price}
            <button onClick={() => deleteBook(book._id)} style={{ marginLeft: 16, background: "#ff1744", color: "#fff", borderRadius: 8, padding: "4px 12px", border: "none" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Orders Section */}
      <h3 style={{ fontWeight: "bold", fontSize: 24, margin: "32px 0 16px 0" }}>Orders</h3>
      <ul>
        {orders.map((order) => (
          <li key={order._id} style={{ marginBottom: 8, background: "#fff3", padding: 12, borderRadius: 8 }}>
            Order #{order._id} - Status: {order.status}
            <div style={{ display: "inline-block", marginLeft: 16 }}>
              {order.status === "Pending" && (
                <>
                  <button style={{ marginRight: 8, background: "#43e97b", color: "#222", borderRadius: 8, padding: "4px 12px", border: "none", fontWeight: "bold" }} onClick={() => updateOrderStatus(order._id, "Approved")}>
                    Approve
                  </button>
                  <button style={{ background: "#ff1744", color: "#fff", borderRadius: 8, padding: "4px 12px", border: "none", fontWeight: "bold" }} onClick={() => updateOrderStatus(order._id, "Rejected")}>
                    Reject
                  </button>
                </>
              )}
              {order.status === "Approved" && (
                <button style={{ background: "#4a90e2", color: "#fff", borderRadius: 8, padding: "4px 12px", border: "none", fontWeight: "bold" }} onClick={() => updateOrderStatus(order._id, "Shipped")}>
                  Mark as Shipped
                </button>
              )}
              {order.status === "Shipped" && (
                <button style={{ background: "#4a90e2", color: "#fff", borderRadius: 8, padding: "4px 12px", border: "none", fontWeight: "bold" }} onClick={() => updateOrderStatus(order._id, "Delivered")}>
                  Mark as Delivered
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
