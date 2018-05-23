var FunctionDescriber = require('./components/FunctionDescriber');
var ResultFormatter = require('./components/ResultFormatter');
var FileLocator = require('./components/FileLocator');
var fs = require('fs');
var path = require('path');

var fileLocator = new FileLocator(process.argv.pop());

fileLocator.getFiles().then(function(files, dirname) {
  files.forEach(function(filename) {
    fs.readFile(filename, undefined, function(err, data) {
      fileString = '' + data
      var functionDescriber = new FunctionDescriber(fileString, filename, new ResultFormatter);
      functionDescriber.parse();
    });
  });
});
