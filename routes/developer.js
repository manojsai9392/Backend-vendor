const express = require('express');
const router = express.Router();
const { developerRegister, developerLogin } = require('../controllers/DeveloperController'); // Adjust the path as needed

// Registration Route
router.post('/register', developerRegister);

// Login Route
router.post('/login', developerLogin);

module.exports = router;
