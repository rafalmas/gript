'use strict';

module.exports = function (gulp, paths) {

    var bowerDeps,
        filenames = require("gulp-filenames"),
        path = require('path'),
        projectRoot = process.cwd(),
        Server = require('karma').Server,
        wiredep = require('wiredep'),
        _ = require('lodash'),

        karmaDefaults = {
            basePath: projectRoot,
            frameworks: ['jasmine', 'sinon', 'angular-filesort'],
            files: ['**/*/*_test.js'],
            exclude: ['**/*/bower_components'],
            preprocessors: {
                '!(patch)/**/!(*_test).js': ['coverage']
            },
            reporters: ['progress', 'junit', 'coverage'],
            junitReporter: {
                outputDir: 'target',
                outputFile: 'test-results.xml',
                suite: '',
                useBrowserName: false
            },
            coverageReporter: {
                type: 'cobertura',
                dir: 'target',
                file: 'cobertura-coverage.xml',
                subdir: '.'
            },
            angularFilesort: {
                whitelist: [
                    'app/**/*.js',
                    'target/tmp/js/**/*.js'
                ]
            },
            plugins: [
                'karma-jasmine',
                'karma-sinon',
                'karma-angular-filesort',
                'karma-phantomjs-launcher',
                'karma-chrome-launcher',
                'karma-junit-reporter',
                'karma-coverage',
                'karma-ng-html2js-preprocessor'
            ],
            port: 9876,
            colors: true,
            logLevel: 'info',
            autoWatch: true,
            browsers: ['PhantomJS'],
            captureTimeout: 60000,
            singleRun: true
        };

    // Runs the unit tests
    gulp.task('test', ['get-sources'], function (done) {
        var karmaOptions = _.merge({}, karmaDefaults, gulp.config.karma);
        bowerDeps = wiredep({
            directory: paths.bower,
            dependencies: true,
            devDependencies: true
        });
        karmaOptions.files = bowerDeps.js.concat(filenames.get('js'));
        new Server(karmaOptions, function () {
            done();
        }).start();
    });

    gulp.task('get-sources', ['ts'], function () {
        return gulp.src(
            [
                path.join(paths.src.app, '**/*.js'),
                path.join(paths.target.tmp.js, '**/*.js'),
                path.join(paths.target.tmp.partials, '**/*.js')
            ], {base: '.'})
            .pipe(filenames('js'));
    });
};


