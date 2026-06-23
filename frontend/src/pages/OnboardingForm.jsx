import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './OnboardingForm.css';

const initialState = {
  company: '',
  firstName: '',
  middleName: '',
  lastName: '',
  physicalAddress: '',
  email: '',
  phone: '',
  permitNumber: '',
  latitude: '',
  longitude: '',
  adminApproval: false,
  financeApproval: false,
  implementationApproval: false,
  managingDirectorApproval: false,
  comments: '',
};

const OnboardingForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await api.post('/customers', formData);
      setSuccess(true);
      setFormData(initialState);
      navigate('/customers');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit onboarding form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-header">
        <h1>Customer Onboarding Information</h1>
        <p>Use this form to capture onboarding details for a new borehole user.</p>
      </div>

      <form className="onboarding-form" onSubmit={handleSubmit}>
        <section className="form-section">
          <h2>Customer Details</h2>
          <label>
            Company / Organization Name
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </label>

          <div className="name-grid">
            <label>
              First Name
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Middle Name
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </label>
            <label>
              Last Name
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label>
            Location (Physical Address)
            <input
              type="text"
              name="physicalAddress"
              value={formData.physicalAddress}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone Number
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Permit Number
            <input
              type="text"
              name="permitNumber"
              value={formData.permitNumber}
              onChange={handleChange}
            />
          </label>

          <div className="coord-grid">
            <label>
              Latitude
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
              />
            </label>
            <label>
              Longitude
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
              />
            </label>
          </div>
        </section>

        <section className="form-section approval-section">
          <h2>Approval Section</h2>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="adminApproval"
                checked={formData.adminApproval}
                onChange={handleChange}
              />
              Administrator Approval
            </label>
            <label>
              <input
                type="checkbox"
                name="financeApproval"
                checked={formData.financeApproval}
                onChange={handleChange}
              />
              Finance Department Approval
            </label>
            <label>
              <input
                type="checkbox"
                name="implementationApproval"
                checked={formData.implementationApproval}
                onChange={handleChange}
              />
              Implementation Department Approval
            </label>
            <label>
              <input
                type="checkbox"
                name="managingDirectorApproval"
                checked={formData.managingDirectorApproval}
                onChange={handleChange}
              />
              Managing Director Approval
            </label>
          </div>

          <label>
            Comments
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="4"
            />
          </label>
        </section>

        <button type="submit" className="save-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Onboarding Form'}
        </button>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            Onboarding form submitted successfully.
          </div>
        )}
      </form>
    </div>
  );
};

export default OnboardingForm;
