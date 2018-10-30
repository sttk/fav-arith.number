'use strict';

var isString = require('@fav/type.is-string');
var isInteger = require('@fav/type.is-integer');
var ArithNumber = require('./lib/number-class');
var fromString = require('./lib/from-string');
var toString = require('./lib/to-string');

ArithNumber.prototype.toApproximateString = function(decimalPlace, rounding) {
  return toString(this, decimalPlace, rounding);
};

ArithNumber.of = function(value) {
  if (value instanceof ArithNumber) {
    return new ArithNumber(value.numerator, value.denominator, value.exponent);
  }

  if (isInteger(value)) {
    return new ArithNumber(value, 1, 0);
  }

  if (isString(value)) {
    return fromString(value);
  }

  return fromString(String(value));
};

module.exports = ArithNumber;
