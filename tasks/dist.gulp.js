'use strict';

var appcache = require('gulp-appcache'),
    debug = require('gulp-debug'),
    gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    htmlmin = require('gulp-htmlmin'),
    minifyCss = require('gulp-cssnano'),
    ngAnnotate = require('gulp-ng-annotate'),
    replace = require('gulp-replace'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    sequence = require('run-sequence'),
    size = require('gulp-size'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    util = require('gulp-util');

gulp.task('dist', function (callback) {
    util.log(util.colors.blue.bold('Generating dist package...'));
    sequence('clean', 'appcache', callback);
});

gulp.task('appcache', ['minify'], function () {
    util.log(util.colors.blue.bold('Generating appcache...'));
    gulp.src(['target/dist/**/*'])
        .pipe(appcache({
            filename: 'app.manifest',
            exclude: ['app.manifest', 'index.html'],
            timestamp: true
        }))
        .pipe(gulp.dest('target/dist'));
    gulp.src(['target/dist/index.html'])
        .pipe(replace(/<html /, '<html manifest="app.manifest" '))
        .pipe(gulp.dest('target/dist'));
});

gulp.task('minify', ['build'], function () {
    util.log(util.colors.blue.bold('Minifying...'));
    return gulp.src('app/index.html')
        .pipe(useref({searchPath: ['app', 'target/tmp']}))
        .pipe(gulpIf(['**/*.js', '**/*.css'], rev()))
        .pipe(gulpIf('*.js', ngAnnotate()))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', minifyCss()))
        .pipe(debug())
        .pipe(revReplace())
        .pipe(gulpIf('*.html', htmlmin({
            removeEmptyAttributes: true,
            collapseBooleanAttributes: false,
            collapseWhitespace: true,
            caseSensitive: true
        })))
        .pipe(gulp.dest('target/dist'))
        .pipe(size());
});


