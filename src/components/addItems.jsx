import React, { useState, useContext, useEffect } from 'react';
import AddItemContext from '../context/addItemContext';

const AddItem = () => {
  const { getItems, addItem } = useContext(AddItemContext);
  const [formData, setFormData] = useState({
    itemName: '',
    itemNo: '',
    itemStock: '',
    itemPrice: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getItems();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await addItem(formData);
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setFormData({ itemName: '', itemNo: '', itemStock: '', itemPrice: '' });
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    
    setLoading(false);
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <div className="form-container" style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '20px'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Add New Item</h2>
        
        <form onSubmit={handleAddItem}>
          <div className="form-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '16px' 
          }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
                Item Name
              </label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
                Item Number
              </label>
              <input
                type="number"
                name="itemNo"
                value={formData.itemNo}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
                Initial Stock
              </label>
              <input
                type="number"
                name="itemStock"
                value={formData.itemStock}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
                Item Price
              </label>
              <input
                type="number"
                name="itemPrice"
                value={formData.itemPrice}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: loading ? '#ccc' : '#007bff',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                width: '100%'
              }}
            >
              {loading ? 'Adding...' : 'Add Item'}
            </button>
          </div>
        </form>

        {message.text && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            borderRadius: '4px',
            backgroundColor: message.type === 'error' ? '#ffebee' : '#e8f5e9',
            color: message.type === 'error' ? '#c62828' : '#2e7d32',
            fontSize: '14px'
          }}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddItem;