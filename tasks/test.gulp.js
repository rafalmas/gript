'use strict';

var
    bowerDeps,
    angularFilesort = require('gulp-angular-filesort'),
    filenames = require("gulp-filenames"),
    gulp = require('gulp'),
    Server = require('karma').Server,
    ts = require('gulp-typescript'),
    wiredep = require('wiredep');

// Runs the unit tests
gulp.task('test', ['get-sources'], function (done) {
    bowerDeps = wiredep({
        directory: 'app/bower_components',
        dependencies: true,
        devDependencies: true
    });
    new Server({
        configFile: __dirname + '/karma.conf.js',
        files: bowerDeps.js.concat('node_modules/sinon/pkg/sinon.js', filenames.get('js')),
        singleRun: true
    }, function () {
        done();
    }).start();
});

gulp.task('get-sources', ['compile-tests'], function () {
    return gulp.src(['app/**/*.js', 'target/tmp/js/**/*.js', 'target/tmp/partials/**/*.js', '!app/bower_components/**/*'], { base: '.' })
        .pipe(angularFilesort())
        .pipe(filenames('js'));
});

/**
 * compile all typescript files and sourcemaps from /app and output them to /target/tmp
 */
gulp.task('compile-tests', function () {
    var tsProject = ts.createProject({
            "compilerOptions": {
                "noImplicitAny": true,
                "target": "es5",
                "declarationFiles": true,
                "noExternalResolve": false,
                "sortOutput": true,
                "removeComments": false,
                "preserveConstEnums": true
            },
            out: 'all_test.js'
        }),
        tsResult = gulp.src(['app/**/*Test.ts', 'app/**/*test.ts', '!app/bower_components/**/*'])
            .pipe(ts(tsProject));

    return tsResult.js
        .pipe(gulp.dest('target/tmp/js'));
});


