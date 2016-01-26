# A Gulp Build Setup Project

This projects is the basis for the creation of an npm module containing a "complete" Gulp Build Setup for
an AngularJS application using sass.

The goal of this tool is to provide the handy workflow for developing Angular based applications and ensure
the profound checking of the code quality of the same time. 
The module orchestrates a collection of gulp build functionality into a single npm dependency 
and makes it easier for developers to have and maintain the build setup for own Angular projects.

The project includes a sample application to make it possible to test the build setup.
The local sample application exemplifies the needed structure for applications supported by the npm package "gulp-angular-sass-appbuilder".
The sample application resides in the `app` folder. 
The`index.html` in the `app` folder is especially important - it contains markers where generated files will be included. 

##Features

- Javascript validation using es-lint.
- TypeScript validation and incremental compilation
- SASS validation and compilation
- unit tests performed using Karma and PhantomJS
- unit testing coverage metered by Istanbul 
- HTML partials pre-loading into the Angular template cache
- full concatenation/minification for all production JS and CSS files
- Live-reload capability: web app is auto-refreshed if HTML, TypeScript or Sass files change.
- watch tasks: if your source files change, they will be checked for errors, compiled and then injected into your application. 

## Structure requirements for applications supported

The use of the this Gulp build tool is based on applications code being structured according to Google's
 [Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/mobilebasic?pli=1). The primary directories and files are:

    |---- /app
    |     |
    |     |---- bower_components
    |     |---- components
    |     |---- sections
    |     |---- img
    |     |---- styles
    |     |---- index.html
    |     |---- app.js
    |     |---- .eslint.rc.yml
    |---- /target
    |     |---- dist
    |     |---- tmp
    |---- gulpfile.js
    |---- bower.json
    |---- package.json
    |---- .eslint.rc.yml
    |---- .scsslint.rc.yml

which means:

- `app` : contains the application source code
- `app/sections` : contains the subsections of the application code
- `app/components`: contains the components (directives, services etc.) embedded in the application
- `app/bower_components` : libraries downloaded by [Bower](http://bower.io/)
- `app/app.js` : the entry point of the Angular application
- `node_modules` : tools downloaded by [npm](https://www.npmjs.org/)
- `target/tmp` : contains generated files (compiled TypeScript, compiled Sass styles, Angular templates etc.)
- `target/dist` : contains app distribution package
- `gulpfile.js` : the build files importing the gulp tasks defined in the `node_modules/gulp-angular-sass-appbuilder`
- `bower.json` : contains bower dependencies
- `.eslint.rc.yml` : contains rules for es-linter (cascading rules configuration is possible)
- `.scsslint.rc.yml` : contains rules for Sass linter (scss-linter)

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

#### The sample Gulp file and configuration files

The supported Angular application is built by [gulp.js](http://gulpjs.com), which is controlled by `gulpfile.js`.
The `gulp-angular-sass-appbuilder` includes a sample gulp file, located in the `sample_configs` directory.
There are also example configuration files for Bower, es-lint, js-lint and scss-lint in the `sample_configs` directory. 

#### Using the sample Gulp file
This `sample_configs/gulpfile.js` can be used as a starter for your project. This is where you define the dependency to `gulp-angular-sass-appbuilder` module and specify the tasks you want to run during the build process of your own application:

    var gulp = require('gulp-angular-sass-appbuilder');

    // Set the config to use across the gulp build
    gulp.config = {
        module: 'no-specified-module-name',
        hostHeader: 'no-specified-hostHeader',
        url: 'http://no-specified-project-url',
        repository: 'http://git.nykreditnet.net/scm/dist/xpa-no-specified-project.git'
    };

    // Register default task
    gulp.task('default', ['bower', 'js', 'styles', 'fonts', 'server', 'proxy', 'test', 'watch']);
    gulp.task('dist:serve', ['dist', 'server:dist']);

Be sure to set values for the configuration in your copy of the `sample_configs/gulpfile.js`.

These values are:

- **module** : name of the project
- **hostHeader** name of your project
- **url** url of your project

You may kickstart your project by copying **sample_configs/gulpfile.js** to the root of your own project.
This gives you to have a very simple build configuration as a starting scenario.

NOTE: If you have no tests the

    gulp test

command will fail, until you create your first piece of logic and its corresponding test.

## Building your project

The **default** task runs everything that is necessary to build application and then start the development server. Your source code (TypeScript, HTML, Sass) will be watched for changes, and - if neccessary, compiled and injected into the `index.html`. So just by running

    gulp

you are ready to start using gulp for your project.

The `gulpfile.js` from the `gulp-angular-sass-appbuilder` contains also these specific tasks:

- **build** : builds the application for development
- **dist** : builds the application for deployment. The application will be copied to `target/dist` directory.
- **ts** : compiles your app TypeScript files
- **partials** : compiles HTML partials into Angular $templateCache Javascript files.
- **styles** : compiles Sass files
- **inject** : injects bower dependencies, compiled HTML partials, TypeScript and Sass into your app's `index.html`. Files will be injected according to the marking in the `index.html` file. Refer to the [Files injection](#injection) section of this readme for details.
- **lint** : runs [ESLint](http://www.eslint.org) on the Sass, Javascript and TypeScript source files
- **test** : runs the unit tests through [Karma](http://karma-runner.github.io) - NOTE: fails if no tests are available
- **clean** : deletes generated files (`target` directory - generated files and distribution package)
- **watch** : watches the source code for changes and runs the relevant task(s) whenever something changes
- **server** : starts a development server
- **server:dist** : starts a server using the deployment directory (`target/dist`)

You can list all of the available tasks by running the command:

    gulp --tasks

<a name="injection"></a>
## Compiled files injection

By default, all TypeScript, Sass and HTML files will be compiled and injected into your app's `index.html` file.
The `target/tmp` directory is the place for the compilation output:

- **target/tmp/js** : will contain compiled TypeScript files
- **target/tmp/partials** : will contain all HTML partials from your Angular app compiled into Angular $templateCache.
- **target/tmp/styles** : will contain compiled Sass files

Compiled scripts and styles will then be injected into the app's `index.html` according to the injection markings:

- **\<!-- bower:css -->\<!-- endbower -->** : Bower CSS dependencies
- **\<!-- inject:css -->\<!-- endinject -->** : compiled Sass files
- **\<!-- bower:js -->\<!-- endbower -->** : Bower JS dependencies
- **\<!-- inject:js -->\<!-- endinject -->** : TypeScript files compiled into JS
- **\<!-- partials:js -->\<!-- endinject -->** : HTML partials compiled into Angular's $templateCache.

Refer to `app/index.html` for an example how to define these markings.

After executing the `dist` task, all of the scripts and CSS styles will be concatenated and minified. Your `index.html` in the distribution package
(`target/dist`) will contain references to concatenated and minified scripts and CSS stylesheets.

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

## Building the `gulp-angular-sass-appbuilder` module

The `gulpfile.js` for the `gulp-angular-sass-appbuilder` npm module is located in the root of the project. It contains a Gulp task to package and the verify the npm module:

- **create-package**    creates the npm package
- **verify-package**    verifies its contents

After that the npm module is ready to be published to the `npm` repository.
