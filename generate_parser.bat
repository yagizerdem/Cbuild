@echo off
rem Generates the Python3 parser from cbuild.g4 into src\cbuild_parser\
setlocal

rem must match the antlr4-python3-runtime version
set "ANTLR_VERSION=4.13.2"
set "ROOT=%~dp0"
set "GRAMMAR=cbuild.g4"
set "OUT_DIR=src\cbuild_parser"

cd /d "%ROOT%" || exit /b 1

rem Look for antlr4 in the project venv first, then on PATH
set "ANTLR="
if exist "venv\Scripts\antlr4.exe" set "ANTLR=venv\Scripts\antlr4.exe"
if not defined ANTLR where antlr4 >nul 2>&1 && set "ANTLR=antlr4"
if not defined ANTLR goto :antlr_not_found

if exist "%OUT_DIR%" rmdir /s /q "%OUT_DIR%" || exit /b 1
mkdir "%OUT_DIR%" || exit /b 1

call "%ANTLR%" -v "%ANTLR_VERSION%" -Dlanguage=Python3 -visitor -o "%OUT_DIR%" -Xexact-output-dir "%GRAMMAR%" || exit /b 1

type nul > "%OUT_DIR%\__init__.py"

echo Parser generated: %OUT_DIR%\
dir /b "%OUT_DIR%"

endlocal
exit /b 0

:antlr_not_found
echo antlr4 not found. Setup: pip install antlr4-tools antlr4-python3-runtime==%ANTLR_VERSION% 1>&2
exit /b 1
