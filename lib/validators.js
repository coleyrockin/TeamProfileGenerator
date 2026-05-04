const isRequired = input => String(input ?? '').trim().length > 0;

const isDigits = input => /^\d+$/.test(String(input ?? '').trim());

const isValidEmail = email =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(String(email ?? '').trim());

const isValidGithubUsername = username => {
    const value = String(username ?? '').trim();
    const pattern = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/;
    return pattern.test(value) && !value.includes('--');
};

const SUPPORTED_ROLES = ['Manager', 'Engineer', 'Intern'];

const validateEmployeeRecord = (record, index) => {
    const where = `record[${index}]`;
    if (!record || typeof record !== 'object') {
        return `${where}: expected an object`;
    }
    if (!SUPPORTED_ROLES.includes(record.role)) {
        return `${where}: role must be one of ${SUPPORTED_ROLES.join(', ')}`;
    }
    if (!isRequired(record.name)) return `${where}: name is required`;
    if (!isDigits(record.id)) return `${where}: id must be numeric`;
    if (!isValidEmail(record.email)) return `${where}: email is invalid`;

    if (record.role === 'Manager' && !isDigits(record.officeNumber)) {
        return `${where}: officeNumber must be numeric for Manager`;
    }
    if (record.role === 'Engineer' && !isValidGithubUsername(record.github)) {
        return `${where}: github must be a valid GitHub username for Engineer`;
    }
    if (record.role === 'Intern' && !isRequired(record.school)) {
        return `${where}: school is required for Intern`;
    }
    return null;
};

const validateTeamData = team => {
    if (!Array.isArray(team)) {
        return 'team data must be an array';
    }
    if (team.length === 0) {
        return 'team data must contain at least one record';
    }
    const managerCount = team.filter(r => r && r.role === 'Manager').length;
    if (managerCount !== 1) {
        return `team data must contain exactly one Manager (found ${managerCount})`;
    }
    for (let i = 0; i < team.length; i += 1) {
        const error = validateEmployeeRecord(team[i], i);
        if (error) return error;
    }
    return null;
};

module.exports = {
    isRequired,
    isDigits,
    isValidEmail,
    isValidGithubUsername,
    validateEmployeeRecord,
    validateTeamData,
    SUPPORTED_ROLES
};
