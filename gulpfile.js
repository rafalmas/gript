'use strict';

var gulp = require('gulp'),
    ex = require('gulp-expect-file'),
    replace = require('gulp-replace'),
    sequence = require('run-sequence').use(gulp),
    paths = {
        bower: 'bower_components',
        src: {
            app: 'app',
            index: 'app/index.html',
            scss: 'app/app.scss',
            constants: 'app/constants.json',
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
        javaScriptToInject: [
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

require("fs").readdirSync(__dirname + "/tasks").forEach(function (file) {
    if (file.indexOf("gulp") > -1) {
        require(__dirname + "/tasks" + "/" + file)(gulp, paths);
    }
});

// Register the default task
gulp.task('default', function () {
    sequence('build', ['server', 'proxy'], 'watch');
});

gulp.task('dist:serve', ['dist', 'server:dist']);


// Set the config to use across the gulp build
gulp.config = {
    url: 'http://gript',
    hostHeader: 'gript',
    repository: 'http://nykredit.github.com/gript.git',
    app: {
        module: 'gript'
    },
    server: {
        port: 8080,
        host: 'localhost',
        livereload: {
            port: 35729
        }
    },
    serverDist: {
        port: 8080,
        host: 'localhost'
    },
    proxy: {
        port: 8001
    },
    mocks: {
        location: 'localhost',
        stubs: 8050,
        tls: 8443,
        admin: 8051,
        relativeFilesPath: true,
        files: [
            'mocks/*.{json,yaml,js}'
        ]
    },
    typeScript: {
        compilerOptions: {
            noImplicitAny: true,
            target: "es5",
            sourceMap: true,
            declarationFiles: true,
            noExternalResolve: false,
            sortOutput: true,
            removeComments: false,
            preserveConstEnums: true
        }
    },
    minification: {
        html: {
            removeEmptyAttributes: false,
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
            mangle: true,
            preserveComments: false
        }
    },
    fontsScan: [
        'bower_components/font-awesome',
        'bower_components/bootstrap-sass-official'
    ]
};

// verify that the build setup can produce the expected artifacts
gulp.task('verify-package-foundation', ['build'], function () {
    gulp.src('target/dist/index.html')
        .pipe(ex.real('target/dist/index.html'));
    gulp.src('target/dist/app.manifest')
        .pipe(ex.real('target/dist/app.manifest'));

    gulp.src('target/dist/styles/main-*.css')
        .pipe(ex.real('target/dist/styles/main-*.css'));
    gulp.src('target/dist/styles/vendor-*.css')
        .pipe(ex.real('target/dist/styles/vendor-*.css'));

    gulp.src('target/dist/scripts/main-*.js')
        .pipe(ex.real('target/dist/scripts/main-*.js'));
    gulp.src('target/dist/scripts/vendor-*.js')
        .pipe(ex.real('target/dist/scripts/vendor-*.js'));

    gulp.src('target/dist/img/*.png')
        .pipe(ex.real('target/dist/img/*.png'));
    gulp.src('target/dist/img/*.ico')
        .pipe(ex.real('target/dist/img/*.ico'));
    gulp.src('target/dist/fonts/*')
        .pipe(ex.real('target/dist/fonts/glyphicons-halflings-regular.*'));
});

gulp.task('create-package', ['dist'], function () {
    gulp.src(['tasks/*.js', '!tasks/karma.conf.js'])
        .pipe(gulp.dest('target/gript/tasks'))
        .on('finish', function () {
            gulp.src('target/gript/tasks/test.gulp.js')
                .pipe(replace('node_modules/sinon', 'node_modules/gript/node_modules/sinon'))
                .pipe(gulp.dest('target/gript/tasks'));
        });
    gulp.src('package/sample_configs/**/*')
        .pipe(gulp.dest('target/gript/sample_configs'));
    gulp.src('package/sample_configs/.*')
        .pipe(gulp.dest('target/gript/sample_configs'));
    gulp.src('package/img/*.*')
        .pipe(gulp.dest('target/gript/img'));
    gulp.src(['package/*', '!package/karma.conf.js'])
        .pipe(gulp.dest('target/gript'));
    gulp.src('package/karma.conf.js')
        .pipe(gulp.dest('target/gript/tasks'));
    gulp.src('README.md')
        .pipe(gulp.dest('target/gript'));
    gulp.src('CHANGES.md')
        .pipe(gulp.dest('target/gript'));
});

// verify that the npm package contains the files it should
gulp.task('verify-package', function () {
    gulp.src('target/gript/index.js')
        .pipe(ex.real('target/gript/index.js'));
    gulp.src('target/gript/package.json')
        .pipe(ex.real('target/gript/package.json'));
    gulp.src('target/gript/sample_configs/gulpfile.js')
        .pipe(ex.real('target/gript/sample_configs/gulpfile.js'));
    gulp.src('target/gript/sample_configs/.eslintrc.yml')
        .pipe(ex.real('target/gript/sample_configs/.eslintrc.yml'));
    gulp.src('target/gript/sample_configs/.scss-lint.yml')
        .pipe(ex.real('target/gript/sample_configs/.scss-lint.yml'));
    gulp.src('target/gript/sample_configs/bower.json')
        .pipe(ex.real('target/gript/sample_configs/bower.json'));
    gulp.src('target/gript/tasks/*.gulp.js')
        .pipe(ex.real('target/gript/tasks/*.gulp.js'));
    gulp.src('target/gript/tasks/*.conf.js')
        .pipe(ex.real('target/gript/tasks/karma.conf.js'));
    gulp.src('target/gript/README.md')
        .pipe(ex.real('target/gript/README.md'));
    gulp.src('target/gript/CHANGES.md')
        .pipe(ex.real('target/gript/CHANGES.md'));
});
