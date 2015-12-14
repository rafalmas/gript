call cfg nodejs 4.2.2 git 1.9.5.msysgit.0 ruby 2.2.2 python 2.7.10

REM Fetch npm dependencies
set PATH=%PATH%;%cd%\node_modules\.bin
set HTTP_PROXY=http://webproxy:8080
git config --global url."https://".insteadOf git://
call npm install

set _licenses=target\licenses
md %_licenses%
call license-checker --json > %_licenses%/dev-npm-licenses.json
call bower-license > %_licenses%/app-bower-licenses.json

REM Ensure that Protractor browser support is available
call node_modules\.bin\webdriver-manager.cmd update
