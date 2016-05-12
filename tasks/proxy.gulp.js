'use strict';

module.exports = function (gulp) {

    var http = require('http'),
        httpProxy = require('http-proxy'),
        util = require('gulp-util'),
        _ = require('lodash'),
        validateConfigValue = function (proxyConfig, value) {
            if (!_.has(proxyConfig, value)) {
                util.log('Your proxy config is missing the mandatory '
                    + util.colors.red(value) + ' value. Refer to the readme.md and check the gulpfile.js');
                return false;
            }
            return true;
        },
        validateProxyConfig = function (config) {
            return validateConfigValue(config.proxy, 'targetURL') && validateConfigValue(config.proxy, 'port');
        };

    gulp.task('proxy', function () {

        var proxy;

        if (_.has(gulp.config, 'proxy')) {
            if (!validateProxyConfig(gulp.config)) {
                process.exit(1);
            }

            proxy = httpProxy.createProxyServer({});

            if (_.has(gulp.config.proxy, 'hostHeader')) {
                proxy.on('proxyReq', function (proxyReq) {
                    proxyReq.setHeader('Host', gulp.config.proxy.hostHeader);
                });
            } else {
                util.log('Warning - Your proxy config is missing the ' + util.colors.red('hostHeader') + ' value.');
            }

            util.log(util.colors.green('Starting proxy on port ' + gulp.config.proxy.port
                + ', target url: ' + gulp.config.proxy.targetURL
                + ', host header: ' + gulp.config.proxy.hostHeader));

            http.createServer(function (req, res) {
                proxy.web(req, res, {
                    target: gulp.config.proxy.targetURL
                });
            }).listen(gulp.config.proxy.port);
        }
    });
};
