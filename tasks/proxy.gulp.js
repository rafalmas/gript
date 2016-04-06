'use strict';

module.exports = function (gulp) {

    var http = require('http'),
        httpProxy = require('http-proxy'),
        util = require('gulp-util'),
        _ = require('lodash'),
        proxyDefaults = {
            port: 8001
        };

    gulp.task('proxy', function () {

        var proxyOptions = _.merge({}, proxyDefaults, gulp.config.proxy),
            proxy;

        if (!_.has(gulp.config, 'url')) {
            util.log('Your config is missing the mandatory '
                + util.colors.red('url') + ' value. Refer to the readme.md and check the gulpfile.js');
            process.exit(1);
        }

        proxy = httpProxy.createProxyServer({});

        if (_.has(gulp.config, 'hostHeader')) {
            proxy.on('proxyReq', function (proxyReq) {
                proxyReq.setHeader('Host', gulp.config.hostHeader);
            });
        } else {
            util.log('Warning - Your config is missing the ' + util.colors.red('hostHeader') + ' value.');
        }

        http.createServer(function (req, res) {
            proxy.web(req, res, {
                target: gulp.config.url
            });
        }).listen(proxyOptions.port);
    });
};

