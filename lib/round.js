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
