var path = require('path');
var fs = require('fs');

var FileLocator = function(dirname) {
  this.dirname = dirname;
}

FileLocator.prototype = {
  getFiles: function(callback) {
    // TODO: рекурсивный поиск файлов во вложенных папках
    var dirname = path.normalize(this.dirname);
    fs.readdir(dirname, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }
      callback(files, dirname);
    });
  }
};

module.exports = FileLocator;
