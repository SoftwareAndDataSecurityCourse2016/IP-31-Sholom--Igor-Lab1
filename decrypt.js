const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = (text, key) => {
  const keyMap = {};
  key.forEach((key, index) => keyMap[key] = alphabet[index]);

  return text.split('').map(letter => keyMap[letter]).join('');
};