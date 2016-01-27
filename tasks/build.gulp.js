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
    sequence('version', 'inject-bower', 'inject-styles', 'inject-partials', 'inject-js', callback);
});

gulp.task('inject-bower', ['bower-download'], function () {
    util.log(util.colors.blue.bold('Injecting Bower dependencies...'));
    return gulp.src('app/index.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('bower-download', function () {
    util.log(util.colors.blue.bold('Downloading Bower dependencies...'));
    return bower('app/bower_components');
});

gulp.task('inject-styles', ['styles'], function () {
    util.log(util.colors.blue.bold('Injecting compiled Sass...'));
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
    util.log(util.colors.blue.bold('Compiling Sass files...'));
    return gulp.src(['app/app.scss'])
        .pipe(sass())
        .pipe(gulp.dest('target/tmp/styles'));
});

gulp.task('inject-partials', ['partials'], function () {
    util.log(util.colors.blue.bold('Injecting $templateCache partials...'));
    return gulp.src('app/index.html')
        .pipe(gulpInject(
            gulp.src('target/tmp/partials/**/*.js', {read: false}),
            {
                name: "partials",
                relative: false,
                ignorePath: "target/tmp",
                addRootSlash: false
            }
        ))
        .pipe(gulp.dest('app'));
});

gulp.task('partials', function () {
    util.log(util.colors.blue.bold('Generating $templateCache partials...'));
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
    util.log(util.colors.blue.bold('Injecting JavaScript files...'));
    return gulp.src('app/index.html')
        .pipe(gulpInject(
            gulp.src(['app/**/*.js', 'target/tmp/js/**/*.js', '!app/bower_components/**/*', '!**/*_test.js'])
                .pipe(naturalSort())
                .pipe(angularFilesort()),
            {
                relative: false,
                ignorePath: "target/tmp",
                addRootSlash: false
            }
        ))
        .pipe(gulp.dest('app'));
});

gulp.task('fonts', function () {
    util.log(util.colors.blue.bold('Copying fonts...'));
    return gulp.src('app/bower_components/**/*')
        .pipe(filter('**/*.{eot,ttf,woff,woff2}'))
        .pipe(flatten())
        .pipe(gulp.dest('target/tmp/fonts'))
        .pipe(gulp.dest('target/dist/fonts'))
        .pipe(size());
});

gulp.task('images', function () {
    util.log(util.colors.blue.bold('Copying images...'));
    return gulp.src(['app/**/img/**/*', '!app/bower_components/**/*'])
        .pipe(gulp.dest('target/dist'))
        .pipe(size());
});

gulp.task('build', ['inject', 'images', 'fonts', 'eslint'], function (callback) {
    util.log(util.colors.blue.bold('Starting build...'));
    callback();
});

gulp.task('version', function (callback) {
    var json = JSON.parse(fs.readFileSync('./package.json'));
    util.log(util.colors.blue.bold("| \\| \\ \\ / / |/ / _ \\ __|   \\_ _|_   _|"));
    util.log(util.colors.blue.bold("| .` |\\ V /| ' <|   / _|| |) | |  | |"));
    util.log(util.colors.blue.bold("|_|\\_| |_| |_|\\_\\_|_\\___|___/___| |_|"));

    util.log(util.colors.blue.bold(json.name + " " + json.version));
});