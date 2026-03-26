# Team Profile Generator

![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=flat&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325?style=flat&logo=jest&logoColor=white)
![Inquirer](https://img.shields.io/badge/Inquirer-CLI-green?style=flat)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat)

## About

A command-line application that generates a styled HTML page displaying your engineering team's profile cards. Input team member details through an interactive CLI and receive a professionally formatted team roster with role-specific information for managers, engineers, and interns.

## Features

- **Interactive CLI** — Inquirer-driven prompts for team member input
- **Role-Based Cards** — Distinct layouts for Manager, Engineer, and Intern
- **HTML Generation** — Outputs a styled, responsive HTML team page
- **Test Suite** — Jest unit tests for all employee classes
- **OOP Design** — Class inheritance with Employee base class
- **Validation** — Input validation for all fields

## Tech Stack

| Category | Technology |
|----------|------------|
| Runtime | Node.js |
| CLI | Inquirer |
| Testing | Jest |
| Output | HTML, CSS |

## Getting Started

```bash
git clone https://github.com/coleyrockin/TeamProfileGenerator.git
cd TeamProfileGenerator
npm install
node index.js

# Run tests
npm test
```

Generated HTML is saved to the `dist/` directory.

## Project Structure

```
TeamProfileGenerator/
├── __tests__/      # Jest test suites
├── dist/           # Generated HTML output
├── lib/            # Employee classes (Employee, Manager, Engineer, Intern)
├── src/            # HTML template generation
├── index.js        # CLI entry point
└── package.json
```

---

Built by [Boyd Roberts](https://github.com/coleyrockin)
