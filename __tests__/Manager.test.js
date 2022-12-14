const Manager = require('../lib/Manager');

// Creating manager object  
test('creates an Manager object', () => {
    const manager = new Manager('Boyd Roberts', 90, 'coleyrockin@gmail', 4);
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

// Gets role
test('gets role of employee', () => {
    const manager = new Manager('Boyd', 90, 'coleyrockin@gmail.com');
    expect(manager.getRole()).toEqual("Manager");
}); 