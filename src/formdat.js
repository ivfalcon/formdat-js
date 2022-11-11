const months = {
  'en': [['january', 'jan'], ['february', 'feb'], ['march', 'mar'], ['april', 'apr'], ['may', 'may'], ['june', 'jun'], ['july', 'jul'], ['august', 'aug'], ['september', 'sep'], ['october', 'oct'], ['november', 'nov'], ['december', 'dec']],
  'es': [['enero', 'en'], ['febrero', 'feb', 'febr'], ['marzo', 'mar', 'mzo'], ['abril', 'abr'], ['mayo', 'may', 'my'], ['junio', 'jun'], ['julio', 'jul'], ['agosto', 'ag', 'agt', 'agto'], ['septiembre', 'sept', 'set', 'setbre'], ['octubre', 'oct'], ['noviembre', 'nov', 'novbre'], ['diciembre', 'dic', 'dicbre']],
}

/**
* We pass the elements of the date we want to analyze, and only the valid ones are returned.
* @param {array} detachedDate Elements to be analyzed in order to leave or remove from the date
* @param {string} lang Language of the date
* @returns {array} the date elements needed, such as numbers or names of the month
*/
function clean(detachedDate, lang = 'en') {
  return detachedDate.filter((el) => {
    const isDateElement = months[lang].some(monthArr => monthArr.some((month) => (month === el.toLowerCase() || (/^\d{1,4}$/).test(el))));
    if (isDateElement) return el;
  })
}

/**
 * Function that receives a date in a unified 8-digit format.
 * @param {string} unifiedDate date joined with numerical format and total of 8 digits
 * @param {string} type indicates whether the year is at the beginning, in the middle or at the end of the year
 * @returns array containing the date elements (year, month and day)
 */
function getUnifiedDate(unifiedDate, type = 'yearFirst') {
  const typeOfDate = {
    'yearFirst': (unifiedDate) => [unifiedDate.substring(0, 4), unifiedDate.substring(4, 6), unifiedDate.substring(6, 8)],
    'yearLast': (unifiedDate) => [unifiedDate.substring(0, 2), unifiedDate.substring(2, 4), unifiedDate.substring(4, 8)],
    'yearMid': (unifiedDate) => [unifiedDate.substring(0, 2), unifiedDate.substring(2, 6), unifiedDate.substring(6, 8)],
  }
  return typeOfDate[type](unifiedDate);
}

/**
* Function that receives a text and separates the elements that may belong to a date.
* @param {string} date Text containing the date to be obtained
* @param {string} type indicates whether the year is at the beginning, in the middle or at the end of the year
* @returns array containing the date elements (year, month and day)
*/
function dateDetacher(date, type = 'yearFirst', lang = 'en') {
  const result = [];
  let test = date.toLowerCase().split(/[\/\,.\-\s]/).filter(el => el != '');
  const unifiedDatePattern = /^\d{8}$/;

  test.forEach((el) => {
    let isDigit = (/^\d/).test(el);
    let init = 0;
    for (let i = 0; i < el.length; i++) {
      if (isDigit && (/\D/).test((el).charAt(i))) {
        if (unifiedDatePattern.test(el.substring(init, i))) {
          result.push(...getUnifiedDate(el.substring(init, i), type));
        } else {
          result.push(el.substring(init, i));
        }

        isDigit = !isDigit;
        init = i;
      } else if (!isDigit && (/\d/).test((el).charAt(i))) {
        if (unifiedDatePattern.test(el.substring(init, i))) {
          result.push(...getUnifiedDate(el.substring(init, i), type));
        } else {
          result.push(el.substring(init, i));
        }
        isDigit = !isDigit;
        init = i;
      }
      if (el.length - 1 === (i)) {
        if (unifiedDatePattern.test(el.substring(init, el.length))) {
          result.push(...getUnifiedDate(el.substring(init, el.length), type));
        } else {
          result.push(el.substring(init, el.length));
        }
      }
    }
  })
  return clean(result, lang);
}

/**
* Receives the year, month and day of the date and analyzes that they form a valid date.
* @param {string} year Year received
* @param {string} month Month received
* @param {string} day Day received
* @returns {boolean} Returns true if they are valid elements of a date or false if they are not.
*/
function isValidDate(year, month, day) {
  const yearPattern = /^(1|2)(\d{3})$/;
  const monthPattern = /^(0[1-9]|1[0-2])$/;
  const dayPattern = /^([0-2][0-9]|3[0-1])$/;

  return yearPattern.test(year) && monthPattern.test(month) && dayPattern.test(day);
}

/**
* The month is searched for in text format, and we return the numeric position of the month
* @param {string} month Month received
* @param {string} lang Language of the date
* @returns Position of the month
*/
function monthSearch(month, lang = 'en') {
  let found = false;
  let cont = 0;
  let j = 0;
  let monthPos = '';

  while (!found && cont < months[lang].length) {
    j = 0;
    while (!found && j < months[lang][cont].length) {
      found = months[lang][cont].indexOf(month) > -1 ? true : false;
      if (found) {
        monthPos = cont + 1;
      }
      j++;
    }
    cont++;
  }
  return monthPos.toString();
}

