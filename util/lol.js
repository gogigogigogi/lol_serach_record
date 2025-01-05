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
