/*!
 * connect-stats
 * Copyright(c) 2011 Daniel Tralamazza <tralamazza@gmail.com>
 * MIT Licensed
 */

/* ideas:
 *  - event count trigger (oprofile like)
 *  - time sampling increments a counter, gets decremented by `res.end`
 *  - more counters: memory, req/res size, host distribution
 *  - more statistics: histogram
 */

var acc = require('./accumulator');

module.exports = function stats(options) {
  var options = options || { interval: 200 },
    last_resp_time = 0,
    total_connections = 0;

  // accumulators
  var counters = {
    connections: new acc.Accumulator(acc.median, acc.mean),
    response: new acc.Accumulator(acc.median, acc.mean);
  };

  // sampling
  setInterval(function() {
    counters.response.put(last_resp_time);
    counters.connections.put(total_connections);
  }, options.interval);

  // proxy
  return function(req, res, next) {
    var end = res.end,
      start_time = new Date();

    total_connections++;

    res.end = function(data, encoding) {
      res.end = end;
      res.end(data, encoding);
      last_resp_time = new Date() - start_time;
      total_connections--;
    };

    next();
  };
};
