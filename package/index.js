/*jslint node: true */

'use strict';

var gulp = require('gulp');

gulp.config = {
    module: 'no-module-specified',
    hostHeader: 'no-hostHeader-sepcified',
    url: 'no-url-specified'
};

// Require all our gulp files, which each register their tasks when called
require('require-dir')('./tasks');

// Register our default task
gulp.task('default', ['bower', 'js', 'styles', 'fonts', 'server', 'proxy', 'test', 'watch']);
gulp.task('dist:serve', ['dist', 'server:dist']);

module.exports = gulp;