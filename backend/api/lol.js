const { lolBaseInstance } = require('./axiosInstance');

const getUserPuuidApi = (nickname, tag) => {
  return lolBaseInstance.get(
    `${process.env.USER_PUUID_URL}/${nickname}/${tag}`
  );
};

const getMatchIdsApi = (puuid) => {
  return lolBaseInstance.get(`${process.env.MATCH_IDS_URL}/${puuid}/ids`, {
    params: {
      start: 0,
      count: 5,
    },
  });
};

const getMatchInfoApi = (matchId) => {
  return lolBaseInstance.get(`${process.env.MATCH_INFOS_URL}/${matchId}`);
};

const getRotationChamIdsApi = () => {
  return lolBaseInstance.get(`${process.env.ROTATION_CHAM_LIST_URL}`);
};

module.exports = {
  getUserPuuidApi,
  getMatchIdsApi,
  getMatchInfoApi,
  getRotationChamIdsApi,
};
