@echo off
set version=1.0.0
NuGet pack uxbar.jquery.nuspec -Properties version=%version%
@pause