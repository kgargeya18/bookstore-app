import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await axios.post("http://localhost:5000/api/auth/admin-login", form);
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Admin login error:", err);
      setError(err.response?.data?.msg || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "48px auto", position: "relative" }}>
      <div style={{ position: "fixed", top: 24, left: 24, zIndex: 2000 }}>
        <BackButton 
          text="← Back to Home" 
          onClick={() => navigate("/")}
          style={{ background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)" }}
        />
      </div>
      <div style={{ position: "fixed", top: 24, right: 32, display: "flex", gap: 16, zIndex: 2000 }}>
        <a href="/login" style={{ background: "#43e97b", color: "#fff", fontWeight: "bold", borderRadius: 8, padding: "10px 20px", textDecoration: "none", boxShadow: "0 2px 8px #43e97b88", fontSize: 16 }}>Login</a>
        <a href="/register" style={{ background: "#fff", color: "#222", fontWeight: "bold", borderRadius: 8, padding: "10px 20px", textDecoration: "none", boxShadow: "0 2px 8px #43e97b88", fontSize: 16 }}>Register</a>
        <a href="/admin/login" style={{ background: "#ff9800", color: "#fff", fontWeight: "bold", borderRadius: 8, padding: "10px 20px", textDecoration: "none", boxShadow: "0 2px 8px #ff980088", fontSize: 16 }}>Admin Login</a>
      </div>
      <form onSubmit={handleSubmit} style={{
        position: "relative",
        padding: 32,
        borderRadius: 24,
        boxShadow: "0 8px 32px #0006",
        background: "linear-gradient(135deg,#ff9800 0%,#ffd700 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h2 style={{ fontWeight: "bold", fontSize: 28, marginBottom: 24, color: "#222", textShadow: "0 2px 8px #ffd700" }}>🛡️ Admin Login</h2>
        
        {error && (
          <div style={{
            background: "#ff1744",
            color: "#fff",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            fontSize: "14px"
          }}>
            {error}
          </div>
        )}
        
        <input 
          name="email" 
          placeholder="Admin Email" 
          value={form.email}
          onChange={handleChange} 
          style={{
            border: "none",
            borderRadius: 12,
            padding: "12px 18px",
            marginBottom: 16,
            width: "100%",
            fontSize: 18,
            boxShadow: "0 2px 8px #ffd70088"
          }}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Admin Password" 
          value={form.password}
          onChange={handleChange} 
          style={{
            border: "none",
            borderRadius: 12,
            padding: "12px 18px",
            marginBottom: 16,
            width: "100%",
            fontSize: 18,
            boxShadow: "0 2px 8px #ff980088"
          }}
        />
        <button 
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#ccc" : "linear-gradient(90deg,#43e97b 0%,#38f9d7 100%)",
            color: "#222",
            fontWeight: "bold",
            padding: "12px 32px",
            borderRadius: 12,
            marginTop: 12,
            boxShadow: "0 2px 8px #38f9d788",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: 20,
            width: "100%",
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Logging in..." : "Login as Admin"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
