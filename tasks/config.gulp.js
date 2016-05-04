'use strict';

module.exports = function (gulp, paths) {
    var fs = require('fs'),
        ngConstant = require('gulp-ng-constant'),
        _ = require('lodash');

    gulp.task('config', function () {
        var src = (_.has(gulp.config, 'app') && _.has(gulp.config.app, 'constantsFile')) ? gulp.config.app.constantsFile : paths.src.constants;

        if (fs.existsSync(src)) {
            gulp.src(src)
                .pipe(ngConstant({
                    name: gulp.config.app.module,
                    deps: false
                }))
                .pipe(gulp.dest(paths.target.tmp.js));
        }
    });
};
