/*jslint node: true*/
/*jscs: disable requireCamelCaseOrUpperCaseIdentifiers*/

'use strict';

var gulp = require('gulp'),
    protractor = require('gulp-protractor').protractor,
    update = require('gulp-protractor').webdriver_update;

// Downloads the selenium webdriver
gulp.task('webdriver_update', update);

gulp.task('protractor', ['webdriver_update', 'build', 'server'], function () {
    gulp.src(["./e2e-tests/**/*_e2e-test.js"])
        .pipe(protractor({
            configFile: 'e2e-tests/protractor-config.js',
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
