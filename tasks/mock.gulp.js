'use strict';

module.exports = function (gulp) {

    var mocks = require('gulp-stubby-server'),
        _ = require('lodash'),
        defaults = {
            location: 'localhost',
            stubs: 8050,
            tls: 8443,
            admin: 8051,
            relativeFilesPath: true,
            files: [
                'mocks/*.{json,yaml,js}'
            ]
        };

    gulp.task('mocks', function (cb) {
        var config = _.merge({}, defaults, gulp.config.mocks);

        mocks(config, cb);
    });
};
