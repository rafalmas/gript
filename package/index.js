'use strict';

module.exports = function (gulp) {

    var sequence = require('run-sequence').use(gulp);

    gulp.config = {
        app: {
            module: 'no-module-specified'
        },
        hostHeader: 'no-hostHeader-sepcified',
        url: 'no-url-specified'
    };

    require("fs").readdirSync(__dirname + "/tasks").forEach(function(file) {
        if (file.indexOf("gulp") > -1) {
            require(__dirname + "/tasks" + "/" + file)(gulp);
        }
    });

    gulp.task('default', function () {
        sequence('build', ['server', 'proxy'], 'watch');
    });

    gulp.task('dist:serve', ['dist', 'server:dist']);

};
