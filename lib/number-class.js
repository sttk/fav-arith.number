'use strict';

var accuracy = require('./accuracy');

function ArithNumber(numerator, denominator, exponent) {
  if (!accuracy.isSafeNumerator(numerator) ||
      !accuracy.isSafeDenominator(denominator) ||
      !accuracy.isSafeExponent(exponent)) {
    numerator = denominator = exponent = NaN;
  }

  Object.defineProperties(this, {
    numerator:   { enumerable: true, value: numerator   },
    denominator: { enumerable: true, value: denominator },
    exponent:    { enumerable: true, value: exponent    },
  });

  return this;
}

ArithNumber.prototype.isAccurate = function() {
  return !isNaN(this.numerator);
};


module.exports = ArithNumber;
