const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken } = require('../middlewares/authMiddleware'); // Importa el middleware

router.get('/', productController.getAllProducts);
router.post('/add', authenticateToken, productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', authenticateToken, productController.updateProductById);
router.delete('/:id', authenticateToken, productController.deleteProductById);

module.exports = router;
