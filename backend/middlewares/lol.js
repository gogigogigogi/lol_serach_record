const axios = require('axios');
const { matchChamInfo } = require('../util/lol');

// https://asia.api.riotgames.com/
exports.getUserPuuid = async (req, res, next) => {
  try {
    const { nickname, tag } = req.query;
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Accept-Language':
        'ko,ko-KR;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
      'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
      Origin: 'http://localhost:3000',
      'X-Riot-Token': process.env.DEV_API_Key,
    };
    const result = await axios({
      url: `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nickname}/${tag}`,
      method: 'get',
      headers: headers,
    });
    console.log('결과는  ', result.data);
    // 얻은 puuid를 req객체에 저장
    req.lolInfo = {
      user: {
        gameName: result.data.gameName,
        puuid: result.data.puuid,
        tagLine: result.data.tagLine,
      },
    };
    // res.json(result.data);
    next();
  } catch (err) {
    // if (err.response.status === 404) {
    //   const error = new Error('정보를 찾을 수 없습니다.');
    //   error.status = 404;
    //   console.log('발생된 에러는 ', error);
    //   res
    //     .status(error.status)
    //     .json({ isSuccess: false, message: error.message });
    // } else {
    //   next(new Error('서버 에러 발생'));
    // }
  }
};

// https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/ ㅁ/ids?start=0&count=5
exports.getMatchIds = async (req, res, next) => {
  try {
    console.log('유저정보', req.lolInfo.user);
    const matchIdList = await axios({
      url: `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${req.lolInfo.user.puuid}/ids`,
      method: 'get',
      params: {
        start: 0,
        count: 5,
      },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept-Language':
          'ko,ko-KR;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
        'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
        Origin: 'http://localhost:3000',
        'X-Riot-Token': process.env.DEV_API_Key,
      },
    });
    console.log('매치아이디', matchIdList);
    req.lolInfo = { ...req.lolInfo, matchIdList: matchIdList.data };
    // res.json(matchIdList);
    next();
  } catch (err) {
    // if (err.response?.status === 404) {
    //   const error = new Error('정보를 찾을 수 없습니다.');
    //   error.status = 404;
    //   console.log('발생된 에러는 ', error);
    //   res
    //     .status(error.status)
    //     .json({ isSuccess: false, message: error.message });
    // } else {
    //   next(new Error('서버 에러 발생'));
    // }
  }
};

exports.getMatchInfo = async (req, res, next) => {
  try {
    console.log('넘겨받은 데이터,', req.lolInfo);
    const axioses = req.lolInfo.matchIdList.map((matchId) => {
      return axios({
        url: `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`,
        method: 'get',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
          'Accept-Language':
            'ko,ko-KR;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
          'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
          Origin: 'http://localhost:3000',
          'X-Riot-Token': process.env.DEV_API_Key,
        },
      });
    });

    // const matchInfo = await axios({
    //   url: `https://asia.api.riotgames.com/lol/match/v5/matches/${req.lolInfo.matchIdList[0]}`,
    //   method: 'get',
    //   headers: {
    //     'User-Agent':
    //       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    //     'Accept-Language':
    //       'ko,ko-KR;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
    //     'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
    //     Origin: 'http://localhost:3000',
    //     'X-Riot-Token': process.env.DEV_API_Key,
    //   },
    // });

    // console.log('axioses는', axioses);
    const matchResult = await Promise.all(axioses);
    // console.log('매치정보 배열은', matchInfoList[0].data.info.participants);
    const matchInfoList = matchResult.map((matchInfo) => {
      const ownRecord = matchInfo.data.info.participants.find((participant) => {
        return participant.summonerName === req.lolInfo.user.gameName;
      });
      return {
        riotIdGameName: ownRecord.riotIdGameName,
        riotIdTagline: ownRecord.riotIdTagline,
        summonerLevel: ownRecord.summonerLevel,
        win: ownRecord.win,
        kills: ownRecord.kills,
        deaths: ownRecord.deaths,
        assists: ownRecord.assists,
        position: ownRecord.individualPosition,
        champion: ownRecord.championName,
      };
    });
    console.log('asd길이는', matchInfoList.length);
    console.log('asd길이는', matchInfoList[2]);
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

exports.addUserToDB = () => {
  // db에 해당 유저가 존재하지않으면 저장 - 존재한다면 저장 안함
  try {
    const { gameName, puuid, tagLine } = req.userInfo;
  } catch (error) {}
};

// https://kr.api.riotgames.com/lol/platform/v3/champion-rotations
exports.getRotationChams = async (req, res) => {
  console.log(process.env.DEV_API_Key);
  try {
    const rotationChamInfoList = await axios({
      url: 'https://kr.api.riotgames.com/lol/platform/v3/champion-rotations',
      method: 'get',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept-Language':
          'ko,ko-KR;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
        'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
        Origin: 'http://localhost:3000',
        'X-Riot-Token': process.env.DEV_API_Key,
      },
    });

    // 챔피온 key번호에 해당하는 챔피언 정보 가져오기
    const rotationChamList = matchChamInfo(
      rotationChamInfoList.data.freeChampionIds
    );

    res.json(rotationChamList);
  } catch (err) {
    if (err.response.status === 404) {
      const error = new Error('정보를 찾을 수 없습니다.');
      error.status = 404;
      console.log('발생된 에러는 ', error);
      res
        .status(error.status)
        .json({ isSuccess: false, message: error.message });
    } else {
      next(new Error('서버 에러 발생'));
    }
  }
};
