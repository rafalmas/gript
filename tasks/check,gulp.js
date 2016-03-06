'use strict';

module.exports = function (gulp) {
    var _ = require('lodash'),
        util = require('gulp-util');

    function check(element) {
        if (!_.has(gulp.config, element)) {
            util.log('Your config is missing the mandatory '
                + util.colors.red(element)
                + ' value. Refer to the readme.md and check the gulpfile.js');
            process.exit(1);
        }
    }

    /**
     * The tasks cheks if gulpfile.js contains all mandatory configuration. Logs a message and stops the build.
     */
    gulp.task('check', function () {
        check('app');
        check('app.module');
    });
};
