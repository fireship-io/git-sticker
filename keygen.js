const NodeRSA = require('node-rsa');
const fs = require('fs').promises;

(async () => {
  try {
    // Check if keys already exist
    if (await keyExists('public.key') || await keyExists('private.key')) {
      console.log("Keys already exist. Skipping key generation.");
      return;
    }

    // Generate key pair
    const key = new NodeRSA();
    key.generateKeyPair();

    // Write public and private keys to files
    await fs.writeFile('public.key', key.exportKey('public'));
    await fs.writeFile('private.key', key.exportKey('private'));

    console.log("Keys generated and saved successfully.");
  } catch (error) {
    console.error("Error:", error);
  }
})();

// Function to check if key file exists
async function keyExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}
