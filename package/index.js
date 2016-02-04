/*jslint node: true */

'use strict';

var gulp = require('gulp'),
    sequence = require('run-sequence');

gulp.config = {
    module: 'no-module-specified',
    hostHeader: 'no-hostHeader-sepcified',
    url: 'no-url-specified'
};

// Require all our gulp files, which each register their tasks when called
require('require-dir')('./tasks');

// Register the default task
gulp.task('default', function () {
    sequence('build', ['server', 'proxy'], 'watch');
});

gulp.task('dist:serve', ['dist', 'server:dist']);

module.exports = gulp;