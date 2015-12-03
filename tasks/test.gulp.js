/*jslint node: true */

'use strict';

var gulp = require('gulp'),
    angularFilesort = require('gulp-angular-filesort'),
    filenames = require("gulp-filenames"),
    path = require('path'),
    Server = require('karma').Server,
    wiredep = require('wiredep'),
    bowerDeps;

// Collects the js sources in the correct order
gulp.task('get-sources', function () {
    return gulp.src(['app/**/*.js', '!app/bower_components/**/*'], { base: '.' })
        .pipe(angularFilesort())
        .pipe(filenames('js'));
});

// Runs the unit tests
gulp.task('test', ['get-sources'], function (done) {
    bowerDeps = wiredep({
        directory: 'app/bower_components',
        dependencies: true,
        devDependencies: true
    });

    new Server({
     configFile: __dirname + '/karma.conf.js',
     files: bowerDeps.js.concat('node_modules/sinon/pkg/sinon.js', filenames.get('js'))
 }, done).start();

});


