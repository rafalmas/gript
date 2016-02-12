'use strict';

module.exports = function (gulp) {

    var watch = require('gulp-watch'),
        livereload = require('gulp-livereload'),
        _ = require('lodash'),
        defaults = {
            livereload: {
                port: 35729
            }
        };

    gulp.task('watch', function () {
        var options = _.merge({}, defaults, gulp.config.server);
        livereload.listen(options.livereload.port);

        watch('*.js', function () {
            gulp.start('eslint', function () {
                livereload.reload();
            });
        });
        watch(['app/**/*.js'], function () {
            gulp.start(['eslint', 'test'], function () {
                livereload.reload();
            });
        });
        watch(['!app/**/*Test.ts', '!app/**/*.*test.ts', 'app/**/*.ts'], function () {
            gulp.start('inject-js', function () {
                livereload.reload();
            });
        });
        watch(['app/**/*Test.ts', 'app/**/*.*test.ts'], function () {
            gulp.start('test', function () {
                livereload.reload();
            });
        });
        watch('app/**/*.scss', function () {
            gulp.start('inject-styles', function () {
                livereload.reload();
            });
        });
        watch(['!app/index.html', 'app/**/*.html'], function () {
            gulp.start('inject-partials', function () {
                livereload.reload();
            });
        });
        watch(['!app/index.html', 'app/**/*.html'], function () {
            gulp.start('inject-partials', function () {
                livereload.reload();
            });
        });
        watch('bower.json', function () {
            gulp.start('inject-bower', function () {
                livereload.reload();
            });
        });
    });
};
