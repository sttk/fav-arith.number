'use strict';

var MAX_SAFE_NUMERATOR = Math.pow(2, 53) - 1;           // 9007199254740991
var MAX_SAFE_DENOMINATOR = (Math.pow(2, 53) - 2) / 10;  // 900719925474099
var MAX_SAFE_EXPONENT = Math.pow(2, 53) - 17;           // 9007199254740975

exports.MAX_SAFE_NUMERATOR   = MAX_SAFE_NUMERATOR;
exports.MAX_SAFE_DENOMINATOR = MAX_SAFE_DENOMINATOR;
exports.MAX_SAFE_EXPONENT    = MAX_SAFE_EXPONENT;

exports.isSafeNumerator = function(i) {
  return (-MAX_SAFE_NUMERATOR <= i) && (i <= MAX_SAFE_NUMERATOR);
};

exports.isSafeDenominator = function(i) {
  return (0 < i) && (i <= MAX_SAFE_DENOMINATOR);
};

exports.isSafeExponent = function(i) {
  return (-MAX_SAFE_EXPONENT <= i) && (i <= MAX_SAFE_EXPONENT);
};
