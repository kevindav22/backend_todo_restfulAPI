const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth');
const { isAdmin } = require('../middleware/auth');
//validasi input regist
const registrationValidation = [body('username', 'Username is required').notEmpty(), body('email', 'Valid email is required').isEmail(), body('password', 'Password must be at least 6 characters long').isLength({ min: 6 })];

// Auth routes
router.post('/register', isAdmin, registrationValidation, registerUser);
router.post('/login', loginUser);

module.exports = router;
