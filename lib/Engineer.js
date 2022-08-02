// Importing Employee constructor 
const Employee = require("./Employee");

// Engineer constructor 
class Engineer extends Employee {
    constructor (name, id, email, github) {
        // calling employee constructor 
        super (name, id, email);
        this.github = github; 
    }

    // Returning github input 
    getGithub () {
        return this.github;
    }

     // Override employee role to engineer
    getRole () {
        return "Engineer";
    }
}

module.exports = Engineer; 