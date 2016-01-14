# A Gulp Build Setup Project

This projects is the basis for the creation of an npm module containing a "complete" Gulp Build Setup for
an AngularJS application using sass. The project includes a simple sample application to make it possible
to test the build setup using the local sample application. The local sample application exemplifies the
needed structure for applications supported by the npm package "gulp-angular-sass-appbuilder".
The sample application resides in the `app` folder.

The aim of this module is to orchestrate a collection of gulp build functionality into a single npm dependency
and to make it easier for developers to have and maintain the build setup for Angular projects.

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

To make use of the `gulp-angular-sass-appbuilder` npm module define the dependency to `gulp-angular-sass-appbuilder` in the `package.json` file in your own application:

      "dependencies": {
        "gulp-angular-sass-appbuilder": "~0.0.1",
        ....

together with your other npm dependencies.

Running the command

    `npm install --save-dev`

will include `gulp-angular-sass-appbuilder` in your `node_modules` folder and make it available for development.

### Configure your project

The tool comes with a guide for the enabling of the build tool in your project.

#### The sample Gulp file

The supported Angular application is built by [gulp.js](http://gulpjs.com), which is controlled by `gulpfile.js`.
The `gulp-angular-sass-appbuilder` includes a sample gulp file, located in the root library of the module.
You can find it in the `node_modules/gulp-angular-sass-appbuilder` folder, look for a `sample-gulpfile.js`.

#### Using the sample Gulp file
This `sample-gulpfile.js` can be used as a starter for your project. This is where you define the dependency to `gulp-angular-sass-appbuilder` module and specify the tasks you want to run during the build process of your own application:

    var gulp = require('gulp-angular-sass-appbuilder');

    // Set the config to use across the gulp build
    gulp.config = {
        module: 'no-specified-module-name',
        hostHeader: 'no-specified-hostHeader',
        url: 'http://no-specified-project-url',
        repository: 'http://git.nykreditnet.net/scm/dist/xpa-no-specified-project.git'
    };

    // Register default task
    gulp.task('default', ['bower', 'js', 'build-styles', 'fonts', 'server', 'proxy', 'test', 'watch']);
    gulp.task('dist:serve', ['dist', 'server:dist']);

Be sure to set values for the configuration in your copy of the `sample-gulpfile.js`.

These values are:

- **module** : name of the project
- **hostHeader** name of your project
- **url** url of your project

You may kickstart your project by copying

 - **sample-gulpfile.js** and rename that to `gulpfile.js` in your project.

This gives you to have a very simple build configuration as a starting scenario.

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


## External dependencies

`gulp-angular-sass-appbuilder` makes use of [node-gyp] (https://github.com/nodejs/node-gyp) which is a cross-platform command-line tool written in Node.js for compiling native addon modules for Node.js.
To use [node-gyp] (https://github.com/nodejs/node-gyp) you will need some external dependencies, depending on your platform:

**On Unix**

- python (v2.7 recommended, v3.x.x is not supported)
- make
- A proper C/C++ compiler toolchain, like GCC

**On Mac OS X**

- python (v2.7 recommended, v3.x.x is not supported). It's already installed by default on Mac OS X.
- [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
- You also need to install the Command Line Tools via Xcode. You can find this under the menu _Xcode -> Preferences -> Downloads_. (This step will install gcc and the related toolchain containing make)

**Windows**

- Python (v2.7.10 recommended, v3.x.x is not supported). Make sure that you have a `PYTHON` environment variable, and it is set to drive:\path\to\python.exe not to a folder

**Windows XP/Vista/7**

- Microsoft Visual Studio C++ 2013 (Express version works well). If the install fails, try uninstalling any C++ 2010 x64&x86 Redistributable that you have installed first. If you get errors that the 64-bit compilers are not installed you may also need the compiler update for the Windows SDK 7.1

**Windows 7/8**

- Microsoft Visual Studio C++ 2013 for Windows Desktop (Express version works well)

**Windows 10**

- Install the latest version of npm
- Install Python 2.7 from https://www.python.org/download/releases/2.7/ and make sure its on the System Path
- Install Visual Studio Community 2015 Edition. (Custom Install, Select Visual C++ during the installation)
- Set the environment variable `GYP_MSVS_VERSION=2015`
- Run the command prompt as Administrator
    $ npm install (--msvs_version=2015) <-- Shouldn't be needed if you have set GYP_MSVS_VERSION env
If the above steps have not worked or you are unsure please visit http://www.serverpals.com/blog/building-using-node-gyp-with-visual-studio-express-2015-on-windows-10-pro-x64 for a full walkthrough

**All Windows Versions**

- For 64-bit builds of node and native modules you will also need the Windows 7 64-bit SDK
- You may need to run one of the following commands if your build complains about WindowsSDKDir not being set, and you are sure you have already installed the SDK:

        call "C:\Program Files\Microsoft SDKs\Windows\v7.1\bin\Setenv.cmd" /Release /x86
        call "C:\Program Files\Microsoft SDKs\Windows\v7.1\bin\Setenv.cmd" /Release /x64

## Building this project

The targets mentioned above will work on the sample `app` project, which was used for the development of the tool.

The `gulpfile.js` in this project is the `gulpfile.js` in the root of this project it contains a Gulp task to package
the component/module.

The gulp task is called:

- **create-package**
- **verify-package**

Which builds and verifies the module/component.
After that the files are ready to be published to `npm`.
