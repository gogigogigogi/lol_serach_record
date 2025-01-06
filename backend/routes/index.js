const express = require('express');
const router = express.Router();
const indexRouter = require('../controller/index');

router.get('/', indexRouter.renderIndex);

module.exports = router;
