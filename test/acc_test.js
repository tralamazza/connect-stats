var stats = require('../lib/accumulator');

// custom mean function
var m = new stats.mean(0.5);
m.name = 'mean05';

var acc = new stats.Accumulator( stats.sum, stats.min, stats.max, m, stats.mean, stats.median );
acc.put(1);
acc.put(2);
acc.put(3);
acc.put(4);
acc.put(5);

console.log('sum  = ' + acc.sum());
console.log('min  = ' + acc.min());
console.log('max  = ' + acc.max());
console.log('mean = ' + acc.mean());
console.log('mean 0.5 = ' + acc.mean05());
console.log('median = ' + acc.median());
