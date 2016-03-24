## Gript 0.0.39 (24-03-2016)

 - proxy port can now be customized in the config.

## Gript 0.0.38 (23-03-2016)

 - dist server port and hostname can now be customized in the gulpfile.js config
 - file created by `config` task renamed from `config.js` to `constants.js`. The task searches for `constants.json` file by default.
 - starting with this release, only `*.tpl.html` files will be considered as Angular templates and converted to Angular's cache service javascripts. All other HTML files will be just copied into the dist structure. The reason for that is that some apps need HTML files which are not Angular templates.
