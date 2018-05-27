(function(){
'use strict';


var expect = chai.expect;


var ArithNumber = fav.arith.number;

var MAX_INT = Number.MAX_SAFE_INTEGER || (Math.pow(2, 53) - 1);

describe('fav.arith.number', function() {

  it('Should operate zeros', function() {
    var anum;
    anum = ArithNumber.of(0);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = ArithNumber.of(0.0);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = ArithNumber.of(-0);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = ArithNumber.of(-0.0);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');
  });

  it('Should operate positive integers', function() {
    var anum;
    anum = ArithNumber.of(1);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('1');
    expect(anum.toApproximateString(2)).to.equal('1.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('1.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('1.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('1.00');

    anum = ArithNumber.of(1234);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('1234');
    expect(anum.toApproximateString(2)).to.equal('1234.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('1234.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('1234.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('1234.00');

    anum = ArithNumber.of(123456789);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('123456789');
    expect(anum.toApproximateString(2)).to.equal('123456789.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('123456789.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('123456789.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('123456789.00');

    anum = ArithNumber.of(MAX_INT);
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
    anum = ArithNumber.of(-1);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-1');
    expect(anum.toApproximateString(2)).to.equal('-1.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-1.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-1.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-1.00');

    anum = ArithNumber.of(-1234);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-1234');
    expect(anum.toApproximateString(2)).to.equal('-1234.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-1234.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-1234.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-1234.00');

    anum = ArithNumber.of(-123456789);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-123456789');
    expect(anum.toApproximateString(2)).to.equal('-123456789.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-123456789.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-123456789.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-123456789.00');

    anum = ArithNumber.of(-MAX_INT);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-9007199254740991');
    expect(anum.toApproximateString(2)).to.equal('-9007199254740991.00');
    expect(anum.toApproximateString(2, Math.floor)).to
      .equal('-9007199254740991.00');
    expect(anum.toApproximateString(2, Math.ceil)).to
      .equal('-9007199254740991.00');
    expect(anum.toApproximateString(2, Math.round)).to
      .equal('-9007199254740991.00');

    anum = ArithNumber.of(-MAX_INT - 1);
    expect(anum.isAccurate()).to.equal(false);
  });

  it('Should operate positive decimals', function() {
    var anum;
    anum = ArithNumber.of(0.1);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0.1');
    expect(anum.toApproximateString(2)).to.equal('0.10');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.10');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.10');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.10');

    anum = ArithNumber.of(12.345);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('12.345');
    expect(anum.toApproximateString(2)).to.equal('12.34');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('12.34');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('12.35');
    expect(anum.toApproximateString(2, Math.round)).to.equal('12.35');
  });

  it('Should operate negative decimals', function() {
    var anum;
    anum = ArithNumber.of(-0.1);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-0.1');
    expect(anum.toApproximateString(2)).to.equal('-0.10');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-0.10');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-0.10');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-0.10');

    anum = ArithNumber.of(-12.345);
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-12.345');
    expect(anum.toApproximateString(2)).to.equal('-12.34');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-12.34');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-12.35');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-12.35');
  });

  it('Should accept zero strings', function() {
    var anum;
    anum = ArithNumber.of('0');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = ArithNumber.of('0.');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = ArithNumber.of('0.0');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = ArithNumber.of('.0');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = ArithNumber.of('0e-1');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = ArithNumber.of('.0e+1');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = ArithNumber.of('-0');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = ArithNumber.of('-0.');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = ArithNumber.of('-0.0');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = ArithNumber.of('-.0');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = ArithNumber.of('-0e-1');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');

    anum = ArithNumber.of('-.0e+1');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0');
    expect(anum.toApproximateString(2)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('0.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('0.00');
  });

  it('Should accept positive integer strings', function() {
    var anum;
    anum = ArithNumber.of('123');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('123');
    expect(anum.toApproximateString(2)).to.equal('123.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('123.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('123.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('123.00');
  });

  it('Should accept negative integer strings', function() {
    var anum;
    anum = ArithNumber.of('-12300');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-12300');
    expect(anum.toApproximateString(2)).to.equal('-12300.00');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-12300.00');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-12300.00');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-12300.00');
  });

  it('Should accept positive decimal strings', function() {
    var anum;
    anum = ArithNumber.of('12.345');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('12.345');
    expect(anum.toApproximateString(2)).to.equal('12.34');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('12.34');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('12.35');
    expect(anum.toApproximateString(2, Math.round)).to.equal('12.35');

    expect(anum.toApproximateString(0, Math.floor)).to.equal('12');
    expect(anum.toApproximateString(0, Math.ceil)).to.equal('13');
    expect(anum.toApproximateString(0, Math.round)).to.equal('12');

    anum = ArithNumber.of('0.12345');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('0.12345');
    expect(anum.toApproximateString(4)).to.equal('0.1234');
    expect(anum.toApproximateString(4, Math.floor)).to.equal('0.1234');
    expect(anum.toApproximateString(4, Math.ceil)).to.equal('0.1235');
    expect(anum.toApproximateString(4, Math.round)).to.equal('0.1235');

    expect(anum.toApproximateString(8)).to.equal('0.12345000');

    anum = ArithNumber.of('0.0012345');
    expect(anum.toApproximateString(5)).to.equal('0.00123');
  });

  it('Should accept negative decimal strings', function() {
    var anum;
    anum = ArithNumber.of('-12.345');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-12.345');
    expect(anum.toApproximateString(2)).to.equal('-12.34');
    expect(anum.toApproximateString(2, Math.floor)).to.equal('-12.34');
    expect(anum.toApproximateString(2, Math.ceil)).to.equal('-12.35');
    expect(anum.toApproximateString(2, Math.round)).to.equal('-12.35');

    expect(anum.toApproximateString(0, Math.floor)).to.equal('-12');
    expect(anum.toApproximateString(0, Math.ceil)).to.equal('-13');
    expect(anum.toApproximateString(0, Math.round)).to.equal('-12');

    anum = ArithNumber.of('-0.12345');
    expect(anum.isAccurate()).to.equal(true);
    expect(anum.toApproximateString()).to.equal('-0.12345');
    expect(anum.toApproximateString(4)).to.equal('-0.1234');
    expect(anum.toApproximateString(4, Math.floor)).to.equal('-0.1234');
    expect(anum.toApproximateString(4, Math.ceil)).to.equal('-0.1235');
    expect(anum.toApproximateString(4, Math.round)).to.equal('-0.1235');

    expect(anum.toApproximateString(8)).to.equal('-0.12345000');

    anum = ArithNumber.of('-0.0012345');
    expect(anum.toApproximateString(5)).to.equal('-0.00123');
  });

  it('Should accept positive exponential strings', function() {
    var anum;
    anum = ArithNumber.of('1e-1');
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

    anum = ArithNumber.of('123000e-2');
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

    anum = ArithNumber.of('1.23005e+2');
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

    anum = ArithNumber.of('0.0123e+1');
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
    anum = ArithNumber.of('-1e-1');
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

    anum = ArithNumber.of('-123000e-2');
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

    anum = ArithNumber.of('-1.23005e+2');
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

    anum = ArithNumber.of('-0.0123e+1');
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
    var anum0 = ArithNumber.of(12.345);
    var anum = ArithNumber.of(anum0);;
    expect(anum).to.deep.equal(anum0);
    expect(anum.toApproximateString()).to.equal('12.345');
    expect(anum.toApproximateString()).to.equal(anum0.toApproximateString());
  });

  it('Should become inaccurate when receiving invalid number', function() {
    var anum;
    anum = ArithNumber.of(Infinity);
    expect(anum.isAccurate()).to.equal(false);

    anum = ArithNumber.of(-Infinity);
    expect(anum.isAccurate()).to.equal(false);

    anum = ArithNumber.of(-NaN);
    expect(anum.isAccurate()).to.equal(false);

    anum = ArithNumber.of(MAX_INT + 1);
    expect(anum.isAccurate()).to.equal(false);

    anum = ArithNumber.of(-MAX_INT - 1);
    expect(anum.isAccurate()).to.equal(false);
  });

  it('Should become inaccurate when receiving invalid string', function() {
    var anum;
    anum = ArithNumber.of('');
    expect(anum.isAccurate()).to.equal(false);

    anum = ArithNumber.of('e-1');
    expect(anum.isAccurate()).to.equal(false);

    anum = ArithNumber.of('0f+2');
    expect(anum.isAccurate()).to.equal(false);

    anum = ArithNumber.of('-');
    expect(anum.isAccurate()).to.equal(false);

    anum = ArithNumber.of('ABC');
    expect(anum.isAccurate()).to.equal(false);

    anum = ArithNumber.of('0x01');
    expect(anum.isAccurate()).to.equal(false);
  });

  it('Should become inaccurate when receiving invalid data type', function() {
    var anum;
    anum = ArithNumber.of(true);
    expect(anum.isAccurate()).to.equal(false);

    anum = ArithNumber.of([]);
    expect(anum.isAccurate()).to.equal(false);

    anum = ArithNumber.of({});
    expect(anum.isAccurate()).to.equal(false);

    anum = ArithNumber.of(new Date());
    expect(anum.isAccurate()).to.equal(false);
  });
});

})();
