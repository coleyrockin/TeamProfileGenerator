// Employee constructor 
class Employee {
    constructor (name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email 
    }

    // Returning name from input
    getName () {
        return this.name;
    }

    // Returning ID from input
    getId () {
        return this.id;
    }   

    // Returning email from input
    getEmail () {
        return this.email;
    }

    // Returning employee type 
    getRole () {
        return 'Employee'; 
    }
};

// to be exported 
module.exports = Employee; 