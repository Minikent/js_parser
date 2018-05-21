TestResultFormatter = function(callback) {
  this.callback = callback;
};

TestResultFormatter.prototype = {
  describeFunction: function(node, filename) {
    var paramNames = [];
    var funcName = '';

    if (node.id && node.id.constructor) {
      funcName = node.id.name;
    } else {
      funcName = node.id || 'anonymous';
    }

    for (var i in node.params) {
      paramNames.push(node.params[i].name);
    }

    this.callback( filename + ' ' + funcName + ' ' + node.loc.start.line + ' ' + paramNames.join(', '));
  }
};
module.exports = TestResultFormatter;
