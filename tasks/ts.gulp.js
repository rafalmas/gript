'use strict';

var gulp = require('gulp'),
    gulpInject = require('gulp-inject'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps');

/**
 * inject compiles ts into the index.html
 */
gulp.task('ts', ['ts-compile'], function () {
    return gulp.src('app/index.html')
        .pipe(gulpInject(gulp.src('target/tmp/js/all.js'), {relative: true}))
        .pipe(gulp.dest('app'));
});

/**
 * compile all typescript files and sourcemaps from /app and output them to /target/tmp
 */
gulp.task('ts-compile', ['ts-lint'], function () {

    var tsProject = ts.createProject({
            "compilerOptins": {
                "noImplicitAny": true,
                "target": "es5",
                "sourceMap": true,
                "declarationFiles": true,
                "noExternalResolve": false,
                "sortOutput": true,
                "removeComments": false,
                "preserveConstEnums": true
            },
            out: 'all.js'
        }),

        tsResult = gulp.src(['app/**/*.ts', '!app/bower_components/**/*'])
            .pipe(sourcemaps.init())
            .pipe(ts(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('target/tmp/js'));
});

