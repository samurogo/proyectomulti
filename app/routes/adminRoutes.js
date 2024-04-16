const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/', adminController.getAllAdmins);
router.get('/:adminId', adminController.getAdminById);
router.delete('/:adminId', adminController.deleteAdmin);

module.exports = router;
