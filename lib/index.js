var generateBowerJson = require('generate-bower-json');
var gutil = require('gulp-util');
var through = require('through2');
var path = require('path');

module.exports = function() {
  return through.obj(function(file, enc, cb) {

    if(file.isNull()) {
      cb(null, file);
      return;
    }

    if(file.isStream()) {
      cb(new gutil.PluginError('gulp-generate-bower-json', 'Streaming not supported'));
      return;
    }

    var bower = generateBowerJson(JSON.parse(file.contents.toString()));

    file.contents = new Buffer(JSON.stringify(bower));
		file.path = path.join(path.dirname(file.path), 'bower.json');

    cb(null, file);

  });
}
