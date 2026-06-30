import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './OnboardingForm.css';

const initialState = {
  date: new Date().toISOString().split('T')[0],
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
  salesRepName: '',
  salesRepSignature: '',
  salesRepDate: '',
  adminApproval: false,
  financeApproval: false,
  implementationApproval: false,
  managingDirectorApproval: false,
  comments: '',
};

const OnboardingForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const [geoError, setGeoError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUseLocation = () => {
    setGeoError('');

    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by this device.');
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((current) => ({
          ...current,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        }));
        setLocationLoading(false);
      },
      (err) => {
        setLocationLoading(false);
        setGeoError('Unable to detect location. Please allow device location access.');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
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
      <div className="form-wrapper">
        <header className="form-header-section">
          <div className="brand-logo">
            <span className="logo-icon">●</span>
            <h1 className="brand-name">EarthView Onboarding</h1>
          </div>
          <h2 className="form-title">Customer Onboarding Information Form</h2>
          <p className="form-subtitle">BOREHOLE USER REGISTRATION</p>
        </header>

        <form className="onboarding-form" onSubmit={handleSubmit}>
          {/* Date and Reference Info */}
          <div className="form-meta">
            <div className="meta-item">
              <label>Date:</label>
              <span className="meta-value">
                {new Date(formData.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                })}
              </span>
            </div>
            <div className="meta-item">
              <label>Form ID:</label>
              <span className="meta-value">ONB-{new Date().getFullYear()}-{(Math.random() * 1000).toFixed(0).padStart(3, '0')}</span>
            </div>
          </div>

          {/* Customer Information Section */}
          <section className="form-section">
            <div className="section-header">
              <span className="section-number">01</span>
              <h3>Customer Information</h3>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="company">Company/Organization Name *</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Enter company name"
                />
              </div>

              <div className="form-field full-width">
                <label>Full Name *</label>
                <div className="name-fields">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Middle Name (Optional)"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              <div className="form-field full-width">
                <label htmlFor="physicalAddress">Physical Address *</label>
                <input
                  type="text"
                  id="physicalAddress"
                  name="physicalAddress"
                  value={formData.physicalAddress}
                  onChange={handleChange}
                  required
                  placeholder="Enter complete physical address"
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email address"
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-field">
                <label htmlFor="permitNumber">Permit Number</label>
                <input
                  type="text"
                  id="permitNumber"
                  name="permitNumber"
                  value={formData.permitNumber}
                  onChange={handleChange}
                  placeholder="Enter permit number (if applicable)"
                />
              </div>

              <div className="form-field full-width">
                <label>Location Coordinates</label>
                <div className="coordinates-input">
                  <div className="coord-group">
                    <input
                      type="text"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      placeholder="Latitude"
                    />
                    <span className="coord-label">Latitude</span>
                  </div>
                  <div className="coord-group">
                    <input
                      type="text"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      placeholder="Longitude"
                    />
                    <span className="coord-label">Longitude</span>
                  </div>
                  <button
                    type="button"
                    className="location-btn"
                    onClick={handleUseLocation}
                    disabled={locationLoading}
                  >
                    {locationLoading ? 'Detecting...' : 'Use Current Location'}
                  </button>
                </div>
                {geoError && <div className="geo-error">{geoError}</div>}
              </div>
            </div>
          </section>

          {/* Sales Representative Confirmation Section */}
          <section className="form-section">
            <div className="section-header">
              <span className="section-number">02</span>
              <h3>Sales Representative Confirmation</h3>
            </div>

            <div className="confirmation-box">
              <p className="confirmation-text">
                I confirm that I have verified the details provided by the customer
                and approve this onboarding request.
              </p>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="salesRepName">Representative Name *</label>
                <input
                  type="text"
                  id="salesRepName"
                  name="salesRepName"
                  value={formData.salesRepName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-field">
                <label htmlFor="salesRepSignature">Signature *</label>
                <input
                  type="text"
                  id="salesRepSignature"
                  name="salesRepSignature"
                  value={formData.salesRepSignature}
                  onChange={handleChange}
                  required
                  placeholder="Enter digital signature"
                />
              </div>

              <div className="form-field">
                <label htmlFor="salesRepDate">Confirmation Date *</label>
                <input
                  type="date"
                  id="salesRepDate"
                  name="salesRepDate"
                  value={formData.salesRepDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </section>

          {/* Approval Section */}
          <section className="form-section">
            <div className="section-header">
              <span className="section-number">03</span>
              <h3>Internal Approvals</h3>
            </div>

            <div className="approval-checkboxes">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="adminApproval"
                  checked={formData.adminApproval}
                  onChange={handleChange}
                />
                <span className="checkbox-custom"></span>
                <span>Admin Approval</span>
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="financeApproval"
                  checked={formData.financeApproval}
                  onChange={handleChange}
                />
                <span className="checkbox-custom"></span>
                <span>Finance Approval</span>
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="implementationApproval"
                  checked={formData.implementationApproval}
                  onChange={handleChange}
                />
                <span className="checkbox-custom"></span>
                <span>Implementation Approval</span>
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="managingDirectorApproval"
                  checked={formData.managingDirectorApproval}
                  onChange={handleChange}
                />
                <span className="checkbox-custom"></span>
                <span>Managing Director Approval</span>
              </label>
            </div>

            <div className="form-field full-width">
              <label htmlFor="comments">Additional Comments</label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows="4"
                placeholder="Enter any additional notes or comments"
              />
            </div>
          </section>

          {/* Actions */}
          <footer className="form-actions">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Onboarding Form'}
            </button>
            <button type="button" className="cancel-button" onClick={() => navigate('/customers')}>
              Cancel
            </button>
          </footer>

          {error && <div className="error-message">{error}</div>}
          {success && (
            <div className="success-message">
              Onboarding form submitted successfully.
            </div>
          )}
        </form>

        <footer className="form-footer">
          <p>EarthView Management Limited • P.O Box 3002-00506 Nairobi • info@earthview.co.ke</p>
          <p>Phone: +254792332134 • Customer Care: +254290175080</p>
          <p className="tagline">Transforming Lives!</p>
        </footer>
      </div>
    </div>
  );
};

export default OnboardingForm;
