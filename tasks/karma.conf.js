'use strict';

module.exports = function (config) {
    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
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
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        singleRun: false
    });
};
