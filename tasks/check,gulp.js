'use strict';

module.exports = function (gulp, paths) {
    var _ = require('lodash'),
        fs = require('fs'),
        path = require('path'),
        util = require('gulp-util'),
        projectRoot = process.cwd();

    function check(element) {
        if (!_.has(gulp.config, element)) {
            util.log('Your config is missing the mandatory '
                + util.colors.red(element)
                + ' value. Refer to the readme.md and check the gulpfile.js');
            process.exit(1);
        }
    }

    function checkFile(filename) {
        if (!fs.existsSync(filename)) {
            util.log('Your project is missing the file: ' + util.colors.red(filename) + '. Refer to the readme.md');
            process.exit(1);
        }
    }

    /**
     * The task checks if gulpfile.js contains all mandatory configuration. Logs a message and stops the build.
     */
    gulp.task('check', function () {
        check('app');
        check('app.module');

        checkFile(path.join(projectRoot, paths.linters.scss));
        checkFile(path.join(projectRoot, paths.linters.eslint));
    });
};
