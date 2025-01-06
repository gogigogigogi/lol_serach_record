const axios = require('axios');
const { matchChamInfo } = require('../util/lol');

// https://asia.api.riotgames.com/
exports.getUserPuuid = async (req, res, next) => {
  try {
    console.log('api 실행');
    const { nickname, tag } = req.query;
    console.log(nickname, tag);
    console.log(nickname, tag);
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
    req.userInfo = {
      gameName: result.data.gameName,
      puuid: result.data.puuid,
      tagLine: result.data.tagLine,
    };
    res.json(result.data);
    // next();
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

exports.addUserToDB = () => {
  // db에 해당 유저가 존재하지않으면 저장 - 존재한다면 저장 안함
  try {
    const { gameName, puuid, tagLine } = req.userInfo;
  } catch (error) {}
};

// https://kr.api.riotgames.com/lol/platform/v3/champion-rotations
exports.getRotationChams = async (req, res) => {
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
  } catch (error) {
    console.log('에러는', error);
  }
};
