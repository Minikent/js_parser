var FunctionDescriber = require('./components/FunctionDescriber');
var ResultFormatter = require('./components/ResultFormatter');
var FileLocator = require('./components/FileLocator');
var fs = require('fs');
var path = require('path');

var fileLocator = new FileLocator(process.argv.pop());

fileLocator.getFiles(function(files, dirname) {
  files.forEach(function(filename) {
    var fullFileName = dirname + path.sep + filename;
    fs.readFile(fullFileName, undefined, function(err, data) {
      fileString = '' + data
      var functionDescriber = new FunctionDescriber(fileString, fullFileName, new ResultFormatter);
      functionDescriber.parse();
    });
  });
});
