'use strict';

var BenchmarkTester = require('benchmark-tester');

new BenchmarkTester()
  .addTest('@fav/arith.number', function(ArithNumber, data) {
    return new ArithNumber(data[0], data[1], 0);
  })
  .addTest('fraction.js', function(Fraction, data) {
    return new Fraction(data[0], data[1]);
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
  .runTest('.of (Zero/number)', 0)
  .runTest('.of (Integer/number)', 123)
  .runTest('.of (Decimal/number)', 0.00123)
  .runTest('.of (Zero/string)', '0')
  .runTest('.of (Integer/string)', '-123')
  .runTest('.of (Decimal/string)', '-0.00123')

  .print();
