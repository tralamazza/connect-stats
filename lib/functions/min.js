/*!
 * Min
 *
 * Copyright(c) 2011 Daniel Tralamazza <tralamazza@gmail.com>
 * MIT Licensed
 */

var Min = function() {
  this.value = Number.MAX_VALUE;
  this.name = 'min';
};

Min.prototype.update = function(v, acc) {
  if (this.value > v)
    this.value = v;
};

module.exports = Min;
