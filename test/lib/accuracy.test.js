'use strict';

var chai = require('chai');
var expect = chai.expect;
var accuracy = require('../../lib/accuracy');

describe('lib/accuracy', function() {

  it('.MAX_SAFE_NUMERATOR', function() {
    expect(accuracy.MAX_SAFE_NUMERATOR).to.equal(9007199254740991);
  });

  it('.MAX_SAFE_DENOMINATOR', function() {
    expect(accuracy.MAX_SAFE_DENOMINATOR).to.equal(900719925474099);
  });

  it('.MAX_SAFE_EXPONENT', function() {
    expect(accuracy.MAX_SAFE_EXPONENT).to.equal(9007199254740975);
  });

  it('.isSafeNumerator', function() {
    expect(accuracy.isSafeNumerator(0)).to.equal(true);

    expect(accuracy.isSafeNumerator(9007199254740991)).to.equal(true);
    expect(accuracy.isSafeNumerator(-9007199254740991)).to.equal(true);

    expect(accuracy.isSafeNumerator(9007199254740992)).to.equal(false);
    expect(accuracy.isSafeNumerator(-9007199254740992)).to.equal(false);
  });

  it('.isSafeDenominator', function() {
    expect(accuracy.isSafeDenominator(0)).to.equal(false);

    expect(accuracy.isSafeDenominator(900719925474099)).to.equal(true);
    expect(accuracy.isSafeDenominator(1)).to.equal(true);

    expect(accuracy.isSafeDenominator(900719925474100)).to.equal(false);
    expect(accuracy.isSafeDenominator(0)).to.equal(false);
    expect(accuracy.isSafeDenominator(-1)).to.equal(false);
  });

  it('.isSafeExponent', function() {
    expect(accuracy.isSafeExponent(0)).to.equal(true);

    expect(accuracy.isSafeExponent(9007199254740975)).to.equal(true);
    expect(accuracy.isSafeExponent(-9007199254740975)).to.equal(true);

    expect(accuracy.isSafeExponent(9007199254740976)).to.equal(false);
    expect(accuracy.isSafeExponent(-9007199254740976)).to.equal(false);
  });
});
