const models = require('../models/mockModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await models.User.findOne({ email });
  if (exists) {
    res.status(400).json({ success: false, message: 'User already exists' });
    return;
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await models.User.create({ name, email, password: hashed, role: 'user' });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'fallback', { expiresIn: '30d' });
  res.status(201).json({
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await models.User.findOne({ email });
  if (!user) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'fallback', { expiresIn: '30d' });
  res.json({
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

const getMe = async (req, res) => {
  const user = await models.User.findById(req.user.id);
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }
  res.json({ success: true, user });
};

module.exports = { register, login, getMe };
