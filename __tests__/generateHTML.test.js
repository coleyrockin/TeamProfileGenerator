const generateHTML = require('../src/generateHTML');
const Manager = require('../lib/Manager');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');

test('escapes employee fields before rendering profile cards', () => {
    const manager = new Manager('<img src=x onerror=alert(1)>', 1, 'manager@example.com', 101);
    const engineer = new Engineer('Ada & Grace', 2, 'engineer@example.com', 'bad"><script>alert(2)</script>');
    const intern = new Intern('Intern <script>alert(3)</script>', 3, 'intern@example.com', 'SMU <img src=x onerror=alert(4)>');

    const html = generateHTML([manager, engineer, intern]);

    expect(html).not.toContain('<img src=x');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(html).toContain('Ada &amp; Grace');
    expect(html).toContain('bad&quot;&gt;&lt;script&gt;alert(2)&lt;/script&gt;');
    expect(html).toContain('SMU &lt;img src=x onerror=alert(4)&gt;');
    expect(html).toContain('https://github.com/bad%22%3E%3Cscript%3Ealert(2)%3C%2Fscript%3E');
});

test('renders a self-contained page without third-party asset requests', () => {
    const manager = new Manager('Boyd Roberts', 1, 'manager@example.com', 101);

    const html = generateHTML([manager]);

    expect(html).toContain('<link rel="stylesheet" href="style.css">');
    expect(html).not.toContain('https://');
    expect(html).not.toContain('<script src=');
});
