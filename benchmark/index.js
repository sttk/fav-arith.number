'use strict';

var BenchmarkTester = require('benchmark-tester');
var assert = require('assert');

new BenchmarkTester()
  .addTest('@fav/arith.number', function(ArithNumber, data) {
    return new ArithNumber(data[0], data[1], 0);
  })
  .addTest('fraction.js', function(Fraction, data) {
    return new Fraction(data[0], data[1]);
  })
  .configPackage('fraction.js', function(Fraction) {
    Fraction.REDUCE = false;
  })
  .verifyTest('@fav/arith.number', function(test, ArithNumber) {
    var a = test(ArithNumber, [123, 45]);
    assert.strictEqual(a.numerator, 123);
    assert.strictEqual(a.denominator, 45);
    assert.strictEqual(a.exponent, 0);
  })
  .verifyTest('fraction.js', function(test, Fraction) {
    var f = test(Fraction, [123, 45]);
    assert.strictEqual(f.n, 123);
    assert.strictEqual(f.d, 45);
    assert.strictEqual(f.s, 1);
  })
  .runTest('ctor (Zero)', [0, 1])
  .runTest('ctor (Integer)', [123, 1])
  .runTest('ctor (Fraction)', [123, 45])

  .addTest('@fav/arith.number', function(ArithNumber, data) {
    return ArithNumber.of(data);
  })
  .addTest('fraction.js', function(Fraction, data) {
    return new Fraction(data);
  })
  .verifyTest('@fav/arith.number', function(test, ArithNumber) {
    var a = test(ArithNumber, 123.456);
    assert.strictEqual(a.toApproximateString(), '123.456');
  })
  .verifyTest('fraction.js', function(test, Fraction) {
    var f = test(Fraction, 123.456);
    assert.strictEqual(f.toString(), '123.456');
  })
  .runTest('.of (Zero/number)', 0)
  .runTest('.of (Integer/number)', 123)
  .runTest('.of (Decimal/number)', 0.00123)
  .runTest('.of (Zero/string)', '0')
  .runTest('.of (Integer/string)', '-123')
  .runTest('.of (Decimal/string)', '-0.00123')

  .addTest('@fav/arith.number', function(ArithNumber, data) {
    return data.toApproximateString();
  })
  .addTest('fraction.js', function(Fraction, data) {
    return data.toString();
  })
  .setConverter('@fav/arith.number', function(data, ArithNumber) {
    return new ArithNumber(data[0], data[1], 0);
  })
  .setConverter('fraction.js', function(data, Fraction) {
    return new Fraction(data[0], data[1]);
  })
  .verifyTest('@fav/arith.number', [123, 456], '0.26973684210526315789')
  .verifyTest('fraction.js', [123, 456], '0.269(736842105263157894)')
  .runTest('.to string (Zero)', [0, 1])
  .runTest('.to string (Integer)', [-123456789, 1])
  .runTest('.to string (Decimal)', [-1234, 1000000])
  .runTest('.to string (Fraction)', [-123, 456])

  .print();
