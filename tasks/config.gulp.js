'use strict';

module.exports = function (gulp, paths) {
    var ngConstant = require('gulp-ng-constant');

    gulp.task('config', function () {
        var src = gulp.config.app && gulp.config.app.configFile ? gulp.config.app.configFile : paths.src.config;

        gulp.src(src)
            .pipe(ngConstant({
                name: gulp.config.app.module,
                deps: false
            }))
            .pipe(gulp.dest(paths.target.tmp.js));
    });
};
