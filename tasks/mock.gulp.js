'use strict';

module.exports = function (gulp, paths) {

    var argv = require('yargs').argv,
        mocks = require('gulp-stubby-server'),
        multimocks = require('angular-multimocks/app/package/tasks/gulp/multimocksGulp'),
        path = require('path'),
        util = require('gulp-util'),
        _ = require('lodash');

    gulp.task('mocks', function (callback) {
        if (_.has(gulp.config, 'mocks') && _.has(gulp.config.mocks, 'stubby')) {
            if (argv.nomocks === undefined) {
                mocks(gulp.config.mocks.stubby, callback);
            } else {
                util.log('mock server disabled due to --nomocks');
            }
        } else {
            callback();
        }
    });

    gulp.task('multiMocks', function (callback) {
        if (_.has(gulp.config, 'mocks') && _.has(gulp.config.mocks, 'multimocks')) {
            gulp.config.mocks.multimocks.dest = path.join(paths.target.tmp.js, 'multimocks.js');
            util.log('Generating Angular-multimocks...');

            multimocks(gulp.config.mocks.multimocks);
            callback();
        } else {
            callback();
        }
    });
};
