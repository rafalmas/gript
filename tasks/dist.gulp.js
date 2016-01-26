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
    size = require('gulp-size'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref');

gulp.task('dist', ['appcache']);

gulp.task('appcache', ['minify'], function () {
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


