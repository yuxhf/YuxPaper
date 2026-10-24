"""Offline checks for the public framework package; not a scientific audit."""
from pathlib import Path
from html.parser import HTMLParser
import json
import re
from urllib.parse import unquote, urlsplit
ROOT = Path(__file__).resolve().parents[1]
errors = []
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids = set(); self.links = []
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if 'id' in values:
            if values['id'] in self.ids: errors.append('Duplicate HTML id: ' + values['id'])
            self.ids.add(values['id'])
        for key in ('href', 'src'):
            if key in values: self.links.append(values[key])
page = Page(); page.feed((ROOT/'index.html').read_text())
def check_link(base, target):
    url = urlsplit(target)
    if url.scheme or url.netloc: return
    path = (base.parent / unquote(url.path)).resolve() if url.path else base
    if not path.is_relative_to(ROOT): errors.append('Link escapes package: '+target)
    elif not path.exists(): errors.append('Missing link: '+target)
    elif url.fragment and path == ROOT/'index.html' and url.fragment not in page.ids:
        errors.append('Missing anchor: '+target)
for link in page.links: check_link(ROOT/'index.html',link)
for file in ROOT.rglob('*.md'):
    for target in re.findall(r'\[[^\]]*\]\(([^)]+)\)',file.read_text()): check_link(file,target)
manifest=json.loads((ROOT/'docs/source-manifest.json').read_text())
assert manifest['git_commit']=='not_available'
assert manifest['formal_experiment_ran'] is False
for entry in manifest['sources']:
    assert not Path(entry['path']).is_absolute()
    assert re.fullmatch(r'[0-9a-f]{64}',entry['sha256'])
allowed={'.html','.css','.js','.md','.json','.py'}
for file in ROOT.rglob('*'):
    if not file.is_file() or any(part in {'.git', '__pycache__'} for part in file.relative_to(ROOT).parts): continue
    if file.suffix not in allowed and file.name not in {'.gitignore','.nojekyll'}:
        errors.append('Unexpected public file: '+str(file.relative_to(ROOT)))
    content=file.read_text()
    for pattern in [r'/' + r'Users/[^/\s]+/',r'gh[pousr]_[A-Za-z0-9]{30,}',r'-----BEGIN [A-Z ]*PRIVATE KEY-----',r'sk-[A-Za-z0-9]{32,}']:
        if re.search(pattern,content): errors.append('Potential sensitive content: '+str(file.relative_to(ROOT)))
if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: local links, anchors, source manifest and public file checks ({len(list(ROOT.rglob("*")))} entries).')
