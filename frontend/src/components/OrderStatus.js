const OrderStatus = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Approved':
        return '#43e97b';
      case 'Rejected':
        return '#ff1744';
      case 'Shipped':
        return '#4a90e2';
      case 'Delivered':
        return '#43e97b';
      default:
        return '#ff9800';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'Approved':
        return '✓';
      case 'Rejected':
        return '✕';
      case 'Shipped':
        return '🚚';
      case 'Delivered':
        return '📦';
      default:
        return '⏳';
    }
  };

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      backgroundColor: `${getStatusColor()}22`,
      color: getStatusColor(),
      padding: '4px 12px',
      borderRadius: '16px',
      fontSize: '14px',
      fontWeight: '500'
    }}>
      <span>{getStatusIcon()}</span>
      <span>{status}</span>
    </div>
  );
};

export default OrderStatus;
