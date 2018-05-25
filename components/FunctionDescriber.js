var esprima = require('esprima');
var EsprimaTreeIterator = require('./EsprimaTreeIterator');

var FunctionDescriber = function(fileAsString, filename, resultFormatter) {
  this.fileAsString = fileAsString;
  this.filename = filename;
  this.resultFormatter = resultFormatter;
};

FunctionDescriber.prototype = {

  parse: function() {
    var node = esprima.parseScript(this.fileAsString, { loc: true });
    var generator = EsprimaTreeIterator(node);
    var res = generator.next();
    while (!res.done) {
      this.getFunctionDescriptionCallback(res.value);
      res = generator.next();
    }
  },

  getFunctionDescriptionCallback: function(node) {
    switch(node.type) {
      case 'ArrowFunctionExpression':
      case 'FunctionDeclaration':
      case 'FunctionExpression': {
        this.resultFormatter.describeFunction(node, this.filename);
        break;
      }
    }
  }
};

module.exports = FunctionDescriber;
