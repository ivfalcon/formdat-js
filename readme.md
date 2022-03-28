# Formdat-js

>#### Module designed to receive any type of date format, and returns it in YYYYY/MM/DD format

## NPM Installation
> npm i formdat-js

----
## How to use it

### Try any date, even within phrases

| Input      | Output |
| ----------- | ----------- |
| ``Formdat.ymd('2022Sep15')``      | '2022/02/15'       |
| ``Formdat.ydm('2022.09.15')``   | '2022/02/15'        |
| ``Formdat.dmy('15, 9, 2022')``   | '2022/02/15'        |
| ``Formdat.dym('15202209')``   | '2022/02/15'        |
| ``Formdat.mdy('On September 15, 2022')``   | '2022/02/15'        |
| ``Formdat.myd('2 - 22 - 15')``   | '2022/02/15'        |

### Also in other languages

| Input      | Output |
| ----------- | ----------- |
| ``Formdat.dmy('28 de octubre de 2020', 'es')``      | '2022/10/15'       |
| ``Formdat.mdy('octubre 28 de 2021', 'es')``   | '2021/10/28'        |
| ``Formdat.dmy('23, abr., 2022', 'es')``   | '2022/04/23'        |

## Supported formats

Supports any date format separated by spaces, commas, dots, dashes or slashes.

Also dates without separation between elements. In the case of a date joined by numeric values only, they must have a format of 4 digits for the year, 2 digits for the month and 2 digits for the day.

### Examples of formats not currently supported

- [ ] YYYYMD
- [ ] Dates with years older than the year 2000
- [ ] Input with more than 3 elements that may be part of a date (Example: ``turned 24 on September 15, 2022``)

## Languages currently supported

| Language      | As a parameter |
| ----------- | ----------- |
| *English*      | ``en``       |
| *Spanish*   | ``es``        |

## Want to contribute?

>#### Feel free to make a contribution and send it as a Pull Request.
