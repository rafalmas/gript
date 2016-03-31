'use strict';

module.exports = function (gulp, paths) {
    var modernizr = require('gulp-modernizr'),
        path = require('path'),
        _ = require('lodash'),
        modernizrDefaults = {
            options: [
                'addTest',
                'html5printshiv',
                'testProp',
                'fnBind',
                'setClasses'
            ],
            'feature-detects': []
        },
        files = [
            path.join(paths.src.app, '**/*.js'),
            path.join(paths.src.app, '**/*.css'),
            path.join(paths.src.app, '**/*.scss'),
            path.join(paths.target.tmp.js, '**/*.js'),
            '!target/tmp/js/modernizr.js'
        ];

    gulp.task('modernizr', function () {
        var modernizrOptions = _.assign({}, modernizrDefaults, gulp.config.modernizr);

        return gulp.src(files)
            .pipe(modernizr('js/modernizr.js', modernizrOptions))
            .pipe(gulp.dest(paths.target.tmp.base));
    });
};
