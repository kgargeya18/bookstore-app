const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String },
  verified: { type: Boolean, default: false }, // Whether the user purchased the book
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  replies: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String },
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

// Ensure one review per user per book
reviewSchema.index({ userId: 1, bookId: 1 }, { unique: true });

// Update book's average rating when a review is added/modified
reviewSchema.post('save', async function() {
  const Book = mongoose.model('Book');
  const book = await Book.findById(this.bookId);
  if (book) {
    const reviews = await this.constructor.find({ bookId: this.bookId });
    const totalRatings = reviews.length;
    const averageRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings;
    book.averageRating = averageRating;
    book.totalRatings = totalRatings;
    await book.save();
  }
});

module.exports = mongoose.model("Review", reviewSchema);
