# [@fav/arith.number][repo-url] [![NPM][npm-img]][npm-url] [![MIT License][mit-img]][mit-url] [![Build Status][travis-img]][travis-url] [![Build Status][appveyor-img]][appveyor-url] [![Coverage status][coverage-img]][coverage-url]

Creates a number for accurate arithmetics.

> "fav" is an abbreviation of "favorite" and also the acronym of "for all versions".
> This package is intended to support all Node.js versions and many browsers as possible.
> At least, this package supports Node.js >= v0.10 and major Web browsers: Chrome, Firefox, IE11, Edge, Vivaldi and Safari.


## Install

To install from npm:

```sh
$ npm install --save @fav/arith.number.
```

***NOTE:*** *npm < 2.7.0 does not support scoped package, but old version Node.js supports it. So when you use such older npm, you should download this package from [github.com][repo-url], and move it in `node_modules/@fav/arith.number/` directory manually.*


## Usage

For Node.js:

```js
var arithNumber = require('@fav/arith.number');
var add = require('@fav/arith.add');

var num1 = arithNumber(1.23) // => { numerator: 123, denominator: 1, exponent: -2 }
num1.toApproximateString() // => '1.23'
num1.toApproximateString(1) // => '1.2'
num1.toApproximateString(1, Math.ceil) // => '1.3'

var num2 = arithNumber('4.56') // => { numerator: 456, denominator: 1, exponent: -2 }
num2.toApproximateString() // => '4.56'
num2.toApproximateString(1) // => '4.5'
num2.toApproximateString(1, Math.ceil) // => '4.6'

1.23 + 4.56 // => 5.789999999999999

var num3 = add(num1, num2) // => { numerator: 579, denominator: 1, exponent: -2 }
num3.toApproximateString() // => '5.79'
num3.toApproximateString(1) // => '5.7'
num3.toApproximateString(1, Math.ceil) // => '5.8'
```

For Web browsers:

```html
<script src="fav.arith.number.min.js"></script>
<script>
var arithNumber = fav.arith.number;
var num1 = arithNumber(1.23) // => { numerator: 123, denominator: 1, exponent: -2 }
num1.toApproximateString() // => '1.23'
num1.toApproximateString(1) // => '1.2'
num1.toApproximateString(1, Math.ceil) // => '1.3'
</script>
```


## API

### <u>arithNumber(value) : ArithNumber</u>

Creates an object of which prototype is `ArithNumber`.
`ArithNumber` represents a number and consists of three integers: numerator, denominator and exponent.

If *value* is a string, this function supports following notations:

* `'123'`, `'-45'`, `'+678'`
* `'12.3'`, `'-.45'`
* `'123e+45'`, `'-6.789E-12'`

#### Parameters:

| Parameter |  Type                                   | Description                            |
|:----------|:---------------------------------------:|:---------------------------------------|
| *value*   | number &#124; string &#124; ArithNumber | A number value or its string notation, or an ArithNumber object. |

#### Returns:

A number object of which prototype is `ArithNumber`.

**Type:** `ArithNumber`

### <u>ArithNumber</u>

Represents a number, and its instance consists of three integers: *numerator*, *denominator*, *exponent*.
(a number = ( *numerator* / *denominator* ) * 10^*exponent* ).

Arithmetics in program often causes rounding error.
However, integer operations except division is accurate as long as the integer value is within safe range. (`Number.MIN_SAFE_INTEGER` 〜 `Number.MAX_SAFE_INTEGER` in Javascript).

Therefore, `@fav/arith.*` packages operate a number data which consists of the above three integer elements.

The safe ranges of the three elements are as follows:

| Elements           | Range                                 | Note           |
|:-------------------|:-------------------------------------:|:---------------|
| *numerator*        | -9007199254740991 〜 9007199254740991 | `Number.MIN_SAFE_INTEGER` 〜 `Number.MAX_SAFE_INTEGER` |
| *denominator*      | 1 〜 900719925474099   | `1` 〜 `Number.MAX_SAFE_INTEGER/10` |
| *exponent*         | -9007199254740975 〜 9007199254740975 |`Number.MIN_SAFE_INTEGER` - `String(Number.MIN_SAFE_INTEGER).length` 〜 `Number.MAX_SAFE_INTEGER` - `String(Number.MAX_SAFE_INTEGER).length` |

If each element is out of its safe range, the value of `ArithNumber` object is inaccurate. But it does not mean that the `ArithNumber` object is infinity, because `9007199254740992e+0` is less than `9007199254740991e+1`. So `ArithNumber` prototype does not provide any methods for infinity like `.isFinite`.

For the `ArithNumber` object, it is more important that this object is accurate or not than infinity or NaN. Therefore this prototype provides the methods: `.isAccurate`.

This prototype also provide a method: `.toApproximateString`.
Since the conversion to a `string` is not always accurate, this method can take *decimalPlaces* and a *rounding* function as parameters.

