// Importing Employee constructor 
const Employee = require('./Employee');

// Intern constructor
class Intern extends Employee  {
    constructor (name, id, email, school) {
        super (name, id, email); 
        this.school = school; 
    }

    // Returning school from input 
    getSchool () {
        return this.school;
    }

    // Override employee role to intern
    getRole () {
        return "Intern";
    }
}

module.exports = Intern; 