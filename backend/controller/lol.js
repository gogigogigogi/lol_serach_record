const { matchChamInfo, matchOwnRecord } = require('../util/lol');

// 로테이션 챔피언 검색 step - 2
exports.getRotationChampInfos = (req, res, next) => {
  try {
    // 챔피온 key번호에 해당하는 챔피언 정보 가져오기
    const champInfoList = matchChamInfo(req.lolInfo.rotationChamIds);
    res.json(champInfoList);
  } catch (err) {}
};

// 소환사 검색 - step4
exports.getOwnMatchInfos = async (req, res, next) => {
  try {
    const matchInfoList = matchOwnRecord(
      req.lolInfo.matchResults,
      req.lolInfo.user
    );
    console.log('matchInfoList는', matchInfoList);
    res.json({
      userInfo: {
        riotIdGameName: matchInfoList[0].riotIdGameName,
        riotIdTagline: matchInfoList[0].riotIdTagline,
        summonerLevel: matchInfoList[0].summonerLevel,
      },
      matchInfoList,
    });
  } catch (err) {
    console.log(err);
  }
};
