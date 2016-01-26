'use strict';

var angularFilesort = require('gulp-angular-filesort'),
    bower = require('gulp-bower'),
    debug = require('gulp-debug'),
    filter = require('gulp-filter'),
    flatten = require('gulp-flatten'),
    gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    gulpInject = require('gulp-inject'),
    htmlmin = require('gulp-htmlmin'),
    minifyCss = require('gulp-cssnano'),
    naturalSort = require('gulp-natural-sort'),
    ngAnnotate = require('gulp-ng-annotate'),
    ngHtml2js = require('gulp-ng-html2js'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    //uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    wiredep = require('wiredep').stream;

gulp.task('bower-download', function () {
    return bower('app/bower_components');
});

gulp.task('bower', function () {
    return gulp.src('app/index.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('js', function () {
    return gulp.src('app/index.html')
        .pipe(gulpInject(
            gulp.src(['app/**/*.js', '!app/bower_components/**/*', '!**/*_test.js'])
                .pipe(naturalSort())
                .pipe(angularFilesort()),
            {relative: true}
        ))
        .pipe(gulp.dest('app'));
});

gulp.task('styles', function () {
    return gulp.src(['app/app.scss'])
        .pipe(sass())
        .pipe(gulp.dest('target/tmp/styles'));
});

gulp.task('partials', function () {
    return gulp.src(['app/**/*.html', '!app/index.html', '!app/bower_components/**/*'])
        .pipe(htmlmin({
            removeEmptyAttributes: true,
            collapseBooleanAttributes: false,
            collapseWhitespace: true,
            caseSensitive: true
        }))
        .pipe(ngHtml2js({
            moduleName: gulp.config.module
        }))
        .pipe(gulp.dest('target/tmp/js/partials'))
        .pipe(size());
});

gulp.task('fonts', function () {
    return gulp.src('app/bower_components/**/*')
        .pipe(filter('**/*.{eot,ttf,woff,woff2}'))
        .pipe(flatten())
        .pipe(gulp.dest('target/tmp/fonts'))
        .pipe(gulp.dest('target/dist/fonts'))
        .pipe(size());
});

gulp.task('images', function () {
    return gulp.src(['app/**/img/**/*', '!app/bower_components/**/*'])
        .pipe(gulp.dest('target/dist'))
        .pipe(size());
});

gulp.task('build', ['bower', 'js', 'ts', 'images', 'fonts', 'styles', 'partials', 'eslint', 'scsslint'], function () {
    return gulp.src('app/index.html')
        .pipe(gulpInject(gulp.src('target/tmp/**/*.js'), {
            read: false,
            starttag: '<!-- inject:partials -->',
            addRootSlash: false,
            addPrefix: '..'
        }))
        .pipe(useref())
        .pipe(gulpIf(['**/*.js', '**/*.css'], rev()))
        .pipe(gulpIf('*.js', ngAnnotate()))
        //.pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', minifyCss()))
        .pipe(debug())
        .pipe(revReplace())
        /*.pipe(gulpIf('*.html', htmlmin({
         removeEmptyAttributes: true,
         collapseBooleanAttributes: false,
         collapseWhitespace: true,
         caseSensitive: true
         })))*/
        .pipe(gulp.dest('target/dist'))
        .pipe(size());
});
