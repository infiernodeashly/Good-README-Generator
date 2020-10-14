const fs = require("fs");
const util = require("util");
const inquirer = require('inquirer');

const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
const questions = [
    {
        name: "title",
        type: "input",
        message: "Project Title: ",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid Project Title is required.");
            }
            return true;
        }
    },
    {
        name: "description",
        type: "input",
        message: "Project Description: ",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid Project Title is required.");
            }
            return true;
        }
    },
    {
        name: "install",
        type: "input",
        message: "Enter installation instructions: ",
        
    },
    {
        name: "usage",
        type: "input",
        message: "What is the intended use for the application: ",
    },
    {
        name: "contributors",
        type: "input",
        message: "Who will be contributing to the project: ",
    },
    {
        name: "resources",
        type: "input",
        message: "Resources for Code: ",
    },
    {
        name: "tests",
        type: "input",
        message: "Provide some test cases: ",
    },
    {
        name: "license",
        type: "list",
        message: "Choose a license type",
        choices: ['Apache License 2.0', 'Boost Software License 1.0', 'GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'MIT License', 'Mozilla Public License 2.0', 'The Unlicense'],
    },
    {
        name: "gitHubUserName",
        type: "input",
        message: "Enter GitHub username: ",
    },
    {
        name: "email",
        type: "input",
        message: "Enter email address: ",
        
    },

];

// function to write README file
async function writeToFile(fileName, data) {
    let readMeTemplate = `# ${data.title}
    
## Desription
        
${data.description}

## Table of Contents

* [Description](#description)
* [Installation](#install)
* [Usage](#usage)
* [License](#license)
* [Contributors](#contributors)
* [Resources](#resources)
* [Tests](#tests)
* [Questions](#questions)

## Install

${data.install}

## Usage

${data.usage}

## License

${data.license}

## Contributors

${data.contributors}

## Resources

${data.resources}

## Tests

${data.tests}

## Questions

For more information:

Visit: [https://${data.gitHubUserName}.github.io](https://${data.gitHubUserName}.github.io)
Email: ${data.email}
`;

    try {
        await writeFileAsync(fileName, readMeTemplate);

    } catch (error) {
        throw Error(error);
    }
}

// function to initialize program
async function init() {
    try {
        const answers = await inquirer.prompt(questions);

        writeToFile("README.md", answers)
        console.log(answers);
    } catch (error) {
        throw Error(error);
    }
}

// function call to initialize program
init();