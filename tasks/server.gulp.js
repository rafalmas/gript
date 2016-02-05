'use strict';

module.exports = function (gulp) {

    var connect = require('gulp-connect');

    gulp.task('server', function () {
        connect.server({
            root: ['app', 'target/tmp', '.'],
            livereload: true
        });
    });

    gulp.task('server:dist', function () {
        connect.server({
            root: 'target/dist'
        });
    });
};
