const models = require('../models/mockModels');

const getAllCustomers = async (req, res) => {
  const customers = await models.Customer.find();
  res.json({ success: true, count: customers.length, data: customers });
};

const getCustomerById = async (req, res) => {
  const customer = await models.Customer.findById(req.params.id);
  if (!customer) {
    res.status(404).json({ success: false, message: 'Customer not found' });
    return;
  }
  res.json({ success: true, data: customer });
};

const createCustomer = async (req, res) => {
  const customer = await models.Customer.create({ ...req.body, userId: req.user.id });
  res.status(201).json({ success: true, data: customer });
};

const updateCustomer = async (req, res) => {
  const customer = await models.Customer.findByIdAndUpdate(req.params.id, req.body);
  if (!customer) {
    res.status(404).json({ success: false, message: 'Customer not found' });
    return;
  }
  res.json({ success: true, data: { ...customer, ...req.body } });
};

const deleteCustomer = async (req, res) => {
  const customer = await models.Customer.findByIdAndDelete(req.params.id);
  if (!customer) {
    res.status(404).json({ success: false, message: 'Customer not found' });
    return;
  }
  res.json({ success: true, data: {} });
};

const getStats = async (req, res) => {
  const stats = await models.Customer.getStats();
  res.json({ success: true, data: stats });
};

module.exports = { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer, getStats };