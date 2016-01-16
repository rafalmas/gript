/*jslint node: true, regexp: true, stupid: true */

'use strict';

var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    fs = require('fs'),
    jslint = require('gulp-jslint'),
    scsslint = require('gulp-scss-lint'),
    srcFiles = ['/**/*.js', 'tasks/*.js', 'gulpfile.js', '!app/bower_components/**/*', '!app/patch/**/*'],
    scssFiles = ['app/*.scss', 'app/sections/**/*.scss', 'app/components/**/*.scss'];

// Runs ESLint
gulp.task('lint', ['jslint', 'lint-scss'], function () {
    return gulp.src(srcFiles)
        .pipe(eslint.formatEach('stylish', process.stderr))
        .pipe(eslint.failOnError());
});

// Runs ESLint with Checkstyle-formatted output
gulp.task('lint-checkstyle', function () {
    var out;
    if (!fs.existsSync('target')) {
        fs.mkdirSync('target');
    }
    out = fs.createWriteStream('target/lint-result.xml');
    return gulp.src(srcFiles)
        .pipe(eslint())
        .pipe(eslint.format('checkstyle', out));
});

// Runs JSLint
gulp.task('jslint', function () {
    return gulp.src(srcFiles)
        .pipe(jslint({
            errorsOnly: true
        }))
        .on('error', function (error) {
            console.error(String(error));
        });
});


//To enable 'checkstyle' reporting format see: https://gist.github.com/luislavena/f064211759ee0f806c88
gulp.task('lint-scss', function () {
    return gulp.src(scssFiles)
        .pipe(scsslint({
            //'reporterOutputFormat': 'Checkstyle',
            'filePipeOutput': 'scss-lint-result.xml'
        }))
        .pipe(gulp.dest('target/scss-lint-result'));
});


