const express = require("express");
const { register, login, adminLogin, getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require("../controllers/authController");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin-login", adminLogin);

// Cart routes
router.get("/cart", auth, getCart);
router.post("/cart", auth, addToCart);
router.put("/cart/:bookId", auth, updateCartItem);
router.delete("/cart/:bookId", auth, removeFromCart);
router.delete("/cart", auth, clearCart);

module.exports = router;

