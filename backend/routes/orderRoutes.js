const express = require("express");
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require("../controllers/orderController");
const { auth, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/", auth, createOrder);
router.get("/my-orders", auth, getUserOrders);
router.get("/", auth, adminOnly, getAllOrders);
router.put("/:id/status", auth, adminOnly, updateOrderStatus);

module.exports = router;

