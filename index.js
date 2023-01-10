const inquirer = require('inquirer');
const chalk = require('chalk');
const NodeRSA = require('node-rsa');
const fs = require('fs');

(async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Chamuditha Pasindu"
    },
    {
      type: 'input',
      name: 'street',
      message: 'No: 152/3 Wendesiwatta Weniwelketiya'
    },
    {
      type: 'input',
      name: 'street2',
      message: 'Nagoda Dodamgoda'
    },
    {
      type: 'input',
      name: 'city',
      message: 'Kaluthara'
    },
    {
      type: 'input',
      name: 'state',
      message: 'Western'
    },
    {
      type: 'input',
      name: 'zip',
      message: '12020'
    },
    {
      type: 'input',
      name: 'country',
      message: 'Sri-Lanka'
    },
    {
      type: 'input',
      name: 'notes',
      message: 'Thank you! your work is Grate keep it up'
    }
  ]);

  const keyData = fs.readFileSync('public.key', 'utf8');

  const key = NodeRSA();
  key.importKey(keyData);

  const encrypted = key.encrypt(answers, 'base64');
  console.log(chalk.yellow('------ copy below ------'));
  console.log(chalk.green(encrypted));
  console.log(chalk.yellow('------ copy above ------'));
  console.log(`
    ${chalk.blueBright('Step 1:')} Copy the green text above - it's your encrypted address. Nobody can read it but me. 
    ${chalk.blueBright('Step 2:')} Create a new file named ${chalk.bgBlue('stickers/<your-github-username>.txt')}. Paste in the green text. 
    ${chalk.blueBright('Step 3:')} Submit a pull request on Github. 
    ${chalk.blueBright('Step 4:')} Check your mailbox in a few weeks!

    ${chalk.bgKeyword('orange')(chalk.black(' Warning '))} Your PR should have exactly 1 new file. It may be rejected if multiple files are modified.  
    
  `);
})();