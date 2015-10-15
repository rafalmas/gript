call cfg nodejs 0.10.38 git 1.9.5.msysgit.0

REM Fetch npm dependencies
set PATH=%PATH%;%PRO_ROOT%\node_modules\.bin
set HTTP_PROXY=http://webproxy:8080
git config --global url."https://".insteadOf git://
call npm install

EM Ensure that Protractor browser support is available
call node_modules\.bin\webdriver-manager.cmd update
