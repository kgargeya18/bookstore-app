import { useState } from 'react';
import Alert from './Alert';

const AddressForm = ({ address, onChange, onSubmit, initialAddress = {}, buttonText = 'Save Address' }) => {
  const [localAddress, setLocalAddress] = useState({
    street: address?.street || initialAddress.street || '',
    city: address?.city || initialAddress.city || '',
    state: address?.state || initialAddress.state || '',
    zip: address?.zip || initialAddress.zip || '',
    country: address?.country || initialAddress.country || ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    for (let field in localAddress) {
      if (!localAddress[field].trim()) {
        setError(`Please enter your ${field}`);
        return;
      }
    }

    if (onSubmit) {
      onSubmit(localAddress);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newAddress = {
      ...localAddress,
      [name]: value
    };
    setLocalAddress(newAddress);
    if (onChange) {
      onChange(name, value);
    }
    setError('');
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '12px'
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {error && <Alert type="error" message={error} />}
      
      <input
        type="text"
        name="street"
        placeholder="Street Address"
        value={localAddress.street}
        onChange={handleChange}
        style={inputStyle}
      />

      <div style={{ display: 'flex', gap: '12px' }}>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={localAddress.city}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={localAddress.state}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={localAddress.zip}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={localAddress.country}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '12px',
          background: '#43e97b',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AddressForm;
