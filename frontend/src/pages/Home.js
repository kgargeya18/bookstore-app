import { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '../components/Grid';
import BookCard from '../components/BookCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import PageContainer from '../components/PageContainer';
import BackButton from '../components/BackButton';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    category: '',
    sort: 'popularity',
    search: ''
  });

  useEffect(() => {
    fetchBooks();
  }, [filters]);

  const fetchBooks = async () => {
    try {
      let url = 'http://localhost:5000/api/books?';
      if (filters.genre) url += `genre=${filters.genre}&`;
      if (filters.category) url += `category=${filters.category}&`;
      if (filters.sort) url += `sort=${filters.sort}&`;
      if (filters.search) url += `search=${filters.search}`;

      const res = await axios.get(url);
      setBooks(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load books');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleSort = (e) => {
    setFilters(prev => ({ ...prev, sort: e.target.value }));
  };

  const handleFilter = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  if (loading) return (
    <PageContainer>
      <LoadingSpinner />
    </PageContainer>
  );

  return (
    <PageContainer>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <BackButton 
          text="← Refresh" 
          onClick={() => window.location.reload()}
          style={{ background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)" }}
        />
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search books..."
          value={filters.search}
          onChange={handleSearch}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            width: '300px'
          }}
        />

        <div style={{ display: 'flex', gap: '16px' }}>
          {/* Sort Dropdown */}
          <select
            value={filters.sort}
            onChange={handleSort}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              background: '#fff'
            }}
          >
            <option value="popularity">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>

          {/* Genre Filter */}
          <select
            value={filters.genre}
            onChange={(e) => handleFilter('genre', e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              background: '#fff'
            }}
          >
            <option value="">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Romance">Romance</option>
          </select>

          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => handleFilter('category', e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              background: '#fff'
            }}
          >
            <option value="">All Categories</option>
            <option value="Bestseller">Bestsellers</option>
            <option value="New Release">New Releases</option>
            <option value="Award Winner">Award Winners</option>
            <option value="Classic">Classics</option>
          </select>
        </div>
      </div>

      {error && <Alert type="error" message={error} />}

      {books.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px'
        }}>
          No books found matching your criteria
        </div>
      ) : (
        <Grid columns={3}>
          {books.map(book => (
            <BookCard key={book._id} book={book} showDetails />
          ))}
        </Grid>
      )}
    </PageContainer>
  );
};

export default Home;
