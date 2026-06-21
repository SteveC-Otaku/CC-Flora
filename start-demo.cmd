@echo off
title "C&C Flora - Gallery Demo"
set "DEMO_DIR=%~dp0demo\"
cd /d "%DEMO_DIR%"

if not exist "node_modules\" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo Failed to install dependencies.
    pause
    exit /b 1
  )
)

echo.
echo Starting gallery demo...
echo Open http://localhost:3000 in your browser
echo Press Ctrl+C to stop
echo.

call "%DEMO_DIR%dev.cmd"

pause
