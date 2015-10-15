/*jslint node: true */
'use strict';

var gulp = require('gulp'),
    http = require('http'),
    httpProxy = require('http-proxy');



gulp.task('proxy', function () {
    var proxy = httpProxy.createProxyServer({});
    proxy.on('proxyReq', function (proxyReq) {
        proxyReq.setHeader('Host', gulp.config.hostHeader);
    });

    http.createServer(function (req, res) {
        proxy.web(req, res, { target: gulp.config.url });
    }).listen(8001);
});
