'use strict';

module.exports = function (gulp, paths) {

    var bowerDeps,
        filenames = require("gulp-filenames"),
        path = require('path'),
        Server = require('karma').Server,
        wiredep = require('wiredep');

    // Runs the unit tests
    gulp.task('test', ['get-sources'], function (done) {
        bowerDeps = wiredep({
            directory: paths.bower,
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
        return gulp.src(
            [
                path.join(paths.src.app, '**/*.js'),
                path.join(paths.target.tmp.js, '**/*.js'),
                path.join(paths.target.tmp.partials, '**/*.js')
            ], {base: '.'})
            .pipe(filenames('js'));
    });
};


