/*jslint node: true */

'use strict';

var gulp = require('gulp-angular-sass-appbuilder');

// Set the config to use across the gulp build
gulp.config = {
    module: 'sample',
    hostHeader: 'no-specified-hostHeader',
    url: 'http://no-specified-project-url',
    repository: 'http://git.nykreditnet.net/scm/dist/xpa-no-specified-project.git'
};

// Register default task
gulp.task('default', ['bower', 'js', 'styles', 'fonts', 'server', 'proxy', 'test', 'watch']);
gulp.task('dist:serve', ['dist', 'server:dist']);
