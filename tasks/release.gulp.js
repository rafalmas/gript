'use strict';

module.exports = function (gulp, paths) {

    var path = require('path'),
        release = require('gulp-git-release');

    gulp.task('prerelease', ['dist'], function () {
        return gulp.src(path.join(paths.target.dist.base, '**')).pipe(release({
            prefix: 'target/dist',
            release: false,
            repository: gulp.config.repository
        }));
    });

    gulp.task('release', ['dist'], function () {
        return gulp.src(path.join(paths.target.dist.base, '**')).pipe(release({
            prefix: 'target/dist',
            release: true,
            repository: gulp.config.repository
        }));
    });
};
