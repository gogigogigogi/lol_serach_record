const axios = require('axios');
const {
  getUserPuuidApi,
  getRotationChamIdsApi,
  getMatchIdsApi,
  getMatchInfoApi,
} = require('../api/lol');

// 소환사 검색 - step1
exports.getUserPuuid = async (req, res, next) => {
  try {
    const { nickname, tag } = req.query;
    const result = await getUserPuuidApi(nickname, tag);

    // 얻은 puuid를 req객체에 저장
    req.lolInfo = {
      ...req.lolInfo,
      user: {
        gameName: result.data.gameName,
        puuid: result.data.puuid,
        tagLine: result.data.tagLine,
      },
    };
    next();
  } catch (err) {}
};

// 소환사 검색 - step2
exports.getMatchIds = async (req, res, next) => {
  try {
    const matchIdList = await getMatchIdsApi(req.lolInfo.user.puuid);
    console.log('매치아이디', matchIdList);
    req.lolInfo = { ...req.lolInfo, matchIdList: matchIdList.data };
    next();
  } catch (err) {}
};

// 소환사 검색 - step3
exports.getMatchInfos = async (req, res, next) => {
  try {
    const apis = req.lolInfo.matchIdList.map((matchId) => {
      return getMatchInfoApi(matchId);
    });

    // 매치id 리스트를 promise all 로 동시 요청
    const matchResults = await Promise.all(apis);
    req.lolInfo = {
      ...req.lolInfo,
      matchResults: matchResults,
    };
    console.log('matchResults는', req.lolInfo);
    next();
  } catch (err) {
    console.log(err);
  }
};

// 로테이션 챔피언 검색 step - 1
exports.getRotationChamIds = async (req, res, next) => {
  try {
    const result = await getRotationChamIdsApi();

    req.lolInfo = {
      ...req.lolInfo,
      rotationChamIds: result.data.freeChampionIds,
    };

    next();
  } catch (err) {
    console.log(err);
  }
};

exports.addUserToDB = () => {
  // db에 해당 유저가 존재하지않으면 저장 - 존재한다면 저장 안함
  try {
    const { gameName, puuid, tagLine } = req.userInfo;
  } catch (error) {}
};
