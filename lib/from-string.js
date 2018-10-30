'use strict';

/*eslint max-len: ["error", { "ignoreRegExpLiterals": true }]*/

var ArithNumber = require('./number-class');

function fromString(valueString) {
  var result = /^([-+]?)([0-9]*[1-9])?(0*)(?:\.(0*)([0-9]*[1-9])?(0*))?(?:[eE]([-+][0-9]*))?$/.exec(valueString);
  if (!result) {
    return new ArithNumber(NaN, NaN, NaN);
  }

  var sign = result[1];
  var numerator = result[2];
  var decimal = result[5];
  var exponent = result[7];

  if (exponent) {
    exponent = parseInt(exponent, 10);
  } else {
    exponent = 0;
  }

  if (numerator && decimal) {
    if (result[3]) {
      numerator += result[3];
    }
    if (result[4]) {
      numerator += result[4];
      exponent -= result[4].length;
    }
    numerator += decimal;
    exponent -= decimal.length;
  } else if (numerator) {
    if (result[3]) {
      exponent += result[3].length;
    }
  } else if (decimal) {
    numerator = decimal;
    exponent -= decimal.length;
    if (result[4]) {
      exponent -= result[4].length;
    }
  } else if (result[3] || result[4]) {
    return new ArithNumber(0, 1, 0);
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
