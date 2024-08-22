@echo off
@chcp 65001 >nul

:: Проверка, установлен ли git
git --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Git установлен, выполняю git pull...
    git pull
) else (
    echo Git не установлен. Загружается архив...
    set "url=https://github.com/Processori7/FreeAiChromeSidebar/archive/refs/heads/master.zip"
    set "zipFile=freeaichromesidebar-master.zip"
    set "extractDir=freeAiChromeSidebar-master"

    :: Загрузка архива
    powershell -Command "Invoke-WebRequest -Uri '%url%' -OutFile '%zipFile%'"

    :: Проверка, установлен ли 7-Zip
    if exist "C:\Program Files\7-Zip\7z.exe" (
        echo Извлечение архива с помощью 7-Zip...
        "C:\Program Files\7-Zip\7z.exe" x -y "%zipFile%" -o"%extractDir%"
    ) else (
        :: Проверка, установлен ли WinRAR
        if exist "C:\Program Files\WinRAR\winrar.exe" (
            echo Извлечение архива с помощью WinRAR...
            "C:\Program Files\WinRAR\winrar.exe" x -y "%zipFile%" "%extractDir%\"
        ) else (
            echo Ошибка: Не найден 7-Zip или WinRAR. Пожалуйста, установите один из этих архиваторов.
            exit /b 1
        )
    )
    :: Удаление загруженного архива
    del "%zipFile%"

    
:: Переход в распакованную папку и копирование содержимого в директорию выше
if exist "%extractDir%" (
    echo Копирование содержимого из "%extractDir%" в директорию выше...
    
    :: Показать файлы в распакованной папке
    echo Содержимое папки "%extractDir%":
    dir "%extractDir%/"%extractDir%"" /b
    
    :: Переход в директорию выше
    pushd "%extractDir%/"%extractDir%""
    
    :: Копирование всех файлов из текущей директории (extractDir) в директорию выше
    echo Копирование файлов в: "%cd%"
    copy * "%cd%" /Y
    if %errorlevel% neq 0 (
        echo Ошибка при копировании файлов. Код ошибки: %errorlevel%
        popd
        exit /b 1
    ) else (
        echo Копирование завершено успешно.
    )
    
    popd
) else (
    echo Ошибка: Распакованная папка не найдена.
    exit /b 1
)

    :: Удаление распакованной папки (если нужно)
    rmdir /S /Q "%extractDir%"
)
pause
endlocal
