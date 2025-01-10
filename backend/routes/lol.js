const express = require('express');
const router = express.Router();
const lolMiddleWare = require('../middlewares/lol');

router.get(
  '/record',
  lolMiddleWare.getUserPuuid,
  lolMiddleWare.getMatchIds,
  lolMiddleWare.getMatchInfo
);
router.get('/rotation', lolMiddleWare.getRotationChams);
router.get('/match-ids', lolMiddleWare.getRotationChams);

module.exports = router;
