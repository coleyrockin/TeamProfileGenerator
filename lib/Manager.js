// Importing Employee constructor 
const Employee = require('./Employee');

// Manager constructor extends employee constructor
class Manager extends Employee {
    constructor (name, id, email, officeNumber) {
        super (name, id, email); 
        this.officeNumber = officeNumber; 
    }

    // Override employee role to manager 
    getRole () {
        return "Manager";
    }
}

module.exports = Manager; 