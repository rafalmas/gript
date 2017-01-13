'use strict';

module.exports = function (gulp, paths) {

    var appcache = require('gulp-appcache'),
        debug = require('gulp-debug'),
        gulpIf = require('gulp-if'),
        htmlmin = require('gulp-htmlmin'),
        minifyCss = require('gulp-cssnano'),
        ngAnnotate = require('gulp-ng-annotate'),
        path = require('path'),
        replace = require('gulp-replace'),
        rev = require('gulp-rev'),
        revReplace = require('gulp-rev-replace'),
        sequence = require('run-sequence').use(gulp),
        size = require('gulp-size'),
        uglify = require('gulp-uglify'),
        useref = require('gulp-useref'),
        _ = require('lodash'),
        minifyDefaults = {
            html: {
                removeEmptyAttributes: true,
                collapseBooleanAttributes: false,
                collapseWhitespace: true,
                caseSensitive: true
            },
            css: {
                safe: true,
                autoprefixer: false,
                discardUnused: false,
                reduceIdents: false,
                mergeIdents: false
            },
            javascript: {
                mangle: false,
                preserveComments: false
            }
        };

    gulp.task('dist', function (callback) {
        if (gulp.config.skipAppCacheGeneration) {
            sequence('clean', ['minify'], callback);
        } else {
            sequence('clean', ['appcache-create', 'appcache-include'], callback);
        }
    });

    gulp.task('appcache-create', ['minify'], function () {
        return gulp.src(path.join(paths.target.dist.base, '**/*'))
            .pipe(appcache({
                filename: 'app.manifest',
                exclude: ['app.manifest', 'index.html'],
                timestamp: true
            }))
            .pipe(gulp.dest(paths.target.dist.base));
    });

    gulp.task('appcache-include', ['minify'], function () {
        return gulp.src(path.join(paths.target.dist.base, 'index.html'))
            .pipe(replace(/<html /, '<html manifest="app.manifest" '))
            .pipe(gulp.dest(paths.target.dist.base));
    });

    gulp.task('minify', ['build'], function () {
        var minificationOptions = _.merge({}, minifyDefaults, gulp.config.minification);

        return gulp.src(paths.src.index)
            .pipe(useref({ searchPath: [paths.src.app, paths.bower, paths.target.tmp]}))
            .pipe(gulpIf(['**/*.js', '**/*.css'], rev()))
            .pipe(gulpIf('*.js', ngAnnotate()))
            .pipe(gulpIf('*.js', uglify(minificationOptions.javascript)))
            .pipe(gulpIf('*.css', minifyCss(minificationOptions.css)))
            .pipe(debug())
            .pipe(revReplace())
            .pipe(gulpIf('*.html', htmlmin(minificationOptions.html)))
            .pipe(gulp.dest(paths.target.dist.base))
            .pipe(size());
    });
};
