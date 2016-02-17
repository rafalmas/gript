'use strict';

module.exports = function (gulp) {
    var eslint = require('gulp-eslint'),
        fs = require('fs'),
        xml = require('xmlbuilder'),
        util = require('gulp-util'),
        path = require('path'),
        scsslint = require('gulp-scss-lint'),
        tslint = require('gulp-tslint'),
        htmlLint = require('gulp-htmllint'),
        _ = require('lodash'),
        srcFiles = ['app/**/*.js', 'gulpfile.js', 'tasks/*.js', '!app/patch/**/*'],
        scssFiles = 'app/**/*.scss',
        tsFiles = 'app/**/*.ts',
        htmlFiles = 'app/**/*.html',
        tsReportFilename = 'target/ts-lint-result.xml',
        htmlReportFilename = 'target/html-lint-result.xml',
        sassReportFilename = 'target/scss-lint-result.xml',
        tsLintReportFile,
        htmlLintReportFile,
        sassLintReportFile,
        htmlReport,
        tsReport,
        sassReport,
        projectRoot = process.cwd(),
        reportIssues = function (filename, issues, report, msgProperty, lineProperty, columnProperty) {
            var fileElement;
            if (issues.length > 0) {
                fileElement = report.ele('file');
                issues.forEach(function (issue) {
                    var msg = _.get(issue, msgProperty),
                        line = _.get(issue, lineProperty),
                        column = _.get(issue, columnProperty);
                    util.log(filename + ": " + util.colors.red(msg) + " line " + line + " col. " + column);
                    fileElement.ele('error', {
                        'message': msg,
                        'line': line,
                        'severity': 'error'
                    });
                });
                fileElement.att('name', filename);
            }
        },
        reportTypeScriptIssues = function (issues, file) {
            reportIssues(file.path, issues, tsReport, 'failure', 'startPosition.line', 'startPosition.position');
        },
        reportHtmlIssues = function (filepath, issues) {
            reportIssues(filepath, issues, htmlReport, 'msg', 'line', 'column');
        },
        reportSassIssues = function (file) {
            reportIssues(file.path, file.scsslint.issues, sassReport, 'reason', 'line', 'column');
        };

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
        var stream;
        fs.unlink(sassReportFilename, function () {
            sassLintReportFile = fs.createWriteStream(sassReportFilename);
            sassReport = xml.create('checkstyle');
            stream = gulp.src(scssFiles)
                .pipe(scsslint({
                    config: path.join(projectRoot, '.scss-lint.yml'),
                    customReport: reportSassIssues
                }));

            stream.on('end', function () {
                sassLintReportFile.write(sassReport.doc().end({pretty: true}));
                sassLintReportFile.end();
            });

        });
    });

    gulp.task('lint-ts', function () {
        fs.unlink(tsReportFilename, function () {
            tsLintReportFile = fs.createWriteStream(tsReportFilename);
            tsReport = xml.create('checkstyle');
            gulp.src(tsFiles)
                .on('end', function () {
                    tsLintReportFile.write(tsReport.doc().end({pretty: true}));
                    tsLintReportFile.end();
                })
                .pipe(tslint({configuration: path.join(projectRoot, 'tslint.json')}))
                .pipe(tslint.report(reportTypeScriptIssues, {
                    summarizeFailureOutput: true,
                    emitError: false
                }));
        });
    });

    gulp.task('lint-html', function () {
        fs.unlink(htmlReportFilename, function () {
            htmlLintReportFile = fs.createWriteStream(htmlReportFilename);
            htmlReport = xml.create('checkstyle');
            gulp.src(htmlFiles)
                .on('end', function () {
                    htmlLintReportFile.write(htmlReport.doc().end({pretty: true}));
                    htmlLintReportFile.end();
                })
                .pipe(htmlLint({
                    config: path.join(projectRoot, '.htmllintrc'),
                    failOnError: false
                }, reportHtmlIssues));
        });
    });

    gulp.task('lint-html-index', function () {
        return gulp.src("app/index.html")
            .pipe(htmlLint({
                config: path.join(projectRoot, '.htmllintrc'),
                failOnError: false
            }));
    });
};


