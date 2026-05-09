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

Answer the prompts. The generated page is written to `dist/index.html` — open the `file://` URL printed at the end. The team is also persisted to `dist/team.json` so you can re-run without re-typing.

### Scripts

| Command       | Purpose                                      |
|---------------|----------------------------------------------|
| `npm start`   | Run the interactive CLI                      |
| `npm test`    | Run the Jest test suite                      |

### CLI Flags

| Flag                          | Purpose                                                       |
|-------------------------------|---------------------------------------------------------------|
| `--help`, `-h`                | Show usage                                                    |
| `--input <file.json>`, `-i`   | Generate from a saved team JSON (skips all prompts)           |
| `--output <file.html>`, `-o`  | Write HTML to a custom path (default: `dist/index.html`)      |

```bash
# Non-interactive run from a previously saved team
node index.js --input dist/team.json

# Custom output location
node index.js --output ~/Desktop/team.html
```

### JSON Input Format

Flat array. Exactly one Manager record is required.

```json
[
  { "role": "Manager",  "name": "Alex Reyes",  "id": 1, "email": "alex@example.com",  "officeNumber": 412 },
  { "role": "Engineer", "name": "Priya Shah",  "id": 2, "email": "priya@example.com", "github": "priyacodes" },
  { "role": "Intern",   "name": "Noor Patel",  "id": 3, "email": "noor@example.com",  "school": "UT Austin" }
]
```

Validation runs before any classes are constructed and reports the first failing record with its index.

## Project Structure

```
TeamProfileGenerator/
├── __tests__/             # Jest tests (classes + HTML generator + validators)
├── dist/
│   ├── index.html         # Generated team roster (overwritten each run)
│   ├── style.css          # Self-contained stylesheet
│   └── team.json          # Persisted team data (re-run via --input)
├── lib/
│   ├── Employee.js        # Base class
│   ├── Manager.js         # role: Manager
│   ├── Engineer.js        # role: Engineer
│   ├── Intern.js          # role: Intern
│   └── validators.js      # Reusable validators + record/team validation
├── src/
│   └── generateHTML.js    # HTML template + escape/URL-encode helpers
├── index.js               # CLI entry (arg parser, prompts, JSON loader, writer)
└── package.json
```

## Security Notes

Treat any field as untrusted user input. The HTML generator:

- Escapes `& < > " '` in every text field before insertion (`escapeHTML`)
- URL-encodes email and GitHub username fields before generating profile links
- Validates the GitHub username against GitHub's published pattern (1–39 chars, alnum + hyphen, no leading/trailing/double hyphen) before accepting it

The Jest test `escapes employee fields before rendering profile cards` includes payloads such as `<img src=x onerror=alert(1)>` and `<script>alert()</script>` to verify the escaping holds.

## What I Learned

- **Sanitize at the boundary** — the safest place to escape is the moment a value enters HTML, not when it's collected. Helpers (`escapeHTML`, `mailtoUrl`, `githubProfileUrl`) make every insertion site explicit.
- **Validation is UX, not security** — input validation gives users a fast loop. Escaping is what protects the output.
- **Self-contained output ages better** — dropping the CDN dependencies (Bootstrap, Font Awesome) means the file still renders correctly years later, offline, and inside email previews.
- **Promises chain cleanly when the data flow is linear** — `addManager → addEmployee* → generateHTML → writeFile` is easier to reason about than nested callbacks.

## Known Limitations

- CLI only — no web form, no edit-after-add, no remove (edit the generated `team.json` and re-run)
- Role set is fixed (Manager, Engineer, Intern)
- Exactly one manager per team

## Future Improvements

- `--theme <name>` flag to swap palette presets
- `--append` mode to add to an existing `team.json` interactively
- Optional avatar/photo field per employee
- ESM migration so we can use Inquirer 9+

## Author

**Boyd Roberts** — [GitHub](https://github.com/coleyrockin)

## License

ISC. See [LICENSE](./LICENSE).
