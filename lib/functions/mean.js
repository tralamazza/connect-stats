/*!
 * Mean
 *
 * Copyright(c) 2011 Daniel Tralamazza <tralamazza@gmail.com>
 * MIT Licensed
 */

var Mean = function(alpha) {
  this.a = alpha || 0.1;
  this.a_r = 1 - this.a;
  this.value = 0;
  this.name = 'mean';
};

Mean.prototype.update = function(v, acc) {
  if (acc.count != 1)
    this.value = (v * this.a) + (this.value * this.a_r);
  else
    this.value = v;
};

module.exports = Mean;
