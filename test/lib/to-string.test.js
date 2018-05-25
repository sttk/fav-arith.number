'use strict';

var chai = require('chai');
var expect = chai.expect;

var toString = require('../../lib/to-string');
var ArithNumber = require('../../lib/number-class');

describe('lib/to-string', function() {

  it('Should convert to a string when numerator = 0', function() {
    var anum = new ArithNumber(0, 1, 0);
    expect(toString(anum)).to.equal('0');
    expect(toString(anum, 2)).to.equal('0.00');
    expect(toString(anum, 2, Math.floor)).to.equal('0.00');
    expect(toString(anum, 2, Math.ceil)).to.equal('0.00');
    expect(toString(anum, 2, Math.round)).to.equal('0.00');
  });

  it('Should convert to a string when denominator = 1', function() {
    var anum;
    anum = new ArithNumber(1, 1, 0);
    expect(toString(anum)).to.equal('1');
    expect(toString(anum, 2)).to.equal('1.00');
    expect(toString(anum, 2, Math.floor)).to.equal('1.00');
    expect(toString(anum, 2, Math.ceil)).to.equal('1.00');
    expect(toString(anum, 2, Math.round)).to.equal('1.00');

    anum = new ArithNumber(123, 1, -2);
    expect(toString(anum)).to.equal('1.23');
    expect(toString(anum, 1)).to.equal('1.2');
    expect(toString(anum, 1, Math.floor)).to.equal('1.2');
    expect(toString(anum, 1, Math.ceil)).to.equal('1.3');
    expect(toString(anum, 1, Math.round)).to.equal('1.2');
    expect(toString(anum, 2)).to.equal('1.23');
    expect(toString(anum, 2, Math.floor)).to.equal('1.23');
    expect(toString(anum, 2, Math.ceil)).to.equal('1.23');
    expect(toString(anum, 2, Math.round)).to.equal('1.23');
    expect(toString(anum, 3)).to.equal('1.230');
    expect(toString(anum, 3, Math.floor)).to.equal('1.230');
    expect(toString(anum, 3, Math.ceil)).to.equal('1.230');
    expect(toString(anum, 3, Math.round)).to.equal('1.230');
  });

  it('Should convert to a string when denominator > 1', function() {
    var anum;
    anum = new ArithNumber(1, 3, 0);
    expect(toString(anum)).to.equal('0.33333333333333333333');
    expect(toString(anum, 2)).to.equal('0.33');
    expect(toString(anum, 2, Math.floor)).to.equal('0.33');
    expect(toString(anum, 2, Math.ceil)).to.equal('0.34');
    expect(toString(anum, 2, Math.round)).to.equal('0.33');
  });

  it('Should convert to a string when numerator is negative', function() {
    var anum;
    anum = new ArithNumber(-0, 1, 0);
    expect(toString(anum)).to.equal('0');

    anum = new ArithNumber(-1, 1, 0);
    expect(toString(anum)).to.equal('-1');

    anum = new ArithNumber(-123, 1, -2);
    expect(toString(anum)).to.equal('-1.23');

    anum = new ArithNumber(-1, 3, 0);
    expect(toString(anum)).to.equal('-0.33333333333333333333');
  });
});
