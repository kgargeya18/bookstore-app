const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Admin login attempt:", { email, adminEmail: process.env.ADMIN_EMAIL });
    
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });
      return res.json({ token, admin: { email, role: "admin" } });
    }
    return res.status(401).json({ msg: "Invalid admin credentials" });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ msg: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, role });

    res.json({ msg: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Cart management
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.bookId');
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { bookId, qty } = req.body;
    const user = await User.findById(req.user.id);
    
    const existingItem = user.cart.find(item => item.bookId.toString() === bookId);
    if (existingItem) {
      existingItem.qty += qty || 1;
    } else {
      user.cart.push({ bookId, qty: qty || 1 });
    }
    
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { qty } = req.body;
    const user = await User.findById(req.user.id);
    
    const item = user.cart.find(item => item.bookId.toString() === req.params.bookId);
    if (!item) return res.status(404).json({ msg: "Item not found in cart" });
    
    item.qty = qty;
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(item => item.bookId.toString() !== req.params.bookId);
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart = [];
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};