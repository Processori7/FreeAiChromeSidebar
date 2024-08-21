@echo off
setlocal

:: Check if git is installed
git --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Git is installed. Performing git pull...
    git pull
) else (
    echo Git is not installed. Downloading the archive...
    set "url=https://github.com/Processori7/FreeAiChromeSidebar/archive/refs/heads/master.zip"
    set "zipFile=master.zip"
    set "extractDir=FreeAiChromeSidebar-master"

    :: Download the archive
    powershell -Command "Invoke-WebRequest -Uri '%url%' -OutFile '%zipFile%'"

    :: Check if unzip is installed (for example, 7-Zip)
    where 7z >nul 2>&1
    if %errorlevel% equ 0 (
        echo Extracting the archive using 7-Zip...
        7z x -y "%zipFile%" -o"%extractDir%"
    ) else (
        echo 7-Zip not found. Please install 7-Zip to extract the archive.
        exit /b 1
    )

    :: Delete the downloaded archive
    del "%zipFile%"
)
pause
endlocal
