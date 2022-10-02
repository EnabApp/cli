import inquirer from 'inquirer';
import runner from './createPackageRun.js';

async function promptForMissingOptions() {
  const defaultTemplate = 'JavaScript';

  const questions = [];
  questions.push({
    type: 'input',
    name: 'name',
    message: 'Please choose name of the package',
  });

  questions.push({
    type: 'list',
    name: 'template',
    message: 'Please choose which project template to use',
    choices: ['JavaScript', 'TypeScript'],
    default: defaultTemplate,
  });

  // if (!options.git) {
  //   questions.push({
  //     type: 'confirm',
  //     name: 'git',
  //     message: 'Initialize a git repository?',
  //     default: false,
  //   });
  // }

  const answers = await inquirer.prompt(questions);
  return {
    name: answers.name,
    template: answers.template,
    git: answers.git,
  };
}

export async function createPackage() {
  let options = await promptForMissingOptions();
  console.log(options);
  // runner(options);
}