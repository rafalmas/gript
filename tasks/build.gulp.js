'use strict';

var angularFilesort = require('gulp-angular-filesort'),
    bower = require('gulp-bower'),
    filter = require('gulp-filter'),
    flatten = require('gulp-flatten'),
    fs = require('fs'),
    gulp = require('gulp'),
    gulpInject = require('gulp-inject'),
    htmlmin = require('gulp-htmlmin'),
    naturalSort = require('gulp-natural-sort'),
    ngHtml2js = require('gulp-ng-html2js'),
    sass = require('gulp-sass'),
    sequence = require('run-sequence'),
    size = require('gulp-size'),
    util = require('gulp-util'),
    wiredep = require('wiredep').stream;

gulp.task('inject', function (callback) {
    sequence('inject-bower', 'inject-styles', 'inject-partials', 'inject-js', callback);
});

gulp.task('inject-bower', ['bower-download'], function () {
    return gulp.src('app/index.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('bower-download', function () {
    return bower('app/bower_components');
});

gulp.task('inject-styles', ['styles'], function () {
    return gulp.src('app/index.html')
        .pipe(gulpInject(gulp.src('target/tmp/styles/**/*.css', {read: false}),
            {
                relative: false,
                ignorePath: "target/tmp",
                addRootSlash: false
            }))
        .pipe(gulp.dest('app'));
});

gulp.task('styles', ['scsslint'], function () {
    return gulp.src(['app/app.scss'])
        .pipe(sass())
        .pipe(gulp.dest('target/tmp/styles'));
});

gulp.task('inject-partials', ['partials'], function () {
    return gulp.src('app/index.html')
        .pipe(gulpInject(
            gulp.src('target/tmp/partials/**/*.js', {read: false}),
            {
                starttag: '<!-- inject:partials -->',
                relative: false,
                ignorePath: "target/tmp",
                addRootSlash: false
            }
        ))
        .pipe(gulp.dest('app'));
});

gulp.task('partials', function () {
    return gulp.src(['app/**/*.html', '!app/index.html', '!app/bower_components/**/*'])
        .pipe(htmlmin({
            removeEmptyAttributes: true,
            collapseBooleanAttributes: false,
            collapseWhitespace: true,
            caseSensitive: true
        }))
        .pipe(ngHtml2js({
            moduleName: gulp.config.module
        }))
        .pipe(gulp.dest('target/tmp/partials'))
        .pipe(size());
});

gulp.task('inject-js', ['ts'], function () {
    return gulp.src('app/index.html')
        .pipe(gulpInject(
            gulp.src(['target/tmp/js/**/*.js', '!target/tmp/js/**/*test.js'])
                .pipe(naturalSort())
                .pipe(angularFilesort()),
            {
                relative: false,
                ignorePath: "target/tmp",
                addRootSlash: false
            }
        ))
        .pipe(gulpInject(
            gulp.src(['app/**/*.js', '!app/bower_components/**/*', '!app/**/*Test.js', '!app/**/*test.js'])
                .pipe(naturalSort())
                .pipe(angularFilesort()),
            {
                relative: true,
                addRootSlash: false
            }
        ))
        .pipe(gulp.dest('app'));
});

gulp.task('fonts', function () {
    return gulp.src('app/bower_components/**/*')
        .pipe(filter('**/*.{eot,ttf,woff,woff2}'))
        .pipe(flatten())
        .pipe(gulp.dest('target/tmp/fonts'))
        .pipe(gulp.dest('target/dist/fonts'))
        .pipe(size());
});

gulp.task('images', function () {
    return gulp.src(['app/**/img/**/*', '!app/bower_components/**/*'])
        .pipe(gulp.dest('target/dist'))
        .pipe(size());
});

gulp.task('build', ['version', 'inject', 'images', 'fonts', 'eslint'], function (callback) {
    callback();
});

gulp.task('version', function () {
    var json = JSON.parse(fs.readFileSync('./package.json'));
    util.log(util.colors.blue.bold("Gript building " + json.name + " " + json.version + "..."));
});
