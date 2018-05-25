'use strict';

var chai = require('chai');
var expect = chai.expect;

var toString = require('../../lib/exp-to-string');

describe('lib/exp-to-string', function() {

  describe('convert to string without rounding', function() {
    it('Should convert when exponent is positive', function() {
      expect(toString('1234', 1)).to.equal('12340');
      expect(toString('1234', 2)).to.equal('123400');

      expect(toString('1', 1)).to.equal('10');
      expect(toString('1', 4)).to.equal('10000');
    });

    it('Should convert when exponent is negative', function() {
      expect(toString('1234', -1)).to.equal('123.4');
      expect(toString('1234', -2)).to.equal('12.34');
      expect(toString('1234', -3)).to.equal('1.234');
      expect(toString('1234', -4)).to.equal('0.1234');
      expect(toString('1234', -5)).to.equal('0.01234');

      expect(toString('1', -1)).to.equal('0.1');
      expect(toString('1', -2)).to.equal('0.01');
      expect(toString('1', -3)).to.equal('0.001');
      expect(toString('1', -4)).to.equal('0.0001');

      expect(toString('123000', -1)).to.equal('12300');
      expect(toString('123000', -2)).to.equal('1230');
      expect(toString('123000', -3)).to.equal('123');
      expect(toString('123000', -4)).to.equal('12.3');
    });

    it('Should convert when exponent is zero', function() {
      expect(toString('1234', 0)).to.equal('1234');
      expect(toString('1', 0)).to.equal('1');
    });

    it.skip('Does not support when numerator is zero');

    it('Should convert when decimalPlaces is specified', function() {
      expect(toString('1', 0, 2)).to.equal('1.00');
      expect(toString('1234', 0, 2)).to.equal('1234.00');

      expect(toString('1', 1, 2)).to.equal('10.00');
      expect(toString('1234', 1, 2)).to.equal('12340.00');

      expect(toString('1', -1, 2)).to.equal('0.10');
      expect(toString('1234', -1, 2)).to.equal('123.40');

      expect(toString('1', -2, 2)).to.equal('0.01');
      expect(toString('1234', -2, 2)).to.equal('12.34');

      expect(toString('1', -3, 2)).to.equal('0.00');
      expect(toString('1234', -3, 2)).to.equal('1.23');

      expect(toString('1', -4, 2)).to.equal('0.00');
      expect(toString('1234', -4, 2)).to.equal('0.12');

      expect(toString('1', -6, 2)).to.equal('0.00');
      expect(toString('1234', -6, 2)).to.equal('0.00');

      expect(toString('1', -2, 0)).to.equal('0');
      expect(toString('1234', -2, 0)).to.equal('12');
      expect(toString('1234', -3, 0)).to.equal('1');
      expect(toString('1234', -4, 0)).to.equal('0');
    });
  });

  describe('convert to string with Math.floor', function() {
    it('Should convert when decimalPlaces is specified', function() {
      expect(toString('1', 0, 2, Math.floor)).to.equal('1.00');
      expect(toString('4', 0, 2, Math.floor)).to.equal('4.00');
      expect(toString('5', 0, 2, Math.floor)).to.equal('5.00');
      expect(toString('9', 0, 2, Math.floor)).to.equal('9.00');
      expect(toString('1234', 0, 2, Math.floor)).to.equal('1234.00');
      expect(toString('5678', 0, 2, Math.floor)).to.equal('5678.00');
      expect(toString('9999', 0, 2, Math.floor)).to.equal('9999.00');

      expect(toString('1', 1, 2, Math.floor)).to.equal('10.00');
      expect(toString('4', 1, 2, Math.floor)).to.equal('40.00');
      expect(toString('5', 1, 2, Math.floor)).to.equal('50.00');
      expect(toString('9', 1, 2, Math.floor)).to.equal('90.00');
      expect(toString('1234', 1, 2, Math.floor)).to.equal('12340.00');
      expect(toString('5678', 1, 2, Math.floor)).to.equal('56780.00');
      expect(toString('9999', 1, 2, Math.floor)).to.equal('99990.00');

      expect(toString('1', -1, 2, Math.floor)).to.equal('0.10');
      expect(toString('4', -1, 2, Math.floor)).to.equal('0.40');
      expect(toString('5', -1, 2, Math.floor)).to.equal('0.50');
      expect(toString('9', -1, 2, Math.floor)).to.equal('0.90');
      expect(toString('1234', -1, 2, Math.floor)).to.equal('123.40');
      expect(toString('5678', -1, 2, Math.floor)).to.equal('567.80');
      expect(toString('9999', -1, 2, Math.floor)).to.equal('999.90');

      expect(toString('1', -2, 2, Math.floor)).to.equal('0.01');
      expect(toString('4', -2, 2, Math.floor)).to.equal('0.04');
      expect(toString('5', -2, 2, Math.floor)).to.equal('0.05');
      expect(toString('9', -2, 2, Math.floor)).to.equal('0.09');
      expect(toString('1234', -2, 2, Math.floor)).to.equal('12.34');
      expect(toString('5678', -2, 2, Math.floor)).to.equal('56.78');
      expect(toString('9999', -2, 2, Math.floor)).to.equal('99.99');

      expect(toString('1', -3, 2, Math.floor)).to.equal('0.00');
      expect(toString('4', -3, 2, Math.floor)).to.equal('0.00');
      expect(toString('5', -3, 2, Math.floor)).to.equal('0.00');
      expect(toString('9', -3, 2, Math.floor)).to.equal('0.00');
      expect(toString('1234', -3, 2, Math.floor)).to.equal('1.23');
      expect(toString('5678', -3, 2, Math.floor)).to.equal('5.67');
      expect(toString('9999', -3, 2, Math.floor)).to.equal('9.99');

      expect(toString('1', -4, 2, Math.floor)).to.equal('0.00');
      expect(toString('4', -4, 2, Math.floor)).to.equal('0.00');
      expect(toString('5', -4, 2, Math.floor)).to.equal('0.00');
      expect(toString('9', -4, 2, Math.floor)).to.equal('0.00');
      expect(toString('1234', -4, 2, Math.floor)).to.equal('0.12');
      expect(toString('5678', -4, 2, Math.floor)).to.equal('0.56');
      expect(toString('9999', -4, 2, Math.floor)).to.equal('0.99');

      expect(toString('1', -6, 2, Math.floor)).to.equal('0.00');
      expect(toString('4', -6, 2, Math.floor)).to.equal('0.00');
      expect(toString('5', -6, 2, Math.floor)).to.equal('0.00');
      expect(toString('9', -6, 2, Math.floor)).to.equal('0.00');
      expect(toString('1234', -6, 2, Math.floor)).to.equal('0.00');
      expect(toString('5678', -6, 2, Math.floor)).to.equal('0.00');
      expect(toString('9999', -6, 2, Math.floor)).to.equal('0.00');

      expect(toString('1234', -7, 2, Math.floor)).to.equal('0.00');
      expect(toString('5678', -7, 2, Math.floor)).to.equal('0.00');
      expect(toString('9999', -7, 2, Math.floor)).to.equal('0.00');
    });
  });

  describe('convert to string with Math.ceil', function() {
    it('Should convert when decimalPlaces is specified', function() {
      expect(toString('1', 0, 2, Math.ceil)).to.equal('1.00');
      expect(toString('4', 0, 2, Math.ceil)).to.equal('4.00');
      expect(toString('5', 0, 2, Math.ceil)).to.equal('5.00');
      expect(toString('9', 0, 2, Math.ceil)).to.equal('9.00');
      expect(toString('1234', 0, 2, Math.ceil)).to.equal('1234.00');
      expect(toString('5678', 0, 2, Math.ceil)).to.equal('5678.00');
      expect(toString('9999', 0, 2, Math.ceil)).to.equal('9999.00');

      expect(toString('1', 1, 2, Math.ceil)).to.equal('10.00');
      expect(toString('4', 1, 2, Math.ceil)).to.equal('40.00');
      expect(toString('5', 1, 2, Math.ceil)).to.equal('50.00');
      expect(toString('9', 1, 2, Math.ceil)).to.equal('90.00');
      expect(toString('1234', 1, 2, Math.ceil)).to.equal('12340.00');
      expect(toString('5678', 1, 2, Math.ceil)).to.equal('56780.00');
      expect(toString('9999', 1, 2, Math.ceil)).to.equal('99990.00');

      expect(toString('1', -1, 2, Math.ceil)).to.equal('0.10');
      expect(toString('4', -1, 2, Math.ceil)).to.equal('0.40');
      expect(toString('5', -1, 2, Math.ceil)).to.equal('0.50');
      expect(toString('9', -1, 2, Math.ceil)).to.equal('0.90');
      expect(toString('1234', -1, 2, Math.ceil)).to.equal('123.40');
      expect(toString('5678', -1, 2, Math.ceil)).to.equal('567.80');
      expect(toString('9999', -1, 2, Math.ceil)).to.equal('999.90');

      expect(toString('1', -2, 2, Math.ceil)).to.equal('0.01');
      expect(toString('4', -2, 2, Math.ceil)).to.equal('0.04');
      expect(toString('5', -2, 2, Math.ceil)).to.equal('0.05');
      expect(toString('9', -2, 2, Math.ceil)).to.equal('0.09');
      expect(toString('1234', -2, 2, Math.ceil)).to.equal('12.34');
      expect(toString('5678', -2, 2, Math.ceil)).to.equal('56.78');
      expect(toString('9999', -2, 2, Math.ceil)).to.equal('99.99');

      expect(toString('1', -3, 2, Math.ceil)).to.equal('0.01');
      expect(toString('4', -3, 2, Math.ceil)).to.equal('0.01');
      expect(toString('5', -3, 2, Math.ceil)).to.equal('0.01');
      expect(toString('9', -3, 2, Math.ceil)).to.equal('0.01');
      expect(toString('1234', -3, 2, Math.ceil)).to.equal('1.24');
      expect(toString('5678', -3, 2, Math.ceil)).to.equal('5.68');
      expect(toString('9999', -3, 2, Math.ceil)).to.equal('10.00');

      expect(toString('1', -4, 2, Math.ceil)).to.equal('0.00');
      expect(toString('4', -4, 2, Math.ceil)).to.equal('0.00');
      expect(toString('5', -4, 2, Math.ceil)).to.equal('0.00');
      expect(toString('9', -4, 2, Math.ceil)).to.equal('0.00');
      expect(toString('1234', -4, 2, Math.ceil)).to.equal('0.13');
      expect(toString('5678', -4, 2, Math.ceil)).to.equal('0.57');
      expect(toString('9999', -4, 2, Math.ceil)).to.equal('1.00');

      expect(toString('1', -6, 2, Math.ceil)).to.equal('0.00');
      expect(toString('4', -6, 2, Math.ceil)).to.equal('0.00');
      expect(toString('5', -6, 2, Math.ceil)).to.equal('0.00');
      expect(toString('9', -6, 2, Math.ceil)).to.equal('0.00');
      expect(toString('1234', -6, 2, Math.ceil)).to.equal('0.01');
      expect(toString('5678', -6, 2, Math.ceil)).to.equal('0.01');
      expect(toString('9999', -6, 2, Math.ceil)).to.equal('0.01');

      expect(toString('1234', -7, 2, Math.ceil)).to.equal('0.00');
      expect(toString('5678', -7, 2, Math.ceil)).to.equal('0.00');
      expect(toString('9999', -7, 2, Math.ceil)).to.equal('0.00');
    });
  });

  describe('convert to string with Math.round', function() {
    it('Should convert when decimalPlaces is specified', function() {
      expect(toString('1', 0, 2, Math.round)).to.equal('1.00');
      expect(toString('4', 0, 2, Math.round)).to.equal('4.00');
      expect(toString('5', 0, 2, Math.round)).to.equal('5.00');
      expect(toString('9', 0, 2, Math.round)).to.equal('9.00');
      expect(toString('1234', 0, 2, Math.round)).to.equal('1234.00');
      expect(toString('5678', 0, 2, Math.round)).to.equal('5678.00');
      expect(toString('9999', 0, 2, Math.round)).to.equal('9999.00');

      expect(toString('1', 1, 2, Math.round)).to.equal('10.00');
      expect(toString('4', 1, 2, Math.round)).to.equal('40.00');
      expect(toString('5', 1, 2, Math.round)).to.equal('50.00');
      expect(toString('9', 1, 2, Math.round)).to.equal('90.00');
      expect(toString('1234', 1, 2, Math.round)).to.equal('12340.00');
      expect(toString('5678', 1, 2, Math.round)).to.equal('56780.00');
      expect(toString('9999', 1, 2, Math.round)).to.equal('99990.00');

      expect(toString('1', -1, 2, Math.round)).to.equal('0.10');
      expect(toString('4', -1, 2, Math.round)).to.equal('0.40');
      expect(toString('5', -1, 2, Math.round)).to.equal('0.50');
      expect(toString('9', -1, 2, Math.round)).to.equal('0.90');
      expect(toString('1234', -1, 2, Math.round)).to.equal('123.40');
      expect(toString('5678', -1, 2, Math.round)).to.equal('567.80');
      expect(toString('9999', -1, 2, Math.round)).to.equal('999.90');

      expect(toString('1', -2, 2, Math.round)).to.equal('0.01');
      expect(toString('4', -2, 2, Math.round)).to.equal('0.04');
      expect(toString('5', -2, 2, Math.round)).to.equal('0.05');
      expect(toString('9', -2, 2, Math.round)).to.equal('0.09');
      expect(toString('1234', -2, 2, Math.round)).to.equal('12.34');
      expect(toString('5678', -2, 2, Math.round)).to.equal('56.78');
      expect(toString('9999', -2, 2, Math.round)).to.equal('99.99');

      expect(toString('1', -3, 2, Math.round)).to.equal('0.00');
      expect(toString('4', -3, 2, Math.round)).to.equal('0.00');
      expect(toString('5', -3, 2, Math.round)).to.equal('0.01');
      expect(toString('9', -3, 2, Math.round)).to.equal('0.01');
      expect(toString('1234', -3, 2, Math.round)).to.equal('1.23');
      expect(toString('5678', -3, 2, Math.round)).to.equal('5.68');
      expect(toString('9999', -3, 2, Math.round)).to.equal('10.00');

      expect(toString('1', -4, 2, Math.round)).to.equal('0.00');
      expect(toString('4', -4, 2, Math.round)).to.equal('0.00');
      expect(toString('5', -4, 2, Math.round)).to.equal('0.00');
      expect(toString('9', -4, 2, Math.round)).to.equal('0.00');
      expect(toString('1234', -4, 2, Math.round)).to.equal('0.12');
      expect(toString('5678', -4, 2, Math.round)).to.equal('0.57');
      expect(toString('9999', -4, 2, Math.round)).to.equal('1.00');

      expect(toString('1', -6, 2, Math.round)).to.equal('0.00');
      expect(toString('4', -6, 2, Math.round)).to.equal('0.00');
      expect(toString('5', -6, 2, Math.round)).to.equal('0.00');
      expect(toString('9', -6, 2, Math.round)).to.equal('0.00');
      expect(toString('1234', -6, 2, Math.round)).to.equal('0.00');
      expect(toString('5678', -6, 2, Math.round)).to.equal('0.01');
      expect(toString('9999', -6, 2, Math.round)).to.equal('0.01');

      expect(toString('1234', -7, 2, Math.round)).to.equal('0.00');
      expect(toString('5678', -7, 2, Math.round)).to.equal('0.00');
      expect(toString('9999', -7, 2, Math.round)).to.equal('0.00');
    });
  });
});
