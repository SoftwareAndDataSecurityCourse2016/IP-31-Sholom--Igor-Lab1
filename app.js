const checkAgree = require('./checkAgree');
const checkPirson = require('./checkPirson');
const decrypt = require('./decrypt');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const shuffle = (a) => {
    let j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }

    return a;
};

const text = 'EFFPQLMEHEMVPCPYFLMVHQLUHYTCETHQEKLPVMMVHQLUWEOLFPQLIVDLWLULMVHQLUCYAUHUYDUEOSQYATFFVSMUVOVWEPLPQVSPCHLYGETDYUVPQOGUYOOYWYETHQEKLPVMYWLSASVWDEWCPLSPYGDYYFWLSSYGGVPCYAEULMYOGYUPEKTLBVPQCYAOECASLVWFLRYGMYVWMVFLWMLNESVSNVLREOVWEPVYWSPEPVSPVMETPLSPSYUBQEPLILUOLPQYFCYAGLLTBVTTSQYBPQLKLSPULSATPPUCPYPQVWNYGBQEPBVTTQEHHLWVGPQLNLCMYWPEVWSSEOLMQEUEMPLUSEPFVGGLULWPHYSVPVYWSBVTTCYAUHUYDUEOSPVTTKLQEILMYUULMPTC';

let bestKey = alphabet.split('');
let bestCriteria = 99999999999999;

let i = 0;
while (i < 10) {
  let bestRandKey = Object.assign([], bestKey);
  shuffle(bestRandKey);
  let bestRandCriteria = checkPirson(decrypt(text, bestRandKey));

  let j = 0;
  while (j < 1000) {
    const a = Math.floor(Math.random() * 26);
    const b = Math.floor(Math.random() * 26);

    const key = Object.assign([], bestRandKey);
    const t = key[a];
    key[a] = key[b];
    key[b] = t;

    const criteria = checkPirson(decrypt(text, key));
    if (criteria < bestRandCriteria) {
      bestRandCriteria = criteria;
      bestRandKey = key;
      j = 0;
    }

    j++;
  }

  if (bestRandCriteria < bestCriteria) {
    bestCriteria = bestRandCriteria;
    bestKey = bestRandKey;
  }

  i++;
}

console.log(bestCriteria, checkPirson(decrypt(text, bestKey)), bestKey.join(''), decrypt(text, bestKey));