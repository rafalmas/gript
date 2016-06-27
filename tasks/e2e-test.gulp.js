'use strict';

module.exports = function (gulp, paths) {

    var protractor = require('gulp-protractor').protractor,
        update = require('gulp-protractor').webdriver_update,
        params = process.argv,
        defaultBaseUrl = ['--baseUrl', 'http://localhost:8080'],
        args = params.length > 3 ? params.slice(3, params.length) : defaultBaseUrl;

    //Add baseUrl param if not in provided custom params
    args = args.concat(defaultBaseUrl.filter(function () {
        return args.indexOf('--baseUrl') < 0;
    }));

    // Downloads the selenium webdriver
    gulp.task('webdriver_update', update);

    gulp.task('protractor', ['webdriver_update', 'build', 'server'], function () {
        gulp.src(paths.protractor.tests)
            .pipe(protractor({
                configFile: paths.protractor.config,
                args: args
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
