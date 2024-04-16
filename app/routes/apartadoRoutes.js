const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const apartadoController = require('../controllers/apartadoController'); 

router.post('/create', authenticateToken, apartadoController.createApartado);
router.get('/', apartadoController.getApartados);
router.get('/:id', apartadoController.getApartadoById);
router.put('/:id', authenticateToken, apartadoController.updateApartadoById);
router.delete('/:id', authenticateToken, apartadoController.deleteApartadoById);

module.exports = router;
