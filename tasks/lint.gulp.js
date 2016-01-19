/*jslint node: true, regexp: true, stupid: true */
'use strict';

var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    fs = require('fs'),
    jslint = require('gulp-jslint'),
    scsslint = require('gulp-scss-lint'),
    srcFiles = ['app/**/*.js', 'gulpfile.js', 'tasks/*.js', '!app/bower_components/**/*', '!node_modules/**/*'],
    scssFiles = ['app/*.scss', 'app/sections/**/*.scss', 'app/components/**/*.scss'];

// Runs ESLint
gulp.task('eslint', function () {
    var out;
    if (!fs.existsSync('target')) {
        fs.mkdirSync('target');
    }
    out = fs.createWriteStream('target/es-lint-result.xml');
    return gulp.src(srcFiles)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.format('checkstyle', out))
        .pipe(eslint.failAfterError());
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

gulp.task('scsslint', function () {
    return gulp.src(scssFiles)
        .pipe(scsslint({
            'filePipeOutput': 'scss-lint-result.xml'
        }))
        .pipe(gulp.dest('target'));
});


