'use strict';

module.exports = function (gulp) {

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

    gulp.task('server', function () {
        var options = _.merge({}, defaults, gulp.config.server);
        connect.server(options);
    });

    gulp.task('server:dist', function () {
        connect.server({
            root: 'target/dist'
        });
    });
};
