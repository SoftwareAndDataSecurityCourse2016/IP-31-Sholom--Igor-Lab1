const fs = require('fs');

const ngramms = fs.readFileSync('./3.txt').toString();
const ngrammMap = {};
let size;
ngramms.split('\n').forEach(ngrammRow => {
  const [ngramm, quantity] = ngrammRow.split(' ', 2);
  size = ngramm.length;
  ngrammMap[ngramm] = parseInt(quantity);
});

let totalNgrammCount = 0;
Object.keys(ngrammMap).forEach(key => totalNgrammCount += ngrammMap[key]);
Object.keys(ngrammMap).forEach(key => ngrammMap[key] = Math.log10(ngrammMap[key] / totalNgrammCount));
const min = Math.log10(0.01 / totalNgrammCount);

module.exports = (text) => {
  let quantity = 0;

  for (let i = 0; i < text.length - size + 1; i++) {
    const textNgramm = text.substring(i, i + size);
    if (ngrammMap[textNgramm]) quantity += ngrammMap[textNgramm];
    else quantity += min;
  }

  return quantity;
};