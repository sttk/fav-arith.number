# Benchmark test of @fav/arith.number

> Comparing with [fraction.js](https://www.npmjs.com/package/fraction.js)

### v0.1.5

|                       | @fav/arith.number(0.1.4) | fraction.js(4.0.10) |
|:----------------------|-------------------------:|--------------------:|
| ctor (Zero)           |       36,515,695 ops/sec |  25,651,160 ops/sec |
| ctor (Integer)        |       35,023,150 ops/sec |  26,358,837 ops/sec |
| ctor (Fraction)       |       40,117,385 ops/sec |  25,319,275 ops/sec |
| .of (Zero/number)     |       37,328,422 ops/sec |  13,180,849 ops/sec |
| .of (Integer/number)  |       37,548,589 ops/sec |  20,245,777 ops/sec |
| .of (Decimal/number)  |        2,144,734 ops/sec |     130,072 ops/sec |
| .of (Zero/string)     |        4,594,541 ops/sec |   5,528,150 ops/sec |
| .of (Integer/string)  |        2,601,846 ops/sec |   2,735,793 ops/sec |
| .of (Decimal/string)  |        2,153,104 ops/sec |   1,607,674 ops/sec |
| .to string (Zero)     |       72,814,025 ops/sec |  12,339,969 ops/sec |
| .to string (Integer)  |       12,197,487 ops/sec |   9,397,723 ops/sec |
| .to string (Decimal)  |        2,454,301 ops/sec |   1,964,281 ops/sec |
| .to string (Fraction) |        1,485,646 ops/sec |     785,576 ops/sec |

- Platform: Node.js 10.8.0 on Darwin 64-bit
- Machine: Intel(R) Core(TM) i7-2620M CPU @ 2.70GHz, 16GB

### v0.1.4

|                       | @fav/arith.number(0.1.4) | fraction.js(4.0.10) |
|:----------------------|-------------------------:|--------------------:|
| ctor (Zero)           |          459,963 ops/sec |  28,266,077 ops/sec |
| ctor (Integer)        |          457,244 ops/sec |  28,510,799 ops/sec |
| ctor (Fraction)       |          450,141 ops/sec |  28,022,047 ops/sec |
| .of (Zero/number)     |          368,866 ops/sec |  14,254,353 ops/sec |
| .of (Integer/number)  |          163,237 ops/sec |  18,270,532 ops/sec |
| .of (Decimal/number)  |          276,919 ops/sec |     135,420 ops/sec |
| .of (Zero/string)     |          353,367 ops/sec |   5,346,433 ops/sec |
| .of (Integer/string)  |          153,966 ops/sec |   2,157,379 ops/sec |
| .of (Decimal/string)  |          286,574 ops/sec |   1,735,029 ops/sec |
| .to string (Zero)     |       71,581,920 ops/sec |  12,347,365 ops/sec |
| .to string (Integer)  |       13,378,314 ops/sec |  10,703,182 ops/sec |
| .to string (Decimal)  |          507,437 ops/sec |   1,951,751 ops/sec |
| .to string (Fraction) |          315,274 ops/sec |     684,360 ops/sec |

- Platform: Node.js 10.8.0 on Darwin 64-bit
- Machine: Intel(R) Core(TM) i7-2620M CPU @ 2.70GHz, 16GB