/**
* The zeros are added to those elements of the date that do not comply with the format required
* @param {string} year Year received
* @param {string} month Month received
* @param {string} day Day received
* @returns {array} Dates in the correct format, or array of booleans if the desired date has not been found.
*/
function addZeros(year, month, day) {
  const yearLength = year.length;
  const monthLength = month.length;
  const dayLength = day.length;
  const voidPattern = /^((0000)|(000)|(00)|(0))$/;
  if (dayLength > 4 || dayLength < 1 || voidPattern.test(year)) {
    return [false, false, false];
  }

  if (monthLength > 2 || monthLength < 1 || voidPattern.test(month)) {
    return [false, false, false];
  }

  if (dayLength > 2 || dayLength < 1 || voidPattern.test(day)) {
    return [false, false, false];
  }
  if (yearLength < 4) {
    const yearZerosToPush = 4 - yearLength;
    for (let i = 0; i < yearZerosToPush; i++) {
      if (yearZerosToPush - 1 === i) {
        year = '2'.concat(year);
      } else {
        year = '0'.concat(year);
      }
    }
  }

  if (monthLength === 1) {
    month = '0'.concat(month);
  }

  if (dayLength === 1) {
    day = '0'.concat(day)
  }

  return [year, month, day];
}

/**
* Receives a date in an order of appearance of month, day and year and returns it in YYYYY/MM/DD format
* @param {string} date Text containing the date we want to parse
* @param {string} lang Language of the date
* @returns {(string|boolean)} the date in format YYYYY/MM/DD
*/
function mdy(date = '', lang = 'en') {
  if (typeof date !== 'string') {
    return false;
  }
  let year, month, day;
  const result = dateDetacher(date, 'yearLast', lang);
  if (result.length === 3) {
    [month, day, year] = [...result];
    if (!(/\d/).test(month)) {
      month = monthSearch(month, lang);
    }
    [year, month, day] = addZeros(year, month, day);
    return isValidDate(year, month, day) ? ([year, month, day].join('/')) : false;
  }
  else return false;
}

/**
* Receives a date in an order of appearance of year, date and month and returns it in YYYYY/MM/DD format
* @param {string} date Text containing the date we want to parse
* @param {string} lang Language of the date
* @returns {(string|boolean)} the date in format YYYYY/MM/DD
*/
function ydm(date = '', lang = 'en') {
  if (typeof date !== 'string') {
    return false;
  }
  let year, month, day;
  const result = dateDetacher(date, 'yearFirst', lang);
  if (result.length === 3) {
    [year, day, month] = [...result];
    if (!(/\d/).test(month)) {
      month = monthSearch(month, lang);
    }
    [year, month, day] = addZeros(year, month, day);
    return isValidDate(year, month, day) ? ([year, month, day].join('/')) : false;
  }
  else return false;
}

/**
* Receives a date in an order of appearance of year, month and date and returns it in YYYYY/MM/DD format
* @param {string} date Text containing the date we want to parse
* @param {string} lang Language of the date
* @returns {(string|boolean)} the date in format YYYYY/MM/DD
*/
function ymd(date = '', lang = 'en') {
  if (typeof date !== 'string') {
    return false;
  }
  let year, month, day;
  const result = dateDetacher(date, 'yearFirst', lang);
  if (result.length === 3) {
    [year, month, day] = [...result];
    if (!(/\d/).test(month)) {
      month = monthSearch(month, lang);
    }
    [year, month, day] = addZeros(year, month, day);
    return isValidDate(year, month, day) ? ([year, month, day].join('/')) : false;
  }
  return false;
}

/**
* Receives a date in an order of appearance of day, month and year and returns it in YYYYY/MM/DD format
* @param {string} date Text containing the date we want to parse
* @param {string} lang Language of the date
* @returns {(string|boolean)} the date in format YYYYY/MM/DD
*/
function dmy(date = '', lang = 'en') {
  if (typeof date !== 'string') {
    return false;
  }
  let year, month, day;
  const result = dateDetacher(date, 'yearLast', lang);
  if (result.length === 3) {
    [day, month, year] = [...result];
    if (!(/\d/).test(month)) {
      month = monthSearch(month, lang);
    }
    [year, month, day] = addZeros(year, month, day);
    return isValidDate(year, month, day) ? ([year, month, day].join('/')) : false;
  }
  else return false;
}

/**
 * Receives a date in an order of appearance of month, year and date and returns it in YYYYY/MM/DD format
 * @param {string} date Text containing the date we want to parse
 * @param {string} lang Language of the date
 * @returns {(string|boolean)} the date in format YYYYY/MM/DD
 */
function myd(date = '', lang = 'en') {
  if (typeof date !== 'string') {
    return false;
  }

  let year, month, day;
  const result = dateDetacher(date, 'yearMid', lang);
  if (result.length === 3) {
    [month, year, day] = [...result];
    if (!(/\d/).test(month)) {
      month = monthSearch(month, lang);
    }
    [year, month, day] = addZeros(year, month, day);
    return isValidDate(year, month, day) ? ([year, month, day].join('/')) : false;
  }
  else return false;
}

/**
 * Receives a date in an order of appearance of day, year and month and returns it in YYYYY/MM/DD format
 * @param {string} date Text containing the date we want to parse
 * @param {string} lang Language of the date
 * @returns {(string|boolean)} the date in format YYYYY/MM/DD
 */
function dym(date = '', lang = 'en') {
  if (typeof date !== 'string') {
    return false;
  }
  let year, month, day;
  const result = dateDetacher(date, 'yearMid', lang);
  if (result.length === 3) {
    [day, year, month] = [...result];
    if (!(/\d/).test(month)) {
      month = monthSearch(month, lang);
    }
    [year, month, day] = addZeros(year, month, day);
    return isValidDate(year, month, day) ? ([year, month, day].join('/')) : false;
  }
  else return false;
}

module.exports = { clean, getUnifiedDate, dateDetacher, isValidDate, monthSearch, addZeros, mdy, ydm, ymd, dmy, myd, dym };