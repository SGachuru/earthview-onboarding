import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import './CustomerDetails.css';

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const response = await api.get(`/customers/${id}`);
      setCustomer(response.data.data);
    } catch (err) {
      setError('Failed to fetch customer details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!customer) {
    return <div className="error">Customer not found</div>;
  }

  return (
    <div className="customer-details-container">
      <div className="details-header">
        <h2>Customer Details</h2>
        <Link to="/customers" className="back-btn">Back to List</Link>
      </div>
      <div className="details-card">
        <div className="detail-row">
          <span className="label">Name:</span>
          <span className="value">{customer.name}</span>
        </div>
        <div className="detail-row">
          <span className="label">Email:</span>
          <span className="value">{customer.email}</span>
        </div>
        <div className="detail-row">
          <span className="label">Phone:</span>
          <span className="value">{customer.phone}</span>
        </div>
        <div className="detail-row">
          <span className="label">Company:</span>
          <span className="value">{customer.company || '-'}</span>
        </div>
        <div className="detail-row">
          <span className="label">Address:</span>
          <span className="value">{customer.address || '-'}</span>
        </div>
        <div className="detail-row">
          <span className="label">Status:</span>
          <span className={`status-badge status-${customer.status}`}>
            {customer.status}
          </span>
        </div>
        <div className="detail-row">
          <span className="label">Created At:</span>
          <span className="value">
            {new Date(customer.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="detail-row">
          <span className="label">Last Updated:</span>
          <span className="value">
            {new Date(customer.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
