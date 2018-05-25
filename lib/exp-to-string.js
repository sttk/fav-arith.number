'use strict';

var repeat = require('@fav/text.repeat');
var padLeft = require('@fav/text.pad-left');
var trimRight = require('@fav/text.trim-right');

var round = require('./round');

function exponentialToString(intString, exponent, decimalPlaces, rounding) {
  // 123e+2 => 12300
  if (exponent >= 0) {
    intString += repeat('0', exponent);
    if (decimalPlaces > 0) {
      intString += '.' + repeat('0', decimalPlaces);
    }
    return intString;
  }

  var zeroTrimmed = trimRight(intString, '0');
  if (intString.length > zeroTrimmed.length) {
    var zeroCount = (intString.length - zeroTrimmed.length);

    // 123000e-2 => 1230
    if (zeroCount >= (-exponent)) {
      return intString.slice(0, exponent);
    }

    // 12300e-4 => 123e-2
    intString = zeroTrimmed;
    exponent += zeroCount; // < 0
  }

  if (!(decimalPlaces >= 0)) {
    // 123e-2 => 1.23
    if (-exponent < intString.length) {
      return intString.slice(0, exponent) + '.' + intString.slice(exponent);
    }

    // 123e-4 => 0.0123
    return '0.' + padLeft(intString, -exponent, '0');
  }

  // Need not round because rounding place is zero
  // 123e-2 (decimalPlaces=3) => '1.230'
  if (decimalPlaces >= (-exponent)) {
    // 123e-2 (decimalPlaces=3) => 1230e-3
    intString += repeat('0', decimalPlaces + exponent);
    exponent = -decimalPlaces;

    // 1230e-3 => 1.230
    if (-exponent < intString.length) {
      return intString.slice(0, exponent) + '.' + intString.slice(exponent);
    }

    // 1230e-4 => 0.1230
    return '0.' + padLeft(intString, -exponent, '0');
  }

  var roundIndex;
  if (intString.length <= (-exponent)) {
    var zeroPadding = (-exponent) - intString.length;

    // 12e-6 (decimalPlaces=3) => (0.)000012 (decimalPlaces=3) => 0.000
    if (zeroPadding > decimalPlaces) {
      if (decimalPlaces > 0) {
        return '0.' + repeat('0', decimalPlaces);
      }
      return '0';
    }

    intString = padLeft(intString, -exponent, '0');
    roundIndex = decimalPlaces;

    // for '0.'
    intString = '0' + intString;
    roundIndex++;

  } else {
    // 1234e-2 (decimalPlaces=1 : 12.3[4]) => 123[4]e-2
    roundIndex = intString.length - (-exponent) + decimalPlaces;
  }

  intString = round(intString, roundIndex, rounding);
  if (decimalPlaces === 0) {
    return intString;
  }
  exponent = -decimalPlaces;
  return intString.slice(0, exponent) + '.' + intString.slice(exponent);
}

module.exports = exponentialToString;
