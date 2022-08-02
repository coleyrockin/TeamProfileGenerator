const Employee = require('../lib/Employee');

test('creates an employee object', () => {
    const employee = new Employee('', 0, '');
    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
});

// Gets Name getName() 
test('gets employee name', () => {
    const employee = new Employee('', 0, '');
    expect(employee.getName()).toEqual(expect.any(String));
});

// Id from getId() 
test('gets employee ID', () => {
    const employee = new Employee('', 0, '');
    expect(employee.getId()).toEqual(expect.any(Number));
});

// Emails from getEmail()
test('gets employee email', () => {
    const employee = new Employee('', 0, '');
    expect(employee.getEmail()).toEqual(expect.stringContaining(employee.email.toString()));
});

// Role tRole()
test('gets role of employee', () => {
    const employee = new Employee('', 0, '');
    expect(employee.getRole()).toEqual("Employee");
}); 