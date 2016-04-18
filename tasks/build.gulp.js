'use strict';

module.exports = function (gulp, paths) {

    var angularFilesort = require('gulp-angular-filesort'),
        bower = require('gulp-bower'),
        filter = require('gulp-filter'),
        flatten = require('gulp-flatten'),
        fs = require('fs'),
        gulpInject = require('gulp-inject'),
        htmlmin = require('gulp-htmlmin'),
        naturalSort = require('gulp-natural-sort'),
        ngHtml2js = require('gulp-ng-html2js'),
        orderedSrc = require('gulp-src-ordered-globs'),
        path = require('path'),
        sass = require('gulp-sass'),
        sequence = require('run-sequence').use(gulp),
        size = require('gulp-size'),
        util = require('gulp-util'),
        wiredep = require('wiredep').stream,
        _ = require('lodash'),
        partialsMinifyDefaults = {
            html: {
                removeEmptyAttributes: true,
                collapseBooleanAttributes: false,
                collapseWhitespace: true,
                caseSensitive: true
            }
        },
        partialsDefaults = ['app/**/*.html'],
        projectRoot = process.cwd();

    gulp.task('inject', function (callback) {
        sequence('check', 'config', 'inject-bower', 'inject-styles', 'inject-partials', 'modernizr', 'inject-js', callback);
    });

    gulp.task('inject-bower', ['bower-download'], function () {
        return gulp.src(paths.src.index)
            .pipe(wiredep({
                directory: paths.bower
            }))
            .pipe(gulp.dest('app'));
    });

    gulp.task('bower-download', function () {
        return bower(path.join(projectRoot, paths.bower));
    });

    gulp.task('inject-styles', ['styles'], function () {
        return gulp.src(paths.src.index)
            .pipe(gulpInject(gulp.src(path.join(paths.target.tmp.styles, '**/*.css'), {read: false}),
                {
                    relative: true
                }))
            .pipe(gulp.dest('app'));
    });

    gulp.task('styles', ['lint-scss'], function () {
        return gulp.src(paths.src.scss)
            .pipe(sass())
            .pipe(gulp.dest(paths.target.tmp.styles));
    });

    gulp.task('inject-partials', ['partials'], function () {
        return gulp.src(paths.src.index)
            .pipe(gulpInject(
                gulp.src(path.join(paths.target.tmp.partials, '**/*.js'))
                    .pipe(naturalSort()),
                {
                    starttag: '<!-- inject:partials -->',
                    relative: true
                }
            ))
            .pipe(gulp.dest('app'));
    });

    gulp.task('partials', ['lint-html'], function () {
        var minificationOptions = _.merge({}, partialsMinifyDefaults, gulp.config.minification);

        if (!_.has(gulp.config, 'partials')) {
            gulp.config.partials = partialsDefaults;
        }

        gulp.config.partials.push('!' + paths.src.index);

        return gulp.src(gulp.config.partials)
            .pipe(htmlmin(minificationOptions.html))
            .pipe(ngHtml2js({
                moduleName: gulp.config.app.module
            }))
            .pipe(gulp.dest(paths.target.tmp.partials))
            .pipe(size());
    });

    gulp.task('inject-js', ['test'], function () {
        return gulp.src(paths.src.index)
            .pipe(gulpInject(
                gulp.src(paths.javaScriptToInject)
                    .pipe(naturalSort())
                    .pipe(angularFilesort()),
                {
                    relative: true
                }
            ))
            .pipe(gulp.dest(paths.src.app));
    });

    gulp.task('fonts', function () {
        var foldersToScan = gulp.config.hasOwnProperty('fontsScan') ? gulp.config.fontsScan : [ paths.bower ],
            folders = foldersToScan.map(function (folder) {
                util.log('extracting fonts from ' + folder);
                return path.join(projectRoot, folder, '**/*');
            });

        return gulp.src(folders)
            .pipe(filter(paths.src.fonts))
            .pipe(flatten())
            .pipe(gulp.dest(paths.target.dist.fonts))
            .pipe(gulp.dest(paths.target.tmp.fonts))
            .pipe(size());
    });

    gulp.task('images', function () {
        return gulp.src(paths.src.img)
            .pipe(gulp.dest(paths.target.dist.base))
            .pipe(gulp.dest(paths.target.tmp.base))
            .pipe(size());
    });

    gulp.task('staticFiles', function () {
        var staticFiles = ['app/**/*.html', 'app/**/*.json', '!app/index.html'];

        if (!_.has(gulp.config, 'partials')) {
            gulp.config.partials = partialsDefaults;
        }

        //exclude partials from copying
        gulp.config.partials.map(function (file) {
            if (file.startsWith('!')) {
                staticFiles.push(file.substr(1));
            } else {
                staticFiles.push('!' + file);
            }
        });

        return orderedSrc(staticFiles, {base: 'app'})
            .pipe(gulp.dest(paths.target.dist.base))
            .pipe(gulp.dest(paths.target.tmp.base))
            .pipe(size());
    });

    gulp.task('resources', function () {
        return gulp.src(paths.src.resources)
            .pipe(gulp.dest(paths.target.dist.resources))
            .pipe(gulp.dest(paths.target.tmp.resources))
            .pipe(size());
    });

    gulp.task('lib', function () {
        return gulp.src(paths.src.lib)
            .pipe(gulp.dest(paths.target.dist.lib))
            .pipe(gulp.dest(paths.target.tmp.lib))
            .pipe(size());
    });

    gulp.task('build', ['version', 'inject', 'images', 'fonts', 'staticFiles', 'resources', 'lib', 'lint-js'], function (callback) {
        callback();
    });

    gulp.task('version', function () {
        var json = JSON.parse(fs.readFileSync('./package.json'));
        util.log(util.colors.blue.bold("Gript building " + json.name + " " + json.version + "..."));
    });
};

