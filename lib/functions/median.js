/*!
 * Median
 *
 * Copyright(c) 2011 Daniel Tralamazza <tralamazza@gmail.com>
 * MIT Licensed
 *
 * P^2 quantile
 * R. Jain and I. Chlamtac, The P^2 algorithm for dynamic calculation of quantiles and
    histograms without storing observations, Communications of the ACM
 */

var Median = function(qp) {
  this.name = 'median';
  this.p = qp || 0.5;
  this.q_i = new Array(5); // heights
  this.n_i = new Array(5); // positions
  this.np_i = new Array(5); // desired positions
  this.dnp_i = new Array(5); // desired positions increment

  for (var i = 0; i < 5; i++) {
    this.n_i[i] = i + 1;
  }
 
  this.np_i[0] = 1;
  this.np_i[1] = 1 + (2 * this.p);
  this.np_i[2] = 1 + (4 * this.p);
  this.np_i[3] = 3 + (2 * this.p);
  this.np_i[4] = 5;
  
  this.dnp_i[0] = 0;
  this.dnp_i[1] = this.p / 2;
  this.dnp_i[2] = this.p;
  this.dnp_i[3] = (1 + this.p) / 2;
  this.dnp_i[4] = 1;
}

Median.prototype.value = function() {
  return this.q_i[2];
};

Median.prototype.update = function(v, acc) {
  if (acc.count > 5) {
    var k = 1;
    if (v < this.q_i[0]) {
      k = 1;
      this.q[0] = v; // min
    } else if (this.q_i[4] < v) {
      k = 4;
      this.q[4] = v; // max
    } else {
      for (k = 1; k < 5; k++) {
        if (this.q_i[k-1] <= v < this.q_i[k])
          break;
      }
    }
    for (var i = k; i < 5; i++) {
      this.n_i[i]++;
    }
    for (var i = 0; i < 5; i++) {
      this.np_i[i] += this.dnp_i[i];
    }
    for (var i = 1; i < 4; i++) {
      var d = this.np_i[i] - this.n_i[i];
      var dp = this.n_i[i + 1] - this.n_i[i];
      var dm = this.n_i[i - 1] - this.n_i[i];
      if ((d >= 1 && dp > 1) || (d <= -1 && dm < -1)) {
        var hp = (this.q_i[i + 1] - this.q_i[i]) / dp;
        var hm = (this.q_i[i - 1] - this.q_i[i]) / dm;
        var sign_d = (d == 0) ? 0 : ((d > 0) ? 1 : -1);
        var h = this.q_i[i] + sign_d / (dp - dm) * ((sign_d - dm) * hp + (dp - sign_d) * hm);

        if (this.q_i[i - 1] < h && h < this.q_i[i + 1]) {
          this.q_i[i] = h;
        } else {
          if (d > 0) {
            this.q_i[i] += hp;
          }
          if (d < 0) {
            this.q_i[i] -= hm;
          }
        }
        this.n_i[i] += sign_d;
      }
    }
  } else {
    // init
    this.q_i[acc.count - 1] = v;
    if (acc.count == 5) {
      this.q_i.sort(function(a,b) { return a - b; });
    }
  }
};

module.exports = Median;
