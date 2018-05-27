'use strict';

var isString = require('@fav/type.is-string');
var isFiniteNumber = require('@fav/type.is-finite-number');

var ArithNumber = require('./lib/number-class');
var fromString = require('./lib/from-string');
var toString = require('./lib/to-string');

ArithNumber.prototype.toApproximateString = function(decimalPlace, rounding) {
  return toString(this, decimalPlace, rounding);
};

function arithNumber(value) {
  if (value instanceof ArithNumber) {
    return new ArithNumber(value.numerator, value.denominator, value.exponent);
  }

  if (isFiniteNumber(value)) {
    return fromString(String(value));
  }

  if (isString(value)) {
    return fromString(value);
  }

  return new ArithNumber(NaN, NaN, NaN);
}

arithNumber.ArithNumber = ArithNumber;

module.exports = arithNumber;
