const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const { genre, category, sort, search } = req.query;
    let query = {};
    
    // Apply filters
    if (genre) query.genre = genre;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    let sortQuery = {};
    switch (sort) {
      case 'rating':
        sortQuery = { averageRating: -1 };
        break;
      case 'priceAsc':
        sortQuery = { price: 1 };
        break;
      case 'priceDesc':
        sortQuery = { price: -1 };
        break;
      case 'newest':
        sortQuery = { createdAt: -1 };
        break;
      default:
        sortQuery = { popularity: -1 };
    }
    
    const books = await Book.find(query).sort(sortQuery);
    res.json(books);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.json(book);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ msg: "Book deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
