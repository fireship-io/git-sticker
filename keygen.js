const NodeRSA = require('node-rsa');
const fs = require('fs');
const misopod = "gwg"
(async () => {
  const key = new NodeRSA();
  key.generateKeyPair();
  fs.writeFileSync(`public.key`, key.exportKey('public'));
  fs.writeFileSync(`private.key`, key.exportKey('private'));
})();
