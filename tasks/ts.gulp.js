'use strict';

module.exports = function (gulp, paths) {

    var path = require('path'),
        sourcemaps = require('gulp-sourcemaps'),
        ts = require('gulp-typescript'),
        _ = require('lodash'),
        defaultOptions = {
            noImplicitAny: false,
            target: "es5",
            sourceMap: true,
            declarationFiles: false,
            noResolve: false,
            removeComments: false,
            preserveConstEnums: true
        };

    /**
     * compile all typescript files and sourcemaps from /app and output them to /target/tmp
     */
    gulp.task('ts', ['lint-ts'], function () {
        var options = _.merge({}, defaultOptions, gulp.config.typeScript),
            tsProject = ts.createProject(options);
        return gulp.src(path.join(paths.src.app, '**/*.ts'))
                .pipe(sourcemaps.init())
                .pipe(tsProject())
                .pipe(sourcemaps.write('maps'))
                .pipe(gulp.dest(paths.target.tmp.js));
    });
};
