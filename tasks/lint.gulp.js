'use strict';

var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    fs = require('fs'),
    scsslint = require('gulp-scss-lint'),
    tslint = require('gulp-tslint'),
    srcFiles = ['app/**/*.js', 'gulpfile.js', 'tasks/*.js', '!app/bower_components/**/*', '!node_modules/**/*', '!app/patch/**/*'],
    scssFiles = ['app/*.scss', 'app/sections/**/*.scss', 'app/components/**/*.scss'],
    tsFiles = ['app/**/*.ts', '!app/bower_components/**/*'];

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

gulp.task('scsslint', function () {
    return gulp.src(scssFiles)
        .pipe(scsslint({
            'filePipeOutput': 'scss-lint-result.xml'
        }))
        .pipe(gulp.dest('target'));
});

/**
 * lint all TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(tsFiles)
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});


