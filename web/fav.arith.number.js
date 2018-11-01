(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.fav||(g.fav = {}));g=(g.arith||(g.arith = {}));g.number = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./lib/from-string":4,"./lib/number-class":5,"./lib/to-string":7,"@fav/type.is-integer":12,"@fav/type.is-string":13}],2:[function(require,module,exports){
'use strict';

var repeat = require('@fav/text.repeat');
var padLeft = require('@fav/text.pad-left');

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

  var zeroTrimmed = intString.replace(/0+$/, '');
  if (intString.length > zeroTrimmed.length) {
    var zeroCount = (intString.length - zeroTrimmed.length);

    // 123000e-2 => 1230
    if (zeroCount >= (-exponent)) {
      intString = intString.slice(0, exponent);
      if (decimalPlaces > 0) {
        intString += '.' + repeat('0', decimalPlaces);
      }
      return intString;
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

},{"./round":6,"@fav/text.pad-left":8,"@fav/text.repeat":10}],3:[function(require,module,exports){
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

},{"./exp-to-string":2,"./number-class":5,"@fav/text.pad-left":8}],4:[function(require,module,exports){
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

},{"./number-class":5}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

var isFunction = require('@fav/type.is-function');

function round(numberStr, roundPlace, roundFn) {
  if (!isFunction(roundFn) || roundFn === Math.floor) {
    return numberStr.slice(0, roundPlace) || '0';;
  }

  var roundedNum = numberStr[roundPlace];
  if (roundedNum && roundFn(Number('0.' + roundedNum + '1')) < 1) {
    return numberStr.slice(0, roundPlace) || '0';
  }

  var numArr = numberStr.slice(0, roundPlace).split('');
  numArr.unshift('0');

  for (var n = numArr.length, i = n - 1; i >= 0; i--) {
    if (numArr[i] === '9') {
      numArr[i] = '0';
    } else {
      numArr[i] = String(Number(numArr[i]) + 1);
      break;
    }
  }

  var startIndex;
  if (numArr.length === 1) {
    startIndex = 0;
  } else if (numArr[0] === '0') {
    startIndex = 1;
  } else {
    startIndex = 0;
  }
  return numArr.slice(startIndex, numArr.length).join('');
}

module.exports = round;

},{"@fav/type.is-function":11}],7:[function(require,module,exports){
'use strict';

var repeat = require('@fav/text.repeat');
var exponentialToString = require('./exp-to-string');
var fractionToString = require('./frac-to-string');

function toString(arithNum, decimalPlaces, rounding) {
  if (!arithNum.isAccurate()) {
    return String(arithNum.numerator);
  }

  if (arithNum.numerator === 0) {
    return zeroToString(decimalPlaces);
  }

  var sign, numerator;
  if (arithNum.numerator > 0) {
    sign = '';
    numerator = arithNum.numerator;
  } else {
    sign = '-';
    numerator = -arithNum.numerator;
  }

  if (arithNum.denominator <= 1) {
    return sign + exponentialToString(String(numerator), arithNum.exponent,
      decimalPlaces, rounding);
  }

  return sign + fractionToString(numerator, arithNum.denominator,
    arithNum.exponent, decimalPlaces, rounding);
}

function zeroToString(decimalPlaces) {
  if (decimalPlaces > 0) {
    return '0.' + repeat('0', decimalPlaces);
  }
  return '0';
}

module.exports = toString;

},{"./exp-to-string":2,"./frac-to-string":3,"@fav/text.repeat":10}],8:[function(require,module,exports){
'use strict';

var padLeft;

/* istanbul ignore if */
if (!Boolean(String.prototype.padStart)) {
  padLeft = require('./lib/pad-left');
} else {
  padLeft = function(source, length, padding) {
    return source.padStart(length, padding || ' ');
  };
}

module.exports = padLeft;

},{"./lib/pad-left":9}],9:[function(require,module,exports){
'use strict';

var repeat = require('@fav/text.repeat');

function padLeft(source, length, padding) {
  if (!length || length <= source.length) {
    return source;
  }

  if (!padding) {
    padding = ' ';
  }

  var padsLen = length - source.length;
  var padsNum = Math.ceil(padsLen / padding.length);
  var pads = repeat(padding, padsNum).slice(0, padsLen);

  return pads + source;
}

module.exports = padLeft;

},{"@fav/text.repeat":10}],10:[function(require,module,exports){
'use strict';

function repeat(source, ntimes) {
  if (ntimes < 1) {
    return '';
  }

  var unitlen = source.length;
  var halftime = Math.ceil(ntimes / 2);

  var i;
  for (i = 1; i < halftime; i += i) {
    source += source;
  }

  return source + source.slice(0, (ntimes - i) * unitlen);;
}

module.exports = repeat;

},{}],11:[function(require,module,exports){
'use strict';

function isFunction(value) {
  return (typeof value === 'function');
}

function isNotFunction(value) {
  return (typeof value !== 'function');
}

Object.defineProperty(isFunction, 'not', {
  enumerable: true,
  value: isNotFunction,
});

module.exports = isFunction;

},{}],12:[function(require,module,exports){
'use strict';

function isInteger(value) {
  if (typeof value === 'number') {
    return checkInteger(value);
  }
  if (Object.prototype.toString.call(value) === '[object Number]') {
    return checkInteger(Number(value));
  }
  return false;
}

function checkInteger(num) {
  /* istanbul ignore if */
  if (typeof Number.isInteger !== 'function') {
    if (!isFinite(num)) {
      return false;
    }
    return (num < 0 ? Math.ceil(num) : Math.floor(num)) === num;
  }
  return Number.isInteger(num);
}

function isNotInteger(value) {
  return !isInteger(value);
}

Object.defineProperty(isInteger, 'not', {
  enumerable: true,
  value: isNotInteger,
});

module.exports = isInteger;

},{}],13:[function(require,module,exports){
'use strict';

function isString(value) {
  if (typeof value === 'string') {
    return true;
  }
  if (Object.prototype.toString.call(value) === '[object String]') {
    return true;
  }
  return false;
}

function isNotString(value) {
  return !isString(value);
}

Object.defineProperty(isString, 'not', {
  enumerable: true,
  value: isNotString,
});

module.exports = isString;

},{}]},{},[1])(1)
});
