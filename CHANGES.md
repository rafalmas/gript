## Gript 0.0.53 (27-06-2016)

- Enabled custom params when starting protractor.
- fixed [#70](https://github.com/Nykredit/gript/issues/70). modernizr.js, bower_components and node_modules excluded from coverage.
 

## Gript 0.0.52 (13-05-2016)

- implemented [#77](https://github.com/Nykredit/gript/issues/77).  `gulp-ng-html2js` options are now exposed in the config in the `gulpfile.js`. 

## Gript 0.0.51 (12-05-2016)

- fixed [#76](https://github.com/Nykredit/gript/issues/76) Gript proxy crashes

## Gript 0.0.50 (09-05-2016)

- implemented [#68](https://github.com/Nykredit/gript/issues/68) "Making an api mock without starting a real server"
There are two mock engines implementations included in Gript now: runtime [stubby4node](https://github.com/mrak/stubby4node) and generation-based [Angular-Multimocks](https://github.com/wongatech/angular-multimocks).
You have an option to start both of them, just a single one or none.

## Gript 0.0.49 (27-04-2016)

- proxy task is now optional. It will start only if you specify `proxy` section in your `gulpfile.js`. 

## Gript 0.0.48 (13-04-2016)

- implemented [#67](https://github.com/Nykredit/gript/issues/67). Karma settings are now exposed in the `gulpfile.js`, so you can run your tests in Chrome, for example. The `tasks/test.gulp.js` contains the default Karma configuration. 

## Gript 0.0.47 (08-04-2016)

 - dependencies updated:
    - phantomjs: 2.1,
    - karma": 0.13.22,
    - karma-coverage: 0.5.5,
    - karma-jasmine: 0.3.8,
    - karma-spec-reporter: 0.0.26

## Gript 0.0.46 (08-04-2016)

 - fixed [#66](https://github.com/Nykredit/gript/issues/66) - missing Karma plugins in the `package/karma.conf.js` 
 - implemented [#42](https://github.com/Nykredit/gript/issues/42). Sinon is now loaded as Karma plugin in `karma.conf.js`. Reference to aboslute path to `sinon.js` in the `test` task removed.
 
## Gript 0.0.45 (07-04-2016)
fixed a `dist` path typo

## Gript 0.0.44 (06-04-2016)
`$templateCache` partials are now configurable.
Gript considers all HTML files in the `app` directory (except the `index.html`) as partials by default. 
You can change this behaviour by setting up the `partials` configuration value in the `gulpfile.js`.
This may come in handy when you don't want a specific HTML file to be converted to Angular `$templateCache` partial.


## Gript 0.0.43 (31-03-2016)

 - implemented [#60](https://github.com/Nykredit/gript/issues/60). You can prevent the mocks server form starting by using the `--nomocks` command line option.

## Gript 0.0.42 (30-03-2016)

 - implemented [#46](https://github.com/Nykredit/gript/issues/46). From now on, Gript will continue with the default rules and issue a warning if any of the linter configuration is missing:
    - scss-lint.yml
    - .htmllintrc
    - tslint.json
 - merged [#40](https://github.com/Nykredit/gript/pull/40)
 
## Gript 0.0.41 (25-03-2016)

 - implemented **#6** (Automate release process). Gript's own `gulpfile.js` contains new tasks:
 	- `bumpVersion` - bumps package version number in `package.json` and `package/package.json`
 	- `tag` - Tags the git repository with the version number from `package.json`
 	- `pushTags` - pushes tags to `master`
 	- `push` - pushes source to `master`
 	- `npmPublish` - publishes to npm.js. This is an interactive task, asks for npm username and password
 	- `publish` - executes all of the above in the sequence.
 - `Gulp` upgraded to 3.91.
 
## Gript 0.0.40 (25-03-2016)

 - fixed **#58** (html-lint doesn't pick up all files)

## Gript 0.0.39 (24-03-2016)

 - proxy port can now be customized in the config.

## Gript 0.0.38 (23-03-2016)

 - dist server port and hostname can now be customized in the gulpfile.js config
 - file created by `config` task renamed from `config.js` to `constants.js`. The task searches for `constants.json` file by default.
 - starting with this release, only `*.tpl.html` files will be considered as Angular templates and converted to Angular's cache service javascripts. All other HTML files will be just copied into the dist structure. The reason for that is that some apps need HTML files which are not Angular templates.
