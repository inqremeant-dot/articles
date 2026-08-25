const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/analytic/comments/', commentController.analytic);

module.exports = router;