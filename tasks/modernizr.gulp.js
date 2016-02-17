'use strict';

module.exports = function (gulp) {
    var modernizr = require('gulp-modernizr'),
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
        files = ['app/**/*.js', 'target/tmp/js/**/*.js', 'app/**/*.css', 'app/**/*.scss', '!target/tmp/js/modernizr.js'];

    gulp.task('modernizr', function () {
        var modernizrOptions = _.assign({}, modernizrDefaults, gulp.config.modernizr);

        return gulp.src(files)
            .pipe(modernizr('js/modernizr.js', modernizrOptions))
            .pipe(gulp.dest('target/tmp'));
    });
};
