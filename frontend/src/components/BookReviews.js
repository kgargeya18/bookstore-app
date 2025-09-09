import { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import LoadingSpinner from './LoadingSpinner';
import Alert from './Alert';

const BookReviews = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newReview, setNewReview] = useState({ rating: 0, text: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reviews/book/${bookId}`);
      setReviews(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to load reviews');
      setLoading(false);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Please login to submit a review');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/reviews', {
        bookId,
        rating: newReview.rating,
        review: newReview.text
      }, {
        headers: { Authorization: token }
      });
      setReviews([res.data, ...reviews]);
      setNewReview({ rating: 0, text: '' });
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to submit review');
    }
  };

  const handleLike = async (reviewId) => {
    if (!token) {
      setError('Please login to like reviews');
      return;
    }
    try {
      await axios.post(`http://localhost:5000/api/reviews/${reviewId}/like`, {}, {
        headers: { Authorization: token }
      });
      fetchReviews(); // Refresh reviews to get updated likes
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to like review');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ padding: '20px' }}>
      {error && <Alert type="error" message={error} />}
      
      {token && (
        <form onSubmit={submitReview} style={{
          marginBottom: '20px',
          padding: '20px',
          borderRadius: '12px',
          backgroundColor: '#fff3',
        }}>
          <h3 style={{ marginBottom: '10px' }}>Write a Review</h3>
          <div style={{ marginBottom: '10px' }}>
            <StarRating
              rating={newReview.rating}
              onRate={(rating) => setNewReview(prev => ({ ...prev, rating }))}
            />
          </div>
          <textarea
            value={newReview.text}
            onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
            placeholder="Write your review here..."
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              minHeight: '100px',
              marginBottom: '10px'
            }}
          />
          <button
            type="submit"
            disabled={!newReview.rating}
            style={{
              background: '#43e97b',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: newReview.rating ? 'pointer' : 'not-allowed',
              opacity: newReview.rating ? 1 : 0.5
            }}
          >
            Submit Review
          </button>
        </form>
      )}

      <div>
        {reviews.map(review => (
          <div key={review._id} style={{
            marginBottom: '20px',
            padding: '15px',
            borderRadius: '12px',
            backgroundColor: '#fff3',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{review.userId.name}</strong>
                {review.verified && (
                  <span style={{
                    backgroundColor: '#43e97b33',
                    color: '#43e97b',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    marginLeft: '10px'
                  }}>
                    Verified Purchase
                  </span>
                )}
              </div>
              <StarRating rating={review.rating} readonly />
            </div>
            <p style={{ margin: '10px 0' }}>{review.review}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => handleLike(review._id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: review.likes.includes(token) ? '#ff1744' : '#666',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                ❤️ {review.likes.length}
              </button>
              <span style={{ color: '#666', fontSize: '14px' }}>
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <div style={{ textAlign: 'center', color: '#666' }}>
            No reviews yet. Be the first to review!
          </div>
        )}
      </div>
    </div>
  );
};

export default BookReviews;
