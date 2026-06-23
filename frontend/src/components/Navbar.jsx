import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">EarthView Onboarding</Link>
      </div>
      <div className="navbar-links">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/customers" className="nav-link">Customers</Link>
        <Link to="/customers/new" className="nav-link">New Customer</Link>
        <span className="user-info">Welcome, {user?.name}</span>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