**Methods:**

#### <u>.isAccurate() : boolean</u>

Checks whether the `ArithNumber` object has an accurate number value.

##### Returns:

True, if the value of the `ArithNumber` object is accurate.

**Type:** boolean

#### <u>.toApproximateString([decimalPlaces, [rounding]]) : string</u>

Gets a string of this number value.
If *numerator* can not be divided by *denominator*, the result string is approximate and the maximum decimal places is 20. (round down 21th place).

When a parameter *decimalPlaces* is specified, this function always output decimal until the specified place, and in addition a parameter *rounding* is specified, this function rounds up or down the next of the specified place.

##### Parameters:

| Paramerter     |  Type  | Description                             |
|:---------------|:------:|:----------------------------------------|
| *decimalPlaces*| number | The fixed decimal places.               |
| *rounding*     |function| The rounding function to round the next of *decimalPlaces* place. |

##### Returns:

A string of an approximate number value of this object.

**Type:** string

**Static Parameters And Methods:**

#### <u>.MAX&#95;SAFE&#95;NUMERATOR</u>

Is the maximum safe integer of an absolute numerator of an ArithNumber object.

This specific value is `9007199254740991` and this equals to `Number.MAX_SAFE_INTEGER` (= 2^53 - 1).

#### <u>.MAX&#95;SAFE&#95;DENOMINATOR</u>

Is the maximum safe integer of an absolute denominator of an ArithNumber object.

This specific value is `900719925474099` and this equals to (`Number.MAX_SAFE_INTEGER` - 1) / 10.

#### <u>.MAX&#95;SAFE&#95;EXPONENT</u>

Is the maximum safe integer of an absolute numerator of an ArithNumber object.

This specific value is `9007199254740975` and this equals to `Number.MAX_SAFE_INTEGER` - `String(Number.MAX_SAFE_INTEGER).length`.
####

#### <u>.isSafeNumerator(value) : boolean</u>

Checks whether the *value* is within the range between `-ArithNumber.MAX_SAFE_NUMERATOR` and `ArithNumber.MAX_SAFE_NUMERATOR`

##### Parameter:

| Paramerter |  Type  | Description                             |
|:-----------|:------:|:----------------------------------------|
| *value*    | number | An integer value to be checked.         |

##### Returns:

True, if the *value* is within the safe range of numerator.

**Type:** boolean

#### <u>.isSafeDenominator(value) : boolean</u>

Checks whether the *value* is within the range between 1 and `ArithNumber.MAX_SAFE_DENOMINATOR`

##### Parameter:

| Paramerter |  Type  | Description                             |
|:-----------|:------:|:----------------------------------------|
| *value*    | number | An integer value to be checked.         |

##### Returns:

True, if the *value* is within the safe range of denominator.

#### <u>.isSafeExponent(value) : boolean</u>

Checks whether the *value* is within the range between `-ArithNumber.MAX_SAFE_EXPONENT` and `ArithNumber.MAX_SAFE_EXPONENT`

##### Parameter:

| Paramerter |  Type  | Description                             |
|:-----------|:------:|:----------------------------------------|
| *value*    | number | An integer value to be checked.         |

##### Returns:

True, if the *value* is within the safe range of denominator.


## Checked                                                                      

### Node.js (4〜)

| Platform  |   4    |   5    |   6    |   7    |   8    |   9    |   10   |
|:---------:|:------:|:------:|:------:|:------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|

### io.js (1〜3)

| Platform  |   1    |   2    |   3    |
|:---------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|

### Node.js (〜0.12)

| Platform  |  0.8   |  0.9   |  0.10  |  0.11  |  0.12  |
|:---------:|:------:|:------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|

### Web browsers

| Platform  | Chrome | Firefox | Vivaldi | Safari |  Edge  | IE11   |
|:---------:|:------:|:-------:|:-------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef; |&#x25ef; |&#x25ef;|   --   |   --   |
| Windows10 |&#x25ef;|&#x25ef; |&#x25ef; |   --   |&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef; |&#x25ef; |   --   |   --   |   --   |


## License

Copyright (C) 2018 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[repo-url]: https://github.com/sttk/fav-arith.number/
[npm-img]: https://img.shields.io/badge/npm-v0.1.1-blue.svg
[npm-url]: https://www.npmjs.com/package/@fav/arith.number
[mit-img]: https://img.shields.io/badge/license-MIT-green.svg
[mit-url]: https://opensource.org/licenses/MIT
[travis-img]: https://travis-ci.org/sttk/fav-arith.number.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/fav-arith.number
[appveyor-img]: https://ci.appveyor.com/api/projects/status/github/sttk/fav-arith.number?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/sttk/fav-arith-number
[coverage-img]: https://coveralls.io/repos/github/sttk/fav-arith.number/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/sttk/fav-arith.number?branch=master
