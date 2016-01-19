/*jslint node: true*/

'use strict';

var gulp = require('gulp'),
    ex = require('gulp-expect-file');

// require the tasks for the setup as part of this project
require('require-dir')('./tasks');

// Register our default task
gulp.task('default', ['bower', 'js', 'build-styles', 'fonts', 'server', 'proxy', 'eslint', 'jslint', 'scsslint', 'test', 'watch']);
gulp.task('dist:serve', ['dist', 'server:dist']);


// Set the config to use across the gulp build
gulp.config = {
    module: 'gulp-angular-sass-appbuilder',
    hostHeader: 'gulp-angular-sass-appbuilder',
    url: 'http://gulp-angular-sass-appbuilder',
    repository: 'http://nykredit.github.com/gulp-angular-sass-appbuilder.git'
};

// verify that the build setup can produce the expected artifacts
gulp.task('verify-package-foundation', ['build'], function () {
    gulp.src(['target/dist/index.html'])
        .pipe(ex.real('target/dist/index.html'));
    gulp.src(['target/dist/app.manifest'])
        .pipe(ex.real('target/dist/app.manifest'));

    gulp.src(['target/dist/styles/main-*.css'])
        .pipe(ex.real('target/dist/styles/main-*.css'));
    gulp.src(['target/dist/styles/vendor-*.css'])
        .pipe(ex.real('target/dist/styles/vendor-*.css'));

    gulp.src(['target/dist/scripts/main-*.js'])
        .pipe(ex.real('target/dist/scripts/main-*.js'));
    gulp.src(['target/dist/scripts/vendor-*.js'])
        .pipe(ex.real('target/dist/scripts/vendor-*.js'));

    gulp.src(['target/dist/img/*.png'])
        .pipe(ex.real('target/dist/img/*.png'));
    gulp.src(['target/dist/img/*.ico'])
        .pipe(ex.real('target/dist/img/*.ico'));
    gulp.src(['target/dist/fonts/*'])
        .pipe(ex.real('target/dist/fonts/glyphicons-halflings-regular.*'));
});


gulp.task('create-package', ['dist'], function () {
    gulp.src(['tasks/*.js', '!tasks/karma.conf.js'])
        .pipe(gulp.dest('target/gulp-angular-sass-appbuilder/tasks'));
    gulp.src(['package/*'])
        .pipe(gulp.dest('target/gulp-angular-sass-appbuilder'));
    gulp.src(['package/karma.conf.js'])
        .pipe(gulp.dest('target/gulp-angular-sass-appbuilder/tasks'));
});

// verify that the npm package contains the files it should
gulp.task('verify-package', function () {
    gulp.src(['target/gulp-angular-sass-appbuilder/index.js'])
        .pipe(ex.real('target/gulp-angular-sass-appbuilder/index.js'));
    gulp.src(['target/gulp-angular-sass-appbuilder/package.json'])
        .pipe(ex.real('target/gulp-angular-sass-appbuilder/package.json'));
    gulp.src(['target/gulp-angular-sass-appbuilder/sample-gulpfile.js'])
        .pipe(ex.real('target/gulp-angular-sass-appbuilder/sample-gulpfile.js'));
    gulp.src(['target/gulp-angular-sass-appbuilder/*.md'])
        .pipe(ex.real('target/gulp-angular-sass-appbuilder/README.md'));
    gulp.src(['target/gulp-angular-sass-appbuilder/tasks/*.gulp.js'])
        .pipe(ex.real('target/gulp-angular-sass-appbuilder/tasks/*.gulp.js'));
    gulp.src(['target/gulp-angular-sass-appbuilder/tasks/*.conf.js'])
        .pipe(ex.real('target/gulp-angular-sass-appbuilder/tasks/karma.conf.js'));
});
