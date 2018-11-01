'use strict';

var ArithNumber = require('./number-class');
var exponentialToString = require('./exp-to-string');
var padLeft = require('@fav/text.pad-left');

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
    var ratio = ArithNumber.MAX_SAFE_NUMERATOR / numerator;
    if (ratio > 10) {
      addedPlace = Math.max(Math.floor(Math.log10(ratio)), 1);
      numerator *= Math.pow(10, addedPlace);
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
