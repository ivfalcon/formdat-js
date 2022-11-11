const { test, expect } = require('@jest/globals');
const Formdat = require('../formdat');

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
        const result = Formdat.ymd('');
        expect(result).toBeFalsy;
    })

    test('of undefined', () => {
        const result = Formdat.ymd();
        expect(result).toBeFalsy;
    })

    test('of  number', () => {
        const result = Formdat.ymd(12052005);
        expect(result).toBeFalsy;
    })
})

describe('Cleaner function should return valid elements of a date', () => {
    test.skip('should return one of the months or digits or digits of four numbers or less', () => {
        const months = {
            'en': [['january', 'jan'], ['february', 'feb'], ['march', 'mar'], ['april', 'apr'], ['may', 'may'], ['june', 'jun'], ['july', 'jul'], ['august', 'aug'], ['september', 'sep'], ['october', 'oct'], ['november', 'nov'], ['december', 'dec']],
            'es': [['enero', 'en'], ['febrero', 'feb', 'febr'], ['marzo', 'mar', 'mzo'], ['abril', 'abr'], ['mayo', 'may', 'my'], ['junio', 'jun'], ['julio', 'jul'], ['agosto', 'ag', 'agt', 'agto'], ['septiembre', 'sept', 'set', 'setbre'], ['octubre', 'oct'], ['noviembre', 'nov', 'novbre'], ['diciembre', 'dic', 'dicbre']],
          }
    })
})

describe('dateDetacher function should separates the elements that may belong to a date', () => {
    test('should return an array', () => {
        const result = Formdat.dateDetacher('23 de , abr., 2022', 'yearLast', 'es');
        expect(result).toEqual(expect.any(Array));
        expect(result).toEqual(['23', 'abr', '2022']);
    })
    test('should separate a full digit date depending of the position of the year', () => {
        const dateWithYearFirst = Formdat.dateDetacher('20230512', 'yearFirst', 'es');
        const dateWithYearMid = Formdat.dateDetacher('20230512', 'yearMid', 'es');
        const dateWithYearLast = Formdat.dateDetacher('20230512', 'yearLast', 'es');

        expect(dateWithYearFirst).toHaveLength(3)
        expect(dateWithYearMid).toHaveLength(3)
        expect(dateWithYearLast).toHaveLength(3)
        expect(dateWithYearFirst).toEqual(expect.arrayContaining(['2023', '05', '12']));
        expect(dateWithYearMid).toEqual(expect.arrayContaining(['20', '2305', '12']));
        expect(dateWithYearLast).toEqual(expect.arrayContaining(['20', '23', '0512']));
    })
})

describe('isValidDate function receives the year, month and day of the date and analyzes that they form a valid date', () => {
    test.skip('should return true if year contains 4 digits and if day and month contains 2 digits', () => {
        
    })
})

describe('monthSearch function search the month in text format, and return the numeric position of the month', () => {
    test.skip('should return a stringified number with the posotion of the month', () => {
        
    })
})

describe('addZeros function add zeros to those elements of the date that do not comply with the format required', () => {
    test.skip('should return an array of booleans if the desired date has not been found', () => {
        
    })
    test.skip('should return an array of digits with the format length', () => {
        
    })
})