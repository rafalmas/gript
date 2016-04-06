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
