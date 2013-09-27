@echo off
call "C:\Program Files\nodejs\nodevars.bat"
call node_modules\.bin\minify.cmd "src\jquery.uxbar.js" "public\jquery.uxbar.js.min"
copy "src\jquery.uxbar.js" "public\jquery.uxbar.js"