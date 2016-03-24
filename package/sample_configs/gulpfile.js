/*jslint node: true */

'use strict';

var gulp = require('gulp');

require('gript')(gulp);

// Set the config to use across the gulp build
gulp.config = {
    hostHeader: 'no-specified-hostHeader',
    url: 'http://no-specified-project-url',
    repository: 'http://git.nykreditnet.net/scm/dist/xpa-no-specified-project.git',
	app: {
        module: 'myApp',
        constantsFile: 'app/constants.json'
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
    modernizr: {
        classPrefix: 'has-',
        options: [
            'addTest',
            'html5printshiv',
            'testProp',
            'fnBind',
            'setClasses'
        ],
        'feature-detects': []
    },
    fontsScan: [
        'bower_components/font-awesome',
        'bower_components/bootstrap-sass-official'
    ]
};
