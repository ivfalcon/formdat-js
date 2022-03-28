const { test, expect } = require('@jest/globals');
const { Formdat } = require('../src/formdat');

describe('Date formatting with "ymd" order (year, month and day)', () => {
    test('it should be a date in the format YYYYY/MM/DD', () => {
        const result = Formdat.ymd('On 2007 of May 11th');
        expect(result).toMatch(/^2(\d{3})\/(0[1-9]|1[0-2])\/([0-2][0-9]|3[0-1])$/);
    })

    test('it should not be a date if it finds too many possible elements of a date', () => {
        const result = Formdat.ymd('On 2007 of May 11th, he turned 15 years old');
        expect(result).toBeFalsy;
    })
    
    test('of empty string', () => {
        const result = Formdat.dmy('');
        expect(result).toBeFalsy;
    })
    
    test('of undefined', () => {
        const result = Formdat.dmy();
        expect(result).toBeFalsy;
    })
    
    test('of  number', () => {
        const result = Formdat.dmy(12052005);
        expect(result).toBeFalsy;
    })
})

