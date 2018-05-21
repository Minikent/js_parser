var assert = require('assert');
var fs = require('fs');
var FileLocator = require('../components/FileLocator');
var FunctionDescriber = require('../components/FunctionDescriber');
var TestResultFormatter = require('./components/TestResultFormatter');

describe('FileLoctor', function() {
  it('should find test files', function() {
    var fileLocator = new FileLocator('test/source_examples');
    fileLocator.getFiles(function(files) {
      assert.equal(files.length, 1);
      assert.equal(files[0], '1.js');
    });
  });
});

describe('FunctionDescriber', function() {
  it('should find all function declarations in test file', function() {
    fs.readFile('test/source_examples/1.js', undefined, function(err, data) {
      var fileAsString = '' + data;
      var filename = 'test/source_examples/1.js';
      var functionResults = [
        'test/source_examples/1.js anonymous 1 i',
        'test/source_examples/1.js anonymous 2 firsArg, secondArg',
        'test/source_examples/1.js b 6 i, j',
        'test/source_examples/1.js c 12 k, l, m'
      ];
      var callbacksCount = 0;
      var foundFunctionsCount = 0;
      var functionDescriber = new FunctionDescriber(fileAsString, filename, new TestResultFormatter(function(result) {
        callbacksCount++;
        var indexOfResult = functionResults.indexOf(result);
        if (-1 !== indexOfResult) {
          foundFunctionsCount++;
          delete(functionResults[indexOfResult]);
        }
      }));
      functionDescriber.parse();
      assert.equal(foundFunctionsCount, 4);
    });
  });
});
