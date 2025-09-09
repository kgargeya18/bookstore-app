import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <nav style={{
      background: "linear-gradient(90deg,#43e97b 0%,#38f9d7 100%)",
      color: "#fff",
      padding: "18px 32px",
      borderRadius: 20,
      boxShadow: "0 8px 32px #0006",
      margin: 16,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "Montserrat, Arial, sans-serif",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backdropFilter: "blur(8px)",
      border: "1px solid #fff2"
    }}>
      <h1 style={{ fontWeight: "bold", fontSize: 28, letterSpacing: 2, textShadow: "0 2px 8px #38f9d7" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>📚 BookStore</Link>
      </h1>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {user ? (
          <>
            <Link to="/orders" style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>Orders</Link>
            <Link to="/cart" style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>Cart <span style={{ background: "#ffd700", color: "#222", borderRadius: "50%", padding: "2px 8px", marginLeft: 4 }}>{cart.length}</span></Link>
            <button onClick={logout} style={{ background: "#ff9800", color: "#fff", fontWeight: "bold", border: "none", borderRadius: 8, padding: "8px 16px", marginLeft: 10, boxShadow: "0 2px 8px #ff980088", cursor: "pointer" }}>Logout</button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
