'use strict';

module.exports = function (gulp) {

    var connect = require('gulp-connect'),
        projectRoot = process.cwd();

    gulp.task('server', function () {
        connect.server({
            root: ['app', projectRoot],
            livereload: true
        });
    });

    gulp.task('server:dist', function () {
        connect.server({
            root: 'target/dist'
        });
    });
};
