'use strict';

var chai = require('chai');
var expect = chai.expect;

var ArithNumber = require('../../lib/number-class');
var fromString = require('../../lib/from-string');

describe('lib/from-string', function() {

  describe('zero', function() {
    it('Should convert to an accurate number (1)', function() {
      var anum = fromString('0');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (2)', function() {
      var anum = fromString('+0');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (3)', function() {
      var anum = fromString('-0');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (4)', function() {
      var anum = fromString('00000000000000000000000000000000000000000');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (5)', function() {
      var anum = fromString('00000000000000000000000000000000000000000.');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (6)', function() {
      var anum = fromString('00000000000000000000000000000000000000000.0');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (7)', function() {
      var anum = fromString('.00000000000000000000000000000000000000000');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (8)', function() {
      var anum = fromString('0.00000000000000000000000000000000000000000');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (9)', function() {
      var anum = fromString('00000000000000000000.0000000000000000000000');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (10)', function() {
      var anum = fromString('+00000000000000000000.0000000000000000000000');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (11)', function() {
      var anum = fromString('-00000000000000000000.0000000000000000000000');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (12)', function() {
      var anum = fromString(
        '+00000000000000000000.0000000000000000000000e+100');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (13)', function() {
      var anum = fromString(
        '-00000000000000000000.0000000000000000000000e-100');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (14)', function() {
      var anum = fromString(
        '00000000000000000000.0000000000000000000000e+9007199254740975');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (15)', function() {
      var anum = fromString(
        '-00000000000000000000.0000000000000000000000e-9007199254740975');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (16)', function() {
      var anum = fromString('-.0');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (17)', function() {
      var anum = fromString('-0e-1');
      expect(anum).to.deep.equal(new ArithNumber(0, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });
  });

  describe('positive integer', function() {
    it('Should convert to an accurate number (1)', function() {
      var anum = fromString('1');
      expect(anum).to.deep.equal(new ArithNumber(1, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (2)', function() {
      var anum = fromString('123456789');
      expect(anum).to.deep.equal(new ArithNumber(123456789, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (3)', function() {
      var anum = fromString('00000123');
      expect(anum).to.deep.equal(new ArithNumber(123, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (4)', function() {
      var anum = fromString('1230000');
      expect(anum).to.deep.equal(new ArithNumber(123, 1, 4));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (5)', function() {
      var anum = fromString('9007199254740991');
      expect(anum).to.deep.equal(new ArithNumber(9007199254740991, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (6)', function() {
      var anum = fromString('9007199254740991e+9007199254740975');
      expect(anum).to.deep.equal(
        new ArithNumber(9007199254740991, 1, 9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (10)', function() {
      var anum = fromString('9007199254741000');
      expect(anum).to.deep.equal(new ArithNumber(9007199254741, 1, 3));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (11)', function() {
      var anum = fromString('9007190000000000e+9007199254740965');
      expect(anum).to.deep.equal(
        new ArithNumber(900719, 1, 9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (12)', function() {
      var anum = fromString('9007190000000000e-9007199254740985');
      expect(anum).to.deep.equal(
        new ArithNumber(900719, 1, -9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (13)', function() {
      var anum = fromString('1e+9007199254740975');
      expect(anum).to.deep.equal(new ArithNumber(1, 1, 9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (14)', function() {
      var anum = fromString('1e+9007199254740976');
      expect(anum).to.deep.equal(new ArithNumber(10, 1, 9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (15)', function() {
      var anum = fromString('1e+9007199254740990');
      expect(anum).to.deep.equal(
        new ArithNumber(1000000000000000, 1, 9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an inaccurate number (1)', function() {
      var anum = fromString('1e+9007199254740991');
      expect(anum.isAccurate()).to.equal(false);
    });

    it('Should convert to an inaccurate number (2)', function() {
      var anum = fromString('9007199254740991');
      expect(anum).to.deep.equal(new ArithNumber(9007199254740991, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
      anum = fromString('9007199254740992');
      expect(anum.isAccurate()).to.equal(false);
    });

    it('Should convert to an inaccurate number (3)', function() {
      var anum = fromString('-90071992.54740991');
      expect(anum).to.deep.equal(new ArithNumber(-9007199254740991, 1, -8));
      expect(anum.isAccurate()).to.equal(true);
      anum = fromString('-90071992.54740992');
      expect(anum.isAccurate()).to.equal(false);
    });
  });

  describe('negative integer', function() {
    it('Should convert to an accurate number (1)', function() {
      var anum = fromString('-1');
      expect(anum).to.deep.equal(new ArithNumber(-1, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (2)', function() {
      var anum = fromString('-123456789');
      expect(anum).to.deep.equal(new ArithNumber(-123456789, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (3)', function() {
      var anum = fromString('-00000123');
      expect(anum).to.deep.equal(new ArithNumber(-123, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (4)', function() {
      var anum = fromString('-1230000');
      expect(anum).to.deep.equal(new ArithNumber(-123, 1, 4));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (8)', function() {
      var anum = fromString('-9007199254740991');
      expect(anum).to.deep.equal(new ArithNumber(-9007199254740991, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (9)', function() {
      var anum = fromString('-9007199254740991e-9007199254740975');
      expect(anum).to.deep.equal(
        new ArithNumber(-9007199254740991, 1, -9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (10)', function() {
      var anum = fromString('-9007199254741000');
      expect(anum).to.deep.equal(new ArithNumber(-9007199254741, 1, 3));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (11)', function() {
      var anum = fromString('-9007190000000000e+9007199254740965');
      expect(anum).to.deep.equal(
        new ArithNumber(-900719, 1, 9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (12)', function() {
      var anum = fromString('-9007199254741000e-9007199254740978');
      expect(anum).to.deep.equal(
        new ArithNumber(-9007199254741, 1, -9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (13)', function() {
      var anum = fromString('-1e+9007199254740975');
      expect(anum).to.deep.equal(new ArithNumber(-1, 1, 9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (14)', function() {
      var anum = fromString('-1e+9007199254740976');
      expect(anum).to.deep.equal(new ArithNumber(-10, 1, 9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (15)', function() {
      var anum = fromString('-1e+9007199254740990');
      expect(anum).to.deep.equal(
        new ArithNumber(-1000000000000000, 1, 9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an inaccurate number (1)', function() {
      var anum = fromString('-1e+9007199254740991');
      expect(anum.isAccurate()).to.equal(false);
    });

    it('Should convert to an inaccurate number (2)', function() {
      var anum = fromString('-9007199254740991');
      expect(anum).to.deep.equal(new ArithNumber(-9007199254740991, 1, 0));
      expect(anum.isAccurate()).to.equal(true);
      anum = fromString('-9007199254740992');
      expect(anum.isAccurate()).to.equal(false);
    });

    it('Should convert to an inaccurate number (3)', function() {
      var anum = fromString('-90071992.54740991');
      expect(anum).to.deep.equal(new ArithNumber(-9007199254740991, 1, -8));
      expect(anum.isAccurate()).to.equal(true);
      anum = fromString('-90071992.54740992');
      expect(anum.isAccurate()).to.equal(false);
    });
  });

  describe('positive decimal', function() {
    it('Should convert to an accurate number (1)', function() {
      var anum = fromString('0.1');
      expect(anum).to.deep.equal(new ArithNumber(1, 1, -1));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (2)', function() {
      var anum = fromString('.1');
      expect(anum).to.deep.equal(new ArithNumber(1, 1, -1));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (3)', function() {
      var anum = fromString('.000000001');
      expect(anum).to.deep.equal(new ArithNumber(1, 1, -9));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (4)', function() {
      var anum = fromString('0.123456789');
      expect(anum).to.deep.equal(new ArithNumber(123456789, 1, -9));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (5)', function() {
      var anum = fromString('1230000.');
      expect(anum).to.deep.equal(new ArithNumber(123, 1, 4));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (6)', function() {
      var anum = fromString('1230000.0000000');
      expect(anum).to.deep.equal(new ArithNumber(123, 1, 4));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (7)', function() {
      var anum = fromString('1230000.0000000e+0005');
      expect(anum).to.deep.equal(new ArithNumber(123, 1, 9));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (8)', function() {
      var anum = fromString('90071992.54740991');
      expect(anum).to.deep.equal(new ArithNumber(9007199254740991, 1, -8));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (9)', function() {
      var anum = fromString('.9007199254740991');
      expect(anum).to.deep.equal(new ArithNumber(9007199254740991, 1, -16));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (10)', function() {
      var anum = fromString('.9007199254740991e-9007199254740959');
      expect(anum).to.deep.equal(
        new ArithNumber(9007199254740991, 1, -9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (11)', function() {
      var anum = fromString('9.007199254740991e-9007199254740974');
      expect(anum).to.deep.equal(new ArithNumber(9007199254740991,
        100000000000000, -9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (12)', function() {
      var anum = fromString('12300.00456');
      expect(anum).to.deep.equal(new ArithNumber(1230000456, 1, -5));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (13)', function() {
      var anum = fromString('+00012300.00456000');
      expect(anum).to.deep.equal(new ArithNumber(1230000456, 1, -5));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an inaccurate number (1)', function() {
      var anum = fromString('90071992.54740992');
      expect(anum.isAccurate()).to.equal(false);
    });

    it('Should convert to an inaccurate number (2)', function() {
      var anum = fromString('.9007199254740992');
      expect(anum.isAccurate()).to.equal(false);
    });

    it('Should convert to an inaccurate number (3)', function() {
      var anum = fromString('.9007199254740991e-9007199254740975');
      expect(anum.isAccurate()).to.equal(false);
    });

    it('Should convert to an inaccurate number (4)', function() {
      var anum = fromString('.9007199254740991');
      expect(anum).to.deep.equal(new ArithNumber(9007199254740991, 1, -16));
      expect(anum.isAccurate()).to.equal(true);
      anum = fromString('.9007199254740992');
      expect(anum.isAccurate()).to.equal(false);
    });
  });

  describe('negative decimal', function() {
    it('Should convert to an accurate number (1)', function() {
      var anum = fromString('-0.1');
      expect(anum).to.deep.equal(new ArithNumber(-1, 1, -1));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (2)', function() {
      var anum = fromString('-.1');
      expect(anum).to.deep.equal(new ArithNumber(-1, 1, -1));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (3)', function() {
      var anum = fromString('-.000000001');
      expect(anum).to.deep.equal(new ArithNumber(-1, 1, -9));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (4)', function() {
      var anum = fromString('-0.123456789');
      expect(anum).to.deep.equal(new ArithNumber(-123456789, 1, -9));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (5)', function() {
      var anum = fromString('-1230000.');
      expect(anum).to.deep.equal(new ArithNumber(-123, 1, 4));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (6)', function() {
      var anum = fromString('-1230000.0000000');
      expect(anum).to.deep.equal(new ArithNumber(-123, 1, 4));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (7)', function() {
      var anum = fromString('-1230000.0000000e+0005');
      expect(anum).to.deep.equal(new ArithNumber(-123, 1, 9));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (8)', function() {
      var anum = fromString('-90071992.54740991');
      expect(anum).to.deep.equal(new ArithNumber(-9007199254740991, 1, -8));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (9)', function() {
      var anum = fromString('-.9007199254740991');
      expect(anum).to.deep.equal(new ArithNumber(-9007199254740991, 1, -16));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (10)', function() {
      var anum = fromString('-.9007199254740991e-9007199254740959');
      expect(anum).to.deep.equal(
        new ArithNumber(-9007199254740991, 1, -9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (11)', function() {
      var anum = fromString('-9.007199254740991e-9007199254740974');
      expect(anum).to.deep.equal(new ArithNumber(-9007199254740991,
        100000000000000, -9007199254740975));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (12)', function() {
      var anum = fromString('-98700.00654');
      expect(anum).to.deep.equal(new ArithNumber(-9870000654, 1, -5));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an accurate number (13)', function() {
      var anum = fromString('-0000098700.0065400000');
      expect(anum).to.deep.equal(new ArithNumber(-9870000654, 1, -5));
      expect(anum.isAccurate()).to.equal(true);
    });

    it('Should convert to an inaccurate number (1)', function() {
      var anum = fromString('-90071992.54740992');
      expect(anum.isAccurate()).to.equal(false);
    });

    it('Should convert to an inaccurate number (2)', function() {
      var anum = fromString('-.9007199254740992');
      expect(anum.isAccurate()).to.equal(false);
    });

    it('Should convert to an inaccurate number (3)', function() {
      var anum = fromString('-.9007199254740991e-9007199254740975');
      expect(anum.isAccurate()).to.equal(false);
    });

    it('Should convert to an inaccurate number (4)', function() {
      var anum = fromString('-.9007199254740991');
      expect(anum).to.deep.equal(new ArithNumber(-9007199254740991, 1, -16));
      expect(anum.isAccurate()).to.equal(true);
      anum = fromString('-.9007199254740992');
      expect(anum.isAccurate()).to.equal(false);
    });
  });

  describe('not a number ', function() {
    it('Should convert to an inaccurate number (1)', function() {
      var anum = fromString('ABC');
      expect(anum.isAccurate()).to.equal(false);

      anum = fromString('');
      expect(anum.isAccurate()).to.equal(false);

      anum = fromString('-');
      expect(anum.isAccurate()).to.equal(false);

      anum = fromString('.');
      expect(anum.isAccurate()).to.equal(false);

      anum = fromString('-.');
      expect(anum.isAccurate()).to.equal(false);

      anum = fromString('e-0');
      expect(anum.isAccurate()).to.equal(false);
    });
  });

});
