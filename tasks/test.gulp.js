'use strict';

module.exports = function (gulp) {

    var bowerDeps,
        filenames = require("gulp-filenames"),
        Server = require('karma').Server,
        wiredep = require('wiredep');

    // Runs the unit tests
    gulp.task('test', ['get-sources'], function (done) {
        bowerDeps = wiredep({
            directory: 'bower_components',
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

    gulp.task('get-sources', ['ts'], function () {
        return gulp.src(['app/**/*.js', 'target/tmp/js/**/*.js', 'target/tmp/partials/**/*.js'], {base: '.'})
            .pipe(filenames('js'));
    });
};


