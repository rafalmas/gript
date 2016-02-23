'use strict';

module.exports = function (gulp) {

    var sourcemaps = require('gulp-sourcemaps'),
        ts = require('gulp-typescript'),
        _ = require('lodash'),
        defaults = {
            compilerOptions: {
                noImplicitAny: true,
                target: "es5",
                sourceMap: true,
                declarationFiles: true,
                noExternalResolve: false,
                sortOutput: true,
                removeComments: false,
                preserveConstEnums: true
            }
        };

    /**
     * compile all typescript files and sourcemaps from /app and output them to /target/tmp
     */
    gulp.task('ts', ['lint-ts'], function () {
        var options = _.merge({}, defaults, gulp.config.typeScript),
            tsProject = ts.createProject({
                compilerOptions: options
            }),
            tsResult = gulp.src(['app/**/*.ts'])
                .pipe(sourcemaps.init())
                .pipe(ts(tsProject));

        return tsResult.js
            .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest('target/tmp/js'));
    });
};
