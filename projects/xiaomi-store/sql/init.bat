@echo off
setlocal enabledelayedexpansion

echo ============================================
echo   Mi Store DB Init Script
echo ============================================
echo.

if "%~4"=="" (
    echo Usage: init.bat [host] [port] [username] [password]
    echo Example: init.bat localhost 3306 root 123456
    echo.
    echo First time setup:
    echo   npm install
    echo.
    pause
    exit /b 1
)

echo Connecting to: %~1:%~2
echo Username: %~3
echo.

node init.js %1 %2 %3 %4

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Init failed.
    echo.
    pause
    exit /b 1
)

pause
