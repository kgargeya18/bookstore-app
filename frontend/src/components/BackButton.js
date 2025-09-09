import { useNavigate } from 'react-router-dom';

const BackButton = ({ 
  text = "← Back", 
  onClick, 
  style = {},
  className = ""
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1); // Go back one page in history
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      style={{
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        ...style
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
      }}
    >
      <span>←</span>
      <span>{text}</span>
    </button>
  );
};

export default BackButton;




