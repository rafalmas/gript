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

        var proxyOptions = _.merge({}, proxyDefaults, gulp.config.proxy);

        console.log(proxyOptions);

        if (!_.has(proxyOptions, 'url')) {
            util.log('Your proxy config is missing the mandatory '
                + util.colors.red('url') + ' value. Refer to the readme.md and check the gulpfile.js');
            process.exit(1);
        }

        var proxy = httpProxy.createProxyServer({});

        if (!_.has(proxyOptions, 'hostHeader')) {
            proxy.on('proxyReq', function (proxyReq) {
                proxyReq.setHeader('Host', proxyOptions.hostHeader);
            });
        }


        console.log(proxyOptions);

        http.createServer(function (req, res) {
            proxy.web(req, res, {
                target: proxyOptions.url
            });
        }).listen(proxyOptions.port);
    });
};

