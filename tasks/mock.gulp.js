'use strict';

module.exports = function (gulp, paths) {

    var mocks = require('gulp-stubby-server'),
        _ = require('lodash'),
        defaults = {
            location: 'localhost',
            stubs: 8050,
            tls: 8443,
            admin: 8051,
            relativeFilesPath: true,
            files: [
                paths.src.mocks
            ]
        };

    gulp.task('mocks', function (cb) {
        var config = _.merge({}, defaults, gulp.config.mocks);

        mocks(config, cb);
    });
};
