# Benchmark test of @fav/arith.number

> Comparing with [fraction.js](https://www.npmjs.com/package/fraction.js)

### v0.1.5

|                       | @fav/arith.number(0.1.4) | fraction.js(4.0.10) |
|:----------------------|-------------------------:|--------------------:|
| ctor (Zero)           |       42,460,795 ops/sec |  28,840,758 ops/sec |
| ctor (Integer)        |       44,585,053 ops/sec |  30,669,769 ops/sec |
| ctor (Fraction)       |       42,769,727 ops/sec |  27,383,909 ops/sec |
| .of (Zero/number)     |       40,643,985 ops/sec |  14,265,437 ops/sec |
| .of (Integer/number)  |       37,881,150 ops/sec |  20,709,618 ops/sec |
| .of (Decimal/number)  |        2,097,941 ops/sec |     125,797 ops/sec |
| .of (Zero/string)     |        4,649,536 ops/sec |   5,634,299 ops/sec |
| .of (Integer/string)  |        2,576,036 ops/sec |   2,766,181 ops/sec |
| .of (Decimal/string)  |        2,293,174 ops/sec |   1,659,639 ops/sec |
| to string (Zero)      |       76,856,256 ops/sec |  12,063,286 ops/sec |
| to string (Integer)   |       13,675,273 ops/sec |  10,697,777 ops/sec |
| to string (Decimal)   |        2,593,451 ops/sec |   1,889,636 ops/sec |
| to string (Fraction)  |        1,566,311 ops/sec |     848,104 ops/sec |

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
| to string (Zero)      |       71,581,920 ops/sec |  12,347,365 ops/sec |
| to string (Integer)   |       13,378,314 ops/sec |  10,703,182 ops/sec |
| to string (Decimal)   |          507,437 ops/sec |   1,951,751 ops/sec |
| to string (Fraction)  |          315,274 ops/sec |     684,360 ops/sec |

- Platform: Node.js 10.8.0 on Darwin 64-bit
- Machine: Intel(R) Core(TM) i7-2620M CPU @ 2.70GHz, 16GB
