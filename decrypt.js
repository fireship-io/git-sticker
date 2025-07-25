const NodeRSA = require('node-rsa');
const fs = require('fs');

(async () => {
  const keyData = fs.readFileSync('private.key', 'utf8');
  const test = fs.readFileSync('stickers/codediodeio.txt', 'utf8');

  const key = NodeRSA();
  key.importKey(keyData);

  const decrypted = key.decrypt(test, 'utf8');

  console.log(decrypted);
})();