// using Intern constructor 
const Intern = require('../lib/Intern');

// Creating intern object  
test('creates an Intern object', () => {
    const intern = new Intern('Boyd', 0, 'coleyrockin@aol.com', 'SMU');
    expect(intern.school).toEqual(expect.any(String));
});

// getSchool()
test('gets employee school', () => {
    const intern = new Intern('Boyd', 0, 'coleyrockin@aol.com', 'SMU');
    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});

// getRole()
test('gets role of employee', () => {
    const intern = new Intern('Boyd', 0, 'coleyrockin@aol.com', 'SMU');
    expect(intern.getRole()).toEqual("Intern");
}); 