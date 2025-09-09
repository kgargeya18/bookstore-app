const Alert = ({ type, message }) => {
  const getColor = () => {
    switch (type) {
      case 'success':
        return '#43e97b';
      case 'error':
        return '#ff1744';
      case 'warning':
        return '#ff9800';
      default:
        return '#4a90e2';
    }
  };

  return (
    <div style={{
      padding: '12px 20px',
      borderRadius: '8px',
      backgroundColor: `${getColor()}22`,
      color: getColor(),
      border: `1px solid ${getColor()}44`,
      margin: '10px 0',
      fontWeight: '500'
    }}>
      {message}
    </div>
  );
};

export default Alert;
