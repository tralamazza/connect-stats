/*!
 * Null 
 *
 * Copyright(c) 2011 Daniel Tralamazza <tralamazza@gmail.com>
 * MIT Licensed
 */

var Null = function() {
  this.name = 'null'; // required
};

// this method receives the value `v` and the parent `Accumulator`
Null.prototype.update = function(v, acc) {
};

// either write a method called `value()` or have an attribute `value`
Null.prototype.value = function() {
  return null;
};

module.exports = Null; // export it
