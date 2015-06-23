'use strict';

var Stream = require('stream'),
    Path = require('path'),
    git = require('git-rev');

function gulpGitRename(obj) {

  var stream = new Stream.Transform({objectMode: true});

  function parsePath(path) {
    var extname = Path.extname(path);
    return {
      dirname: Path.dirname(path),
      basename: Path.basename(path, extname),
      extname: extname
    };
  }

  stream._transform = function(file, unused, callback) {
    var parsedPath = parsePath(file.relative);
    var path;

    git.short(function(gitHash) {
      var result = obj(parsedPath, gitHash) || parsedPath;
      path = Path.join(result.dirname, result.basename + result.extname);
      file.path = Path.join(file.base, path);
      callback(null, file);
    });

  };

  return stream;
}

module.exports = gulpGitRename;
