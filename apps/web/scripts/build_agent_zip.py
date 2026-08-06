import os
import zipfile

dist_dir = os.path.abspath('/Users/ardabaranakdemir/Downloads/DetectHub/apps/agent/dist')
output_dir = os.path.abspath('/Users/ardabaranakdemir/Downloads/DetectHub/apps/web/public/downloads')
os.makedirs(output_dir, exist_ok=True)

zip_mac_path = os.path.join(output_dir, 'DetectHub-Agent-v2.4.0-macOS.zip')
zip_win_path = os.path.join(output_dir, 'DetectHub-Agent-v2.4.0-Windows.zip')

def create_agent_zip(output_path, os_type):
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Add launcher script
        if os_type == 'mac':
            launcher_content = """#!/bin/bash
echo "Initializing DetectHub Digital Forensics Agent v2.4.0..."
open index.html || open http://localhost:1420
"""
            zipf.writestr('DetectHub-Agent/start.command', launcher_content)
        else:
            launcher_content = """@echo off
echo Initializing DetectHub Digital Forensics Agent v2.4.0...
start index.html
"""
            zipf.writestr('DetectHub-Agent/start.bat', launcher_content)

        # Add dist files
        for root, dirs, files in os.walk(dist_dir):
            for file in files:
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, dist_dir)
                zipf.write(file_path, os.path.join('DetectHub-Agent', rel_path))

create_agent_zip(zip_mac_path, 'mac')
create_agent_zip(zip_win_path, 'win')

print("Created valid ZIP agent archives in public/downloads!")
