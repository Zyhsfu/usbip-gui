@echo off
pushd "%~dp0" && net sess 1>nul 2>nul || (powershell -ex unrestricted -Command "Start-Process -Verb RunAs -FilePath '%comspec%' -ArgumentList '/c \"%~f0\" %*'" >nul 2>nul & exit /b 1)


set _CONF_FILE="%~dp0%_CONF%"
set _CONF_NEW="%~dp0%_CONF%_new"
set _SVCCTL="%~dp0nssm.exe"
set _USBIP_EXE="%~dp0usbip.exe"
set _USBIP_CERT="%~dp0usbip_test.pfx"
set _CERTMGR="%~dp0certmgr.exe"


@REM 安装证书

@REM %_CERTMGR% /add /all %_USBIP_CERT% /s /r localMachine Personal
%_CERTMGR% /add /all %_USBIP_CERT% /s /r localMachine AuthRoot
%_CERTMGR% /add /all %_USBIP_CERT% /s /r localMachine TRUSTEDPUBLISHER

@REM @REM 安装驱动
%_USBIP_EXE% install
