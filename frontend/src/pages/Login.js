import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const Login = () => {
  const { login } = useContext(AuthContext);
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
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.msg || "Login failed. Please try again.");
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
        padding: 32,
        borderRadius: 24,
        boxShadow: "0 8px 32px #0006",
        background: "linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
      <h2 style={{ fontWeight: "bold", fontSize: 28, marginBottom: 24, color: "#fff", textShadow: "0 2px 8px #38f9d7" }}>🔐 Login</h2>
      
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
        placeholder="Email" 
        value={form.email}
        onChange={handleChange} 
        style={{
          border: "none",
          borderRadius: 12,
          padding: "12px 18px",
          marginBottom: 16,
          width: "100%",
          fontSize: 18,
          boxShadow: "0 2px 8px #43e97b88"
        }}
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        value={form.password}
        onChange={handleChange} 
        style={{
          border: "none",
          borderRadius: 12,
          padding: "12px 18px",
          marginBottom: 16,
          width: "100%",
          fontSize: 18,
          boxShadow: "0 2px 8px #38f9d788"
        }}
      />
      <button 
        type="submit"
        disabled={loading}
        style={{
          background: loading ? "#ccc" : "linear-gradient(90deg,#ff9800 0%,#ffd700 100%)",
          color: "#222",
          fontWeight: "bold",
          padding: "12px 32px",
          borderRadius: 12,
          marginTop: 12,
          boxShadow: "0 2px 8px #ffd70088",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: 20,
          width: "100%",
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
    </div>
  );
};

export default Login;
