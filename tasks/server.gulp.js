'use strict';

module.exports = function (gulp, paths) {

    var connect = require('gulp-connect'),
        _ = require('lodash'),
        projectRoot = process.cwd(),
        defaults = {
            root: ['app', projectRoot],
            port: 8080,
            host: 'localhost',
            livereload: {
                port: 35729
            }
        };

    gulp.task('server', ['mocks'], function () {
        var options = _.merge({}, defaults, gulp.config.server);
        connect.server(options);
    });

    gulp.task('server:dist', ['mocks'], function () {
        connect.server({
            root: paths.target.dist.base
        });
    });
};
