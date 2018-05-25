function *EsprimaTreeIterator(node) {
  var subtrees = [];
  switch (node.type) {
    case 'BlockStatement':
    case 'Program': {
      for (var i in node.body) {
        subtrees.push(node.body[i]);
      }
      break;
    }
    case 'ArrowFunctionExpression':
    case 'FunctionExpression':
    case 'FunctionDeclaration': {
      for (var i in node.body.body) {
        subtrees.push(node.body.body[i]);
      }
      break;
    }
    case 'ExpressionStatement': {
      subtrees.push(node.expression.callee);
      for (var i in node.expression.arguments) {
        subtrees.push(node.expression.arguments[i]);
      }
      break;
    }
    case 'VariableDeclaration': {
      for (var i in node.declarations) {
        subtrees.push(node.declarations[i]);
      }
      break;
    }
    case 'VariableDeclarator': {
      subtrees.push(node.init);
      break;
    }
  }
  if (!subtrees.length) {
    return;
  }
  for (var i in subtrees) {
    if (subtrees[i]) {
      yield subtrees[i];
    }
    yield* EsprimaTreeIterator(subtrees[i]);
  }
};

module.exports = EsprimaTreeIterator;
