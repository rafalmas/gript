'use strict';

module.exports = function (gulp) {

    var release = require('gulp-git-release');

    gulp.task('prerelease', ['dist'], function () {
        return gulp.src('target/dist/**').pipe(release({
            prefix: 'target/dist',
            release: false,
            repository: gulp.config.repository
        }));
    });

    gulp.task('release', ['dist'], function () {
        return gulp.src('target/dist/**').pipe(release({
            prefix: 'target/dist',
            release: true,
            repository: gulp.config.repository
        }));
    });
};
