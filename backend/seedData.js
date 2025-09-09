const mongoose = require('mongoose');
const Book = require('./models/Book');
require('dotenv').config();

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    category: "Classic",
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    price: 299,
    stock: 50,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300",
    averageRating: 4.2,
    totalRatings: 150,
    popularity: 200
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    category: "Classic",
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    price: 349,
    stock: 30,
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    averageRating: 4.5,
    totalRatings: 200,
    popularity: 180
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Science Fiction",
    category: "Classic",
    description: "A dystopian social science fiction novel about totalitarian control and surveillance.",
    price: 279,
    stock: 40,
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300",
    averageRating: 4.3,
    totalRatings: 175,
    popularity: 160
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    category: "Classic",
    description: "A fantasy novel about a hobbit's unexpected journey to help dwarves reclaim their homeland.",
    price: 399,
    stock: 25,
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300",
    averageRating: 4.6,
    totalRatings: 300,
    popularity: 250
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    category: "Classic",
    description: "A romantic novel of manners that critiques the British landed gentry.",
    price: 329,
    stock: 35,
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    averageRating: 4.4,
    totalRatings: 220,
    popularity: 190
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    category: "Classic",
    description: "A coming-of-age story about teenage rebellion and alienation.",
    price: 259,
    stock: 20,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300",
    averageRating: 3.8,
    totalRatings: 120,
    popularity: 140
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    category: "Bestseller",
    description: "The first book in the magical Harry Potter series.",
    price: 499,
    stock: 100,
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300",
    averageRating: 4.8,
    totalRatings: 500,
    popularity: 400
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    category: "Classic",
    description: "An epic high-fantasy novel about the quest to destroy the One Ring.",
    price: 599,
    stock: 15,
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300",
    averageRating: 4.7,
    totalRatings: 400,
    popularity: 350
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');
    
    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');
    
    // Insert sample books
    await Book.insertMany(sampleBooks);
    console.log('Sample books inserted successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

