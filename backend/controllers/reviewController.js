const Review = require("../models/Review");
const Book = require("../models/Book");
const User = require("../models/User");

exports.addReview = async (req, res) => {
  try {
    const { bookId, rating, review } = req.body;
    const userId = req.user.id;

    // Check if user has purchased the book
    const user = await User.findById(userId);
    const hasBook = user.purchasedBooks.includes(bookId);

    const reviewData = {
      userId,
      bookId,
      rating,
      review,
      verified: hasBook
    };

    const newReview = await Review.create(reviewData);
    await newReview.populate('userId', 'name');
    
    res.json(newReview);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ msg: "You have already reviewed this book" });
    }
    res.status(500).json({ msg: err.message });
  }
};

exports.getBookReviews = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ bookId })
      .populate('userId', 'name')
      .sort('-createdAt');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.id })
      .populate('bookId', 'title author coverImage')
      .sort('-createdAt');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const updatedReview = await Review.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { rating, review },
      { new: true }
    ).populate('userId', 'name');
    
    if (!updatedReview) return res.status(404).json({ msg: "Review not found" });
    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!review) return res.status(404).json({ msg: "Review not found" });
    res.json({ msg: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.likeReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ msg: "Review not found" });

    const hasLiked = review.likes.includes(req.user.id);
    if (hasLiked) {
      review.likes = review.likes.filter(id => id.toString() !== req.user.id);
    } else {
      review.likes.push(req.user.id);
    }
    
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.replyToReview = async (req, res) => {
  try {
    const { text } = req.body;
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ msg: "Review not found" });

    review.replies.push({
      userId: req.user.id,
      text
    });
    
    await review.save();
    const populatedReview = await Review.findById(review._id)
      .populate('replies.userId', 'name');
    
    res.json(populatedReview);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
