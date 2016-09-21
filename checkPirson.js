const fs = require('fs');

const ngramms = fs.readFileSync('./2.txt').toString();
const ngrammMap = {};
let size;
ngramms.split('\n').forEach(ngrammRow => {
  const [ngramm, quantity] = ngrammRow.split(' ', 2);
  size = ngramm.length;
  ngrammMap[ngramm] = parseInt(quantity);
});

module.exports = (text) => {
  const localNgrammMap = {};
  const statisticNgrammMap = {};
  let statisticNgrammSum = 0;
  let pirsonCriteria = 0;

  const ngrammCount = text.length - size + 1;

  for (let i = 0; i < ngrammCount; i++) {
    const textNgramm = text.substring(i, i + size);
    if (!localNgrammMap[textNgramm]) localNgrammMap[textNgramm] = 0;
    localNgrammMap[textNgramm]++;
  }

  Object.keys(localNgrammMap).forEach(key => statisticNgrammMap[key] = ngrammMap[key]);

  Object.keys(statisticNgrammMap).forEach(key => statisticNgrammSum += statisticNgrammMap[key]);

  Object.keys(localNgrammMap).forEach(key => {
    const localVal = localNgrammMap[key] / ngrammCount;
    pirsonCriteria += (Math.pow(localVal - (statisticNgrammMap[key] / statisticNgrammSum), 2) / localVal);
  });

  return pirsonCriteria;
};