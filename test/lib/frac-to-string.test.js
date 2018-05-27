'use strict';

var chai = require('chai');
var expect = chai.expect;

var toString = require('../../lib/frac-to-string');
var ArithNumber = require('../../lib/number-class');

describe('lib/frac-to-string', function() {

  it.skip('Does not support when numerator is 0');
  it.skip('Does not support when denominator is 1');

  describe('convert to a string with no decimalPlaces', function() {
    it('Should convert when numerator can be divided by denominator',
    function() {
      expect(toString(2, 2, 1)).to.equal('10');
      expect(toString(4, 2, 0)).to.equal('2');
      expect(toString(123, 3, -1)).to.equal('4.1');
      expect(toString(567, 9, -3)).to.equal('0.063');

      var n = ArithNumber.MAX_SAFE_DENOMINATOR;
      expect(toString(n * 10, n, 0)).to.equal('10');
    });

    it('Should convert when numerator * 10^n can be divided by denominator',
    function() {
      expect(toString(2, 5, 0)).to.equal('0.4');
      expect(toString(2, 500, 2)).to.equal('0.4');
      expect(toString(1, 25, -1)).to.equal('0.004');
    });

    it('Should convert when numerator cannot be divided by denominator',
    function() {
      expect(toString(1, 3, 0)).to.equal('0.33333333333333333333');
      expect(toString(123, 7, 0)).to.equal('17.57142857142857142857');
    });

    it('Should convert when numerator is equal to denominator', function() {
      expect(toString(3, 3, 0)).to.equal('1');
      expect(toString(123, 123, 0)).to.equal('1');

      var n = ArithNumber.MAX_SAFE_DENOMINATOR;
      expect(toString(n, n, 2)).to.equal('100');
    });

    it('Should convert when numerator is less than denominator', function() {
      expect(toString(12, 345, 0)).to.equal('0.03478260869565217391');
      expect(toString(12, 345, 1)).to.equal('0.34782608695652173913');
      expect(toString(12, 345, 2)).to.equal('3.4782608695652173913');
    });
  });

  describe('convert to a string with decimalPlaces', function() {
    it('Should convert when numerator can be divided by denominator',
    function() {
      expect(toString(2, 2, 1, 2)).to.equal('10.00');
      expect(toString(4, 2, 0, 3)).to.equal('2.000');
      expect(toString(123, 3, -1, 4)).to.equal('4.1000');

      expect(toString(567, 9, -3, 1)).to.equal('0.0');
      expect(toString(567, 9, -3, 2)).to.equal('0.06');
      expect(toString(567, 9, -3, 3)).to.equal('0.063');
      expect(toString(567, 9, -3, 4)).to.equal('0.0630');
      expect(toString(567, 9, -3, 5)).to.equal('0.06300');

      var n = ArithNumber.MAX_SAFE_DENOMINATOR;
      expect(toString(n * 10, n, 0, 1)).to.equal('10.0');
    });

    it('Should convert when numerator * 10^n can be divided by denominator',
    function() {
      expect(toString(2, 5, 0, 3)).to.equal('0.400');
      expect(toString(2, 500, 2, 2)).to.equal('0.40');

      expect(toString(1, 25, -1, 1)).to.equal('0.0');
      expect(toString(1, 25, -1, 2)).to.equal('0.00');
      expect(toString(1, 25, -1, 3)).to.equal('0.004');
    });

    it('Should convert when numerator cannot be divided by denominator',
    function() {
      expect(toString(1, 3, 0, 5)).to.equal('0.33333');
      expect(toString(123, 7, 0, 5)).to.equal('17.57142');
    });

    it('Should convert when numerator is equal to denominator', function() {
      expect(toString(3, 3, 0, 3)).to.equal('1.000');
      expect(toString(123, 123, 0, 0)).to.equal('1');

      var n = ArithNumber.MAX_SAFE_DENOMINATOR;
      expect(toString(n, n, 2, 0)).to.equal('100');
    });

    it('Should convert when numerator is less than denominator', function() {
      expect(toString(12, 345, 0, 5)).to.equal('0.03478');
      expect(toString(12, 345, 1, 5)).to.equal('0.34782');
      expect(toString(12, 345, 2, 5)).to.equal('3.47826');
    });
  });

  describe('convert to a string with rounding: Math.floor', function() {
    it('Should convert when numerator can be divided by denominator',
    function() {
      expect(toString(2, 2, 1, 2, Math.floor)).to.equal('10.00');
      expect(toString(4, 2, 0, 3, Math.floor)).to.equal('2.000');
      expect(toString(123, 3, -1, 4, Math.floor)).to.equal('4.1000');

      expect(toString(567, 9, -3, 1, Math.floor)).to.equal('0.0');
      expect(toString(567, 9, -3, 2, Math.floor)).to.equal('0.06');
      expect(toString(567, 9, -3, 3, Math.floor)).to.equal('0.063');
      expect(toString(567, 9, -3, 4, Math.floor)).to.equal('0.0630');
      expect(toString(567, 9, -3, 5, Math.floor)).to.equal('0.06300');

      var n = ArithNumber.MAX_SAFE_DENOMINATOR;
      expect(toString(n * 10, n, 0, 1, Math.floor)).to.equal('10.0');
    });

    it('Should convert when numerator * 10^n can be divided by denominator',
    function() {
      expect(toString(2, 5, 0, 3, Math.floor)).to.equal('0.400');
      expect(toString(2, 500, 2, 2, Math.floor)).to.equal('0.40');

      expect(toString(1, 25, -1, 1, Math.floor)).to.equal('0.0');
      expect(toString(1, 25, -1, 2, Math.floor)).to.equal('0.00');
      expect(toString(1, 25, -1, 3, Math.floor)).to.equal('0.004');
    });

    it('Should convert when numerator cannot be divided by denominator',
    function() {
      expect(toString(1, 3, 0, 5, Math.floor)).to.equal('0.33333');
      expect(toString(123, 7, 0, 5, Math.floor)).to.equal('17.57142');
    });

    it('Should convert when numerator is equal to denominator', function() {
      expect(toString(3, 3, 0, 3, Math.floor)).to.equal('1.000');
      expect(toString(123, 123, 0, 0, Math.floor)).to.equal('1');

      var n = ArithNumber.MAX_SAFE_DENOMINATOR;
      expect(toString(n, n, 2, 0, Math.floor)).to.equal('100');
    });

    it('Should convert when numerator is less than denominator', function() {
      expect(toString(12, 345, 0, 5, Math.floor)).to.equal('0.03478');
      expect(toString(12, 345, 1, 5, Math.floor)).to.equal('0.34782');
      expect(toString(12, 345, 2, 5, Math.floor)).to.equal('3.47826');
    });
  });

  describe('convert to a string with rounding: Math.ceil', function() {
    it('Should convert when numerator can be divided by denominator',
    function() {
      expect(toString(2, 2, 1, 2, Math.ceil)).to.equal('10.00');
      expect(toString(4, 2, 0, 3, Math.ceil)).to.equal('2.000');
      expect(toString(123, 3, -1, 4, Math.ceil)).to.equal('4.1000');

      expect(toString(567, 9, -3, 1, Math.ceil)).to.equal('0.1');
      expect(toString(567, 9, -3, 2, Math.ceil)).to.equal('0.07');
      expect(toString(567, 9, -3, 3, Math.ceil)).to.equal('0.063');
      expect(toString(567, 9, -3, 4, Math.ceil)).to.equal('0.0630');
      expect(toString(567, 9, -3, 5, Math.ceil)).to.equal('0.06300');

      var n = ArithNumber.MAX_SAFE_DENOMINATOR;
      expect(toString(n * 10, n, 0, 1, Math.ceil)).to.equal('10.0');
    });

    it('Should convert when numerator * 10^n can be divided by denominator',
    function() {
      expect(toString(2, 5, 0, 3, Math.ceil)).to.equal('0.400');
      expect(toString(2, 500, 2, 2, Math.ceil)).to.equal('0.40');

      expect(toString(1, 25, -1, 1, Math.ceil)).to.equal('0.0');
      expect(toString(1, 25, -1, 2, Math.ceil)).to.equal('0.01');
      expect(toString(1, 25, -1, 3, Math.ceil)).to.equal('0.004');
    });

    it('Should convert when numerator cannot be divided by denominator',
    function() {
      expect(toString(1, 3, 0, 5, Math.ceil)).to.equal('0.33334');
      expect(toString(123, 7, 0, 5, Math.ceil)).to.equal('17.57143');
    });

    it('Should convert when numerator is equal to denominator', function() {
      expect(toString(3, 3, 0, 3, Math.ceil)).to.equal('1.000');
      expect(toString(123, 123, 0, 0, Math.ceil)).to.equal('1');

      var n = ArithNumber.MAX_SAFE_DENOMINATOR;
      expect(toString(n, n, 2, 0, Math.ceil)).to.equal('100');
    });

    it('Should convert when numerator is less than denominator', function() {
      expect(toString(12, 345, 0, 5, Math.ceil)).to.equal('0.03479');
      expect(toString(12, 345, 1, 5, Math.ceil)).to.equal('0.34783');
      expect(toString(12, 345, 2, 5, Math.ceil)).to.equal('3.47827');
    });
  });

  describe('convert to a string with rounding: Math.round', function() {
    it('Should convert when numerator can be divided by denominator',
    function() {
      expect(toString(2, 2, 1, 2, Math.round)).to.equal('10.00');
      expect(toString(4, 2, 0, 3, Math.round)).to.equal('2.000');
      expect(toString(123, 3, -1, 4, Math.round)).to.equal('4.1000');

      expect(toString(567, 9, -3, 1, Math.round)).to.equal('0.1');
      expect(toString(567, 9, -3, 2, Math.round)).to.equal('0.06');
      expect(toString(567, 9, -3, 3, Math.round)).to.equal('0.063');
      expect(toString(567, 9, -3, 4, Math.round)).to.equal('0.0630');
      expect(toString(567, 9, -3, 5, Math.round)).to.equal('0.06300');

      var n = ArithNumber.MAX_SAFE_DENOMINATOR;
      expect(toString(n * 10, n, 0, 1, Math.round)).to.equal('10.0');
    });

    it('Should convert when numerator * 10^n can be divided by denominator',
    function() {
      expect(toString(2, 5, 0, 3, Math.round)).to.equal('0.400');
      expect(toString(2, 500, 2, 2, Math.round)).to.equal('0.40');

      expect(toString(1, 25, -1, 1, Math.round)).to.equal('0.0');
      expect(toString(1, 25, -1, 2, Math.round)).to.equal('0.00');
      expect(toString(1, 25, -1, 3, Math.round)).to.equal('0.004');
    });

    it('Should convert when numerator cannot be divided by denominator',
    function() {
      expect(toString(1, 3, 0, 5, Math.round)).to.equal('0.33333');
      expect(toString(123, 7, 0, 5, Math.round)).to.equal('17.57143');
      expect(toString(123, 7, 0, 4, Math.round)).to.equal('17.5714');
    });

    it('Should convert when numerator is equal to denominator', function() {
      expect(toString(3, 3, 0, 3, Math.round)).to.equal('1.000');
      expect(toString(123, 123, 0, 0, Math.round)).to.equal('1');

      var n = ArithNumber.MAX_SAFE_DENOMINATOR;
      expect(toString(n, n, 2, 0, Math.round)).to.equal('100');
    });

    it('Should convert when numerator is less than denominator', function() {
      expect(toString(12, 345, 0, 5, Math.round)).to.equal('0.03478');
      expect(toString(12, 345, 1, 5, Math.round)).to.equal('0.34783');
      expect(toString(12, 345, 2, 5, Math.round)).to.equal('3.47826');
    });
  });
});
