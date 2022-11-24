const { test, expect } = require('@jest/globals');
const Formdat = require('../formdat');
const months = {
    'en': [['january', 'jan'], ['february', 'feb'], ['march', 'mar'], ['april', 'apr'], ['may', 'may'], ['june', 'jun'], ['july', 'jul'], ['august', 'aug'], ['september', 'sep'], ['october', 'oct'], ['november', 'nov'], ['december', 'dec']],
    'es': [['enero', 'en'], ['febrero', 'feb', 'febr'], ['marzo', 'mar', 'mzo'], ['abril', 'abr'], ['mayo', 'may', 'my'], ['junio', 'jun'], ['julio', 'jul'], ['agosto', 'ag', 'agt', 'agto'], ['septiembre', 'sept', 'set', 'setbre'], ['octubre', 'oct'], ['noviembre', 'nov', 'novbre'], ['diciembre', 'dic', 'dicbre']],
}

describe('ymd()', () => {
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

describe('dateCleaner()', () => {
    test.skip('should return one of the months or digits of four numbers or less', () => {

    })
})

describe('dateTokenizer()', () => {
    test('should return an array containing no symbols, separators or empty strings.', () => {
        const result = Formdat.dateTokenizer('23 of ?, apr., of 2022');
        expect(result).toEqual(['23', 'of', 'apr', 'of', '2022']);
    })
    test('should separate a full digit date with yearFirst', () => {
        const dateWithYearFirst = Formdat.dateTokenizer('20230512', 'yearFirst');
        expect(dateWithYearFirst).toEqual(['2023', '05', '12']);
    })
    test('should separate a full digit date with yearFirst by default if not specified by parameter', () => {
        const dateWithYearFirst = Formdat.dateTokenizer('20230512');
        expect(dateWithYearFirst).toEqual(['2023', '05', '12']);
    })
    test('should separate a full digit date with yearMid', () => {
        const dateWithYearMid = Formdat.dateTokenizer('20230512', 'yearMid');
        expect(dateWithYearMid).toEqual(['20', '2305', '12']);
    })
    test('should separate a full digit date with yearLast', () => {
        ;
        const dateWithYearLast = Formdat.dateTokenizer('20230512', 'yearLast');
        expect(dateWithYearLast).toEqual(['20', '23', '0512']);
    })
    test('should separate a full digit date together with all other elements that it finds', () => {
        ;
        const result = Formdat.dateTokenizer('23 of ?, apr., of 2022 - 20230512');
        expect(result).toEqual(['23', 'of', 'apr', 'of', '2022', '2023', '05', '12']);
    })
})

describe('isValidDate()', () => {
    test('should return true if year contains 4 digits starting with 1 or 2, and if day and month contains 2 digits', () => {
        const validDate = Formdat.isValidDate('2004', '05', '06');
        expect(validDate).toBe(true);
        const wrongDate = Formdat.isValidDate('2004', '5', '06');
        expect(validDate).toBe(true);
    })
})

describe('monthSearch()', () => {
    test('should return a stringified number with the position of the month', () => {
        const result = Formdat.monthSearch('apr');
        expect(result).toBe('4');
    })

    test.each`
        a    | b    | expected
        ${'apr'} | ${undefined} | ${'4'}
        ${'apr'} | ${'en'} | ${'4'}
        ${'april'} | ${'en'} | ${'4'}
        ${'apr'} | ${'es'} | ${''}
        ${'abr'} | ${'es'} | ${'4'}
        ${'abril'} | ${'es'} | ${'4'}
    `('should return "$expected" when the detected month is "$a" and the lang id "$b"', ({ a, b, expected }) => {
        const result = Formdat.monthSearch(a, b);
        expect(result).toBe(expected)
    })

})

describe('addZeros function add zeros to those elements of the date that do not comply with the format required', () => {
    test.skip('should return an array of booleans if the desired date has not been found', () => {

    })
    test.skip('should return an array of digits with the format length', () => {

    })
})