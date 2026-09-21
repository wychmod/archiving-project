@echo off
rem Local preview for the showcase site.
rem Ruby is a portable build; MSYS2 provides the toolchain for native gems.
setlocal

set "RUBY_ROOT=D:\idea\ruby-portable\rubyinstaller-3.4.10-1-x64"
set "PATH=%RUBY_ROOT%\bin;%RUBY_ROOT%\msys64\usr\bin;%RUBY_ROOT%\msys64\mingw64\bin;%PATH%"
set "MSYS2_INSTALL_DIR=%RUBY_ROOT%\msys64"
set "MSYSTEM=MINGW64"

cd /d "%~dp0"
bundle exec jekyll serve --livereload %*

endlocal
