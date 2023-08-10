const NodeRSA = require('node-rsa');
const fs = require('fs');

(async () => {
  try {
    const privateKeyPath = 'private.key';
    const ciphertextPath = 'stickers/codediodeio.txt';

    // Load the private key securely
    const keyData = fs.readFileSync(privateKeyPath, 'utf8');
    const key = new NodeRSA();
    key.importKey(keyData);

    // Load the ciphertext securely
    const encryptedData = fs.readFileSync(ciphertextPath, 'utf8');

    // Use try-catch for potential decryption errors
    let decrypted;
    try {
      decrypted = key.decrypt(encryptedData, 'utf8');
    } catch (error) {
      console.error('Decryption failed:', error.message);
      return;
    }

    console.log(decrypted);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();
