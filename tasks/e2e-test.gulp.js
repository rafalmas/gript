'use strict';

module.exports = function (gulp, paths) {

    var protractor = require('gulp-protractor').protractor,
        update = require('gulp-protractor').webdriver_update;

    // Downloads the selenium webdriver
    gulp.task('webdriver_update', update);

    gulp.task('protractor', ['webdriver_update', 'build', 'server'], function () {
        gulp.src(paths.protractor.tests)
            .pipe(protractor({
                configFile: paths.protractor.config,
                args: ['--baseUrl', 'http://localhost:8080']
            }))
            .on('error', function (error) {
                console.error(String(error));
                this.emit('end');
            })
            .on('end', function () {
                process.exit(0);
            });
    });
};
