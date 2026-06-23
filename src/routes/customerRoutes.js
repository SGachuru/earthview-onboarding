const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, customerController.getAllCustomers).post(protect, customerController.createCustomer);
router.route('/:id').get(protect, customerController.getCustomerById).put(protect, customerController.updateCustomer).delete(protect, customerController.deleteCustomer);

module.exports = router;
