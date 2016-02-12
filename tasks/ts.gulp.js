'use strict';

module.exports = function (gulp) {

    var sequence = require('run-sequence').use(gulp),
        sourcemaps = require('gulp-sourcemaps'),
        ts = require('gulp-typescript');

    /**
     * compile all typescript files and sourcemaps from /app and output them to /target/tmp
     */
    gulp.task('ts', function (callback) {
        sequence('compile', 'test', callback);
    });

    gulp.task('compile', ['lint-ts'], function () {
        var tsProject = ts.createProject({
                "compilerOptions": {
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
            tsResult = gulp.src(['app/**/*.ts', '!app/**/*Test.ts', '!app/**/*test.ts'])
                .pipe(sourcemaps.init())
                .pipe(ts(tsProject));

        return tsResult.js
            .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest('target/tmp/js'));
    });
};
