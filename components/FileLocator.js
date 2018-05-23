var path = require('path');
var fs = require('fs');

var FileLocator = function(dirname) {
  this.dirname = dirname;
}

FileLocator.prototype = {
  getFiles: function() {

    var dirname = path.normalize(this.dirname);
    return new Promise((resolve, reject) => {
      fs.readdir(dirname, (err, files) => {
        if (err) { throw err; }


        var statsPromises = [];
        var directoryPromises = [];
        var result = [];

        for (let i in files) {
          statsPromises.push(new Promise((statsResolve) => {
            fs.stat(this.dirname + path.sep + files[i], function (err, stats) {
              if (err) throw err;
              statsResolve({file: files[i], stats: stats});
            });
          }));
        }

        Promise.all(statsPromises).then((filesWithStats) => {
          for (var i in filesWithStats) {
            if (filesWithStats[i].stats.isDirectory()) {
              var fileLocator = new FileLocator(this.dirname + path.sep + filesWithStats[i].file);
              directoryPromises.push(fileLocator.getFiles());
            } else if (/\.js$/.test(files[i])) {
              result.push(this.dirname + path.sep + files[i]);
            }
          }

          if (directoryPromises.length) {
            Promise.all(directoryPromises).then(subdirectoryJsFiles => {
              resolve(result.concat.apply(result, subdirectoryJsFiles));
            });
          } else {
            resolve(result);
          }
        });
      });
    });
  }
};

module.exports = FileLocator;
