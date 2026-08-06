import os
import re
import zipfile

dist_dir = os.path.abspath('/Users/ardabaranakdemir/Downloads/DetectHub/apps/agent/dist')
output_dir = os.path.abspath('/Users/ardabaranakdemir/Downloads/DetectHub/apps/web/public/downloads')
os.makedirs(output_dir, exist_ok=True)

index_html_path = os.path.join(dist_dir, 'index.html')
with open(index_html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Read CSS and JS files from dist/assets
css_content = ""
js_content = ""

assets_dir = os.path.join(dist_dir, 'assets')
if os.path.exists(assets_dir):
    for fname in os.listdir(assets_dir):
        fpath = os.path.join(assets_dir, fname)
        if fname.endswith('.css'):
            with open(fpath, 'r', encoding='utf-8') as f:
                css_content += f.read() + "\n"
        elif fname.endswith('.js'):
            with open(fpath, 'r', encoding='utf-8') as f:
                js_content += f.read() + "\n"

# Remove module script & css link tags
html_content = re.sub(r'<link rel="stylesheet"[^>]*>', '', html_content)
html_content = re.sub(r'<script type="module"[^>]*></script>', '', html_content)

# Remove crossorigin attributes
html_content = html_content.replace('crossorigin', '')

# Inline CSS and JS before </head> and </body>
inlined_html = html_content.replace(
    '</head>',
    f'<style>\n{css_content}\n</style>\n</head>'
).replace(
    '</body>',
    f'<script>\n{js_content}\n</script>\n</body>'
)

# Write inlined index.html to standalone zip
zip_mac_path = os.path.join(output_dir, 'DetectHub-Agent-v2.4.0-macOS.zip')
zip_win_path = os.path.join(output_dir, 'DetectHub-Agent-v2.4.0-Windows.zip')

def create_singlefile_zip(output_path):
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipf.writestr('index.html', inlined_html)

create_singlefile_zip(zip_mac_path)
create_singlefile_zip(zip_win_path)

print("Successfully generated single-file inline HTML agent packages!")
