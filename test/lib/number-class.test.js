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

  it.skip('Does not care when arguments are not integers');

});
