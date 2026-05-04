# Team Profile Generator

![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=flat&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325?style=flat&logo=jest&logoColor=white)
![Inquirer](https://img.shields.io/badge/Inquirer-CLI-4a90e2?style=flat)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat)

A Node.js command-line tool that interviews you about an engineering team and writes a styled, self-contained HTML team roster to `dist/index.html`. Output uses a "personnel dossier" aesthetic: warm paper background, role-coded accent borders, monospace metadata, and a Fraunces-italic masthead.

## Screenshot

> Open `dist/index.html` in a browser after running the CLI. The shipped sample uses three placeholder employees (one of each role) so the layout can be reviewed without running the prompts first.

## Features

- Interactive Inquirer CLI for Manager, Engineer, and Intern roles
- Role-coded cards (Manager / Engineer / Intern) with distinct accent colors
- HTML output is **self-contained** — no Bootstrap, no Font Awesome, no external CDN runtime dependencies (Google Fonts is the only network call, by `<link>`)
- All employee fields are HTML-escaped before rendering; mailto and GitHub URLs are URL-encoded
- Input validation: required fields, numeric IDs / office numbers, RFC-shaped email, GitHub username pattern
- Jest test suite covering the Employee classes and the HTML generator (XSS escaping + no-third-party-runtime checks)

## Tech Stack

| Category   | Technology         |
|------------|--------------------|
| Runtime    | Node.js 16+        |
| CLI        | Inquirer 8 (CommonJS) |
| Testing    | Jest 28            |
| Output     | Plain HTML + CSS, Google Fonts (Fraunces, Inter, JetBrains Mono) |

## Getting Started

```bash
git clone https://github.com/coleyrockin/TeamProfileGenerator.git
cd TeamProfileGenerator
npm install
npm start
```

Answer the prompts. The generated page is written to `dist/index.html` — open it directly in a browser.

### Scripts

| Command       | Purpose                                      |
|---------------|----------------------------------------------|
| `npm start`   | Run the interactive CLI                      |
| `npm test`    | Run the Jest test suite                      |

## Project Structure

```
TeamProfileGenerator/
├── __tests__/             # Jest tests (Employee classes + HTML generator)
├── dist/
│   ├── index.html         # Generated team roster (overwritten each run)
│   └── style.css          # Self-contained stylesheet
├── lib/                   # Employee, Manager, Engineer, Intern classes
├── src/
│   └── generateHTML.js    # HTML template + escape/URL-encode helpers
├── index.js               # CLI entry point (prompts + validation + write)
└── package.json
```

## Security Notes

Treat any field as untrusted user input. The HTML generator:

- Escapes `& < > " '` in every text field before insertion (`escapeHTML`)
- URL-encodes the email and GitHub-username portions of `mailto:` and `https://github.com/...` links
- Validates the GitHub username against GitHub's published pattern (1–39 chars, alnum + hyphen, no leading/trailing/double hyphen) before accepting it

The Jest test `escapes employee fields before rendering profile cards` includes payloads such as `<img src=x onerror=alert(1)>` and `<script>alert()</script>` to verify the escaping holds.

## What I Learned

- **Sanitize at the boundary** — the safest place to escape is the moment a value enters HTML, not when it's collected. Helpers (`escapeHTML`, `mailtoUrl`, `githubProfileUrl`) make every insertion site explicit.
- **Validation is UX, not security** — input validation gives users a fast loop. Escaping is what protects the output.
- **Self-contained output ages better** — dropping the CDN dependencies (Bootstrap, Font Awesome) means the file still renders correctly years later, offline, and inside email previews.
- **Promises chain cleanly when the data flow is linear** — `addManager → addEmployee* → generateHTML → writeFile` is easier to reason about than nested callbacks.

## Known Limitations

- CLI only — no web form, no edit-after-add, no remove
- Roster is regenerated from scratch each run (no append, no persistence)
- Role set is fixed (Manager, Engineer, Intern)
- One manager per team

## Future Improvements

- `--input team.json` flag for non-interactive runs
- Persist the team to a JSON file and append/edit instead of overwrite
- Print the output path with an absolute file URL the user can ⌘-click
- Optional `--theme` flag to swap palette presets

## Author

**Boyd Roberts** — [GitHub](https://github.com/coleyrockin)

## License

ISC. See [LICENSE](./LICENSE).
