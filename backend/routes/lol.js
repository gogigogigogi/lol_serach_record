const express = require('express');
const router = express.Router();
const lolMiddleWare = require('../middlewares/lol');

router.get('/', lolMiddleWare.getUserPuuid);
router.get('/rotation', lolMiddleWare.getRotationChams);

module.exports = router;
