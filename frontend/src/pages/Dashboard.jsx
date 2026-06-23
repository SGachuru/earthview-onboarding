import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    pendingOnboarding: 0,
    completedOnboarding: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
const fetchStats = async () => {
       try {
         const response = await api.get('/customers/stats');
         setStats(response.data);
       } catch (error) {
         console.error('Failed to fetch stats:', error);
       } finally {
         setLoading(false);
       }
     };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Customers</h3>
          <p className="stat-number">{stats.totalCustomers}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Onboarding</h3>
          <p className="stat-number">{stats.pendingOnboarding}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Onboarding</h3>
          <p className="stat-number">{stats.completedOnboarding}</p>
        </div>
      </div>
      <div className="dashboard-actions">
        <Link to="/customers" className="action-card">
          <h3>View Customers</h3>
          <p>Manage customer records</p>
        </Link>
        <Link to="/customers/new" className="action-card">
          <h3>Add Customer</h3>
          <p>Start new onboarding</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
