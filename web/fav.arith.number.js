(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.fav||(g.fav = {}));g=(g.arith||(g.arith = {}));g.number = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var isString = require('@fav/type.is-string');
var isFiniteNumber = require('@fav/type.is-finite-number');

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

  if (isFiniteNumber(value)) {
    return fromString(String(value));
  }

  if (isString(value)) {
    return fromString(value);
  }

  return new ArithNumber(NaN, NaN, NaN);
};

module.exports = ArithNumber;

},{"./lib/from-string":4,"./lib/number-class":5,"./lib/to-string":7,"@fav/type.is-finite-number":19,"@fav/type.is-string":21}],2:[function(require,module,exports){
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

},{"./round":6,"@fav/text.pad-left":15,"@fav/text.repeat":17,"@fav/text.trim-right":18}],3:[function(require,module,exports){
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

},{"./exp-to-string":2,"@fav/text.pad-left":15}],4:[function(require,module,exports){
'use strict';

/*eslint max-len: ["error", { "ignoreRegExpLiterals": true }]*/

var ArithNumber = require('./number-class');
var trimRight = require('@fav/text.trim-right');

function fromString(valueString) {
  var result = /^([-+]?)(?:0*([1-9][0-9]*)?)?(?:\.([0-9]*[1-9])?0*)?(?:[eE]([-+])0*([1-9][0-9]*))?$/.exec(valueString);
  if (!result) {
    return new ArithNumber(NaN, NaN, NaN);
  }

  var sign = result[1];
  var numerator = result[2];
  var decimal = result[3];
  var expSign = result[4];
  var exponent = result[5];

  if (exponent) {
    exponent = parseInt(exponent, 10);
    if (expSign === '-') {
      exponent = -exponent;
    }
  } else {
    exponent = 0;
  }

  if (!numerator) {
    if (!decimal) {
      if (/^[-+]?(0+|\.0+)/.test(valueString)) {
        return new ArithNumber(0, 1, 0);
      } else {
        return new ArithNumber(NaN, NaN, NaN);
      }
    }
    numerator = decimal;
    exponent -= decimal.length;
  } else if (!decimal) {
    var trimmed = trimRight(numerator, '0');
    exponent += numerator.length - trimmed.length;
    numerator = trimmed;
  } else {
    numerator += decimal;
    exponent -= decimal.length;
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

},{"./number-class":5,"@fav/text.trim-right":18}],5:[function(require,module,exports){
'use strict';

function ArithNumber(numerator, denominator, exponent) {
  if (!ArithNumber.isSafeNumerator(numerator) ||
      !ArithNumber.isSafeDenominator(denominator) ||
      !ArithNumber.isSafeExponent(exponent)) {
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

},{"@fav/type.is-function":20}],7:[function(require,module,exports){
'use strict';

var repeat = require('@fav/text.repeat');
var exponentialToString = require('./exp-to-string');
var fractionToString = require('./frac-to-string');

function toString(arithNum, decimalPlaces, rounding) {
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

},{"./exp-to-string":2,"./frac-to-string":3,"@fav/text.repeat":17}],8:[function(require,module,exports){
'use strict';

var regexp = require('./lib/regexp');
var regexpCharClass = require('./lib/regexp-charclass');
var htmlEntity = require('./lib/html-entity');
var htmlAttribute = require('./lib/html-attribute');
var byPreposition = require('./lib/create/by-preposition');
var byReplacement = require('./lib/create/by-replacement');

var escape = {};

Object.defineProperties(escape, {
  RegExp: { enumerable: true, value: regexp },
  RegExpCharClass: { enumerable: true, value: regexpCharClass },
  HtmlEntity: { enumerable: true, value: htmlEntity },
  HtmlAttribute: { enumerable: true, value: htmlAttribute },
  byPreposition: { enumerable: true, value: byPreposition },
  byReplacement: { enumerable: true, value: byReplacement },
});

module.exports = escape;

},{"./lib/create/by-preposition":9,"./lib/create/by-replacement":10,"./lib/html-attribute":11,"./lib/html-entity":12,"./lib/regexp":14,"./lib/regexp-charclass":13}],9:[function(require,module,exports){
'use strict';

var escapeRegexpCharClass = require('../regexp-charclass');

function createEscapingByPreposition(escapingChar, escapedChars) {
  var regexpCharClass = escapingChar + (escapedChars || '');
  regexpCharClass = escapeRegexpCharClass(regexpCharClass);

  var regexp = new RegExp('([' + regexpCharClass + '])', 'g');
  var replaced = escapingChar + '$&';

  return function(source) {
    return source.replace(regexp, replaced);
  };
}

module.exports = createEscapingByPreposition;

},{"../regexp-charclass":13}],10:[function(require,module,exports){
'use strict';

var escapeRegexpCharClass = require('../regexp-charclass');

function createEscapingByReplacement(escapingMap) {
  var regexpCharClass = Object.keys(escapingMap).join('');
  regexpCharClass = escapeRegexpCharClass(regexpCharClass);

  var regexp = new RegExp('[' + regexpCharClass + ']', 'g');

  function replaced(c) {
    return escapingMap[c];
  }

  return function(source) {
    return source.replace(regexp, replaced);
  };
}

module.exports = createEscapingByReplacement;

},{"../regexp-charclass":13}],11:[function(require,module,exports){
'use strict';

var create = require('./create/by-replacement');

module.exports = create({
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
  '\'': '&apos;',
});

},{"./create/by-replacement":10}],12:[function(require,module,exports){
'use strict';

var create = require('./create/by-replacement');

module.exports = create({
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  ' ': '&nbsp;',
  '\n': '<br/>',
});

},{"./create/by-replacement":10}],13:[function(require,module,exports){
'use strict';

function regexpCharClass(source) {
  return source.replace(/([\-\^\]\\])/g, '\\$&');
}

module.exports = regexpCharClass;

},{}],14:[function(require,module,exports){
'use strict';

function regexp(source) {
  return source.replace(/([\\^$.*+?()[\]{}|])/g, '\\$&');
}

module.exports = regexp;

},{}],15:[function(require,module,exports){
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

},{"./lib/pad-left":16}],16:[function(require,module,exports){
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

},{"@fav/text.repeat":17}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
'use strict';

var escape = require('@fav/text.escape').RegExpCharClass;

function trimRight(source, chars) {
  if (chars == null) {
    return source.replace(/\s+$/g, '');
  }

  chars = escape(chars);

  var trailingRe = new RegExp('[' + chars + ']+$');

  return source.replace(trailingRe, '');
}

module.exports = trimRight;

},{"@fav/text.escape":8}],19:[function(require,module,exports){
'use strict';

function isFiniteNumber(value) {
  if (typeof value === 'number') {
    return isFinite(value);
  }
  if (Object.prototype.toString.call(value) === '[object Number]') {
    return isFinite(value);
  }
  return false;
}

function isNotFiniteNumber(value) {
  return !isFiniteNumber(value);
}

Object.defineProperty(isFiniteNumber, 'not', {
  enumerable: true,
  value: isNotFiniteNumber,
});

module.exports = isFiniteNumber;

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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
