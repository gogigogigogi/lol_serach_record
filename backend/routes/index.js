const express = require('express');
const router = express.Router();
const indexRouter = require('../controller/index');

router.get('/set-cookie', indexRouter.setCookie);
module.exports = router;
