const championsInfoObj = require('../util/champions.json');
const championsInfoArr = Object.entries(championsInfoObj.data);
const itemsInfoObj = require('./items.json');
const itemsInfoArr = Object.entries(itemsInfoObj.data);
const queueIdObj = require('./queueId.json');

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

// 아이템 매칭 - 미사용
exports.matchItemInfo = (itemIdList) => {
  return itemIdList.map((itemId) => {
    const matchedItem = itemsInfoArr.find((item) => {
      return +item[0] === itemId;
    });
    return;
  });
};

exports.matchOwnRecord = (matchResults, user) => {
  console.log('matchResults는', matchResults[0]);

  return matchResults.map((matchInfo) => {
    const ownRecord = matchInfo.data.info.participants.find((participant) => {
      return participant.summonerName === user.gameName;
    });

    // console.log('각 기록 전체내용은 ', ownRecord);
    return {
      gameType: queueIdObj[matchInfo.data.info.queueId].description,
      riotIdGameName: ownRecord.riotIdGameName,
      riotIdTagline: ownRecord.riotIdTagline,
      summonerLevel: ownRecord.summonerLevel,
      gameCreation: matchInfo.data.info.gameStartTimestamp,
      gameDuration: matchInfo.data.info.gameDuration,
      gameEndTimestamp: matchInfo.data.info.gameEndTimestamp,
      gameMode: matchInfo.data.info.gameMode,
      win: ownRecord.win,
      kills: ownRecord.kills,
      deaths: ownRecord.deaths,
      assists: ownRecord.assists,
      kda: +ownRecord.challenges.kda.toFixed(1),
      position: ownRecord.teamPosition,
      champion: championsInfoObj.data[ownRecord.championName].name,
      champion_img: `${process.env.CHAMPION_SQUARE_IMG_URL}/${
        championsInfoObj.data[ownRecord.championName].image.full
      }`,
      items: [
        ownRecord.item0,
        ownRecord.item1,
        ownRecord.item2,
        ownRecord.item3,
        ownRecord.item4,
        ownRecord.item5,
        ownRecord.item6,
      ],
    };
  });
};
