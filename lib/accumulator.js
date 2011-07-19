/*!
 * Accumulator
 *
 * Copyright(c) 2011 Daniel Tralamazza <tralamazza@gmail.com>
 * MIT Licensed
 */

var fs = require('fs'),
  path = require('path');

var Accumulator = function() {
  this.count = 0;
  this.functions = [];
  for (var i in arguments) {
    var func = arguments[i];
    if (typeof(func) === 'function')
      func = new arguments[i];
    this.functions.push(func);
    this[func.name] = function(f) {
      return function() {
        return (typeof(f.value) === 'function') ? f.value() : f.value;
      };
    }(func);
  }
};

Accumulator.prototype.put = function(value) {
  this.count++;
  for (var i in this.functions) {
    this.functions[i].update(value, this);
  }
};

// lazy load statistical functions 
fs.readdirSync(__dirname + '/functions').forEach(function(fn) {
  if (!/\.js$/.test(fn)) return;
  var name = path.basename(fn, '.js');
  exports.__defineGetter__(name, function() {
    return require('./functions/' + name);
  });
});

exports.Accumulator = Accumulator;
