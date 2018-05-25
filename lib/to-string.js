'use strict';

var repeat = require('@fav/text.repeat');
var exponentialToString = require('./exp-to-string');
var fractionToString = require('./frac-to-string');

function toString(arithNum, decimalPlaces, rounding) {
  if (arithNum.numerator === 0) {
    return zeroToString(decimalPlaces);
  }

  var sign, numerator;
  if (arithNum.numerator > 0) {
    sign = '';
    numerator = arithNum.numerator;
  } else {
    sign = '-';
    numerator = -arithNum.numerator;
  }

  if (arithNum.denominator <= 1) {
    return sign + exponentialToString(String(numerator), arithNum.exponent,
      decimalPlaces, rounding);
  }

  return sign + fractionToString(numerator, arithNum.denominator,
    arithNum.exponent, decimalPlaces, rounding);
}

function zeroToString(decimalPlaces) {
  if (decimalPlaces > 0) {
    return '0.' + repeat('0', decimalPlaces);
  }
  return '0';
}

module.exports = toString;
