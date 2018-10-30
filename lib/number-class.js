'use strict';

function ArithNumber(numerator, denominator, exponent) {
  if (!ArithNumber.isSafeNumerator(numerator) ||
      !ArithNumber.isSafeDenominator(denominator) ||
      !ArithNumber.isSafeExponent(exponent)) {
    numerator = denominator = exponent = NaN;
  }

  if (numerator === 0) {
    denominator = 1;
    exponent = 0;
  }

  this.numerator = numerator;
  this.denominator = denominator;
  this.exponent = exponent;

  return this;
}

ArithNumber.prototype.isAccurate = function() {
  return !isNaN(this.numerator);
};

Object.defineProperties(ArithNumber, {

  MAX_SAFE_NUMERATOR: {
    enumerable: true,
    value: 9007199254740991, // = MAX_SAFE_INTEGER
  },

  MAX_SAFE_DENOMINATOR: {
    enumerable: true,
    value: 900719925474099,  // = MAX_SAFE_INTEGER / 10
  },

  MAX_SAFE_EXPONENT: {
    enumerable: true,
    value: 9007199254740975, // = MAX_SAFE_INTEGER - 17
  },

  isSafeNumerator: {
    enumerable: true,
    value: function(i) {
      return (i >= -ArithNumber.MAX_SAFE_NUMERATOR) &&
             (i <=  ArithNumber.MAX_SAFE_NUMERATOR);
    },
  },

  isSafeDenominator: {
    enumerable: true,
    value: function(i) {
      return (i > 0) &&
             (i <= ArithNumber.MAX_SAFE_DENOMINATOR);
    },
  },

  isSafeExponent: {
    enumerable: true,
    value: function(i) {
      return (i >= -ArithNumber.MAX_SAFE_EXPONENT) &&
             (i <=  ArithNumber.MAX_SAFE_EXPONENT);
    },
  },
});

module.exports = ArithNumber;
