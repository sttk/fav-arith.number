'use strict';

var chai = require('chai');
var expect = chai.expect;

var ArithNumber = require('../../lib/number-class');

describe('lib/number-class', function() {

  it('Should create an immutable ArithNumber instance with accurate value',
  function() {
    var arithNum = new ArithNumber(123, 45, 6);
    expect(arithNum.numerator).to.equal(123);
    expect(arithNum.denominator).to.equal(45);
    expect(arithNum.exponent).to.equal(6);
    expect(arithNum.isAccurate()).to.equal(true);

    expect(function() { arithNum.numerator = 1; }).to.throw(TypeError);
    expect(arithNum.numerator).to.equal(123);

    expect(function() { arithNum.denominator = 1; }).to.throw(TypeError);
    expect(arithNum.denominator).to.equal(45);

    expect(function() { arithNum.exponent = 1; }).to.throw(TypeError);
    expect(arithNum.exponent).to.equal(6);
  });

  it('Should create an immutable ArithNumber instance with inaccurate value',
  function() {
    var arithNum = new ArithNumber(9007199254740992, 1, 1);
    expect(arithNum.numerator).to.be.NaN;
    expect(arithNum.denominator).to.be.NaN;
    expect(arithNum.exponent).to.be.NaN;
    expect(arithNum.isAccurate()).to.equal(false);

    arithNum = new ArithNumber(123, 900719925474100, 2);
    expect(arithNum.numerator).to.be.NaN;
    expect(arithNum.denominator).to.be.NaN;
    expect(arithNum.exponent).to.be.NaN;
    expect(arithNum.isAccurate()).to.equal(false);

    arithNum = new ArithNumber(123, 1, 9007199254740976);
    expect(arithNum.numerator).to.be.NaN;
    expect(arithNum.denominator).to.be.NaN;
    expect(arithNum.exponent).to.be.NaN;
    expect(arithNum.isAccurate()).to.equal(false);

    arithNum = new ArithNumber(-9007199254740992, 1, 1);
    expect(arithNum.numerator).to.be.NaN;
    expect(arithNum.denominator).to.be.NaN;
    expect(arithNum.exponent).to.be.NaN;
    expect(arithNum.isAccurate()).to.equal(false);

    arithNum = new ArithNumber(123, -900719925474100, 2);
    expect(arithNum.numerator).to.be.NaN;
    expect(arithNum.denominator).to.be.NaN;
    expect(arithNum.exponent).to.be.NaN;
    expect(arithNum.isAccurate()).to.equal(false);

    arithNum = new ArithNumber(123, 1, -9007199254740976);
    expect(arithNum.numerator).to.be.NaN;
    expect(arithNum.denominator).to.be.NaN;
    expect(arithNum.exponent).to.be.NaN;
    expect(arithNum.isAccurate()).to.equal(false);

    arithNum = new ArithNumber(123, 0, 2);
    expect(arithNum.numerator).to.be.NaN;
    expect(arithNum.denominator).to.be.NaN;
    expect(arithNum.exponent).to.be.NaN;
    expect(arithNum.isAccurate()).to.equal(false);
  });

  it('Should always denominator == 1 and exponent == 0 when numerator == 0',
  function() {
    var a;
    a = new ArithNumber(0, 1, 100);
    expect(a.numerator).to.equal(0);
    expect(a.denominator).to.equal(1);
    expect(a.exponent).to.equal(0);

    a = new ArithNumber(0, 1000, 0);
    expect(a.numerator).to.equal(0);
    expect(a.denominator).to.equal(1);
    expect(a.exponent).to.equal(0);

    a = new ArithNumber(0, 100, 10);
    expect(a.numerator).to.equal(0);
    expect(a.denominator).to.equal(1);
    expect(a.exponent).to.equal(0);
  });

  it.skip('Does not care when arguments are not integers');

  it('.MAX_SAFE_NUMERATOR', function() {
    expect(ArithNumber.MAX_SAFE_NUMERATOR).to.equal(9007199254740991);
  });

  it('.MAX_SAFE_DENOMINATOR', function() {
    expect(ArithNumber.MAX_SAFE_DENOMINATOR).to.equal(900719925474099);
  });

  it('.MAX_SAFE_EXPONENT', function() {
    expect(ArithNumber.MAX_SAFE_EXPONENT).to.equal(9007199254740975);
  });

  it('.isSafeNumerator', function() {
    expect(ArithNumber.isSafeNumerator(0)).to.equal(true);

    expect(ArithNumber.isSafeNumerator(9007199254740991)).to.equal(true);
    expect(ArithNumber.isSafeNumerator(-9007199254740991)).to.equal(true);

    expect(ArithNumber.isSafeNumerator(9007199254740992)).to.equal(false);
    expect(ArithNumber.isSafeNumerator(-9007199254740992)).to.equal(false);
  });

  it('.isSafeDenominator', function() {
    expect(ArithNumber.isSafeDenominator(0)).to.equal(false);

    expect(ArithNumber.isSafeDenominator(900719925474099)).to.equal(true);
    expect(ArithNumber.isSafeDenominator(1)).to.equal(true);

    expect(ArithNumber.isSafeDenominator(900719925474100)).to.equal(false);
    expect(ArithNumber.isSafeDenominator(0)).to.equal(false);
    expect(ArithNumber.isSafeDenominator(-1)).to.equal(false);
  });

  it('.isSafeExponent', function() {
    expect(ArithNumber.isSafeExponent(0)).to.equal(true);

    expect(ArithNumber.isSafeExponent(9007199254740975)).to.equal(true);
    expect(ArithNumber.isSafeExponent(-9007199254740975)).to.equal(true);

    expect(ArithNumber.isSafeExponent(9007199254740976)).to.equal(false);
    expect(ArithNumber.isSafeExponent(-9007199254740976)).to.equal(false);
  });
});
