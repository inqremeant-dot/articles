const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/article/:id/comment/', commentController.create);
router.get('/article/:id/comments/', commentController.findAll);
router.get('/article/:id/comment/:commentId/', commentController.findOne);
router.patch('/article/:id/comment/:commentId/', commentController.update);
router.delete('/article/:id/comment/:commentId/', commentController.delete);

module.exports = router;