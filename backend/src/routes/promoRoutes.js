const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/promoController');

router.post('/validate', ctrl.validate);

module.exports = router;
