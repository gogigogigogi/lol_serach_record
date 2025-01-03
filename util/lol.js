const championsInfoObj = require('../util/champions.json');
const championsInfoArr = Object.entries(championsInfoObj.data);

exports.matchChamInfo = (rotationChamIds) => {
  console.log('인자로 받은 값', rotationChamIds);
  return rotationChamIds.map((championId) => {
    console.log('찾아야하는 번호', championId);
    const matchedChampion = championsInfoArr.find((champion) => {
      return +champion[1].key === championId;
    });
    console.log('찾은 챔피언', matchedChampion);
    return {
      ...matchedChampion[1],
    };
  });
};
