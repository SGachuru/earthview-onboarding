import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './CustomerForm.css';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    status: 'pending',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/customers', formData);
      navigate('/customers');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-form-container">
      <h2>Add New Customer</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Creating...' : 'Create Customer'}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
