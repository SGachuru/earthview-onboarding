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
      <div className="form-container">
        {/* Header with Logo and Title */}
        <div className="form-header">
          <div className="logo-section">
            <div className="earthview-logo">EarthView</div>
          </div>
          <h1>CUSTOMER ONBOARDING INFORMATION FORM (BOREHOLE USER)</h1>
        </div>

        {/* Date Field */}
        <div className="date-field">
          <label>
            Date: <span className="underline">
              {new Date(formData.date).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              })}
            </span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </div>

        <form className="onboarding-form" onSubmit={handleSubmit}>
          {/* Customer Details Section */}
          <section className="form-section">
            <h2>Customer Details</h2>

            <div className="form-item">
              <span className="item-number">1.</span>
              <div className="item-content">
                <label>Company/Organization's Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="________________________"
                />
              </div>
            </div>

            <div className="form-item">
              <span className="item-number">2.</span>
              <div className="item-content">
                <label>Name of System User (Full Name)</label>
                <div className="name-subfields">
                  <div className="name-field">
                    <span className="sub-label">First Name:</span>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="____________"
                    />
                  </div>
                  <div className="name-field">
                    <span className="sub-label">Middle Name(Optional):</span>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      placeholder="____________"
                    />
                  </div>
                  <div className="name-field">
                    <span className="sub-label">Last Name:</span>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="____________"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-item">
              <span className="item-number">3.</span>
              <div className="item-content">
                <label>Location (Physical Address)</label>
                <input
                  type="text"
                  name="physicalAddress"
                  value={formData.physicalAddress}
                  onChange={handleChange}
                  required
                  placeholder="_______________________________"
                />
              </div>
            </div>

            <div className="form-item">
              <span className="item-number">4.</span>
              <div className="item-content">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="_______________________________"
                />
              </div>
            </div>

            <div className="form-item">
              <span className="item-number">5.</span>
              <div className="item-content">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="_______________________________"
                />
              </div>
            </div>

            <div className="form-item">
              <span className="item-number">6.</span>
              <div className="item-content">
                <label>Permit Number</label>
                <input
                  type="text"
                  name="permitNumber"
                  value={formData.permitNumber}
                  onChange={handleChange}
                  placeholder="_______________________________"
                />
              </div>
            </div>

            <div className="form-item">
              <span className="item-number">7.</span>
              <div className="item-content">
                <label>Coordinates (Latitude, Longitude)</label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="Latitude, Longitude"
                />
              </div>
            </div>
          </section>

          {/* Sales Representative Confirmation Section */}
          <section className="form-section rep-section">
            <h2>Sales Representative Confirmation</h2>
            <p className="confirmation-text">
              I confirm that I have verified the details provided by the customer and approve this
              onboarding request.
            </p>

            <div className="rep-fields">
              <div className="rep-field">
                <label>Name:</label>
                <input
                  type="text"
                  name="salesRepName"
                  value={formData.salesRepName}
                  onChange={handleChange}
                  placeholder="_______________________________"
                />
              </div>
              <div className="rep-field">
                <label>Signature:</label>
                <input
                  type="text"
                  name="salesRepSignature"
                  value={formData.salesRepSignature}
                  onChange={handleChange}
                  placeholder="_______________________________"
                />
              </div>
              <div className="rep-field">
                <label>Date:</label>
                <input
                  type="date"
                  name="salesRepDate"
                  value={formData.salesRepDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="button-group">
            <button type="submit" className="save-button" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Form'}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && (
            <div className="success-message">Onboarding form submitted successfully.</div>
          )}
        </form>

        {/* Footer */}
        <div className="form-footer">
          <p>
            EarthView Management Limited, P.O Box 3002-00506 Nairobi Email: info@earthview.co.ke
          </p>
          <p>
            Phone: +254792332134 Customer care: +254290175080 | Physical Address: Nicholson court,
            Nicholson drive, Off Njpng Road, Nairobi, Kenya
          </p>
          <p>Transforming Lives!</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
