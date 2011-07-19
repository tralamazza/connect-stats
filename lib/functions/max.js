/*!
 * Max 
 *
 * Copyright(c) 2011 Daniel Tralamazza <tralamazza@gmail.com>
 * MIT Licensed
 */

var Max = function() {
  this.value = Number.MIN_VALUE;
  this.name = 'max';
};

Max.prototype.update = function(v, acc) {
  if (this.value < v)
    this.value = v;
};

module.exports = Max;
