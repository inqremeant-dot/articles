const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.post('/article/', articleController.create);
router.get('/articles/', articleController.findAll);
router.get('/article/:id/', articleController.findOne);
router.patch('/article/:id/', articleController.update);
router.delete('/article/:id/', articleController.delete);

module.exports = router;