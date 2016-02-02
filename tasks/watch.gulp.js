'use strict';

var gulp = require('gulp'),
    livereload = require('gulp-livereload');

// Watches the source tree for changes
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['*.js', 'gulp/*.js'], ['eslint']);
    gulp.watch(['app/**/*.js', '!app/bower_components/**/*'], ['eslint', 'test']);
    gulp.watch(['app/**/*.ts', '!app/**/*Test.ts', '!app/**/*.*test.ts', '!app/bower_components/**/*'], ['inject-js']);
    gulp.watch(['app/**/*Test.ts', '!app/bower_components/**/*', 'app/**/*.*test.ts'], ['test']);
    gulp.watch(['app/**/*.scss', '!app/bower_components/**/*'], ['inject-styles']);
    gulp.watch(['app/**/*.html', '!app/bower_components/**/*', '!app/index.html'], ['inject-partials']);
    gulp.watch(['bower.json'], ['inject-bower']);
    gulp.watch(['app/**/*.js', '!app/bower_components/**/*'], livereload.changed);
    gulp.watch(['app/**/*.ts', '!app/bower_components/**/*'], livereload.changed);
    gulp.watch(['app/**/*.html', '!app/bower_components/**/*'], livereload.changed);
    gulp.watch(['target/tmp/**/*.css'], livereload.changed);
});
