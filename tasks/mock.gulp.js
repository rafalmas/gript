'use strict';

module.exports = function (gulp, paths) {

    var argv = require('yargs').argv,
        mocks = require('gulp-stubby-server'),
        util = require('gulp-util'),
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
        var config;
        if (argv.nomocks === undefined) {
            config = _.merge({}, defaults, gulp.config.mocks);
            mocks(config, cb);
        } else {
            util.log('mock server disabled due to --nomocks');
        }
    });
};
