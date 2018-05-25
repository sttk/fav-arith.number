'use strict';

var chai = require('chai');
var expect = chai.expect;

var fav = {}; fav.arith = {}; fav.arith.number = require('..');
var arithNumber = fav.arith.number;

var MAX_INT = Number.MAX_SAFE_INTEGER || (Math.pow(2, 53) - 1);

describe('fav.arith.number', function() {

  it('Should operate zeros', function() {
    var anum;
    anum = arithNumber(0);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = arithNumber(0.0);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = arithNumber(-0);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = arithNumber(-0.0);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');
  });

  it('Should operate positive integers', function() {
    var anum;
    anum = arithNumber(1);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('1');
    expect(anum.toApproximateString(2)).to.equal('1.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('1.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('1.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('1.00');

    anum = arithNumber(1234);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('1234');
    expect(anum.toApproximateString(2)).to.equal('1234.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('1234.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('1234.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('1234.00');

    anum = arithNumber(123456789);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('123456789');
    expect(anum.toApproximateString(2)).to.equal('123456789.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('123456789.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('123456789.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('123456789.00');

    anum = arithNumber(MAX_INT);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('9007199254740991');
    expect(anum.toApproximateString(2)).to.equal('9007199254740991.00');
    expect(anum.toApproximateString(2, Math.floor)).to
      .equal('9007199254740991.00');
    expect(anum.toApproximateString(2, Math.ceil)).to
      .equal('9007199254740991.00');
    expect(anum.toApproximateString(2, Math.round)).to
      .equal('9007199254740991.00');
  });

  it('Should operate negative integers', function() {
    var anum;
    anum = arithNumber(-1);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-1');
    expect(anum.toApproximateString(2)).to.equal('-1.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-1.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-1.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-1.00');

    anum = arithNumber(-1234);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-1234');
    expect(anum.toApproximateString(2)).to.equal('-1234.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-1234.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-1234.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-1234.00');

    anum = arithNumber(-123456789);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-123456789');
    expect(anum.toApproximateString(2)).to.equal('-123456789.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-123456789.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-123456789.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-123456789.00');

    anum = arithNumber(-MAX_INT);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-9007199254740991');
    expect(anum.toApproximateString(2)).to.equal('-9007199254740991.00');
    expect(anum.toApproximateString(2, Math.floor)).to
      .equal('-9007199254740991.00');
    expect(anum.toApproximateString(2, Math.ceil)).to
      .equal('-9007199254740991.00');
    expect(anum.toApproximateString(2, Math.round)).to
      .equal('-9007199254740991.00');

    anum = arithNumber(-MAX_INT - 1);
    expect(anum.isAccurate()).to.equal(false);
  });

  it('Should operate positive decimals', function() {
    var anum;
    anum = arithNumber(0.1);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0.1');
    expect(anum.toApproximateString(2)).to.equal('0.10');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.10');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.10');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.10');

    anum = arithNumber(12.345);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('12.345');
    expect(anum.toApproximateString(2)).to.equal('12.34');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('12.34');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('12.35');
    expect(anum.toApproximateString(2, Math.round)).to.equal('12.35');
  });

  it('Should operate negative decimals', function() {
    var anum;
    anum = arithNumber(-0.1);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-0.1');
    expect(anum.toApproximateString(2)).to.equal('-0.10');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-0.10');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-0.10');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-0.10');

    anum = arithNumber(-12.345);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-12.345');
    expect(anum.toApproximateString(2)).to.equal('-12.34');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-12.34');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-12.35');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-12.35');
  });

  it('Should accept zero strings', function() {
    var anum;
    anum = arithNumber('0');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = arithNumber('0.');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = arithNumber('0.0');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = arithNumber('.0');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = arithNumber('0e-1');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = arithNumber('.0e+1');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = arithNumber('-0');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = arithNumber('-0.');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = arithNumber('-0.0');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = arithNumber('-.0');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = arithNumber('-0e-1');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = arithNumber('-.0e+1');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');
  });

  it('Should accept positive integer strings', function() {
    var anum;
    anum = arithNumber('123');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('123');
    expect(anum.toApproximateString(2)).to.equal('123.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('123.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('123.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('123.00');
  });

  it('Should accept negative integer strings', function() {
    var anum;
    anum = arithNumber('-12300');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-12300');
    expect(anum.toApproximateString(2)).to.equal('-12300.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-12300.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-12300.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-12300.00');
  });

  it('Should accept positive decimal strings', function() {
    var anum;
    anum = arithNumber('12.345');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('12.345');
    expect(anum.toApproximateString(2)).to.equal('12.34');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('12.34');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('12.35');
    expect(anum.toApproximateString(2, Math.round)).to.equal('12.35');

    expect(anum.toApproximateString(0, Math.floor)).to.equal('12');
    expect(anum.toApproximateString(0, Math.ceil)).to.equal('13');
    expect(anum.toApproximateString(0, Math.round)).to.equal('12');

    anum = arithNumber('0.12345');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0.12345');
    expect(anum.toApproximateString(4)).to.equal('0.1234');
    expect(anum.toApproximateString(4, Math.floor)).to.equal('0.1234');
    expect(anum.toApproximateString(4, Math.ceil)).to.equal('0.1235');
    expect(anum.toApproximateString(4, Math.round)).to.equal('0.1235');

    expect(anum.toApproximateString(8)).to.equal('0.12345000');

    anum = arithNumber('0.0012345');
    expect(anum.toApproximateString(5)).to.equal('0.00123');
  });

  it('Should accept negative decimal strings', function() {
    var anum;
    anum = arithNumber('-12.345');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-12.345');
    expect(anum.toApproximateString(2)).to.equal('-12.34');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-12.34');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-12.35');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-12.35');

    expect(anum.toApproximateString(0, Math.floor)).to.equal('-12');
    expect(anum.toApproximateString(0, Math.ceil)).to.equal('-13');
    expect(anum.toApproximateString(0, Math.round)).to.equal('-12');

    anum = arithNumber('-0.12345');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-0.12345');
    expect(anum.toApproximateString(4)).to.equal('-0.1234');
    expect(anum.toApproximateString(4, Math.floor)).to.equal('-0.1234');
    expect(anum.toApproximateString(4, Math.ceil)).to.equal('-0.1235');
    expect(anum.toApproximateString(4, Math.round)).to.equal('-0.1235');

    expect(anum.toApproximateString(8)).to.equal('-0.12345000');

    anum = arithNumber('-0.0012345');
    expect(anum.toApproximateString(5)).to.equal('-0.00123');
  });

  it('Should accept positive exponential strings', function() {
    var anum;
    anum = arithNumber('1e-1');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0.1');
    expect(anum.toApproximateString(2)).to.equal('0.10');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.10');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.10');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.10');
    expect(anum.toApproximateString(0)).to.equal('0');
    expect(anum.toApproximateString(0, Math.floor)).to.equal('0');
    expect(anum.toApproximateString(0, Math.ceil)).to.equal('1');
    expect(anum.toApproximateString(0, Math.round)).to.equal('0');

    anum = arithNumber('123000e-2');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('1230');
    expect(anum.toApproximateString(2)).to.equal('1230.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('1230.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('1230.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('1230.00');
    expect(anum.toApproximateString(0)).to.equal('1230');
    expect(anum.toApproximateString(0, Math.floor)).to.equal('1230');
    expect(anum.toApproximateString(0, Math.ceil)).to.equal('1230');
    expect(anum.toApproximateString(0, Math.round)).to.equal('1230');

    anum = arithNumber('1.23005e+2');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('123.005');
    expect(anum.toApproximateString(2)).to.equal('123.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('123.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('123.01');
    expect(anum.toApproximateString(2, Math.round)).to.equal('123.01');
    expect(anum.toApproximateString(0)).to.equal('123');
    expect(anum.toApproximateString(0, Math.floor)).to.equal('123');
    expect(anum.toApproximateString(0, Math.ceil)).to.equal('124');
    expect(anum.toApproximateString(0, Math.round)).to.equal('123');

    anum = arithNumber('0.0123e+1');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0.123');
    expect(anum.toApproximateString(2)).to.equal('0.12');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.12');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.13');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.12');
    expect(anum.toApproximateString(0)).to.equal('0');
    expect(anum.toApproximateString(0, Math.floor)).to.equal('0');
    expect(anum.toApproximateString(0, Math.ceil)).to.equal('1');
    expect(anum.toApproximateString(0, Math.round)).to.equal('0');
  });

  it('Should accept negative exponential strings', function() {
    var anum;
    anum = arithNumber('-1e-1');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-0.1');
    expect(anum.toApproximateString(2)).to.equal('-0.10');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-0.10');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-0.10');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-0.10');
    expect(anum.toApproximateString(0)).to.equal('-0');
    expect(anum.toApproximateString(0, Math.floor)).to.equal('-0');
    expect(anum.toApproximateString(0, Math.ceil)).to.equal('-1');
    expect(anum.toApproximateString(0, Math.round)).to.equal('-0');

    anum = arithNumber('-123000e-2');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-1230');
    expect(anum.toApproximateString(2)).to.equal('-1230.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-1230.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-1230.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-1230.00');
    expect(anum.toApproximateString(0)).to.equal('-1230');
    expect(anum.toApproximateString(0, Math.floor)).to.equal('-1230');
    expect(anum.toApproximateString(0, Math.ceil)).to.equal('-1230');
    expect(anum.toApproximateString(0, Math.round)).to.equal('-1230');

    anum = arithNumber('-1.23005e+2');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-123.005');
    expect(anum.toApproximateString(2)).to.equal('-123.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-123.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-123.01');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-123.01');
    expect(anum.toApproximateString(0)).to.equal('-123');
    expect(anum.toApproximateString(0, Math.floor)).to.equal('-123');
    expect(anum.toApproximateString(0, Math.ceil)).to.equal('-124');
    expect(anum.toApproximateString(0, Math.round)).to.equal('-123');

    anum = arithNumber('-0.0123e+1');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-0.123');
    expect(anum.toApproximateString(2)).to.equal('-0.12');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-0.12');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-0.13');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-0.12');
    expect(anum.toApproximateString(0)).to.equal('-0');
    expect(anum.toApproximateString(0, Math.floor)).to.equal('-0');
    expect(anum.toApproximateString(0, Math.ceil)).to.equal('-1');
    expect(anum.toApproximateString(0, Math.round)).to.equal('-0');
  });

  it('Should accept ArithNumber object', function() {
    var anum0 = arithNumber(12.345);
    var anum = arithNumber(anum0);;
    expect(anum).to.deep.equal(anum0);
    expect(anum.toApproximateString()).to.equal('12.345');
    expect(anum.toApproximateString()).to.equal(anum0.toApproximateString());
  });

  it('Should become inaccurate when receiving invalid number', function() {
    var anum;
    anum = arithNumber(Infinity);
    expect(anum.isAccurate()).to.equal(false);

    anum = arithNumber(-Infinity);
    expect(anum.isAccurate()).to.equal(false);

    anum = arithNumber(-NaN);
    expect(anum.isAccurate()).to.equal(false);

    anum = arithNumber(MAX_INT + 1);
    expect(anum.isAccurate()).to.equal(false);

    anum = arithNumber(-MAX_INT - 1);
    expect(anum.isAccurate()).to.equal(false);
  });

  it('Should become inaccurate when receiving invalid string', function() {
    var anum;
    anum = arithNumber('');
    expect(anum.isAccurate()).to.equal(false);

    anum = arithNumber('e-1');
    expect(anum.isAccurate()).to.equal(false);

    anum = arithNumber('0f+2');
    expect(anum.isAccurate()).to.equal(false);

    anum = arithNumber('-');
    expect(anum.isAccurate()).to.equal(false);

    anum = arithNumber('ABC');
    expect(anum.isAccurate()).to.equal(false);

    anum = arithNumber('0x01');
    expect(anum.isAccurate()).to.equal(false);
  });

  it('Should become inaccurate when receiving invalid data type', function() {
    var anum;
    anum = arithNumber(true);
    expect(anum.isAccurate()).to.equal(false);

    anum = arithNumber([]);
    expect(anum.isAccurate()).to.equal(false);

    anum = arithNumber({});
    expect(anum.isAccurate()).to.equal(false);

    anum = arithNumber(new Date());
    expect(anum.isAccurate()).to.equal(false);
  });
});
