'use strict';

/*eslint max-len: ["error", { "ignoreRegExpLiterals": true }]*/

var ArithNumber = require('./number-class');
var trimRight = require('@fav/text.trim-right');

function fromString(valueString) {
  var result = /^([-+]?)(?:0*([1-9][0-9]*)?)?(?:\.([0-9]*[1-9])?0*)?(?:[eE]([-+])0*([1-9][0-9]*))?$/.exec(valueString);
  if (!result) {
    return new ArithNumber(NaN, NaN, NaN);
  }

  var sign = result[1];
  var numerator = result[2];
  var decimal = result[3];
  var expSign = result[4];
  var exponent = result[5];

  if (exponent) {
    exponent = parseInt(exponent, 10);
    if (expSign === '-') {
      exponent = -exponent;
    }
  } else {
    exponent = 0;
  }

  if (!numerator) {
    if (!decimal) {
      if (/^[-+]?(0+|\.0+)/.test(valueString)) {
        return new ArithNumber(0, 1, 0);
      } else {
        return new ArithNumber(NaN, NaN, NaN);
      }
    }
    numerator = decimal;
    exponent -= decimal.length;
  } else if (!decimal) {
    var trimmed = trimRight(numerator, '0');
    exponent += numerator.length - trimmed.length;
    numerator = trimmed;
  } else {
    numerator += decimal;
    exponent -= decimal.length;
  }
  numerator = parseInt(numerator, 10);
  if (sign === '-') {
    numerator = -numerator;
  }

  var denominator = 1;
  if (exponent < -ArithNumber.MAX_SAFE_EXPONENT) {
    var diff1 = -ArithNumber.MAX_SAFE_EXPONENT - exponent;
    exponent = exponent + diff1;
    denominator = Math.pow(10, diff1);
  } else if (exponent > ArithNumber.MAX_SAFE_EXPONENT) {
    var diff2 = exponent - ArithNumber.MAX_SAFE_EXPONENT;
    exponent = exponent - diff2;
    numerator *= Math.pow(10, diff2);
  }

  return new ArithNumber(numerator, denominator, exponent);
}

module.exports = fromString;
