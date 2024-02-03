const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

router.post('/create', linkController.createLink);

router.get('/redirect/:link', linkController.redirectLink);

module.exports = router;
