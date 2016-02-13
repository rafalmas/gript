'use strict';

var gulp = require('gulp'),
    ex = require('gulp-expect-file'),
    replace = require('gulp-replace'),
    sequence = require('run-sequence').use(gulp);

require("fs").readdirSync(__dirname + "/tasks").forEach(function (file) {
    if (file.indexOf("gulp") > -1) {
        require(__dirname + "/tasks" + "/" + file)(gulp);
    }
});

// Register the default task
gulp.task('default', function () {
    sequence('build', ['server', 'proxy'], 'watch');
});

gulp.task('dist:serve', ['dist', 'server:dist']);


// Set the config to use across the gulp build
gulp.config = {
    module: 'gript',
    hostHeader: 'gript',
    url: 'http://gript',
    repository: 'http://nykredit.github.com/gript.git',
    server: {
        port: 8080,
        host: 'localhost',
        livereload: {
            port: 35729
        }
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
    }
};

// verify that the build setup can produce the expected artifacts
gulp.task('verify-package-foundation', ['build'], function () {
    gulp.src(['target/dist/index.html'])
        .pipe(ex.real('target/dist/index.html'));
    gulp.src(['target/dist/app.manifest'])
        .pipe(ex.real('target/dist/app.manifest'));

    gulp.src(['target/dist/styles/main-*.css'])
        .pipe(ex.real('target/dist/styles/main-*.css'));
    gulp.src(['target/dist/styles/vendor-*.css'])
        .pipe(ex.real('target/dist/styles/vendor-*.css'));

    gulp.src(['target/dist/scripts/main-*.js'])
        .pipe(ex.real('target/dist/scripts/main-*.js'));
    gulp.src(['target/dist/scripts/vendor-*.js'])
        .pipe(ex.real('target/dist/scripts/vendor-*.js'));

    gulp.src(['target/dist/img/*.png'])
        .pipe(ex.real('target/dist/img/*.png'));
    gulp.src(['target/dist/img/*.ico'])
        .pipe(ex.real('target/dist/img/*.ico'));
    gulp.src(['target/dist/fonts/*'])
        .pipe(ex.real('target/dist/fonts/glyphicons-halflings-regular.*'));
});

gulp.task('create-package', ['dist'], function () {
    gulp.src(['tasks/*.js', '!tasks/karma.conf.js'])
        .pipe(gulp.dest('target/gript/tasks'))
        .on('finish', function () {
            gulp.src(['target/gript/tasks/test.gulp.js'])
                .pipe(replace('node_modules/sinon', 'node_modules/gript/node_modules/sinon'))
                .pipe(gulp.dest('target/gript/tasks'));
        });
    gulp.src(['package/sample_configs/*'])
        .pipe(gulp.dest('target/gript/sample_configs'));
    gulp.src(['package/sample_configs/.*'])
        .pipe(gulp.dest('target/gript/sample_configs'));
    gulp.src(['package/img/*.*'])
        .pipe(gulp.dest('target/gript/img'));
    gulp.src(['package/*'])
        .pipe(gulp.dest('target/gript'));
    gulp.src(['package/karma.conf.js'])
        .pipe(gulp.dest('target/gript/tasks'));
});

// verify that the npm package contains the files it should
gulp.task('verify-package', function () {
    gulp.src(['target/gript/index.js'])
        .pipe(ex.real('target/gript/index.js'));
    gulp.src(['target/gript/package.json'])
        .pipe(ex.real('target/gript/package.json'));
    gulp.src(['target/gript/sample_configs/gulpfile.js'])
        .pipe(ex.real('target/gript/sample_configs/gulpfile.js'));
    gulp.src(['target/gript/sample_configs/.eslintrc.yml'])
        .pipe(ex.real('target/gript/sample_configs/.eslintrc.yml'));
    gulp.src(['target/gript/sample_configs/.scss-lint.yml'])
        .pipe(ex.real('target/gript/sample_configs/.scss-lint.yml'));
    gulp.src(['target/gript/sample_configs/bower.json'])
        .pipe(ex.real('target/gript/sample_configs/bower.json'));
    gulp.src(['target/gript/*.md'])
        .pipe(ex.real('target/gript/README.md'));
    gulp.src(['target/gript/tasks/*.gulp.js'])
        .pipe(ex.real('target/gript/tasks/*.gulp.js'));
    gulp.src(['target/gript/tasks/*.conf.js'])
        .pipe(ex.real('target/gript/tasks/karma.conf.js'));
});
