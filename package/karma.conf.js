/*global module */

module.exports = function (config) {
    'use strict';
    config.set({
        basePath: '../../../',
        frameworks: ['jasmine'],
        preprocessors: {
            'app/!(patch)/**/!(*_test).js': ['coverage'],
            'target/tmp/js/**/!(all|*_test).js': ['coverage']
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
