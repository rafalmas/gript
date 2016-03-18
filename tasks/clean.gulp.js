'use strict';

module.exports = function (gulp, paths) {

    var del = require('del'),
        util = require('gulp-util');

    function clean(path, done) {
        util.log(util.colors.blue.bold('Cleaning ' + path + "..."));
        del(path, done).then(function () {
            util.log(util.colors.blue.bold('...done cleaning ' + path + "."));
            done();
        });
    }

    gulp.task('clean', function (done) {
        clean(paths.target.base, done);
    });

    gulp.task('clean-dist', function (done) {
        clean(paths.target.dist.base, done);
    });

    gulp.task('clean-tmp', function (done) {
        clean(paths.target.tmp.base, done);
    });

    gulp.task('clean-js', function (done) {
        clean(paths.target.tmp.js, done);
    });

    gulp.task('clean-partials', function (done) {
        clean(paths.target.tmp.partials, done);
    });

    gulp.task('clean-styles', function (done) {
        clean(paths.target.tmp.styles, done);
    });

    gulp.task('clean-bower', function (done) {
        clean(paths.bower, done);
    });
};
