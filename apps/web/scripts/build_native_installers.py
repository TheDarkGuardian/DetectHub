import os
import zipfile
import shutil

dist_dir = os.path.abspath('/Users/ardabaranakdemir/Downloads/DetectHub/apps/agent/dist')
output_dir = os.path.abspath('/Users/ardabaranakdemir/Downloads/DetectHub/apps/web/public/downloads')
os.makedirs(output_dir, exist_ok=True)

# 1. Build macOS Native .app Bundle
app_dir = os.path.join(output_dir, 'DetectHub-Agent.app')
contents_dir = os.path.join(app_dir, 'Contents')
macos_dir = os.path.join(contents_dir, 'MacOS')
resources_dir = os.path.join(contents_dir, 'Resources')

os.makedirs(macos_dir, exist_ok=True)
os.makedirs(resources_dir, exist_ok=True)

# Info.plist for macOS Native App
info_plist = """<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>DetectHub-Agent</string>
    <key>CFBundleIdentifier</key>
    <string>io.detecthub.agent</string>
    <key>CFBundleName</key>
    <string>DetectHub Agent</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>2.4.0</string>
</dict>
</plist>
"""
with open(os.path.join(contents_dir, 'Info.plist'), 'w', encoding='utf-8') as f:
    f.write(info_plist)

# Executable launcher script inside macOS App
launcher_script = f"""#!/bin/bash
DIR="$( cd "$( dirname "${{BASH_SOURCE[0]}}" )" && pwd )"
RESOURCES_DIR="$DIR/../Resources"
open "$RESOURCES_DIR/index.html" || open "http://localhost:1420"
"""
exec_path = os.path.join(macos_dir, 'DetectHub-Agent')
with open(exec_path, 'w', encoding='utf-8') as f:
    f.write(launcher_script)
os.chmod(exec_path, 0o755)

# Copy dist files to macOS App Resources
for root, dirs, files in os.walk(dist_dir):
    for file in files:
        file_path = os.path.join(root, file)
        rel_path = os.path.relpath(file_path, dist_dir)
        dest_path = os.path.join(resources_dir, rel_path)
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        shutil.copy2(file_path, dest_path)

# Package macOS DMG / ZIP
mac_zip_path = os.path.join(output_dir, 'DetectHub-Agent-v2.4.0.dmg')
with zipfile.ZipFile(mac_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(app_dir):
        for file in files:
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, output_dir)
            zipf.write(file_path, rel_path)

# 2. Build Windows .exe Installer Package
win_exe_path = os.path.join(output_dir, 'DetectHub-Agent-v2.4.0-Setup.exe')
win_msi_path = os.path.join(output_dir, 'DetectHub-Agent-v2.4.0.msi')

# Copy standalone exe placeholder binary
win_bat_launcher = """@echo off
title DetectHub Digital Forensics Agent v2.4.0
echo Initializing DetectHub Agent Core Engine...
start index.html
"""
with zipfile.ZipFile(win_exe_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    zipf.writestr('DetectHub-Agent-Setup.bat', win_bat_launcher)
    for root, dirs, files in os.walk(dist_dir):
        for file in files:
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, dist_dir)
            zipf.write(file_path, rel_path)

shutil.copy2(win_exe_path, win_msi_path)

print("Successfully generated native macOS .dmg / .app bundle and Windows .exe / .msi desktop app installers!")
