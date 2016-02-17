'use strict';

module.exports = function (gulp) {

    var watch = require('gulp-watch'),
        livereload = require('gulp-livereload'),
        _ = require('lodash'),
        defaults = {
            livereload: {
                port: 35729
            }
        },
        watchOptions = {
            usePolling: true,
            awaitWriteFinish: {
                stabilityThreshold: 2000,
                pollInterval: 100
            }
        };

    gulp.task('watch', function () {
        var options = _.merge({}, defaults, gulp.config.server);
        livereload.listen(options.livereload.port);

        watch('*.js', watchOptions, function () {
            gulp.start('lint-js', function () {
                livereload.reload();
            });
        });
        watch(['app/**/*.js'], watchOptions, function () {
            gulp.start(['lint-js', 'test'], function () {
                livereload.reload();
            });
        });
        watch(['!app/**/*Test.ts', '!app/**/*.*test.ts', 'app/**/*.ts'], watchOptions, function () {
            gulp.start('inject-js', function () {
                livereload.reload();
            });
        });
        watch(['app/**/*Test.ts', 'app/**/*.*test.ts'], watchOptions, function () {
            gulp.start('test', function () {
                livereload.reload();
            });
        });
        watch('app/**/*.scss', watchOptions, function () {
            gulp.start('inject-styles', function () {
                livereload.reload();
            });
        });
        watch(['!app/index.html', 'app/**/*.html'], watchOptions, function () {
            gulp.start('inject-partials', function () {
                livereload.reload();
            });
        });
        watch('bower.json', watchOptions, function () {
            gulp.start('inject-bower', function () {
                livereload.reload();
            });
        });
    });
};
