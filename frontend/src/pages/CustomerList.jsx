import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import './CustomerList.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (err) {
      setError('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) {
      return;
    }
    try {
      await api.delete(`/customers/${id}`);
      setCustomers(customers.filter((c) => c._id !== id));
    } catch (err) {
      setError('Failed to delete customer');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="customer-list-container">
      <div className="list-header">
        <h2>Customers</h2>
        <Link to="/customers/new" className="add-btn">Add Customer</Link>
      </div>
      {error && <div className="error">{error}</div>}
      {customers.length === 0 ? (
        <p className="no-data">No customers found. Add your first customer!</p>
      ) : (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.company || '-'}</td>
                <td>
                  <span className={`status-badge status-${customer.status}`}>
                    {customer.status}
                  </span>
                </td>
                <td>
                  <Link to={`/customers/${customer._id}`} className="action-link">
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(customer._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerList;
