import { useState } from 'react';

const StarRating = ({ rating, onRate, readonly = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={index}
            style={{
              cursor: readonly ? 'default' : 'pointer',
              color: ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9',
              fontSize: '24px',
              transition: 'color 200ms'
            }}
            onClick={() => !readonly && onRate(ratingValue)}
            onMouseEnter={() => !readonly && setHover(ratingValue)}
            onMouseLeave={() => !readonly && setHover(0)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
