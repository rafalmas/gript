'use strict';

module.exports = function (gulp) {

    var eslint = require('gulp-eslint'),
        fs = require('fs'),
        util = require('gulp-util'),
        scsslint = require('gulp-scss-lint'),
        tslint = require('gulp-tslint'),
        htmlLint = require('gulp-htmllint'),
        srcFiles = ['app/**/*.js', 'gulpfile.js', 'tasks/*.js', '!app/patch/**/*'],
        scssFiles = 'app/**/*.scss',
        tsFiles = 'app/**/*.ts',
        htmlFiles = 'app/**/*.html';

    gulp.task('lint', ['lint-js', 'lint-ts', 'lint-scss', 'lint-html']);

    gulp.task('lint-js', function () {
        var out;
        if (!fs.existsSync('target')) {
            fs.mkdirSync('target');
        }
        out = fs.createWriteStream('target/es-lint-result.xml');
        return gulp.src(srcFiles)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.format('checkstyle', out))
            .pipe(eslint.failAfterError());
    });

    gulp.task('lint-scss', function () {
        return gulp.src(scssFiles)
            .pipe(scsslint({
                'reporterOutputFormat': 'Checkstyle',
                'filePipeOutput': 'scss-lint-result.xml'
            }))
            .pipe(gulp.dest('target'));
    });

    gulp.task('lint-ts', function () {
        return gulp.src(tsFiles)
            .pipe(tslint())
            .pipe(tslint.report('prose'));
    });

    function htmllintReporter(filepath, issues) {
        if (issues.length > 0) {
            issues.forEach(function (issue) {
                util.log(
                    util.colors.red('[html-lint] ') +
                    util.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') +
                    util.colors.red('(' + issue.code + ') ' + issue.msg)
                );
            });
        }
    }

    gulp.task('lint-html', function () {
        return gulp.src(htmlFiles)
            .pipe(htmlLint({}, htmllintReporter));
    });

    gulp.task('lint-html-index', function () {
        return gulp.src("app/index.html")
            .pipe(htmlLint({}, htmllintReporter));
    });
};


