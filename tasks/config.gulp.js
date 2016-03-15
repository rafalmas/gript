'use strict';

module.exports = function (gulp) {
    var ngConstant = require('gulp-ng-constant');

    gulp.task('config', function () {
        var src = gulp.config.app && gulp.config.app.configFile ? gulp.config.app.configFile : 'app/config.json';

        gulp.src(src)
            .pipe(ngConstant({
                name: gulp.config.app.module,
                deps: false
            }))
            .pipe(gulp.dest('target/tmp/js'));
    });
};
