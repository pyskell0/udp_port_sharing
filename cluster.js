var cp = require('child_process');
var _ = require('underscore');
var fs = require('fs');
var dgram = require('dgram');

var config_files_dir = './config_files';
config_files_dir = fs.realpathSync(config_files_dir);

var config_files = fs.readdirSync(config_files_dir+ '/');

var children = _.map(config_files, function(config_file) {
  console.log(config_files_dir + '/' + config_file);
  var child = cp.fork('stats.js', [config_files_dir + '/' + config_file]);
  return child;
});

var s = dgram.createSocket('udp4');
s.bind(8125, function() {
  _.map(children, function(child, i) {
    console.log(i)
    child.send({msg:'server', i:i}, s);
  });
  s.close()
});
