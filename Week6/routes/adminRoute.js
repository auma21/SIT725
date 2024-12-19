const path = require('path');

const express = require('express');

const adminController = require('../controllers/adminController');

const router = express.Router();

// /admin/pizzas => GET
router.get('/pizzas', adminController.getPizzas);

module.exports = router;
