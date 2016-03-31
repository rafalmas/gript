'use strict';

module.exports = function (gulp, paths) {
    var ngConstant = require('gulp-ng-constant');

    gulp.task('config', function () {
        var src = gulp.config.app && gulp.config.app.constantsFile ? gulp.config.app.constantsFile : paths.src.constants;

        gulp.src(src)
            .pipe(ngConstant({
                name: gulp.config.app.module,
                deps: false
            }))
            .pipe(gulp.dest(paths.target.tmp.js));
    });
};
