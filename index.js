const fs = require("fs");
const util = require("util");
const inquirer = require('inquirer');

const writeFileAsync = util.promisify(fs.writeFile);



// array of questions for user
const questions = [
    {
        // Project Title question
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
        // Project Description question
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
        // Installation question
        name: "install",
        type: "input",
        message: "Enter installation instructions: ",
        
    },
    {
        // Usage question
        name: "usage",
        type: "input",
        message: "Enter the intended use for the application: ",
    },
    {
        // Contribution guidelines question
        name: "contributors",
        type: "input",
        message: "Guidelines for possible Contributors: ",
    },
    {
        // Resources question
        name: "resources",
        type: "input",
        message: "Resources for Code: ",
    },
    {
        // Test case question
        name: "tests",
        type: "input",
        message: "Provide some test cases: ",
    },
   {
        // License question
        name: "license",
        type: "list",
        message: "Choose a license type",
        choices: ['Apache License 2.0', 'Boost Software License 1.0', 'GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'MIT License', 'Mozilla Public License 2.0', 'The Unlicense'],
               
    },

        // GitHub username question
    {
        name: "gitHubUserName",
        type: "input",
        message: "Enter GitHub username: ",
    },
    {
        // Email question
        name: "email",
        type: "input",
        message: "Enter email address: ",
        
    },
    
    ];

   
// function to write README file
async function writeToFile(fileName, data) {
    let readMeTemplate = `# ${data.title}

  
## Description 
        
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

## License ##Badge 

<img src="http://img.shields.io/badge/license-${data.license}-blue">

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
    // Checking for errors and preparing to write to file. 
    try {
        await writeFileAsync(fileName, readMeTemplate);

    } catch (error) {
        throw Error(error);
    }
}

// function to initialize program
async function init() {
    try {
        // const answers = the user's responses. 
        const answers = await inquirer.prompt(questions);
        // write user's responses to README.md.
        writeToFile("TestReadMe2.md", answers)
        console.log(answers);
        // catch any erros
    } catch (error) {
        throw Error(error);
    }
}

// function call to initialize program
init();