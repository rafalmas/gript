/*jslint node: true */

'use strict';

var gulp = require('gulp'),
    livereload = require('gulp-livereload');

// Watches the source tree for changes
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['*.js', 'gulp/*.js'], ['eslint', 'jslint']);
    gulp.watch(['app/**/*.js', '!app/bower_components/**/*'], ['eslint', 'jslint', 'test']);
    gulp.watch(['app/**/*.scss', '!app/bower_components/**/*'], ['scsslint', 'build-styles']);
    gulp.watch(['app/**/*.js', '!app/bower_components/**/*'], livereload.changed);
    gulp.watch(['app/**/*.html', '!app/bower_components/**/*'], livereload.changed);
    gulp.watch(['target/tmp/**/*.css'], livereload.changed);
});
