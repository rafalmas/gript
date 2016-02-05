'use strict';

module.exports = function (gulp) {

    var release = function () {

    };

    gulp.task('prerelease', ['dist'], function () {
        gulp.src('target/dist/**').pipe(release({
            prefix: 'target/dist',
            release: false,
            repository: gulp.config.repository
        }));
    });

    gulp.task('release', ['dist'], function () {
        gulp.src('target/dist/**').pipe(release({
            prefix: 'target/dist',
            release: true,
            repository: gulp.config.repository
        }));
    });
};
