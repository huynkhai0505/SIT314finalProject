const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.post('/checkLogin', authController.checkLogin);
router.get('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/register', authController.register);

module.exports = router;