var EsprimaTreeIterator = function(callback) {
  this.callback = callback;
};

EsprimaTreeIterator.prototype = {
  traverse: function(tree) {
    if (!tree) {
      return;
    }
    this.callback(tree);
    switch (tree.type) {
      case 'BlockStatement':
      case 'Program': {
        for (var i in tree.body) {
          this.traverse(tree.body[i]);
        }
        break;
      }
      case 'FunctionExpression':
      case 'FunctionDeclaration': {
        for (var i in tree.body.body) {
          this.traverse(tree.body.body[i]);
        }
        break;
      }
      case 'ExpressionStatement': {
        this.traverse(tree.expression.callee);
        break;
      }
      case 'VariableDeclaration': {
        for (var i in tree.declarations) {
          this.traverse(tree.declarations[i]);
        }
        break;
      }
      case 'VariableDeclarator': {
        this.traverse(tree.init);
        break;
      }
    }
  }
};

module.exports = EsprimaTreeIterator;
