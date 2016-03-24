'use strict';

module.exports = function (gulp) {

    var sequence = require('run-sequence').use(gulp),
        paths = {
            bower: 'bower_components',
            src: {
                app: 'app',
                index: 'app/index.html',
                scss: 'app/app.scss',
                config: 'app/config.json',
                htmlPartials: ['app/**/*.tpl.html', '!app/index.html'],
                img: 'app/**/img/**/*',
                resources: 'app/resources/**/*',
                lib: 'app/lib/**/*',
                fonts: '**/*.{eot,ttf,woff,woff2}',
                staticFiles: ['app/**/*.html', 'app/**/*.json', '!app/**/*.tpl.html', '!app/index.html'],
                mocks: 'mocks/*.{json,yaml,js}'
            },
            target: {
                base: 'target',
                tmp: {
                    base: 'target/tmp',
                    js: 'target/tmp/js',
                    partials: 'target/tmp/partials',
                    styles: 'target/tmp/styles',
                    resources: 'target/tmp/resources',
                    lib: 'target/tmp/lib',
                    fonts: 'target/tmp/fonts'
                },
                dist: {
                    base: 'target/dist',
                    resources: 'target/dist/resources',
                    lib: 'target/dist/lib',
                    fonts: 'target/dist/fonts'
                }
            },
            javaScriptToInject : [
                'app/**/*.js', //javascript source
                'target/tmp/js/**/*.js', //compiled TypeScript
                '!target/tmp/js/**/*Test.js',
                '!target/tmp/js/**/*test.js',
                '!app/**/*Test.js',
                '!app/**/*test.js'
            ],
            linters: {
                scss: '.scss-lint.yml',
                eslint: '.eslintrc.yml',
                html: '.htmllintrc',
                ts: 'tslint.json'
            },
            protractor: {
                config: 'e2e-tests/protractor-config.js',
                tests: './e2e-tests/**/*_e2e-test.js'
            }
        };

    gulp.config = {
        app: {
            module: 'no-module-specified'
        },
        hostHeader: 'no-hostHeader-sepcified',
        url: 'no-url-specified',
        proxy: {
            port: 8001
        }
    };

    require("fs").readdirSync(__dirname + "/tasks").forEach(function(file) {
        if (file.indexOf("gulp") > -1) {
            require(__dirname + "/tasks" + "/" + file)(gulp, paths);
        }
    });

    gulp.task('default', function () {
        sequence('build', ['server', 'proxy'], 'watch');
    });

    gulp.task('dist:serve', ['dist', 'server:dist']);

};
