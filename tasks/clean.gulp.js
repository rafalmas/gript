'use strict';

var gulp = require('gulp'),
    del = require('del');

// Cleans the dist directory
gulp.task('clean', function (path, done) {
    del(path, done);
});
