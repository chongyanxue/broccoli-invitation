import {isValidFullName, isValidEmail, isValidConfirmEmail} from "../common/utils";

describe("Test validation functions", () => {
    test('Valid full name', () => {
        expect(isValidFullName(undefined)).toBe(false);
        expect(isValidFullName(null)).toBe(false);
        expect(isValidFullName('')).toBe(false);
        expect(isValidFullName('ha')).toBe(false);
        expect(isValidFullName('haha')).toBe(true);
        expect(isValidFullName('* +-/=?^_{|}~')).toBe(true);
    });

    test('Valid email', () => {
        expect(isValidEmail(undefined)).toBe(false);
        expect(isValidEmail(null)).toBe(false);
        expect(isValidEmail('')).toBe(false);
        expect(isValidEmail('haha')).toBe(false);
        expect(isValidEmail('haha@')).toBe(false);
        expect(isValidEmail('haha@12')).toBe(false);
        expect(isValidEmail('haha@12.')).toBe(false);
        expect(isValidEmail('haha@12.c')).toBe(false);
        expect(isValidEmail('haha@.co')).toBe(false);
        expect(isValidEmail('@12.com')).toBe(false);
        expect(isValidEmail('haha@12.co')).toBe(true);
        expect(isValidEmail(`test#$%&\\' * +-/=?^_{|}~@example.com`)).toBe(false);
    });

    test('Valid confirm email', () => {
        expect(isValidConfirmEmail(undefined, undefined)).toBe(false);
        expect(isValidConfirmEmail(null, null)).toBe(false);
        expect(isValidConfirmEmail('', '')).toBe(false);
        expect(isValidConfirmEmail('haha', 'haha')).toBe(false);
        expect(isValidConfirmEmail('haha@1', 'haha@1')).toBe(false);
        expect(isValidConfirmEmail('haha@12', 'haha@12')).toBe(false);
        expect(isValidConfirmEmail('haha@12.c', 'haha@12.c')).toBe(false);
        expect(isValidConfirmEmail('haha@.co', 'haha@.co')).toBe(false);
        expect(isValidConfirmEmail('@12.com', '@12.com')).toBe(false);
        expect(isValidConfirmEmail('haha@12.co', 'haha@12.co')).toBe(true);
        expect(isValidConfirmEmail('haha@12.co', null)).toBe(false);
        expect(isValidConfirmEmail('haha@12.co', undefined)).toBe(false);
        expect(isValidConfirmEmail('null, haha@12.co')).toBe(false);
        expect(isValidConfirmEmail(undefined, 'haha@12.co', )).toBe(false);
    });
});
