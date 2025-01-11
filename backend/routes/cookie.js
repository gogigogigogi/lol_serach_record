const express = require('express');
const router = express.Router();
const cookieController = require('../controller/cookie');

router.get('/set', cookieController.setCookie);
module.exports = router;
