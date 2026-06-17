import { FiStar } from 'react-icons/fi';

const StarRating = ({ rating = 0, size = 16, showCount = false, count = 0 }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {stars.map((star) => (
        <FiStar
          key={star}
          size={size}
          style={{
            fill: star <= Math.round(rating) ? '#f9ca24' : 'transparent',
            color: star <= Math.round(rating) ? '#f9ca24' : '#5c5f7a',
            transition: 'all 0.2s'
          }}
        />
      ))}
      {showCount && (
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '4px' }}>
          ({count})
        </span>
      )}
    </div>
  );
};

export default StarRating;
