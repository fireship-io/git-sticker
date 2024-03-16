const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const NodeRSA = require("node-rsa");

(async () => {
  try {
    // Prompt user for address information
    const answers = await inquirer.prompt([
      { type: "input", name: "name", message: "What's your name?" },
      { type: "input", name: "street", message: "Street address" },
      { type: "input", name: "street2", message: "Suite or Apt # (optional)" },
      { type: "input", name: "city", message: "City" },
      { type: "input", name: "state", message: "State/Region" },
      { type: "input", name: "zip", message: "Postal Code" },
      { type: "input", name: "country", message: "Country" },
      { type: "input", name: "notes", message: "Any special notes?" },
    ]);

    // Read public key from file
    const publicKey = fs.readFileSync("public.key", "utf8");
    if (!publicKey) throw new Error("Public key not found.");

    // Initialize RSA encryption instance with public key
    const key = new NodeRSA(publicKey);

    // Encrypt address information
    const encrypted = key.encrypt(JSON.stringify(answers), "base64");

    // Display instructions with encrypted data
    console.log(chalk.yellow("------ Copy below ------"));
    console.log(chalk.green(encrypted));
    console.log(chalk.yellow("------ Copy above ------"));
    console.log(`
            ${chalk.blueBright(
              "Step 1:"
            )} Copy the green text above - it's your encrypted address. 
            ${chalk.blueBright(
              "Step 2:"
            )} Create a new file named ${chalk.bgBlue(
      "stickers/<your-github-username>.txt"
    )}. 
                     Paste the encrypted text into the file. 
            ${chalk.blueBright("Step 3:")} Submit a pull request on GitHub. 
            ${chalk.blueBright("Step 4:")} Check your mailbox in a few weeks!

            ${chalk.bgKeyword("orange")(chalk.black(" Warning "))} 
            Your PR should have exactly 1 new file. It may be rejected if multiple files are modified.  
        `);
  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
  }
})();
