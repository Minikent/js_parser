var ResultFormatter = function() {};

ResultFormatter.prototype = {
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

    console.log(filename + ' ' + funcName + ' ' + node.loc.start.line + ' ' + paramNames.join(', '));
  }
};

module.exports = ResultFormatter;
