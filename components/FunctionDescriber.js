var esprima = require('esprima');
var EsprimaTreeIterator = require('./EsprimaTreeIterator');

var FunctionDescriber = function(fileAsString, filename, resultFormatter) {
  this.fileAsString = fileAsString;
  this.filename = filename;
  this.resultFormatter = resultFormatter;
};

FunctionDescriber.prototype = {

  parse: function() {
    this.parsedByEsprima = esprima.parseScript(this.fileAsString, { loc: true });
    functionDescriptionGettingIterator = new EsprimaTreeIterator((tree) => {
      this.getFunctionDescriptionCallback(tree);
    });
    functionDescriptionGettingIterator.traverse(this.parsedByEsprima);
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
