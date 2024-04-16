const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const commentController = require('../controllers/commentController');

router.post('/create', authenticateToken, commentController.createComment);
router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getCommentById);
router.put('/:id', authenticateToken, commentController.updateCommentById);
router.delete('/:id', authenticateToken, commentController.deleteCommentById);

module.exports = router; 