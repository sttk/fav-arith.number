'use strict';

var padLeft = require('@fav/text.pad-left');
var exponentialToString = require('./exp-to-string');

function fractionToString(numerator, denominator, exponent, decimalPlaces,
    rounding) {

  var places;
  if (decimalPlaces == null) {
    places = 20;
  } else if (rounding) {
    places = decimalPlaces + 1; // +1 is for rounding
  } else {
    places = decimalPlaces;
  }

  var intString = '';
  do {
    var addedPlace = 0;
    while (numerator < denominator) {
      // Need not care safe range because
      // MAX_SAFE_NUMERATOR > MAX_SAFE_DENOMINATOR * 10
      numerator *= 10;
      addedPlace++;
      continue;
    }

    var remainder = numerator % denominator;
    var quotient = String((numerator - remainder) / denominator);
    if (!intString) {
      intString = quotient;
    } else {
      intString += padLeft(quotient, addedPlace, '0');
    }
    exponent -= addedPlace;
    numerator = remainder;
  } while (numerator && ((-exponent) < places));

  if (decimalPlaces == null & exponent < -20) {
    intString = intString.slice(0, exponent + 20);
    exponent = -20;
  }

  return exponentialToString(intString, exponent, decimalPlaces, rounding);
}

module.exports = fractionToString;
