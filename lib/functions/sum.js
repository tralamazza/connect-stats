/*!
 * Sum 
 *
 * Copyright(c) 2011 Daniel Tralamazza <tralamazza@gmail.com>
 * MIT Licensed
 */

var Sum = function() {
  this.value = 0;
  this.name = 'sum';
};

Sum.prototype.update = function(v, acc) {
  this.value += v;
};

module.exports = Sum;
