const mongoose = require('mongoose');
const customerSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  onboardingStatus: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
