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

        var statsPromises = createStatsPromises(files, this.dirname);

        Promise.all(statsPromises).then((filesWithStats) => {

          var directoryPromises = createDirectoryPromises(filesWithStats, this.dirname);
          var result = getJsFiles(filesWithStats, this.dirname);

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

var createStatsPromises = function(files, dirname) {
  statsPromises = [];
  for (let i in files) {
    statsPromises.push(new Promise((statsResolve) => {
      fs.stat(dirname + path.sep + files[i], function (err, stats) {
        if (err) throw err;
        statsResolve({file: files[i], stats: stats});
      });
    }));
  }
  return statsPromises;
};

var createDirectoryPromises = function(filesWithStats, dirname) {
  var directoryPromises = [];
  for (var i in filesWithStats) {
    if (filesWithStats[i].stats.isDirectory()) {
      var fileLocator = new FileLocator(dirname + path.sep + filesWithStats[i].file);
      directoryPromises.push(fileLocator.getFiles());
    }
  }
  return directoryPromises;
}

var getJsFiles = function(filesWithStats, dirname) {
  var result = [];
  for (var i in filesWithStats) {
    if (/\.js$/.test(filesWithStats[i].file)) {
      result.push(dirname + path.sep + filesWithStats[i].file);
    }
  }
  return result;
}

module.exports = FileLocator;
