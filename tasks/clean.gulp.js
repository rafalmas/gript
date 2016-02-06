'use strict';

module.exports = function (gulp) {

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
        clean('target', done);
    });

    gulp.task('clean-dist', function (done) {
        clean('target/dist', done);
    });

    gulp.task('clean-tmp', function (done) {
        clean('target/tmp', done);
    });

    gulp.task('clean-js', function (done) {
        clean('target/tmp/js', done);
    });

    gulp.task('clean-partials', function (done) {
        clean('target/tmp/partials', done);
    });

    gulp.task('clean-styles', function (done) {
        clean('target/tmp/styles', done);
    });

    gulp.task('clean-bower', function (done) {
        clean('bower_components', done);
    });
};
