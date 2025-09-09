const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  cart: [{
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    qty: { type: Number, default: 1 }
  }],
  addresses: [{
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false }
  }],
  purchasedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }], // To track which books user can review
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
