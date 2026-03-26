# Team Profile Generator

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325?style=flat&logo=jest&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat)

## About

A Node.js command-line application that takes in information about employees on a software engineering team and generates a styled HTML webpage displaying summary cards for each person. Supports managers, engineers, and interns with role-specific fields.

## Features

- Interactive CLI prompts to build a team roster
- Add managers, engineers, and interns with role-specific details
- Generates a polished HTML page with team member cards
- OOP class hierarchy (Employee, Manager, Engineer, Intern)
- Unit tested with Jest
- HTML output saved to the dist/ folder

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| CLI | Inquirer |
| Testing | Jest |
| Output | HTML, CSS |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/coleyrockin/TeamProfileGenerator.git
cd TeamProfileGenerator

# Install dependencies
npm install

# Run the application
node index.js

# Run tests
npm test
```

The generated HTML file will be saved in the `dist/` folder.

## Project Structure

```
TeamProfileGenerator/
├── __tests__/
├── dist/
├── lib/
├── src/
├── index.js
└── package.json
```

---

> Built by [coleyrockin](https://github.com/coleyrockin)# Team Profile Generator
  ## Licensing:
  [![license](https://img.shields.io/badge/License-No_License-blue)](https://shields.io)
  ## Table of Contents 
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribution](#contribution)
  - [Testing](#testing)
  - [Additional Info](#additional-info-or-questions)
  ## Description:
  Node.js command-line application that takes in information about employees on a software engineering team and generates an HTML webpage.
  ## Installation:
  Must have Node.js, Inquirer, Jest.js
  ## Usage:
  After installing Node.js, Inquirer, and Jest use the command "Node index" in the terminal to activate the application and answer the following prompts. Will generate HTML file in the "dist" folder.
  ## Testing:
  Use command "Npm test" to run test.
  ## Additional Info or Questions:
  - Github: [coleyrockin](https://github.com/coleyrockin)
  - Email: coleyrockin@aol.com 
