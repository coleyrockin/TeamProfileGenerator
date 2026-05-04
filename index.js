const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const url = require('url');
const inquirer = require('inquirer');

const generateHTML = require('./src/generateHTML');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const {
    isRequired,
    isDigits,
    isValidEmail,
    isValidGithubUsername,
    validateTeamData
} = require('./lib/validators');

const DEFAULT_OUTPUT = path.join(__dirname, 'dist', 'index.html');

const HELP = `
Team Profile Generator

Usage:
  node index.js                       Run interactive prompts (default)
  node index.js --input <file.json>   Generate from a saved team JSON
  node index.js --output <file.html>  Write HTML to a custom path
  node index.js --help                Show this message

The interactive flow also writes the team to <output-dir>/team.json so it
can be re-loaded later via --input.

JSON format (flat array, exactly one Manager):
  [
    { "role": "Manager",  "name": "...", "id": 1, "email": "...", "officeNumber": 101 },
    { "role": "Engineer", "name": "...", "id": 2, "email": "...", "github": "octocat" },
    { "role": "Intern",   "name": "...", "id": 3, "email": "...", "school": "SMU" }
  ]
`;

const parseArgs = argv => {
    const args = { input: null, output: null, help: false };
    for (let i = 0; i < argv.length; i += 1) {
        const flag = argv[i];
        if (flag === '--help' || flag === '-h') args.help = true;
        else if (flag === '--input' || flag === '-i') args.input = argv[++i];
        else if (flag === '--output' || flag === '-o') args.output = argv[++i];
        else throw new Error(`Unknown argument: ${flag}`);
    }
    return args;
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

const promptManager = () =>
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
        .then(({ name, id, email, officeNumber }) =>
            new Manager(name, id, email, officeNumber)
        );

const promptEmployee = team =>
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
            if (role === 'Engineer') team.push(new Engineer(name, id, email, github));
            else if (role === 'Intern') team.push(new Intern(name, id, email, school));
            return addAnother ? promptEmployee(team) : team;
        });

const collectTeamInteractively = async () => {
    const team = [];
    team.push(await promptManager());
    return promptEmployee(team);
};

const buildTeamFromRecords = records => {
    const error = validateTeamData(records);
    if (error) {
        throw new Error(`Invalid team data: ${error}`);
    }
    return records.map(r => {
        if (r.role === 'Manager')  return new Manager(r.name, r.id, r.email, r.officeNumber);
        if (r.role === 'Engineer') return new Engineer(r.name, r.id, r.email, r.github);
        if (r.role === 'Intern')   return new Intern(r.name, r.id, r.email, r.school);
        return null;
    });
};

const loadTeamFromFile = async filePath => {
    const absolute = path.resolve(filePath);
    let raw;
    try {
        raw = await fsp.readFile(absolute, 'utf8');
    } catch (err) {
        throw new Error(`Could not read input file ${absolute}: ${err.message}`);
    }
    let parsed;
    try {
        parsed = JSON.parse(raw);
    } catch (err) {
        throw new Error(`Input file ${absolute} is not valid JSON: ${err.message}`);
    }
    return buildTeamFromRecords(parsed);
};

const serializeTeam = team =>
    JSON.stringify(
        team.map(employee => {
            const role = employee.getRole();
            const base = {
                role,
                name: employee.name,
                id: employee.id,
                email: employee.email
            };
            if (role === 'Manager')  return { ...base, officeNumber: employee.officeNumber };
            if (role === 'Engineer') return { ...base, github: employee.github };
            if (role === 'Intern')   return { ...base, school: employee.school };
            return base;
        }),
        null,
        2
    );

const writeFile = async (data, outputPath) => {
    await fsp.mkdir(path.dirname(outputPath), { recursive: true });
    await fsp.writeFile(outputPath, data);
    return outputPath;
};

const run = async () => {
    const args = parseArgs(process.argv.slice(2));

    if (args.help) {
        console.log(HELP);
        return;
    }

    const team = args.input
        ? await loadTeamFromFile(args.input)
        : await collectTeamInteractively();

    const html = generateHTML(team);
    const outputPath = path.resolve(args.output || DEFAULT_OUTPUT);
    const teamJsonPath = path.join(path.dirname(outputPath), 'team.json');

    await writeFile(html, outputPath);
    await writeFile(serializeTeam(team), teamJsonPath);

    const fileUrl = url.pathToFileURL(outputPath).href;
    console.log(`\n✔ Team profile written to ${path.relative(process.cwd(), outputPath)}`);
    console.log(`  Open: ${fileUrl}`);
    console.log(`  Saved team JSON → ${path.relative(process.cwd(), teamJsonPath)} (re-run with --input)`);
};

run().catch(error => {
    console.error('\n✖ Failed to generate team profile:', error.message || error);
    process.exitCode = 1;
});
