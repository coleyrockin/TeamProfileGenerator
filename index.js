const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const generateHTML = require('./src/generateHTML');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const teamArray = [];

const isRequired = input => String(input).trim().length > 0;
const isDigits = input => /^\d+$/.test(String(input).trim());
const isValidEmail = email =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(String(email).trim());
const isValidGithubUsername = username => {
    const value = String(username).trim();
    const pattern = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/;
    return pattern.test(value) && !value.includes('--');
};

const validate = (predicate, errorMessage) => input =>
    predicate(input) ? true : errorMessage;

const namePrompt = (subject, errorMessage) => ({
    type: 'input',
    name: 'name',
    message: `What is ${subject} name?`,
    validate: validate(isRequired, errorMessage)
});

const idPrompt = subject => ({
    type: 'input',
    name: 'id',
    message: `Please enter ${subject} ID.`,
    validate: validate(isDigits, 'Please enter a numeric ID.')
});

const emailPrompt = subject => ({
    type: 'input',
    name: 'email',
    message: `Please enter ${subject} email.`,
    validate: validate(isValidEmail, 'Please enter a valid email address.')
});

const addManager = () =>
    inquirer
        .prompt([
            namePrompt("the manager's", "Please enter the manager's name."),
            idPrompt("the manager's"),
            emailPrompt("the manager's"),
            {
                type: 'input',
                name: 'officeNumber',
                message: "Please enter the manager's office number.",
                validate: validate(isDigits, 'Please enter a numeric office number.')
            }
        ])
        .then(({ name, id, email, officeNumber }) => {
            teamArray.push(new Manager(name, id, email, officeNumber));
        });

const addEmployee = () =>
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'role',
                message: "Please choose the employee's role.",
                choices: ['Engineer', 'Intern']
            },
            namePrompt("the employee's", "Please enter the employee's name."),
            idPrompt("the employee's"),
            emailPrompt("the employee's"),
            {
                type: 'input',
                name: 'github',
                message: "Please enter the engineer's GitHub username.",
                when: ({ role }) => role === 'Engineer',
                validate: validate(isValidGithubUsername, 'Please enter a valid GitHub username.')
            },
            {
                type: 'input',
                name: 'school',
                message: "Please enter the intern's school.",
                when: ({ role }) => role === 'Intern',
                validate: validate(isRequired, "Please enter the intern's school.")
            },
            {
                type: 'confirm',
                name: 'addAnother',
                message: 'Would you like to add another team member?',
                default: false
            }
        ])
        .then(({ name, id, email, role, github, school, addAnother }) => {
            if (role === 'Engineer') {
                teamArray.push(new Engineer(name, id, email, github));
            } else if (role === 'Intern') {
                teamArray.push(new Intern(name, id, email, school));
            }

            return addAnother ? addEmployee() : teamArray;
        });

const writeFile = (data, outputPath) =>
    new Promise((resolve, reject) => {
        fs.mkdir(path.dirname(outputPath), { recursive: true }, mkdirErr => {
            if (mkdirErr) return reject(mkdirErr);
            fs.writeFile(outputPath, data, writeErr =>
                writeErr ? reject(writeErr) : resolve(outputPath)
            );
        });
    });

const OUTPUT_PATH = path.join(__dirname, 'dist', 'index.html');

addManager()
    .then(addEmployee)
    .then(team => generateHTML(team))
    .then(html => writeFile(html, OUTPUT_PATH))
    .then(outputPath => {
        console.log(`\n✔ Team profile written to ${path.relative(process.cwd(), outputPath)}`);
    })
    .catch(error => {
        console.error('\n✖ Failed to generate team profile:', error.message || error);
        process.exitCode = 1;
    });
