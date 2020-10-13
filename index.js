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
    },
    {
        name: "description",
        type: "input",
        message: "Project Description: ",
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
        name: "tests",
        type: "input",
        message: "Provide some test cases: ",
    },
    {
        name: "license",
        type: "list",
        message: "Choose a license type",
        choices: ["Community License", "MIT License", "GNU GPL"],
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
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Install

${data.install}

## Usage

${data.usage}

## License

${data.license}

## Contributing

${data.contributors}

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

        writeToFile("ReadMeTemp.md", answers)
        console.log(answers);
    } catch (error) {
        throw Error(error);
    }
}

// function call to initialize program
init();