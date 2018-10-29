# Benchmark test of @fav/arith.number

> Comparing with [fraction.js](https://www.npmjs.com/package/fraction.js)

### v0.1.4

|                      | @fav/arith.number(0.1.4) | fraction.js(4.0.10) |
|:---------------------|-------------------------:|--------------------:|
| ctor (Zero)          |          553,462 ops/sec |  25,587,068 ops/sec |
| ctor (Integer)       |          505,503 ops/sec |  21,598,838 ops/sec |
| ctor (Fraction)      |          516,427 ops/sec |  13,098,960 ops/sec |
| .of (Zero/number)    |          422,345 ops/sec |  26,819,327 ops/sec |
| .of (Integer/number) |          189,834 ops/sec |  22,437,884 ops/sec |
| .of (Decimal/number) |          364,451 ops/sec |     155,423 ops/sec |
| .of (Zero/string)    |          443,543 ops/sec |   6,385,623 ops/sec |
| .of (Integer/string) |          192,544 ops/sec |   3,167,649 ops/sec |
| .of (Decimal/string) |          374,727 ops/sec |   1,938,263 ops/sec |

- Platform: Node.js 10.8.0 on Darwin 64-bit
- Machine: Intel(R) Core(TM) i7-2620M CPU @ 2.70GHz, 16GB
