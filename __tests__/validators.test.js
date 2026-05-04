const {
    isRequired,
    isDigits,
    isValidEmail,
    isValidGithubUsername,
    validateEmployeeRecord,
    validateTeamData
} = require('../lib/validators');

describe('isRequired', () => {
    test('accepts non-empty trimmed strings', () => {
        expect(isRequired('Boyd')).toBe(true);
        expect(isRequired('  Boyd  ')).toBe(true);
    });
    test('rejects empty / whitespace / null / undefined', () => {
        expect(isRequired('')).toBe(false);
        expect(isRequired('   ')).toBe(false);
        expect(isRequired(null)).toBe(false);
        expect(isRequired(undefined)).toBe(false);
    });
});

describe('isDigits', () => {
    test('accepts only digit strings', () => {
        expect(isDigits('1')).toBe(true);
        expect(isDigits('101')).toBe(true);
        expect(isDigits(101)).toBe(true);
    });
    test('rejects non-digit input', () => {
        expect(isDigits('abc')).toBe(false);
        expect(isDigits('1a')).toBe(false);
        expect(isDigits('')).toBe(false);
        expect(isDigits('-1')).toBe(false);
    });
});

describe('isValidEmail', () => {
    test('accepts plausible emails', () => {
        expect(isValidEmail('a@b.co')).toBe(true);
        expect(isValidEmail('first.last@example.com')).toBe(true);
    });
    test('rejects malformed emails', () => {
        expect(isValidEmail('no-at-sign')).toBe(false);
        expect(isValidEmail('a@b')).toBe(false);
        expect(isValidEmail('')).toBe(false);
    });
});

describe('isValidGithubUsername', () => {
    test('accepts valid usernames', () => {
        expect(isValidGithubUsername('octocat')).toBe(true);
        expect(isValidGithubUsername('coleyrockin')).toBe(true);
        expect(isValidGithubUsername('a-b')).toBe(true);
    });
    test('rejects invalid usernames', () => {
        expect(isValidGithubUsername('-leading')).toBe(false);
        expect(isValidGithubUsername('trailing-')).toBe(false);
        expect(isValidGithubUsername('double--hyphen')).toBe(false);
        expect(isValidGithubUsername('with space')).toBe(false);
        expect(isValidGithubUsername('a'.repeat(40))).toBe(false);
    });
});

describe('validateEmployeeRecord', () => {
    test('accepts a valid Manager record', () => {
        expect(
            validateEmployeeRecord({ role: 'Manager', name: 'M', id: 1, email: 'm@x.co', officeNumber: 101 }, 0)
        ).toBeNull();
    });
    test('rejects unknown role', () => {
        const err = validateEmployeeRecord({ role: 'CEO', name: 'X', id: 1, email: 'a@b.co' }, 2);
        expect(err).toMatch(/record\[2\]/);
        expect(err).toMatch(/role/);
    });
    test('rejects missing role-specific field', () => {
        expect(
            validateEmployeeRecord({ role: 'Engineer', name: 'E', id: 1, email: 'a@b.co' }, 1)
        ).toMatch(/github/);
        expect(
            validateEmployeeRecord({ role: 'Intern', name: 'I', id: 1, email: 'a@b.co' }, 1)
        ).toMatch(/school/);
    });
});

describe('validateTeamData', () => {
    test('rejects non-array input', () => {
        expect(validateTeamData(null)).toMatch(/array/);
        expect(validateTeamData({})).toMatch(/array/);
    });
    test('rejects empty array', () => {
        expect(validateTeamData([])).toMatch(/at least one/);
    });
    test('rejects zero or multiple managers', () => {
        expect(
            validateTeamData([{ role: 'Engineer', name: 'E', id: 1, email: 'a@b.co', github: 'octocat' }])
        ).toMatch(/exactly one Manager/);
        expect(
            validateTeamData([
                { role: 'Manager', name: 'M1', id: 1, email: 'a@b.co', officeNumber: 101 },
                { role: 'Manager', name: 'M2', id: 2, email: 'b@c.co', officeNumber: 102 }
            ])
        ).toMatch(/exactly one Manager/);
    });
    test('accepts a valid team', () => {
        expect(
            validateTeamData([
                { role: 'Manager', name: 'M', id: 1, email: 'm@x.co', officeNumber: 101 },
                { role: 'Engineer', name: 'E', id: 2, email: 'e@x.co', github: 'octocat' },
                { role: 'Intern', name: 'I', id: 3, email: 'i@x.co', school: 'SMU' }
            ])
        ).toBeNull();
    });
});
