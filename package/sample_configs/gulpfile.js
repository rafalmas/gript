/*jslint node: true */

'use strict';

var gulp = require('gulp');

require('gript')(gulp);

// Set the config to use across the gulp build
gulp.config = {
    module: 'myApp',
    hostHeader: 'no-specified-hostHeader',
    url: 'http://no-specified-project-url',
    repository: 'http://git.nykreditnet.net/scm/dist/xpa-no-specified-project.git',
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
    }
};
