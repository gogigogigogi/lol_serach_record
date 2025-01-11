const express = require('express');
const router = express.Router();
const lolMiddleWare = require('../middlewares/lol');
const lolController = require('../controller/lol');

router.get(
  '/record',
  lolMiddleWare.getUserPuuid,
  lolMiddleWare.getMatchIds,
  lolMiddleWare.getMatchInfos,
  lolController.getOwnMatchInfos
);
router.get(
  '/rotation',
  lolMiddleWare.getRotationChamIds,
  lolController.getRotationChampInfos
);

module.exports = router;
