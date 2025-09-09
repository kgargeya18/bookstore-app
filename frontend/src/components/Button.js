const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  style = {}
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: '#43e97b',
          color: '#222',
        };
      case 'secondary':
        return {
          background: '#ff9800',
          color: '#fff',
        };
      case 'danger':
        return {
          background: '#ff1744',
          color: '#fff',
        };
      case 'outline':
        return {
          background: 'transparent',
          color: '#43e97b',
          border: '2px solid #43e97b',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '6px 12px',
          fontSize: '14px',
        };
      case 'large':
        return {
          padding: '12px 24px',
          fontSize: '18px',
        };
      default:
        return {
          padding: '8px 16px',
          fontSize: '16px',
        };
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        fontWeight: 'bold',
        borderRadius: '8px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : 'auto',
        boxShadow: '0 2px 8px #0002',
        transition: 'all 0.2s ease',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
