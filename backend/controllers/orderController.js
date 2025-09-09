exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });
    
    // Validate status transitions
    const validStatuses = ["Approved", "Rejected", "Shipped", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    // If order is already approved/rejected/shipped/delivered, don't allow changes
    if (order.status !== "Pending" && status !== "Shipped" && status !== "Delivered") {
      return res.status(400).json({ msg: "Order cannot be modified after approval/rejection" });
    }

    // Only allow Shipped status for approved orders
    if (status === "Shipped" && order.status !== "Approved") {
      return res.status(400).json({ msg: "Order must be approved before shipping" });
    }

    // Only allow Delivered status for shipped orders
    if (status === "Delivered" && order.status !== "Shipped") {
      return res.status(400).json({ msg: "Order must be shipped before delivery" });
    }

    order.status = status;
    await order.save();

    // If order is approved, update book stock and add to user's purchased books
    if (status === "Approved") {
      const user = await User.findById(order.userId);
      for (let item of order.books) {
        const book = await Book.findById(item.bookId);
        if (!book) continue;
        if (book.stock < item.qty) {
          return res.status(400).json({ msg: `Not enough stock for book: ${book.title}` });
        }
        book.stock -= item.qty;
        book.popularity += item.qty; // Increase popularity
        await book.save();
        
        // Add to user's purchased books if not already there
        if (!user.purchasedBooks.includes(item.bookId)) {
          user.purchasedBooks.push(item.bookId);
        }
      }
      await user.save();
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const Order = require("../models/Order");
const Book = require("../models/Book");
const User = require("../models/User");

exports.createOrder = async (req, res) => {
  try {
    const { books, shippingAddress } = req.body;

    // Validate required fields
    if (!books || !Array.isArray(books) || books.length === 0) {
      return res.status(400).json({ msg: "Books are required" });
    }

    if (!shippingAddress) {
      return res.status(400).json({ msg: "Shipping address is required" });
    }

    // Calculate total price
    let totalPrice = 0;
    for (let item of books) {
      const book = await Book.findById(item.bookId);
      if (!book) return res.status(404).json({ msg: "Book not found" });
      if (book.stock < item.qty) return res.status(400).json({ msg: "Not enough stock" });
      totalPrice += book.price * item.qty;
    }

    const order = await Order.create({
      userId: req.user.id,
      books,
      totalPrice,
      shippingAddress
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("books.bookId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("books.bookId userId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
