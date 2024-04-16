// app/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware'); // Importa el middleware

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.put('/:userId', authenticateToken, userController.updateUserById);
router.delete('/:userId', authenticateToken, userController.deleteUser); 

module.exports = router;
