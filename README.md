# A Gulp Build Setup Project

This projects is the basis for the creation of an npm module containing a "complete" Gulp Build Setup for
an AngularJS application using sass. The project includes a simple sample application to make it possible
to test the build setup using the local sample application. The local sample application exemplifies the
needed structure for applications supported by the npm package "gulp-angular-sass-appbuilder".

The aim of this module is to orchestrate a collection of gulp build functionality into a single npm dependency
and to make it easier for developers to have and maintain the build setup for angular projects.

## Structure requirements for applications supported

The use of the this Gulp build tool is based on applications code being structured according to Google's
 [Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/mobilebasic?pli=1). The primary directories are:
which means:

- `app` : contains the application source code
- `app/sections` : contains the subsections of the application code
- `app/components`: contains the components (directives, services etc.) embedded in the application
- `app/bower_components` : libraries downloaded by [Bower](http://bower.io/)
- `node_modules` : tools downloaded by [npm](https://www.npmjs.org/)
- `target` : contains generated files
- `gulpfile.js` : the build files importing the gulp tasks defined in the `node_modules/gulp-angular-sass-appbuilder`

## Setup the builder in your project

The "gulp-angular-sass-appbuilder" npm module is used by entering a dev-dependency to

    gulp-angular-sass-appbuilder

  in the `package.json` file in your project containing the application

      "dependencies": {
        "gulp-angular-sass-appbuilder": "~0.0.1",
        ....

together with your other npm dependencies.

    `npm install --save-dev`

includes "gulp-angular-sass-appbuilder" in your `node_modules` folder and thus it is available for development.


### Configure your project

The tool comes with a guide for the enabling of the build tool in your project.

#### The sample Gulp file

The supported angular application is built by [gulp.js](http://gulpjs.com), which is controlled by `gulpfile.js`.
The "gulp-angular-sass-appbuilder" includes a sample `gulpfile.js` in the root library of the module.
Look into the `node_modules/gulp-angular-sass-appbuilder` foler and look for a `sample-gulpfile.js`.

#### Use the sample Gulp file
This `sample-gulpfile.js` can be used as a sample for your project.

Be sure to set values for the configuration in your copy of the `sample-gulpfile.js`.

These values are:

- **module** : name of the project
- **hostHeader** name of your project
- **url** url of your project

You may kickstart your project by copying

 - **sample-gulpfile.js** and rename that to `gulpfile.js` in your project.

This gives you to have a very simple  build configuration as a starting scenario.

NOTE: If you have no tests the

    gulp test

command will fail and you will not be able to successful run that,
until you have created your first piece of logic and its corresponding test.

This gives you to have a very simple  build configuration as a starting scenario, if you have no tests the test
task will fail and you will not be able to run that until you have created your first piece of logic and its corresponding test.

## Building your project

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

## Build this project

The targets mentioned above will work on the sample project, this used for the development of the tool.

The `gulpfile.js` in this project is the `gulpfile.js` in the root of this project it contains a Gulp task to package
the component/module.

The gulp task is called:

- **create-package**
- **verify-package**

Which builds and verifies the module/component.
After that the files are ready to be published to `npm`.
