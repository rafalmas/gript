# A Gulp Build Setup

The npm module contains a Gulp Build Setup, which orchestrates a number of Gulp tools into a single npm dependency
build setup. The idea is to make the use of a build setup easier and to make upgrades of the build simpler.

## Structure

The use of the the Gulp build tool is based on applications code being structured according to Google's
 [Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/mobilebasic?pli=1). The primary directories are:
which means:

- `app` : the application source code
- `app/sections` : the subsections of the application code
- `app/components`: the components (directives, services etc.) embedded in the application
- `app/bower_components` : libraries downloaded by [Bower](http://bower.io/)
- `node_modules` : tools downloaded by [npm](https://www.npmjs.org/)
- `target` : generated files
- `gulpfile.js` : the build files importing the gulp tasks defined in the `node_modules/gulp-angular-sass-appbuilder`


## Configure your project

The application is built by [gulp.js](http://gulpjs.com) which is controlled by `gulpfile.js`.
See sample for a `gulpfile.js` in the root library of the gulp-angular-sass-appbuilder npm package as `sample-gulpfile.js`.
This `sample-gulpfile.js` can be used as a sample for your project. Be sure to set values for the configuration
in your copy of the `sample-gulpfile.js`.

These values are:

- **module** : name of the project
- **hostHeader** name of your project
- **url** url of your project

You may kickstart your project by copying

 - **sample-gulpfile.js** and rename that to `gulpfile.js` in your project.

This gives you to have a very simple  build configuration as a starting scenario.

If you have no tests the

    gulp test

command will fail and you will not be able to successful run that,
until you have created your first piece of logic and its corresponding test.

 - **TODO other files** : should we include the *.bat files and the *.sh files
                          for the projects as easy measures for clean up.

This gives you to have a very simple  build configuration as a starting scenario, if you have no tests the test
task will fail and you will not be able to run that until you have created your first piece of logic and its corresponding test.

## Build your project

The primary tasks imported from `gulpfile.js` in your project from the `gulp-angular-sass-appbuilder` package dependency are:

- **build** : builds the application for development
- **dist** : builds the application for deployment
- **watch** : watches the source code for changes and runs the relevant task(s) whenever something changes
- **server** : starts a development server
- **lint** : runs [ESLint](http://www.eslint.org) on the Angular JavaScript source
- **test** : runs the unit tests through [Karma](http://karma-runner.github.io) - fails if no test are available
- **clean** : deletes generated files

The **default** task runs everything that is necessary to build, start the development server and watch the source code. So just by running

    gulp

you are ready to start using gulp for your project.

## Versioning
Version bumping is done manually in the `package.json` file.
