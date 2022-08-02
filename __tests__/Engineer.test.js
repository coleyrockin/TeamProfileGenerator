// Using Engineer constructor 
const Engineer = require('../lib/Engineer');
// Engineer object  
test('creates an Engineer object', () => {
    const engineer = new Engineer('Boyd', 0, 'coleyrockin@aol.com', 'coleyrockin');
    expect(engineer.github).toEqual(expect.any(String));
});

// Github
test('gets engineer github value', () => {
    const engineer = new Engineer('Boyd', 0, 'coleyrockin@aol.com', 'coleyrockin');
    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});

// Role
test('gets role of employee', () => {
    const engineer = new Engineer('Boyd', 0, 'coleyrockin@aol.com', 'coleyrockin');
    expect(engineer.getRole()).toEqual("Engineer");
});