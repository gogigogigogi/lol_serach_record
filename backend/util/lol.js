const championsInfoObj = require('../util/champions.json');
const championsInfoArr = Object.entries(championsInfoObj.data);

exports.matchChamInfo = (rotationChamIds) => {
  return rotationChamIds.map((championId) => {
    const matchedChampion = championsInfoArr.find((champion) => {
      return +champion[1].key === championId;
    });
    return {
      ...matchedChampion[1],
    };
  });
};

exports.matchOwnRecord = (matchResults, user) => {
  return matchResults.map((matchInfo) => {
    const ownRecord = matchInfo.data.info.participants.find((participant) => {
      return participant.summonerName === user.gameName;
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
};
